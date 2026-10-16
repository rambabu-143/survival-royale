"use client";
import { useEffect, useRef, useState } from "react";
import { startGame, WEAPONS, CATS, SLOTS, CHARACTERS, type Hud, type Kind } from "../lib/game";

const Compass = ({ yaw }: { yaw: number }) => {
  const ticks = [];
  for (let t = Math.ceil((yaw - 60) / 5) * 5; t <= yaw + 60; t += 5) {
    const a = ((t % 360) + 360) % 360, L = { 0: "N", 90: "E", 180: "S", 270: "W" }[a as 0], big = a % 90 === 0;
    ticks.push(
      <div key={t} className="tick" style={{ left: `${50 + ((t - yaw) / 120) * 100}%` }}>
        <i style={{ height: a % 30 === 0 ? 10 : 5 }} />
        {(L || a % 30 === 0) && <span style={{ color: big ? "#ffd24a" : "#fff", fontWeight: big ? 800 : 500 }}>{L || a}</span>}
      </div>
    );
  }
  return <div className="compass">{ticks}<div className="needle">▼</div></div>;
};
const Row = ({ icon, name, right, on, bar }: { icon: string; name: string; right?: React.ReactNode; on?: boolean; bar?: { v: number; c: string } }) => (
  <div className={"row" + (on ? " on" : "")}>
    <span>{icon} {name}</span>
    {bar ? <div className="bar"><i style={{ width: `${bar.v}%`, background: bar.c }} /></div> : <b>{right}</b>}
  </div>
);
const Inventory = ({ h }: { h: Hud }) => (
  <div className="inv">
    <div className="invh">INVENTORY <small>[Tab] hide</small></div>
    <div className="invs">Equipment</div>
    <Row icon="🪖" name="Helmet" bar={{ v: (h.helmet / 80) * 100, c: "#9aa17a" }} />
    <Row icon="🦺" name="Body armor" bar={{ v: h.armor, c: "#3da5ff" }} />
    <Row icon="🎒" name="Backpack" right={h.pack ? "Large · max 10" : "None · max 4"} />
    <div className="invs">Weapons</div>
    {CATS.map((c, i) => {
      const own = c.ids.filter((w) => h.owned.includes(w));
      return (
        <div key={c.name}>
          <div className="cat">[{i + 1}] {c.name}</div>
          {own.length ? own.map((w) => <Row key={w} icon="🔫" name={WEAPONS[w].name} on={h.cur === w} right={`${h.mags[w]} / ${h.ammo[WEAPONS[w].ammo]}`} />) : <div className="none">—</div>}
        </div>
      );
    })}
    <div className="invs">Throwables &amp; healing</div>
    <Row icon="💣" name="Grenade  [G]" right={`×${h.items.grenade}`} />
    <Row icon="🩹" name="Bandage  [H]" right={`×${h.items.bandage}`} />
    <Row icon="🧰" name="Med Kit  [J]" right={`×${h.items.medkit}`} />
    <Row icon="🥤" name="Energy Drink  [K]" right={`×${h.items.drink}`} />
    <div className="invs">Ammo</div>
    <div className="ammos">{Object.entries(h.ammo).map(([k, v]) => <span key={k}>{k}: <b>{v}</b></span>)}</div>
  </div>
);
const KEYS: [string, string][] = [
  ["W A S D", "Move (run)"], ["Shift + W", "Sprint"], ["N or Alt (hold)", "Slow walk"], ["C", "Crouch"], ["Space", "Jump / open parachute / jump from plane"],
  ["Mouse", "Aim"], ["Left click  or  F", "FIRE"], ["Right click  or  Z", "Aim down sights"], ["R", "Reload"],
  ["1 – 5", "Weapon group: Rifles / SMGs / Shotguns / Marksman / Pistols — press again to cycle"], ["Mouse wheel", "Next / previous weapon"], ["Q", "Swap to last weapon"], ["X", "Fists"],
  ["E", "GRAB the item you are looking at / enter & exit cars"], ["T", "Auto-pickup everything on / off"],
  ["H", "Use bandage"], ["J", "Use med kit"], ["K", "Drink energy drink"], ["G", "Throw grenade"],
  ["V", "First / third person"], ["Tab", "Inventory"], ["/", "This help"],
];
const Controls = () => (
  <div className="ctl">
    <div className="invh">KEYBOARD SHORTCUTS <small>[/] close</small></div>
    {KEYS.map(([k, d]) => <div key={k} className="row"><kbd>{k}</kbd><span>{d}</span></div>)}
  </div>
);
const HOT: [string, string, string, "bandage" | "medkit" | "drink" | "grenade"][] = [["H", "🩹", "Bandage", "bandage"], ["J", "🧰", "Med Kit", "medkit"], ["K", "🥤", "Drink", "drink"], ["G", "💣", "Grenade", "grenade"]];
const Hotbar = ({ h }: { h: Hud }) => (
  <div className="hotbar">
    {HOT.map(([k, icon, name, id]) => (
      <div key={k} className={"hb" + (h.items[id] ? "" : " empty") + (h.busy === id ? " using" : "")} title={name}>
        <kbd>{k}</kbd><span>{icon}</span><em>×{h.items[id]}</em><small>{name}</small>
      </div>
    ))}
  </div>
);
const Bar = ({ v, c }: { v: number; c: string }) => <div className="bar"><i style={{ width: `${v}%`, background: c }} /></div>;

export default function Game() {
  const cv = useRef<HTMLCanvasElement>(null), mini = useRef<HTMLCanvasElement>(null);
  const [h, setHud] = useState<Hud | null>(null);
  const [run, setRun] = useState(0);
  const [character, setCharacter] = useState<Kind>("xbot");
  useEffect(() => { try { const c = localStorage.getItem("sr-char") as Kind | null; if (c && CHARACTERS.some((x) => x.id === c)) setCharacter(c); } catch {} }, []);
  const pick = (c: Kind) => { setCharacter(c); try { localStorage.setItem("sr-char", c); } catch {} };
  const [inv, setInv] = useState(true);
  const [help, setHelp] = useState(false);
  useEffect(() => {
    const f = (e: KeyboardEvent) => { if (e.code === "Tab") { e.preventDefault(); setInv((v) => !v); }
      if (e.code === "Slash") setHelp((v) => !v); };
    window.addEventListener("keydown", f); return () => window.removeEventListener("keydown", f);
  }, []);

  useEffect(() => {
    setHud(null);
    const stop = startGame(cv.current!, mini.current!, setHud, { character });
    return stop;
  }, [run, character]);

  const now = Date.now();
  return (
    <>
      <canvas id="c" ref={cv} key={run} />
      <div className="hud">
        <div className="tr">
          <canvas ref={mini} width={180} height={180} />
          <div className="feed">{h?.feed.map((f, i) => <div key={i}>{f}</div>)}</div>
        </div>
        {h && !h.over && (
          <>
            {h.hurtAt && now - h.hurtAt < 500 && <div className="vig" style={{ opacity: 1 - (now - h.hurtAt) / 500 }} />}
            {h.outside && <div className="zonevig" />}
            {h.hurtAt && now - h.hurtAt < 700 && (
              <div className="dir" style={{ transform: `rotate(${h.hurtAngle}deg)`, opacity: 1 - (now - h.hurtAt) / 700 }}><i /></div>
            )}
            {h.scope ? <div className="scope" /> : <div className="cross" />}
            {now - h.hit < 150 && <div className="hit">✕</div>}
            <div className="tl">
              <div className="panel">👥 {h.alive} alive</div>
              <div className="panel">☠ {h.kills} kills</div>
            </div>
            <div className="tc panel" style={{ color: h.outside ? "#6aa8ff" : "#fff" }}>
              {h.zoneLabel} {Math.floor(h.zoneT / 60)}:{String(h.zoneT % 60).padStart(2, "0")}
              {h.outside && <div>⚠ Outside the safe zone!</div>}
            </div>
            {h.phase !== "ground" && (
              <div className="prompt" style={{ top: "20%", fontSize: 24 }}>
                {h.phase === "plane" ? <><b>[SPACE]</b> Jump out of the plane</> : h.phase === "fall" ? <><b>[SPACE]</b> Open parachute · auto at 110 m</> : "Parachute open — steer with WASD"}
                <div style={{ fontSize: 16, marginTop: 6 }}>{h.phase !== "plane" && `Altitude ${h.alt} m`}</div>
              </div>
            )}
            <Compass yaw={h.yaw} />
            {h.prompt && <div className="prompt">{h.prompt}</div>}
            {h.driving && <div className="speedo">{h.kmh} <small>km/h</small></div>}
            <div className="viewhint">[V] {h.fpp ? "First" : "Third"} person · <b style={{ color: "#ffd24a" }}>{h.move}</b> · auto-pickup: {h.auto ? "all" : "ammo only"} [T] · [/] all keys</div>
            {h.busy && <div className="prompt" style={{ top: "62%" }}>Using {h.busy}… {Math.round(h.busyP * 100)}%</div>}
            <div className="bc">
              <Bar v={h.boost} c="#ffb020" />
              <Bar v={h.armor} c="#3da5ff" />
              <Bar v={h.hp} c={h.hp > 30 ? "#e8e8e8" : "#ff3b3b"} />
              <div style={{ textAlign: "center", marginTop: 4 }}>❤ {h.hp}{h.armor > 0 && ` · 🛡 ${h.armor}`}</div>
            </div>
            {inv && <Inventory h={h} />}
            <Hotbar h={h} />
            {help && <Controls />}
            <div className="br">
              <div className="slots">
                {SLOTS.map((s, i) => (
                  <div key={s} className={"slot" + (h.cur === s ? " on" : "")} style={{ display: h.owned.includes(s) ? "block" : "none" }}>
                    {CATS.findIndex((c) => c.ids.includes(s)) + 1} {WEAPONS[s].name}
                  </div>
                ))}
              </div>
              {h.cur ? (
                <div className="ammo">{h.reloading ? "…" : h.mag} <small>/ {h.reserve}</small></div>
              ) : <div className="ammo"><small>Fists — find a weapon</small></div>}
              <div>{h.weapon}{h.reloading && " · reloading"}</div>
              {h.reloading && <div className="bar" style={{ width: 160, marginLeft: "auto" }}><i style={{ width: `${h.reloadP * 100}%`, background: "#ffd24a" }} /></div>}
            </div>
          </>
        )}
        {h && !h.locked && !h.over && (
          <div className="over" style={{ background: "rgba(0,0,0,.5)", pointerEvents: "none" }}>
            <h1>SURVIVAL ROYALE</h1>
            <div>Click anywhere to {h.kills || h.hp < 100 ? "resume" : "play"} · last one alive wins</div>
            <div className="chars">
              {CHARACTERS.map((c) => (
                <button key={c.id} className={c.id === character ? "on" : ""} onClick={() => pick(c.id)}><b>{c.name}</b><small>{c.blurb}</small></button>
              ))}
            </div>
            <div className="help">
              <b>FIRE: left mouse button or F</b> · aim: right mouse or Z · reload: R<br />
              WASD run · Shift sprint · N/Alt slow walk · C crouch · Space jump<br />
              <b>E = grab the item you are looking at</b> (ammo is picked up on touch) · T auto-pickup all<br />
              <b>H bandage · J med kit · K energy drink · G grenade</b> · 1–5 weapon groups (press again to cycle) · wheel / Q switch · X fists<br />
              V first / third person · Tab inventory · <b>/ shows every shortcut</b><br />
              In the plane: Space to jump out · in freefall: Space opens the parachute · E drives cars<br />
              <small style={{ opacity: 0.6 }}>Assets: Kenney Nature Kit &amp; sounds (CC0) · ambientCG Grass001/Ground037/Rock035 (CC0) · Poly Haven sky (CC0) · OpenGameArt "Lightning" pump-action (CC0) · Xbot &amp; Soldier models: Mixamo via three.js examples · Babylon.js sample plane</small>
            </div>
          </div>
        )}
        {h?.over && (
          <div className="over">
            <h1>{h.over === "win" ? "WINNER WINNER!" : "YOU DIED"}</h1>
            <div>{h.over === "win" ? "Last one standing." : `Placed #${h.rank}`} · {h.kills} kills</div>
            <button onClick={() => setRun((r) => r + 1)}>Play again</button>
          </div>
        )}
      </div>
    </>
  );
}
