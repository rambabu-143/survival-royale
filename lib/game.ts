import * as B from "@babylonjs/core";
import { SkyMaterial } from "@babylonjs/materials/sky";
import { TerrainMaterial } from "@babylonjs/materials/terrain";
import "@babylonjs/loaders/glTF";

const V = B.Vector3;
const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const SIZE = 600, HALF = SIZE / 2;

export const WEAPONS = {
  pistol: { name: "P92", ammo: "9mm", dmg: 24, rate: 0.25, mag: 15, reload: 1.6, spread: 0.014, pellets: 1, auto: false, range: 150, kick: 0.012, len: 0.3, color: "#2b2b2b", pack: 30 },
  smg: { name: "UMP9", ammo: "9mm", dmg: 20, rate: 0.075, mag: 25, reload: 2.0, spread: 0.02, pellets: 1, auto: true, range: 120, kick: 0.007, len: 0.42, color: "#2d2d30", pack: 30 },
  vector: { name: "Vector", ammo: "9mm", dmg: 17, rate: 0.055, mag: 33, reload: 2.0, spread: 0.024, pellets: 1, auto: true, range: 110, kick: 0.006, len: 0.4, color: "#202022", pack: 30 },
  ar: { name: "M416", ammo: "5.56", dmg: 30, rate: 0.09, mag: 30, reload: 2.3, spread: 0.012, pellets: 1, auto: true, range: 250, kick: 0.009, len: 0.65, color: "#222a22", pack: 60 },
  scar: { name: "SCAR-L", ammo: "5.56", dmg: 32, rate: 0.095, mag: 30, reload: 2.4, spread: 0.011, pellets: 1, auto: true, range: 260, kick: 0.01, len: 0.66, color: "#5a5240", pack: 60 },
  akm: { name: "AKM", ammo: "7.62", dmg: 40, rate: 0.1, mag: 30, reload: 2.6, spread: 0.016, pellets: 1, auto: true, range: 220, kick: 0.013, len: 0.68, color: "#2e2a26", pack: 30 },
  shotgun: { name: "S12K", ammo: "12g", dmg: 11, rate: 0.85, mag: 5, reload: 2.4, spread: 0.055, pellets: 9, auto: false, range: 45, kick: 0.05, len: 0.6, color: "#4a3524", pack: 10 },
  mini14: { name: "Mini14", ammo: "5.56", dmg: 48, rate: 0.2, mag: 20, reload: 2.7, spread: 0.005, pellets: 1, auto: false, range: 380, kick: 0.025, len: 0.78, color: "#2e3a2e", pack: 40, zoom: 0.6 },
  dmr: { name: "SKS", ammo: "7.62", dmg: 55, rate: 0.22, mag: 10, reload: 2.8, spread: 0.004, pellets: 1, auto: false, range: 350, kick: 0.03, len: 0.8, color: "#3a2e22", pack: 20, zoom: 0.55 },
  aug: { name: "AUG", ammo: "5.56", dmg: 31, rate: 0.085, mag: 30, reload: 2.3, spread: 0.01, pellets: 1, auto: true, range: 260, kick: 0.008, len: 0.62, color: "#3a4a3a", pack: 60 },
  m762: { name: "Beryl M762", ammo: "7.62", dmg: 44, rate: 0.086, mag: 30, reload: 2.7, spread: 0.02, pellets: 1, auto: true, range: 230, kick: 0.018, len: 0.7, color: "#303030", pack: 30 },
  m249: { name: "M249", ammo: "5.56", dmg: 28, rate: 0.07, mag: 100, reload: 5.2, spread: 0.022, pellets: 1, auto: true, range: 260, kick: 0.011, len: 0.8, color: "#2a2e2a", pack: 100 },
  uzi: { name: "Micro UZI", ammo: "9mm", dmg: 15, rate: 0.048, mag: 25, reload: 1.9, spread: 0.03, pellets: 1, auto: true, range: 90, kick: 0.008, len: 0.34, color: "#26262a", pack: 30 },
  tommy: { name: "Tommy Gun", ammo: "9mm", dmg: 22, rate: 0.085, mag: 30, reload: 2.6, spread: 0.025, pellets: 1, auto: true, range: 110, kick: 0.01, len: 0.5, color: "#3b3028", pack: 30 },
  s686: { name: "S686", ammo: "12g", dmg: 14, rate: 0.35, mag: 2, reload: 2.2, spread: 0.05, pellets: 9, auto: false, range: 42, kick: 0.07, len: 0.6, color: "#5a3d26", pack: 10 },
  slr: { name: "SLR", ammo: "7.62", dmg: 58, rate: 0.2, mag: 10, reload: 3.0, spread: 0.004, pellets: 1, auto: false, range: 380, kick: 0.032, len: 0.85, color: "#3a3a34", pack: 20, zoom: 0.5 },
  qbu: { name: "QBU", ammo: "5.56", dmg: 45, rate: 0.18, mag: 10, reload: 2.8, spread: 0.004, pellets: 1, auto: false, range: 390, kick: 0.022, len: 0.72, color: "#4a4a40", pack: 20, zoom: 0.5 },
  awm: { name: "AWM", ammo: "7.62", dmg: 130, rate: 1.7, mag: 5, reload: 3.4, spread: 0.0005, pellets: 1, auto: false, range: 700, kick: 0.09, len: 0.98, color: "#2f3a2f", pack: 10, scope: true, zoom: 0.12 },
  deagle: { name: "Desert Eagle", ammo: "9mm", dmg: 48, rate: 0.35, mag: 7, reload: 2.0, spread: 0.012, pellets: 1, auto: false, range: 150, kick: 0.04, len: 0.34, color: "#9a9a9a", pack: 14 },
  revolver: { name: "R45", ammo: "9mm", dmg: 62, rate: 0.55, mag: 6, reload: 3.0, spread: 0.01, pellets: 1, auto: false, range: 150, kick: 0.06, len: 0.3, color: "#5a5a5a", pack: 12 },
  sniper: { name: "Kar98k", ammo: "7.62", dmg: 95, rate: 1.5, mag: 5, reload: 2.8, spread: 0.0008, pellets: 1, auto: false, range: 500, kick: 0.06, len: 0.9, color: "#3a2e22", pack: 10, scope: true, zoom: 0.2 },
};
type WId = keyof typeof WEAPONS;
// weapon groups on keys 1-5: press the key again to cycle through the guns you hold in that group
export const CATS: { name: string; ids: WId[] }[] = [
  { name: "Rifles", ids: ["ar", "scar", "aug", "akm", "m762", "m249"] },
  { name: "SMGs", ids: ["smg", "vector", "uzi", "tommy"] },
  { name: "Shotguns", ids: ["shotgun", "s686"] },
  { name: "Marksman", ids: ["mini14", "qbu", "dmr", "slr", "sniper", "awm"] },
  { name: "Pistols", ids: ["pistol", "deagle", "revolver"] },
];
export const SLOTS: WId[] = CATS.flatMap((c) => c.ids);
const LOOK: Record<string, string> = { aug: "ar", m249: "ar", scar: "ar", vector: "smg", uzi: "smg", tommy: "smg", m762: "akm", mini14: "dmr", slr: "dmr", qbu: "dmr", awm: "sniper", deagle: "pistol", revolver: "pistol", s686: "shotgun" };
const wd = (id: WId) => WEAPONS[id] as unknown as { zoom?: number; scope?: boolean };
const AMMO_PACK: Record<string, number> = { "9mm": 30, "5.56": 60, "12g": 10, "7.62": 30 };

export interface Hud {
  locked: boolean; hp: number; armor: number; boost: number; weapon: string; mag: number; reserve: number;
  cur: WId | null; owned: WId[]; alive: number; kills: number; zoneLabel: string; zoneT: number; outside: boolean;
  prompt: string; items: { bandage: number; medkit: number; drink: number; grenade: number }; busy: string; busyP: number;
  feed: string[]; hit: number; hurtAt: number; hurtAngle: number; reloading: boolean; scope: boolean;
  over: "" | "dead" | "win"; rank: number; phase: "plane" | "fall" | "chute" | "ground"; alt: number; yaw: number; fpp: boolean; kmh: number; driving: boolean; move: string; auto: boolean; reloadP: number; helmet: number; pack: boolean; ammo: Record<string, number>; mags: Partial<Record<WId, number>>;
}

const LOOT: Record<string, { label: string; color: string }> = {};
for (const [id, w] of Object.entries(WEAPONS)) {
  LOOT[id] = { label: w.name, color: "#ff8a1f" };
  LOOT["a:" + w.ammo] = { label: w.ammo + " Ammo", color: "#ffe14d" };
}
Object.assign(LOOT, {
  bandage: { label: "Bandage", color: "#3ddc84" }, medkit: { label: "Med Kit", color: "#ff3b3b" },
  drink: { label: "Energy Drink", color: "#ff4df0" }, vest: { label: "Body Armor", color: "#3da5ff" },
  grenade: { label: "Grenade", color: "#8fbf3a" }, helmet: { label: "Helmet", color: "#c9d1a0" }, backpack: { label: "Backpack", color: "#e08a2b" },
});
const TABLE: [string, number][] = [["aug", 1.2], ["m762", 1.2], ["m249", 0.5], ["uzi", 1.2], ["tommy", 1], ["s686", 1.2], ["slr", 0.8], ["qbu", 0.8], ["awm", 0.4], ["deagle", 1.2], ["revolver", 1], ["pistol", 3], ["vector", 1.5], ["scar", 1.5], ["mini14", 1], ["smg", 2.5], ["akm", 2], ["dmr", 1.2], ["ar", 3], ["shotgun", 2], ["sniper", 1], ["a:9mm", 4], ["a:5.56", 5], ["a:12g", 3], ["a:7.62", 2], ["bandage", 5], ["medkit", 1.5], ["drink", 2.5], ["vest", 1.5], ["grenade", 3], ["helmet", 1.5], ["backpack", 1.5]];
const roll = () => {
  let r = Math.random() * TABLE.reduce((s, t) => s + t[1], 0);
  for (const [id, w] of TABLE) if ((r -= w) <= 0) return id;
  return "bandage";
};

// ---------- audio (procedural, no assets) ----------
let ac: AudioContext | null = null;
function boom(vol: number, cut: number, dur: number) {
  if (vol < 0.01) return;
  ac ??= new AudioContext();
  const n = Math.floor(ac.sampleRate * dur), buf = ac.createBuffer(1, n, ac.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
  const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
  s.buffer = buf; f.type = "lowpass"; f.frequency.value = cut; g.gain.value = vol;
  s.connect(f).connect(g).connect(ac.destination); s.start();
}

const samples: Record<string, AudioBuffer> = {};
function loadSounds() {
  ac ??= new AudioContext(); ac.resume();
  for (const n of ["engine", "step0", "step1", "step2", "step3", "step4", "pickup", "cloth", "equip"]) {
    if (samples[n]) continue;
    fetch(`/assets/snd/${n}.ogg`).then((r) => r.arrayBuffer()).then((b) => ac!.decodeAudioData(b)).then((d) => (samples[n] = d)).catch(() => {});
  }
}
function play(n: string, vol: number, loop = false) {
  if (!ac || !samples[n]) return null;
  const s = ac.createBufferSource(), g = ac.createGain(); s.buffer = samples[n]; s.loop = loop; g.gain.value = vol;
  s.connect(g).connect(ac.destination); s.start(); return { s, g };
}

interface Anims { idle: B.AnimationGroup | null; walk: B.AnimationGroup | null; run: B.AnimationGroup | null; cur: B.AnimationGroup | null }
function pickAnims(gs: B.AnimationGroup[]): Anims {
  const f = (k: string) => gs.find((g) => g.name.toLowerCase().startsWith(k)) ?? null;
  gs.forEach((g) => g.stop());
  const a: Anims = { idle: f("idle"), walk: f("walk"), run: f("run"), cur: null };
  if (!a.walk && !a.idle) a.walk = gs[0] ?? null; // single-clip models (CesiumMan): freeze it when standing
  return a;
}
function setAnim(a: Anims | null, want: "idle" | "walk" | "run", ratio = 1) {
  if (!a) return;
  const g = a[want] ?? a.walk ?? a.run ?? a.idle;
  if (!g) return;
  if (a.cur !== g) { a.cur?.stop(); g.start(true); a.cur = g; }
  g.speedRatio = !a.idle && want === "idle" ? 0 : ratio;
}

interface Car { node: B.TransformNode; x: number; z: number; ry: number; speed: number; cs: { x: number; z: number; r: number }[] }

interface Bot {
  root: B.TransformNode; hp: number; dead: boolean; name: string; tgt: B.Vector3; wanderT: number;
  cd: number; seen: boolean; losT: number; meshes: B.Mesh[]; anims: Anims | null; flash: B.Mesh | null; fl: number;
}

export type Kind = "soldier" | "xbot" | "cesium";
export const CHARACTERS: { id: Kind; name: string; blurb: string }[] = [
  { id: "xbot", name: "Operator", blurb: "Plain body, shows the gear you pick up" },
  { id: "soldier", name: "Soldier", blurb: "Realistic armoured soldier" },
  { id: "cesium", name: "Civilian", blurb: "Man in a white suit" },
];

export function startGame(canvas: HTMLCanvasElement, mini: HTMLCanvasElement, onHud: (h: Hud) => void, opts: { character?: Kind } = {}) {
  const engine = new B.Engine(canvas, true, { stencil: true });
  const scene = new B.Scene(engine);
  const cleanup: (() => void)[] = [];
  const on = (t: EventTarget, e: string, f: any) => { t.addEventListener(e, f); cleanup.push(() => t.removeEventListener(e, f)); };

  const mats = new Map<string, B.StandardMaterial>();
  const mat = (hex: string, glow = false, alpha = 1) => {
    const k = hex + glow + alpha;
    if (!mats.has(k)) {
      const m = new B.StandardMaterial(k, scene);
      m.diffuseColor = B.Color3.FromHexString(hex); m.specularColor = new B.Color3(0.08, 0.08, 0.08); m.alpha = alpha;
      if (glow) { m.emissiveColor = m.diffuseColor; m.disableLighting = true; }
      mats.set(k, m);
    }
    return mats.get(k)!;
  };
  const box = (w: number, h: number, d: number, hex: string, parent?: B.Node) => {
    const b = B.MeshBuilder.CreateBox("b", { width: w, height: h, depth: d }, scene);
    b.material = mat(hex); if (parent) b.parent = parent; return b;
  };

  // ---------- world look ----------
  const fogC = new B.Color3(0.76, 0.8, 0.86);
  scene.clearColor = new B.Color4(fogC.r, fogC.g, fogC.b, 1);
  scene.fogMode = B.Scene.FOGMODE_EXP2; scene.fogDensity = 0.0035; scene.fogColor = fogC;
  const sunDir = new V(-0.62, -0.46, -0.55).normalize(); // low golden-hour sun: long shadows
  const hemi = new B.HemisphericLight("h", new V(0, 1, 0), scene);
  hemi.intensity = 0.85; hemi.diffuse = new B.Color3(0.78, 0.85, 1); hemi.groundColor = new B.Color3(0.34, 0.3, 0.22);
  const sun = new B.DirectionalLight("sun", sunDir, scene);
  sun.intensity = 2.0; sun.diffuse = new B.Color3(1, 0.88, 0.7);
  const sg = new B.CascadedShadowGenerator(2048, sun); // 3 cascades: sharp near you, still shadowed far away
  sg.numCascades = 3; sg.lambda = 0.85; sg.shadowMaxZ = 260; sg.stabilizeCascades = true;
  sg.usePercentageCloserFiltering = true; sg.filteringQuality = B.ShadowGenerator.QUALITY_MEDIUM; sg.bias = 0.0006; sg.normalBias = 0.03;

  const sky = new SkyMaterial("sky", scene);
  sky.backFaceCulling = false; sky.useSunPosition = true; sky.sunPosition = sunDir.scale(-100);
  sky.turbidity = 4; sky.rayleigh = 1.4; sky.mieCoefficient = 0.005; sky.mieDirectionalG = 0.85; sky.luminance = 1;
  const skybox = B.MeshBuilder.CreateBox("sky", { size: 1000 }, scene);
  skybox.material = sky; skybox.infiniteDistance = true; skybox.isPickable = false;

  // ---------- terrain ----------
  const noise = (x: number, z: number) => Math.sin(x * 0.011) * Math.cos(z * 0.013) * 9 + Math.sin(x * 0.031 + z * 0.027) * 3 + Math.cos(x * 0.07 - z * 0.06) * 1.2;
  const sites = Array.from({ length: 12 }, () => ({ x: rnd(-240, 240), z: rnd(-240, 240) }));
  const smooth = (a: number, b: number, x: number) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const h = (x: number, z: number) => {
    let y = noise(x, z);
    for (const s of sites) { const d = Math.hypot(x - s.x, z - s.z); if (d < 22) { const b = noise(s.x, s.z); y = b + (y - b) * smooth(14, 22, d); } }
    return y;
  };
  const ground = B.MeshBuilder.CreateGround("ground", { width: SIZE, height: SIZE, subdivisions: 160, updatable: true }, scene);
  {
    const p = ground.getVerticesData(B.VertexBuffer.PositionKind)!, col: number[] = [], nrm: number[] = [];
    for (let i = 0; i < p.length; i += 3) {
      const x = p[i], z = p[i + 2]; p[i + 1] = h(x, z);
      const j = (Math.sin(x * 0.9) + Math.cos(z * 1.3)) * 0.05;
      let r = 0.8 + j, g = 0.95 + j, b = 0.7 + j; // tint multiplied over the grass texture
      if (p[i + 1] > 7) { const t = clamp((p[i + 1] - 7) / 5, 0, 1); r = lerp(r, 0.85, t); g = lerp(g, 0.75, t); b = lerp(b, 0.62, t); }
      const dd = Math.min(...sites.map((s) => Math.hypot(x - s.x, z - s.z)));
      if (dd < 18) { const t = 1 - smooth(10, 18, dd); r = lerp(r, 0.95, t); g = lerp(g, 0.75, t); b = lerp(b, 0.5, t); }
      col.push(r, g, b, 1);
    }
    ground.updateVerticesData(B.VertexBuffer.PositionKind, p);
    B.VertexData.ComputeNormals(p, ground.getIndices()!, nrm);
    ground.updateVerticesData(B.VertexBuffer.NormalKind, nrm);
    ground.setVerticesData(B.VertexBuffer.ColorKind, col);
    const uv = ground.getVerticesData(B.VertexBuffer.UVKind)!, mix = new B.DynamicTexture("mix", 512, scene, true), mc = mix.getContext();
    mc.fillStyle = "#ff0000"; mc.fillRect(0, 0, 512, 512);
    for (let i = 0, n = 0; i < p.length; i += 3, n++) { // paint each vertex's weights: R grass, G dirt, B rock
      const x = p[i], y = p[i + 1], z = p[i + 2], slope = 1 - nrm[i + 1];
      const rock = clamp(smooth(0.1, 0.3, slope) + smooth(8, 12, y) * 0.6, 0, 1);
      const dd = Math.min(...sites.map((s) => Math.hypot(x - s.x, z - s.z)));
      let dirt = (1 - smooth(10, 20, dd)) + (y < -5 ? 0.9 : 0) + (Math.sin(x * 0.05) * Math.cos(z * 0.043) > 0.7 ? 0.5 : 0);
      dirt = clamp(dirt, 0, 1) * (1 - rock);
      const grass = Math.max(0, 1 - rock - dirt), sum = grass + dirt + rock || 1;
      mc.fillStyle = `rgb(${Math.round((grass / sum) * 255)},${Math.round((dirt / sum) * 255)},${Math.round((rock / sum) * 255)})`;
      mc.fillRect(uv[n * 2] * 512 - 2.5, (1 - uv[n * 2 + 1]) * 512 - 2.5, 5, 5);
    }
    mix.update();
    const tex = (u: string, sc: number) => { const t = new B.Texture(u, scene); t.uScale = t.vScale = sc; return t; };
    const gm = new TerrainMaterial("terrain", scene);
    gm.mixTexture = mix; gm.diffuseTexture1 = tex("/assets/grass_color.jpg", 110); gm.diffuseTexture2 = tex("/assets/ground_color.jpg", 70); gm.diffuseTexture3 = tex("/assets/rock_color.jpg", 50);
    gm.bumpTexture1 = tex("/assets/grass_normal.jpg", 110);
    gm.specularColor = B.Color3.Black(); ground.material = gm;
    ground.receiveShadows = true; ground.freezeWorldMatrix();
  }

  // ---------- obstacles ----------
  const circles: { x: number; z: number; r: number }[] = [];
  const boxes: { x0: number; x1: number; z0: number; z1: number }[] = [];
  const nearSite = (x: number, z: number, r: number) => sites.some((s) => Math.hypot(x - s.x, z - s.z) < r);

  // invisible hitbox masters: bullets / line-of-sight collide with these, the Kenney GLB models are only visuals
  const trunk = B.MeshBuilder.CreateCylinder("trunk", { height: 1, diameter: 1, tessellation: 8 }, scene); trunk.isVisible = false;
  const rockM = B.MeshBuilder.CreateIcoSphere("rock", { radius: 1, subdivisions: 1, flat: true }, scene); rockM.isVisible = false;

  // houses: 4 walls (door gap in south), roof; AABB collision
  const wallMat = new B.StandardMaterial("wall", scene); wallMat.diffuseTexture = new B.Texture("/assets/wood.jpg", scene); wallMat.specularColor = B.Color3.Black();
  const roofMat = mat("#7a3b2e");
  const texMat = (url: string, tile: number) => { const m = new B.StandardMaterial(url, scene), t = new B.Texture(url, scene); t.uScale = t.vScale = tile; m.diffuseTexture = t; m.specularColor = B.Color3.Black(); return m; };
  const yardMat = texMat("/assets/ground_color.jpg", 7), floorMat = texMat("/assets/rock_color.jpg", 3);
  const wallMeshes: B.Mesh[] = [];
  for (const s of sites) {
    const y0 = h(s.x, s.z);
    const wall = (cx: number, cz: number, w: number, d: number) => {
      const m = B.MeshBuilder.CreateBox("w", { width: w, height: 3, depth: d }, scene);
      m.position.set(s.x + cx, y0 + 1.5, s.z + cz); m.material = wallMat; m.metadata = { block: true }; m.receiveShadows = true;
      sg.addShadowCaster(m); wallMeshes.push(m);
      boxes.push({ x0: s.x + cx - w / 2, x1: s.x + cx + w / 2, z0: s.z + cz - d / 2, z1: s.z + cz + d / 2 });
    };
    wall(0, 5, 10.3, 0.3); wall(5, 0, 0.3, 10.3); wall(-5, 0, 0.3, 10.3);
    wall(-3.1, -5, 3.9, 0.3); wall(3.1, -5, 3.9, 0.3);
    const yard = B.MeshBuilder.CreateDisc("yard", { radius: 14, tessellation: 40, sideOrientation: B.Mesh.DOUBLESIDE }, scene);
    yard.rotation.x = Math.PI / 2; yard.position.set(s.x, y0 + 0.04, s.z); yard.material = yardMat; yard.isPickable = false; yard.receiveShadows = true;
    const floor = B.MeshBuilder.CreateBox("floor", { width: 10, height: 0.1, depth: 10 }, scene);
    floor.position.set(s.x, y0 + 0.05, s.z); floor.material = floorMat; floor.isPickable = false; floor.receiveShadows = true;
    const roof = B.MeshBuilder.CreateBox("roof", { width: 11, height: 0.3, depth: 11 }, scene);
    roof.position.set(s.x, y0 + 3.15, s.z); roof.material = roofMat; roof.metadata = { block: true }; sg.addShadowCaster(roof);
  }

  // lakes: water plane sitting in the low spots of the terrain
  const WATER = -6.5;
  const water = B.MeshBuilder.CreateGround("water", { width: SIZE, height: SIZE }, scene);
  { const m = new B.StandardMaterial("wm", scene); m.diffuseColor = new B.Color3(0.15, 0.4, 0.5); m.specularColor = new B.Color3(0.25, 0.25, 0.25); m.specularPower = 96; m.alpha = 0.72; water.material = m; }
  water.position.y = WATER; water.isPickable = false;
  // cars: parked cover until you press E next to one, then you can drive it
  const cars: Car[] = [];
  for (let i = 0; i < 14; i++) {
    const x = rnd(-HALF + 20, HALF - 20), z = rnd(-HALF + 20, HALF - 20), y = h(x, z), ry = rnd(0, 6.28);
    if (nearSite(x, z, 24) || y < WATER + 1) continue;
    const car = new B.TransformNode("car", scene); car.position.set(x, y, z); car.rotation.y = ry;
    const part = (m: B.Mesh, px: number, py: number, pz: number, blk: boolean) => { m.parent = car; m.position.set(px, py, pz); sg.addShadowCaster(m); if (blk) m.metadata = { block: true }; return m; };
    part(box(1.9, 0.7, 4.2, ["#8b1e1e", "#1e3f8b", "#d8d8d8", "#2d2d2d", "#c9a227"][i % 5]), 0, 0.7, 0, true);
    part(box(1.6, 0.6, 2.0, "#1b232b"), 0, 1.35, -0.2, true);
    for (const [wx, wz] of [[-0.95, 1.3], [0.95, 1.3], [-0.95, -1.3], [0.95, -1.3]]) {
      const w = B.MeshBuilder.CreateCylinder("wh", { height: 0.3, diameter: 0.7, tessellation: 12 }, scene); w.rotation.z = Math.PI / 2; w.material = mat("#111111"); part(w, wx, 0.35, wz, false).isPickable = false;
    }
    const cs = [-1.3, 0, 1.3].map((k) => ({ x: x + Math.sin(ry) * k, z: z + Math.cos(ry) * k, r: 1.1 }));
    circles.push(...cs); cars.push({ node: car, x, z, ry, speed: 0, cs });
  }

  // Kenney Nature Kit (CC0) GLBs, placed as instances; hitboxes are separate invisible meshes
  interface Model { c: B.AssetContainer; H: number; minY: number }
  async function loadModels(names: string[]) {
    const out: Model[] = [];
    for (const n of names) {
      try {
        const c = await B.SceneLoader.LoadAssetContainerAsync("/assets/nature/", n + ".glb", scene);
        c.addAllToScene();
        const root = c.meshes[0] as B.TransformNode, { min, max } = root.getHierarchyBoundingVectors(true);
        root.position.y = -1000; // the originals live underground; only instances are seen
        c.meshes.forEach((m) => { m.isPickable = false; sg.addShadowCaster(m); });
        out.push({ c, H: max.y - min.y, minY: min.y });
      } catch (e) { console.warn("missing model", n); }
    }
    return out;
  }
  let nid = 0;
  function put(m: Model, x: number, z: number, height: number) {
    const sc = height / m.H, y = h(x, z), inst = m.c.instantiateModelsToScene((n) => n + "_" + nid++, false), root = inst.rootNodes[0] as B.TransformNode;
    const holder = new B.TransformNode("prop", scene); root.parent = holder; root.position.set(0, -m.minY, 0);
    holder.scaling.setAll(sc); holder.position.set(x, y - 0.1, z); holder.rotation.y = rnd(0, 6.28);
    root.getChildMeshes().forEach((c) => { c.isPickable = false; c.receiveShadows = true; });
    return { x, y, sc };
  }
  async function populate() {
    const trees = await loadModels(["tree_pineTallA", "tree_pineTallB", "tree_pineTallC", "tree_pineTallD", "tree_pineDefaultA", "tree_pineDefaultB", "tree_pineRoundA", "tree_tall", "tree_simple"]);
    const rocks = await loadModels(["rock_largeA", "rock_largeB", "rock_largeC", "rock_tallA", "rock_tallB", "rock_tallC", "stone_largeA", "stone_largeB"]);
    const bushes = await loadModels(["plant_bush", "plant_bushLarge", "plant_bushSmall", "plant_bushDetailed"]);
    const grass = await loadModels(["grass", "grass_large", "grass_leafs"]);
    const flowers = await loadModels(["flower_redA", "flower_yellowA", "flower_purpleA", "mushroom_red"]);
    const stumps = await loadModels(["stump_old"]);
    const props = await loadModels(["tent_detailedClosed", "tent_smallOpen", "log_large", "log_stack", "campfire_logs"]);
    if (disposed) return;
    const spot = (avoid: number) => { for (;;) { const x = rnd(-HALF + 6, HALF - 6), z = rnd(-HALF + 6, HALF - 6); if (!nearSite(x, z, avoid) && h(x, z) > WATER + 0.4) return [x, z]; } };
    const hit = (kind: "tree" | "rock", x: number, y: number, z: number, H: number) => {
      const t = (kind === "tree" ? trunk : rockM).createInstance("hb" + nid++); t.isVisible = false; t.metadata = { block: true };
      if (kind === "tree") { t.scaling.set(0.9, H * 0.7, 0.9); t.position.set(x, y + H * 0.35, z); circles.push({ x, z, r: 0.5 }); }
      else { t.scaling.set(H * 0.7, H * 0.5, H * 0.7); t.position.set(x, y + H * 0.4, z); circles.push({ x, z, r: H * 0.7 }); }
    };
    if (trees.length) for (let i = 0; i < 380; i++) { const [x, z] = spot(26), H = rnd(7, 13), o = put(trees[i % trees.length], x, z, H); hit("tree", x, o.y, z, H); }
    if (rocks.length) for (let i = 0; i < 90; i++) { const [x, z] = spot(22), H = rnd(1.2, 3.2), o = put(rocks[i % rocks.length], x, z, H); hit("rock", x, o.y, z, H); }
    if (bushes.length) for (let i = 0; i < 260; i++) { const [x, z] = spot(14); put(bushes[i % bushes.length], x, z, rnd(0.8, 1.6)); }
    if (grass.length) for (let i = 0; i < 900; i++) { const [x, z] = spot(12); put(grass[i % grass.length], x, z, rnd(0.5, 1.1)); }
    if (flowers.length) for (let i = 0; i < 280; i++) { const [x, z] = spot(12); put(flowers[i % flowers.length], x, z, rnd(0.3, 0.55)); }
    if (stumps.length) for (let i = 0; i < 24; i++) { const [x, z] = spot(20), H = rnd(0.7, 1.1), o = put(stumps[0], x, z, H); hit("rock", x, o.y, z, H); }
    if (props.length) for (const s of sites) { // a tent + firewood next to every house
      const a = rnd(0, 6.28), x = s.x + Math.cos(a) * 17, z = s.z + Math.sin(a) * 17, H = 2.4, o = put(props[Math.floor(rnd(0, 2))], x, z, H); hit("rock", x, o.y, z, H);
      put(props[2 + Math.floor(rnd(0, 3))], x + rnd(-4, 4), z + rnd(-4, 4), 1.1);
    }
  }

  function collide(p: B.Vector3, r: number) {
    for (const c of circles) {
      const dx = p.x - c.x, dz = p.z - c.z, rr = r + c.r, d2 = dx * dx + dz * dz;
      if (d2 < rr * rr && d2 > 1e-6) { const d = Math.sqrt(d2); p.x = c.x + (dx / d) * rr; p.z = c.z + (dz / d) * rr; }
    }
    for (const a of boxes) {
      const cx = clamp(p.x, a.x0, a.x1), cz = clamp(p.z, a.z0, a.z1), dx = p.x - cx, dz = p.z - cz, d2 = dx * dx + dz * dz;
      if (d2 >= r * r) continue;
      if (d2 > 1e-6) { const d = Math.sqrt(d2); p.x = cx + (dx / d) * r; p.z = cz + (dz / d) * r; }
      else {
        const m = [p.x - a.x0, a.x1 - p.x, p.z - a.z0, a.z1 - p.z], i = m.indexOf(Math.min(...m));
        if (i === 0) p.x = a.x0 - r; else if (i === 1) p.x = a.x1 + r; else if (i === 2) p.z = a.z0 - r; else p.z = a.z1 + r;
      }
    }
    p.x = clamp(p.x, -HALF + 2, HALF - 2); p.z = clamp(p.z, -HALF + 2, HALF - 2);
  }

  // ---------- player ----------
  // plane flies a random line across the map; camera rides behind it until the player jumps
  const PLANE_YAW = 0; // ponytail: model-forward offset, tune after a visual check
  const BOTS = 3; // ponytail: raise for a full match (24 was the original)
  const ALT = 280, PSPEED = 45, pa = rnd(0, 6.28), pd = new V(Math.cos(pa), 0, Math.sin(pa)), pc = rnd(-80, 80);
  const P0 = new V(-pd.x * 380 - pd.z * pc, ALT, -pd.z * 380 + pd.x * pc), P1 = new V(pd.x * 380 - pd.z * pc, ALT, pd.z * 380 + pd.x * pc);
  const planeLen = V.Distance(P0, P1);
  const cam = new B.FreeCamera("cam", new V(P0.x - pd.x * 16, ALT + 5, P0.z - pd.z * 16), scene);
  cam.inputs.clear(); cam.minZ = 0.05; cam.maxZ = 900; cam.fov = 1.1; cam.rotation.set(0.25, Math.atan2(pd.x, pd.z), 0);
  const view = new B.FreeCamera("view", cam.position.clone(), scene); // what you actually see: FPP = cam, TPP = orbit behind
  view.inputs.clear(); view.minZ = 0.05; view.maxZ = 900; view.fov = 1.1;
  scene.activeCamera = view;
  scene.setRenderingAutoClearDepthStencil(1, true);
  scene.imageProcessingConfiguration.toneMappingEnabled = true;
  scene.imageProcessingConfiguration.contrast = 1.2; scene.imageProcessingConfiguration.exposure = 1.05;
  scene.imageProcessingConfiguration.toneMappingType = B.ImageProcessingConfiguration.TONEMAPPING_ACES;
  { const cc = new B.ColorCurves(); cc.globalSaturation = 6; cc.highlightsHue = 40; cc.highlightsDensity = 12; cc.shadowsHue = 215; cc.shadowsDensity = 8; scene.imageProcessingConfiguration.colorCurves = cc; scene.imageProcessingConfiguration.colorCurvesEnabled = true; }
  const pipe = new B.DefaultRenderingPipeline("pipe", true, scene, [view]);
  pipe.samples = 4; pipe.bloomEnabled = true; pipe.bloomThreshold = 0.85; pipe.bloomWeight = 0.3;
  pipe.sharpenEnabled = true; pipe.sharpen.edgeAmount = 0.25;
  pipe.grainEnabled = true; pipe.grain.intensity = 5; pipe.grain.animated = true;
  pipe.imageProcessing.vignetteEnabled = true; pipe.imageProcessing.vignetteWeight = 1.8; pipe.imageProcessing.vignetteColor = new B.Color4(0, 0, 0, 0);
  try { // screen-space ambient occlusion: contact shadows under trees, walls, props
    const ssao = new B.SSAO2RenderingPipeline("ssao", scene, { ssaoRatio: 0.5, blurRatio: 1 }, [view]);
    ssao.radius = 2.2; ssao.totalStrength = 1.1; ssao.expensiveBlur = false; ssao.samples = 12; ssao.maxZ = 150;
  } catch (e) { console.warn("SSAO unavailable", e); }

  let phase: Hud["phase"] = "plane", planeT = 0, hvx = 0, hvz = 0, disposed = false;
  let hp = 100, armor = 0, boost = 0, kills = 0, vy = 0, grounded = true, eyeH = 1.7, over: Hud["over"] = "";
  let curSpeed = 0, driving: Car | null = null, carHum: { s: AudioBufferSourceNode; g: GainNode } | null = null;
  let stepD = 0, hum: { s: AudioBufferSourceNode; g: GainNode } | null = null;
  let fpp = false, locked = false, ads = false, trigger = false, triggerHeld = false, fireCd = 0, flashT = 0, kick = 0, bob = 0;
  let prevW: WId | null = null, swapT = 0, reloadMax = 1, dryAt = 0;
  let cur: WId | null = null, reloadT = 0, busyKind = "", busyT = 0, busyDur = 1, hurtAt = 0, hurtAngle = 0, hitAt = 0;
  const owned: Partial<Record<WId, { mag: number }>> = {};
  const ammo: Record<string, number> = { "9mm": 0, "5.56": 0, "12g": 0, "7.62": 0 };
  const items = { bandage: 0, medkit: 0, drink: 0, grenade: 0 };
  let helmet = 0, pack = false, fullAt = 0;
  const feed: { t: number; s: string }[] = [];
  const log = (s: string) => feed.push({ t: Date.now(), s });
  const K: Record<string, boolean> = {};
  const keysDown = () => K.KeyW || K.KeyA || K.KeyS || K.KeyD;

  // gun model, used for the first-person viewmodel (group 1, with hands) and the third-person/bot guns (group 0)
  const GUN_YAW = 0; // ponytail: flip to Math.PI if the shotgun model points backwards
  function buildGun(id: WId, parent: B.Node, group: number, hands: boolean) {
    const w = WEAPONS[id], L = w.len, root = new B.TransformNode("gun", scene), anims: B.AnimationGroup[] = []; root.parent = parent;
    const real = id === "shotgun" && !!gunAsset;
    const fin = <T extends B.Mesh>(m: T) => { m.parent = root; m.renderingGroupId = group; m.isPickable = false; if (group === 0) sg.addShadowCaster(m); return m; };
    const part = (wd: number, ht: number, d: number, x: number, y: number, z: number, c: string) => { const b = fin(box(wd, ht, d, c)); b.position.set(x, y, z); return b; };
    const cyl = (dia: number, len: number, x: number, y: number, z: number, c: string) => {
      const b = fin(B.MeshBuilder.CreateCylinder("cy", { diameter: dia, height: len, tessellation: 10 }, scene)); b.rotation.x = Math.PI / 2; b.position.set(x, y, z); b.material = mat(c); return b;
    };
    const metal = "#1c1c1e", wood = "#5b3b22", k = LOOK[id] ?? id;
    if (k === "pistol") {
      part(0.04, 0.05, L, 0, 0.03, L / 2, "#2a2a2c"); part(0.035, 0.04, L * 0.8, 0, -0.01, L * 0.45, metal);
      part(0.04, 0.11, 0.05, 0, -0.08, 0.05, "#1a1a1a"); part(0.012, 0.015, 0.012, 0, 0.06, L, "#ddd");
      if (id === "revolver") { cyl(0.07, 0.09, 0, 0.02, L * 0.35, "#444"); cyl(0.022, L * 0.5, 0, 0.03, L * 0.85, metal); }
      if (id === "deagle") part(0.045, 0.06, L, 0, 0.035, L / 2, "#bdbdbd");
    } else {
      part(0.06, 0.09, L * 0.5, 0, 0, L * 0.3, w.color); part(0.05, 0.1, 0.06, 0, -0.09, 0.08, "#1a1a1a");
      if (k === "ar") {
        part(0.058, 0.065, L * 0.35, 0, 0, L * 0.78, "#2a2a2c"); cyl(0.02, L * 0.25, 0, 0.01, L * 1.05, metal);
        part(0.035, 0.14, 0.06, 0, -0.1, L * 0.35, "#161616").rotation.x = -0.18;
        part(0.05, 0.09, 0.22, 0, -0.01, -0.1, "#222"); part(0.045, 0.045, 0.06, 0, 0.075, L * 0.3, "#0d0d0d"); part(0.012, 0.012, 0.01, 0, 0.078, L * 0.3 + 0.03, "#ff2020").material = mat("#ff2020", true);
        part(0.012, 0.03, 0.012, 0, 0.055, L * 1.12, "#333");
        if (id === "m249") { part(0.14, 0.14, 0.16, 0, -0.14, L * 0.4, "#2c3a2c"); part(0.02, 0.2, 0.02, 0.03, -0.1, L * 1.05, "#222"); }
        if (id === "aug") part(0.05, 0.05, 0.14, 0, 0.08, L * 0.3, "#111");
      } else if (k === "smg") {
        cyl(0.018, L * 0.25, 0, 0.01, L * 0.95, metal); part(0.03, 0.17, 0.045, 0, -0.12, L * 0.5, "#161616");
        part(0.04, 0.05, 0.16, 0, 0, -0.06, "#222"); part(0.03, 0.03, 0.04, 0, 0.055, L * 0.35, "#0d0d0d");
        if (id === "tommy") { part(0.1, 0.1, 0.1, 0, -0.14, L * 0.45, "#2a2a2a"); part(0.04, 0.05, 0.14, 0, 0, L * 0.9, wood); }
        if (id === "vector") part(0.03, 0.08, 0.03, 0, -0.07, L * 0.85, "#222");
      } else if (k === "akm" || k === "dmr") {
        const wd = "#6b4423";
        part(0.06, 0.055, L * 0.28, 0, -0.005, L * 0.85, wd); cyl(0.02, L * 0.3, 0, 0.012, L * 1.1, metal);
        part(0.04, 0.16, 0.07, 0, -0.1, L * 0.4, "#2a2a2a").rotation.x = k === "akm" ? -0.35 : -0.1;
        part(0.05, 0.1, 0.24, 0, -0.01, -0.12, wd); part(0.012, 0.03, 0.012, 0, 0.055, L * 1.18, "#333");
        if (k === "dmr") cyl(0.035, 0.22, 0, 0.075, L * 0.35, "#0c0c0c");
        if (id === "slr") part(0.02, 0.02, 0.2, 0, -0.01, L * 1.2, "#222");
      } else if (real) { // CC0 "lightning" pump-action model from OpenGameArt, ~1 m long
        const inst = gunAsset!.instantiateModelsToScene((n) => n + "_" + nid++, true), holder = new B.TransformNode("gh", scene);
        (inst.rootNodes[0] as B.TransformNode).parent = holder; holder.parent = root;
        holder.scaling.setAll(0.85); holder.position.set(0, 0.04, 0.1); holder.rotation.y = GUN_YAW;
        holder.getChildMeshes().forEach((m) => { m.renderingGroupId = group; m.isPickable = false; m.alwaysSelectAsActiveMesh = true; if (group === 0) sg.addShadowCaster(m); });
        inst.animationGroups.forEach((g) => { g.stop(); anims.push(g); });
      } else if (k === "shotgun") {
        if (id === "s686") { cyl(0.03, L * 0.95, -0.022, 0.02, L * 0.65, metal); cyl(0.03, L * 0.95, 0.022, 0.02, L * 0.65, metal); part(0.04, 0.04, 0.2, 0, -0.03, L * 0.5, wood); }
        else { cyl(0.03, L * 0.9, 0, 0.02, L * 0.62, metal); cyl(0.026, L * 0.6, 0, -0.025, L * 0.55, "#333"); part(0.05, 0.045, 0.22, 0, -0.03, L * 0.5, wood); }
        part(0.05, 0.1, 0.26, 0, -0.01, -0.12, wood);
      } else { // sniper / AWM
        cyl(0.022, L * 0.75, 0, 0.015, L * 0.85, metal); cyl(0.04, 0.3, 0, 0.085, L * 0.35, "#0c0c0c");
        cyl(0.052, 0.04, 0, 0.085, L * 0.35 + 0.17, "#111"); cyl(0.052, 0.04, 0, 0.085, L * 0.35 - 0.17, "#111");
        part(0.05, 0.1, 0.3, 0, -0.01, -0.14, id === "awm" ? "#2f3a2f" : wood); part(0.03, 0.03, 0.03, 0.045, 0.02, 0.12, metal);
        if (id === "awm") { part(0.02, 0.12, 0.02, -0.03, -0.1, L * 0.9, "#222"); part(0.02, 0.12, 0.02, 0.03, -0.1, L * 0.9, "#222"); }
      }
    }
    if (hands) {
      part(0.06, 0.06, 0.1, 0, -0.1, L * 0.65, "#d9a679"); part(0.06, 0.07, 0.08, 0, -0.14, 0.08, "#d9a679");
      part(0.07, 0.07, 0.3, 0.02, -0.14, -0.1, "#3d4a32"); part(0.07, 0.07, 0.3, -0.02, -0.12, L * 0.4, "#3d4a32");
    }
    const flash = fin(B.MeshBuilder.CreatePlane("fl", { size: 0.35 }, scene));
    flash.position.set(0, 0.02, real ? 0.62 : L * 1.25); flash.billboardMode = B.Mesh.BILLBOARDMODE_ALL; flash.material = mat("#ffd24a", true); flash.setEnabled(false);
    return { root, flash, anims };
  }
  // first-person viewmodel + third-person gun in the player's hands
  type Gun = { root: B.TransformNode; flash: B.Mesh; anims: B.AnimationGroup[] };
  let vm: Gun | null = null, tg: Gun | null = null;
  const playGun = (n: string) => { for (const o of [vm, tg]) o?.anims.find((g) => g.name.toLowerCase().startsWith(n))?.start(false); };
  let pRoot: B.TransformNode | null = null, pGun: B.TransformNode | null = null, pAnims: Anims | null = null, pGear: Gear | null = null, pKind: Kind = "xbot";
  function buildVM() {
    vm?.root.dispose(); tg?.root.dispose(); vm = tg = null;
    if (!cur) return;
    vm = buildGun(cur, view, 1, true);
    if (pGun) tg = buildGun(cur, pGun, 0, false);
  }
  function equip(id: WId | null) {
    if (id === cur) return;
    prevW = cur; cur = id; reloadT = 0; swapT = 0.4; fireCd = Math.max(fireCd, 0.4); buildVM(); play("equip", 0.4);
  }
  function cycleWeapon(dir: number) {
    const list: (WId | null)[] = [null, ...SLOTS.filter((w) => owned[w])];
    if (list.length > 1 && !busyKind) equip(list[(list.indexOf(cur) + dir + list.length) % list.length]);
  }
  function beginReload(t: number) { reloadT = reloadMax = t; boom(0.18, 2500, 0.05); } // mag-out click

  // ---------- loot ----------
  interface Loot { id: string; root: B.TransformNode; x: number; z: number; y: number }
  const loots: Loot[] = [];
  // real-looking pickups: guns are the gun models, ammo is cartridges, plus medkit / bandage / drink can / armor vest
  function lootVisual(id: string, root: B.TransformNode) {
    if (id in WEAPONS) {
      const g = buildGun(id as WId, root, 0, false); g.root.scaling.setAll(1.0); g.root.rotation.z = Math.PI / 2; g.root.position.set(0, 0.06, -WEAPONS[id as WId].len * 0.5); return; // gun lying on its side
    }
    const hold = new B.TransformNode("it", scene); hold.parent = root; hold.scaling.setAll(1.1); hold.position.y = 0.1;
    const add = (m: B.Mesh, c: string, x = 0, y = 0, z = 0) => { m.parent = hold; m.position.set(x, y, z); m.material = mat(c); m.isPickable = false; sg.addShadowCaster(m); return m; };
    const bx = (w: number, h: number, d: number, c: string, x = 0, y = 0, z = 0) => add(B.MeshBuilder.CreateBox("i", { width: w, height: h, depth: d }, scene), c, x, y, z);
    const cy = (dia: number, h: number, c: string, x = 0, y = 0, z = 0, top = dia) => add(B.MeshBuilder.CreateCylinder("i", { diameterBottom: dia, diameterTop: top, height: h, tessellation: 14 }, scene), c, x, y, z);
    if (id.startsWith("a:")) { // tray of upright cartridges
      const t = id.slice(2), shell = t === "12g", len = { "9mm": 0.1, "5.56": 0.17, "12g": 0.15, "7.62": 0.22 }[t] ?? 0.15, dia = shell ? 0.085 : t === "9mm" ? 0.055 : 0.05;
      bx(0.36, 0.04, 0.24, "#3b4630", 0, -0.02);
      for (let k = 0; k < 6; k++) {
        const x = (k % 3 - 1) * 0.11, z = (Math.floor(k / 3) - 0.5) * 0.11;
        if (shell) { cy(dia, len * 0.8, "#c0392b", x, len * 0.4, z); cy(dia * 1.05, 0.04, "#c9a227", x, 0.02, z); }
        else { cy(dia, len * 0.62, "#c9a227", x, len * 0.31, z); cy(dia, len * 0.38, "#8a5a2b", x, len * 0.62 + len * 0.19, z, 0.01); }
      }
    } else if (id === "medkit") {
      bx(0.38, 0.25, 0.15, "#f2f2f2"); bx(0.22, 0.06, 0.155, "#d62828", 0, 0, 0); bx(0.06, 0.2, 0.155, "#d62828", 0, 0, 0);
      bx(0.18, 0.035, 0.035, "#333333", 0, 0.14, 0); bx(0.38, 0.02, 0.152, "#bbbbbb", 0, -0.12, 0);
    } else if (id === "bandage") {
      cy(0.17, 0.1, "#f4efe6", 0, 0, 0); cy(0.172, 0.035, "#d62828", 0, 0, 0); cy(0.11, 0.1, "#f4efe6", 0.17, -0.0, 0.05);
      bx(0.14, 0.012, 0.05, "#f4efe6", -0.02, -0.05, 0.14);
    } else if (id === "drink") {
      cy(0.1, 0.24, "#c8ccd0", 0, 0, 0); cy(0.103, 0.1, "#ff2fd0", 0, 0, 0); cy(0.085, 0.012, "#8a8e92", 0, 0.126, 0); cy(0.105, 0.012, "#8a8e92", 0, -0.126, 0);
      bx(0.03, 0.07, 0.01, "#ffe14d", 0, 0.01, 0.052);
    } else if (id === "grenade") {
      add(B.MeshBuilder.CreateSphere("i", { diameter: 0.2, segments: 10 }, scene), "#4a5d2a", 0, 0, 0);
      cy(0.07, 0.05, "#8a8a8a", 0, 0.12, 0); bx(0.02, 0.03, 0.12, "#8a8a8a", 0.03, 0.15, 0); cy(0.1, 0.012, "#c9a227", 0, 0.1, 0);
    } else if (id === "helmet") {
      add(B.MeshBuilder.CreateSphere("i", { diameter: 0.34, slice: 0.6, segments: 12, sideOrientation: B.Mesh.DOUBLESIDE }, scene), "#5a6b3d", 0, 0, 0);
      cy(0.36, 0.015, "#3d4a2a", 0, -0.045, 0); bx(0.1, 0.03, 0.05, "#2a2a2a", 0, 0.03, 0.17);
    } else if (id === "backpack") {
      bx(0.34, 0.44, 0.2, "#7a5a32"); bx(0.28, 0.14, 0.08, "#5e4426", 0, -0.1, 0.13); bx(0.3, 0.1, 0.21, "#8b6a3d", 0, 0.18, 0);
      bx(0.05, 0.4, 0.04, "#2a2a2a", -0.1, 0, -0.12); bx(0.05, 0.4, 0.04, "#2a2a2a", 0.1, 0, -0.12);
    } else { // vest
      bx(0.42, 0.46, 0.14, "#4a5d3a"); bx(0.3, 0.32, 0.02, "#2a2a2a", 0, 0.02, 0.08);
      bx(0.07, 0.12, 0.16, "#3a4a2c", -0.15, 0.27, 0); bx(0.07, 0.12, 0.16, "#3a4a2c", 0.15, 0.27, 0);
      for (const x of [-0.12, 0, 0.12]) bx(0.1, 0.09, 0.05, "#3a4a2c", x, -0.12, 0.1);
    }
  }
  function spawnLoot(id: string, x: number, z: number) {
    const def = LOOT[id], y = h(x, z), root = new B.TransformNode("loot", scene);
    root.position.set(x, y + 0.07, z); root.rotation.y = rnd(0, 6.28); // just lies there, no beam / no spinning
    lootVisual(id, root);
    loots.push({ id, root, x, z, y });
  }
  function seedLoot() { // called once the models are loaded, so guns use the real meshes
    for (const s of sites) {
      for (let i = 0; i < 6; i++) spawnLoot(roll(), s.x + rnd(-4, 4), s.z + rnd(-4, 3.5));
      for (let i = 0; i < 2; i++) spawnLoot(roll(), s.x + rnd(-12, 12), s.z + rnd(-12, 12));
    }
    for (let i = 0; i < 40; i++) spawnLoot(roll(), rnd(-HALF + 10, HALF - 10), rnd(-HALF + 10, HALF - 10));
  }
  const flying: { root: B.TransformNode; t: number; from: B.Vector3 }[] = [];
  function takeAway(l: Loot) { // the item flies into your hand, then disappears
    const i = loots.indexOf(l); if (i >= 0) loots.splice(i, 1);
    flying.push({ root: l.root, t: 0, from: l.root.position.clone() });
  }
  function updateFlying(dt: number) {
    for (let i = flying.length - 1; i >= 0; i--) {
      const f = flying[i]; f.t += dt / 0.3;
      const hand = cam.position.add(fwdVec().scale(0.55)).add(rightVec().scale(0.22)).add(new V(0, -0.45, 0)), e = Math.min(1, f.t), k = e * e * (3 - 2 * e);
      f.root.position = V.Lerp(f.from, hand, k); f.root.scaling.setAll(1 - 0.75 * k);
      if (f.t >= 1) { f.root.dispose(); flying.splice(i, 1); }
    }
  }
  let autoAll = false, nearL: Loot | null = null;
  const hl = new B.HighlightLayer("hl", scene); hl.innerGlow = false; hl.blurHorizontalSize = hl.blurVerticalSize = 0.7;
  const nearestLoot = () => {
    let best: Loot | null = null, bd = 2.8;
    for (const l of loots) { const d = Math.hypot(l.x - cam.position.x, l.z - cam.position.z); if (d < bd) { bd = d; best = l; } }
    return best;
  };
  function glowOn(l: Loot | null) { // yellow outline on the item you would grab
    if (l === nearL) return;
    try {
      if (nearL) nearL.root.getChildMeshes().forEach((m) => hl.removeMesh(m as B.Mesh));
      if (l) l.root.getChildMeshes().forEach((m) => hl.addMesh(m as B.Mesh, new B.Color3(1, 0.85, 0.2)));
    } catch { /* highlight is cosmetic */ }
    nearL = l;
  }

  function pickup(l: Loot) {
    if (l.id in WEAPONS) {
      const w = l.id as WId;
      if (!owned[w]) { owned[w] = { mag: WEAPONS[w].mag }; if (!cur) equip(w); }
      else ammo[WEAPONS[w].ammo] += WEAPONS[w].mag;
    } else if (l.id.startsWith("a:")) { ammo[l.id.slice(2)] += AMMO_PACK[l.id.slice(2)]; }
    else if (l.id === "vest") armor = 100;
    else if (l.id === "helmet") helmet = 80;
    else if (l.id === "backpack") { pack = true; log("Backpack: carry limit is now 10 per item"); }
    else {
      const k = l.id as keyof typeof items;
      if (items[k] >= (pack ? 10 : 4)) { if (Date.now() - fullAt > 2500) { fullAt = Date.now(); log("Can't carry more — find a backpack"); } return; }
      items[k]++;
    }
    if (!play("pickup", 0.5)) boom(0.12, 2500, 0.05);
    log(`Picked up ${LOOT[l.id].label}`); takeAway(l);
    if (cur && owned[cur]!.mag === 0) startReload();
  }

  // ---------- bots ----------
  const bots: Bot[] = [];
  let gunAsset: B.AssetContainer | null = null;
  const CHAR_FILES: Record<Kind, string> = { xbot: "Xbot.glb", soldier: "Soldier.glb", cesium: "CesiumMan.glb" };
  const models: Partial<Record<Kind, B.AssetContainer>> = {}, faceOf: Partial<Record<Kind, number>> = {};
  const hasOwnGear = (k: Kind) => k === "soldier"; // the soldier model already wears a helmet, vest and pack
  const boneBase = (n: B.Node, tag: string) => n.name.slice(0, -(tag.length + 1)).replace(/^.*mixamorig:?/, "");
  function fit(node: B.TransformNode, height: number) { // wrap a loaded model in a holder scaled to `height`, feet at y=0
    const { min, max } = node.getHierarchyBoundingVectors(true), s = height / (max.y - min.y);
    const holder = new B.TransformNode("holder", scene); node.parent = holder; holder.scaling.setAll(s);
    node.position.y -= min.y; // ponytail: assumes model is centred on x/z
    return holder;
  }
  const fwdVec = () => { const y = cam.rotation.y, x = cam.rotation.x; return new V(Math.sin(y) * Math.cos(x), -Math.sin(x), Math.cos(y) * Math.cos(x)); };
  const rightVec = () => new V(Math.cos(cam.rotation.y), 0, -Math.sin(cam.rotation.y));
  // Outfit pieces worn on top of the plain mannequin body. They can be switched on/off at any time, so picked-up gear shows on the character.
  interface Gear { helmet: B.TransformNode; vest: B.TransformNode; pack: B.TransformNode }
  function makeGear(root: B.TransformNode, color: string): Gear {
    const grp = (n: string) => { const t = new B.TransformNode(n, scene); t.parent = root; return t; };
    const put = (g: B.TransformNode, m: B.Mesh, c: string, x: number, y: number, z: number) => { m.parent = g; m.position.set(x, y, z); m.material = mat(c); m.isPickable = false; sg.addShadowCaster(m); return m; };
    const bx = (g: B.TransformNode, w: number, h2: number, d: number, c: string, x: number, y: number, z: number) => put(g, B.MeshBuilder.CreateBox("g", { width: w, height: h2, depth: d }, scene), c, x, y, z);
    const helmet = grp("helmet"), vest = grp("vest"), pack = grp("pack");
    put(helmet, B.MeshBuilder.CreateSphere("g", { diameter: 0.4, slice: 0.62, segments: 12, sideOrientation: B.Mesh.DOUBLESIDE }, scene), color, 0, 1.64, 0.01);
    bx(helmet, 0.42, 0.02, 0.42, "#2a3022", 0, 1.64, 0.01); bx(helmet, 0.16, 0.06, 0.05, "#1a1a1a", 0, 1.69, 0.2); // brim + goggles
    bx(vest, 0.47, 0.46, 0.27, color, 0, 1.28, 0.02); bx(vest, 0.3, 0.3, 0.03, "#262626", 0, 1.3, 0.16); bx(vest, 0.3, 0.3, 0.03, "#262626", 0, 1.3, -0.12);
    bx(vest, 0.09, 0.14, 0.3, color, -0.17, 1.5, 0.02); bx(vest, 0.09, 0.14, 0.3, color, 0.17, 1.5, 0.02);
    for (const x of [-0.13, 0, 0.13]) bx(vest, 0.1, 0.1, 0.06, "#323a28", x, 1.1, 0.18);
    bx(pack, 0.38, 0.5, 0.24, "#7a5a32", 0, 1.3, -0.3); bx(pack, 0.32, 0.16, 0.1, "#5e4426", 0, 1.16, -0.46); bx(pack, 0.34, 0.1, 0.26, "#8b6a3d", 0, 1.58, -0.3);
    bx(pack, 0.05, 0.42, 0.05, "#2a2a2a", -0.13, 1.3, -0.15); bx(pack, 0.05, 0.42, 0.05, "#2a2a2a", 0.13, 1.3, -0.15);
    helmet.setEnabled(false); vest.setEnabled(false); pack.setEnabled(false);
    return { helmet, vest, pack };
  }
  const TINTS = ["#9aa66f", "#b59f6a", "#7d8da0", "#a86b6b", "#8a8a8a", "#6f9a8a"];
  const CAMO = ["#e0d3ad", "#b5c18f", "#a9aeb0", "#d6d6d6", "#9a9c86", "#c9b48a"]; // multiplied over the soldier's own colours
  function detectFace(kind: Kind, holder: B.TransformNode, root: B.TransformNode, tag: string) { // which way do the toes point? (measured, not guessed)
    let face = Math.PI; // non-Mixamo models (CesiumMan) need the flip
    try {
      holder.rotation.y = 0; root.computeWorldMatrix(true); holder.computeWorldMatrix(true);
      holder.getChildTransformNodes(false).forEach((n) => n.computeWorldMatrix(true));
      const find = (k: string) => scene.transformNodes.find((n) => n.name.endsWith("_" + tag) && boneBase(n, tag) === k);
      const foot = find("LeftFoot"), toe = find("LeftToeBase");
      if (foot && toe) { const inv = root.getWorldMatrix().clone().invert(); face = V.TransformCoordinates(toe.getAbsolutePosition(), inv).z - V.TransformCoordinates(foot.getAbsolutePosition(), inv).z >= 0 ? 0 : Math.PI; }
    } catch { /* keep the default */ }
    faceOf[kind] = face; return face;
  }
  function spawnModel(root: B.TransformNode, tag: string, tint: string, kind: Kind, height = 1.8, gearColor = tint) {
    const inst = models[kind]!.instantiateModelsToScene((n) => n + "_" + tag, true);
    const holder = fit(inst.rootNodes[0] as B.TransformNode, height);
    holder.parent = root; holder.rotation.y = faceOf[kind] ?? detectFace(kind, holder, root, tag);
    const col = B.Color3.FromHexString(tint);
    holder.getChildMeshes().forEach((m) => {
      m.isPickable = false; sg.addShadowCaster(m);
      const mt = m.material as B.PBRMaterial | null; if (mt && "albedoColor" in mt) mt.albedoColor = col; // outfit colour
    });
    const anims = pickAnims(inst.animationGroups); setAnim(anims, "idle");
    return { anims, gear: makeGear(root, gearColor), holder };
  }
  function makeBot(i: number) {
    const x = rnd(-120, 120), z = rnd(-120, 120); // clustered near the middle so you can find them
    const root = new B.TransformNode("bot", scene); root.position.set(x, h(x, z), z);
    const bot: Bot = { root, hp: 100, dead: false, name: "Player" + Math.floor(rnd(1000, 9999)), tgt: root.position.clone(), wanderT: 0, cd: 1, seen: false, losT: 0, meshes: [], anims: null, flash: null, fl: 0 };
    // invisible hitboxes (visibility 0 is still pickable); the animated model itself is not pickable
    const hit = (m: B.Mesh, y: number, name: string) => { m.parent = root; m.position.y = y; m.name = name; m.visibility = 0; m.metadata = { enemy: bot }; bot.meshes.push(m); };
    hit(B.MeshBuilder.CreateBox("body", { width: 0.6, height: 1.35, depth: 0.5 }, scene), 0.75, "body");
    hit(B.MeshBuilder.CreateSphere("head", { diameter: 0.32 }, scene), 1.68, "head");
    const pool = (["soldier", "xbot", "cesium", "soldier", "soldier", "xbot"] as Kind[]).filter((k) => models[k]);
    if (pool.length) {
      const kind = pool[i % pool.length], height = rnd(1.72, 1.92); // every bot is a different size
      const m = spawnModel(root, "b" + i, kind === "soldier" ? CAMO[i % CAMO.length] : TINTS[i % TINTS.length], kind, height, TINTS[(i + 2) % TINTS.length]); bot.anims = m.anims;
      if (!hasOwnGear(kind)) { m.gear.helmet.setEnabled(i % 3 !== 1); m.gear.vest.setEnabled(i % 2 === 0); m.gear.pack.setEnabled(i % 3 !== 2); } // each bot wears a different kit
    }
    else { const add = (m: B.Mesh, y: number) => { m.parent = root; m.position.y = y; m.isPickable = false; sg.addShadowCaster(m); }; add(box(0.5, 0.75, 0.3, "#3d4f2f"), 1.2); add(box(0.42, 0.8, 0.28, "#2a2a2a"), 0.4); }
    const hand = new B.TransformNode("hand", scene); hand.parent = root; hand.position.set(0.2, 1.25, 0.25);
    bot.flash = buildGun((["ar", "akm", "vector", "shotgun", "scar", "dmr", "mini14", "smg"] as WId[])[i % 8], hand, 0, false).flash;
    bots.push(bot);
  }
  // Procedural body poses (crouch / jump / skydive / parachute) layered on top of the walk/run clips.
  // Each motion is auto-calibrated at start-up: we nudge a bone and see which local axis moves its child the way we want,
  // so this works on any Mixamo-style skeleton whatever its bone axes are.
  interface Rig { bones: Record<string, B.TransformNode>; cal: Record<string, { ax: B.Vector3; sign: number }> | null; base: Map<B.TransformNode, B.Quaternion>; frame: B.TransformNode; holder: B.TransformNode }
  const BONE_NAMES = ["Spine", "Spine2", "LeftUpLeg", "LeftLeg", "LeftFoot", "LeftToeBase", "RightUpLeg", "RightLeg", "RightFoot", "RightToeBase", "LeftArm", "LeftForeArm", "LeftHand", "RightArm", "RightForeArm", "RightHand"];
  const pose = { crouch: 0, jump: 0, sky: 0, chute: 0 };
  let rig: Rig | null = null, wasGrounded = true, landDip = 0;
  const MOTIONS = (() => {
    const m: Record<string, { bone: string; child: string; dir: [number, number, number] }> = { "Spine.lean": { bone: "Spine", child: "Spine2", dir: [0, -0.2, 1] } };
    for (const side of ["Left", "Right"]) {
      const sx = side === "Left" ? -1 : 1;
      m[side + ".UpLeg.fwd"] = { bone: side + "UpLeg", child: side + "Leg", dir: [0, 0, 1] };
      m[side + ".UpLeg.out"] = { bone: side + "UpLeg", child: side + "Leg", dir: [sx, -0.2, 0] };
      m[side + ".Leg.bend"] = { bone: side + "Leg", child: side + "Foot", dir: [0, 0, -1] };
      m[side + ".Foot.toeUp"] = { bone: side + "Foot", child: side + "ToeBase", dir: [0, 1, 0] };
      m[side + ".Arm.fwd"] = { bone: side + "Arm", child: side + "ForeArm", dir: [0, 0.2, 1] };
      m[side + ".Arm.out"] = { bone: side + "Arm", child: side + "ForeArm", dir: [sx, 0.3, 0] };
      m[side + ".ForeArm.bend"] = { bone: side + "ForeArm", child: side + "Hand", dir: [0, 0.4, 0.9] };
    }
    return m;
  })();
  function buildRig(tag: string, frame: B.TransformNode, holder: B.TransformNode): Rig | null {
    const bones: Record<string, B.TransformNode> = {};
    for (const n of scene.transformNodes) {
      if (!n.name.endsWith("_" + tag)) continue;
      const base = n.name.slice(0, -(tag.length + 1)).replace(/^.*mixamorig:?/, "");
      if (BONE_NAMES.includes(base)) bones[base] = n;
    }
    if (Object.keys(bones).length < BONE_NAMES.length) return null; // not a Mixamo-style skeleton (e.g. CesiumMan)
    for (const b of Object.values(bones)) if (!b.rotationQuaternion) b.rotationQuaternion = B.Quaternion.FromEulerVector(b.rotation);
    return { bones, cal: null, base: new Map(), frame, holder };
  }
  function calibrate(r: Rig) {
    r.frame.computeWorldMatrix(true);
    const inv = r.frame.getWorldMatrix().clone().invert(), at = (n: B.TransformNode) => V.TransformCoordinates(n.getAbsolutePosition(), inv);
    const cal: Rig["cal"] = {};
    for (const [key, m] of Object.entries(MOTIONS)) {
      const bone = r.bones[m.bone], child = r.bones[m.child], q0 = bone.rotationQuaternion!.clone(), want = new V(...m.dir).normalize();
      bone.computeWorldMatrix(true); child.computeWorldMatrix(true);
      const before = at(child); let best = -2, pick = { ax: V.Right(), sign: 1 };
      for (const ax of [V.Right(), V.Up(), V.Forward()]) for (const sign of [1, -1]) {
        bone.rotationQuaternion = q0.multiply(B.Quaternion.RotationAxis(ax, sign * 0.25));
        bone.computeWorldMatrix(true); child.computeWorldMatrix(true);
        const d = at(child).subtract(before), score = d.length() > 1e-5 ? V.Dot(d.normalize(), want) : -2;
        if (score > best) { best = score; pick = { ax, sign }; }
      }
      bone.rotationQuaternion = q0; bone.computeWorldMatrix(true); child.computeWorldMatrix(true);
      cal[key] = pick;
    }
    r.cal = cal;
  }
  function poseAngles() { // radians per motion for the current blend weights
    const a: Record<string, number> = {}, add = (k: string, v: number) => { a[k] = (a[k] ?? 0) + v; };
    const { crouch: c, jump: j, sky: sk, chute: ch } = pose;
    add("Spine.lean", 0.3 * c + 0.1 * j - 0.35 * sk);
    for (const side of ["Left", "Right"]) {
      const lead = side === "Left" ? 1 : 0.35; // jump: one knee tucks higher, like a real leap
      add(side + ".UpLeg.fwd", 1.0 * c + 0.9 * lead * j - 0.25 * sk + 0.3 * ch);
      add(side + ".UpLeg.out", 0.45 * sk);
      add(side + ".Leg.bend", 1.9 * c + 1.3 * lead * j + 0.7 * sk + 0.4 * ch);
      add(side + ".Foot.toeUp", 0.7 * c);
      add(side + ".Arm.fwd", 0.35 * c + 0.45 * j - 0.2 * sk + 2.7 * ch);
      add(side + ".Arm.out", 0.3 * j + 1.35 * sk + 0.25 * ch);
      add(side + ".ForeArm.bend", 0.5 * c + 0.6 * j + 0.8 * sk + 0.3 * ch);
    }
    return a;
  }
  scene.onBeforeAnimationsObservable.add(() => { if (rig) for (const [n, q] of rig.base) n.rotationQuaternion!.copyFrom(q); }); // undo last frame's pose so it never accumulates
  scene.onAfterAnimationsObservable.add(() => {
    if (!rig) return;
    if (!rig.cal) calibrate(rig);
    const ang = poseAngles(), per: Record<string, B.Quaternion> = {};
    for (const [key, v] of Object.entries(ang)) {
      if (Math.abs(v) < 1e-3) continue;
      const m = MOTIONS[key], c = rig.cal![key], q = B.Quaternion.RotationAxis(c.ax, c.sign * v);
      per[m.bone] = per[m.bone] ? per[m.bone].multiply(q) : q;
    }
    for (const [name, b] of Object.entries(rig.bones)) {
      const q0 = b.rotationQuaternion!.clone(); rig.base.set(b, q0);
      if (per[name]) b.rotationQuaternion = q0.multiply(per[name]);
    }
    rig.holder.position.y = -0.4 * pose.crouch; // sink the hips as the knees bend
  });
  function makePlayerModel() {
    const kind = (opts.character && models[opts.character] ? opts.character : (Object.keys(models)[0] as Kind | undefined));
    if (!kind) return;
    pKind = kind; pRoot = new B.TransformNode("player", scene); pRoot.setEnabled(false);
    { const m = spawnModel(pRoot, "me", kind === "xbot" ? "#7f9560" : "#ffffff", kind, 1.8, "#5d6b43"); pAnims = m.anims; pGear = m.gear; rig = buildRig("me", pRoot, m.holder); }
    pGun = new B.TransformNode("pgun", scene); pGun.parent = pRoot; pGun.position.set(0.2, 1.28, 0.25);
    buildVM();
  }
  const alive = () => bots.filter((b) => !b.dead).length + 1;

  function killBot(b: Bot, byPlayer: boolean, head = false) {
    b.dead = true; b.anims?.cur?.stop(); b.flash?.setEnabled(false); b.root.rotation.x = -Math.PI / 2; b.root.position.y += 0.25;
    b.meshes.forEach((m) => (m.isPickable = false));
    const p = b.root.position;
    for (let i = 0; i < 2; i++) spawnLoot(roll(), p.x + rnd(-1.5, 1.5), p.z + rnd(-1.5, 1.5));
    spawnLoot(SLOTS[Math.floor(rnd(0, SLOTS.length))], p.x + 1, p.z);
    if (byPlayer) { kills++; log(`You eliminated ${b.name}${head ? " (headshot)" : ""}`); } else log(`${b.name} died in the blue zone`);
    if (alive() === 1 && !over) endGame("win");
  }

  // ---------- zone ----------
  const phases = [{ r: 300, hold: 0, shrink: 0, dps: 0 }, { r: 190, hold: 50, shrink: 30, dps: 1.5 }, { r: 110, hold: 40, shrink: 30, dps: 3 }, { r: 55, hold: 35, shrink: 25, dps: 5 }, { r: 22, hold: 30, shrink: 20, dps: 8 }, { r: 4, hold: 20, shrink: 20, dps: 14 }];
  const pickNext = (c: { x: number; z: number; r: number }, r: number) => { const a = rnd(0, 6.28), d = rnd(0, Math.max(0, c.r - r) * 0.8); return { x: c.x + Math.cos(a) * d, z: c.z + Math.sin(a) * d, r }; };
  let zone = { x: 0, z: 0, r: 430 }, zFrom = { ...zone }, zk = 1, zmode: "hold" | "shrink" = "hold", zt = phases[1].hold, zdone = false;
  let zNext = pickNext(zone, phases[1].r);
  const zoneMesh = B.MeshBuilder.CreateCylinder("zone", { height: 300, diameter: 2, tessellation: 96, sideOrientation: B.Mesh.DOUBLESIDE, cap: B.Mesh.NO_CAP }, scene);
  const zm = new B.StandardMaterial("zm", scene);
  zm.emissiveColor = new B.Color3(0.1, 0.35, 1); zm.alpha = 0.22; zm.disableLighting = true; zm.backFaceCulling = false; zm.fogEnabled = false;
  zoneMesh.material = zm; zoneMesh.isPickable = false;
  const inZone = (x: number, z: number) => Math.hypot(x - zone.x, z - zone.z) <= zone.r;
  function updateZone(dt: number) {
    if (zdone) return;
    zt -= dt;
    if (zmode === "shrink") { const t = 1 - Math.max(zt, 0) / phases[zk].shrink; zone.x = lerp(zFrom.x, zNext.x, t); zone.z = lerp(zFrom.z, zNext.z, t); zone.r = lerp(zFrom.r, zNext.r, t); }
    if (zt > 0) return;
    if (zmode === "hold") { zmode = "shrink"; zt = phases[zk].shrink; zFrom = { ...zone }; }
    else {
      zone = { ...zNext }; zk++;
      if (zk >= phases.length) { zk = phases.length - 1; zdone = true; } else { zmode = "hold"; zt = phases[zk].hold; zNext = pickNext(zone, phases[zk].r); }
    }
  }

  // ---------- combat ----------
  function hurt(d: number, from?: B.Vector3) {
    if (over) return;
    if (helmet > 0) { const a = Math.min(helmet, d * 0.25); helmet -= a; d -= a; }
    if (armor > 0) { const a = Math.min(armor, d * 0.6); armor -= a; d -= a; }
    hp -= d; hurtAt = Date.now();
    if (from) hurtAngle = ((Math.atan2(from.x - cam.position.x, from.z - cam.position.z) - cam.rotation.y) * 180) / Math.PI;
    if (hp <= 0) { hp = 0; endGame("dead"); }
  }
  function endGame(r: "dead" | "win") { over = r; document.exitPointerLock?.(); }
  const tracer = (a: B.Vector3, b: B.Vector3) => {
    const l = B.MeshBuilder.CreateLines("tr", { points: [a, b] }, scene); l.color = new B.Color3(1, 0.85, 0.4); l.isPickable = false;
    setTimeout(() => l.dispose(), 50);
  };
  const puffTex = new B.DynamicTexture("puff", 64, scene);
  { const c = puffTex.getContext(), g = c.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(1, "rgba(255,255,255,0)"); c.fillStyle = g; c.fillRect(0, 0, 64, 64); puffTex.update(); puffTex.hasAlpha = true; }
  const puffs = (name: string, c1: B.Color4, c2: B.Color4, life: number, size: number, power: number, grav: number) => {
    const ps = new B.ParticleSystem(name, 300, scene);
    ps.particleTexture = puffTex; ps.emitter = new V(0, -500, 0); ps.emitRate = 0; ps.color1 = c1; ps.color2 = c2; ps.colorDead = new B.Color4(c2.r, c2.g, c2.b, 0);
    ps.minLifeTime = life * 0.5; ps.maxLifeTime = life; ps.minSize = size * 0.5; ps.maxSize = size; ps.minEmitPower = power * 0.4; ps.maxEmitPower = power;
    ps.gravity = new V(0, grav, 0); ps.direction1 = new V(-1, 0.8, -1); ps.direction2 = new V(1, 2, 1); ps.updateSpeed = 0.02; ps.start(); return ps;
  };
  const dustFx = puffs("dust", new B.Color4(0.62, 0.55, 0.42, 0.7), new B.Color4(0.5, 0.46, 0.4, 0.5), 0.9, 0.35, 2.4, -1.2);
  const bloodFx = puffs("blood", new B.Color4(0.7, 0.02, 0.02, 0.9), new B.Color4(0.45, 0, 0, 0.8), 0.6, 0.16, 3.2, -9);
  const smokeFx = puffs("smoke", new B.Color4(0.85, 0.85, 0.85, 0.4), new B.Color4(0.6, 0.6, 0.6, 0.3), 1.6, 0.4, 0.8, 0.4);
  const burst = (ps: B.ParticleSystem, at: B.Vector3, n: number) => { ps.emitter = at.clone(); ps.manualEmitCount = n; };
  const spark = (p: B.Vector3, col = "#ffcc66") => {
    burst(col === "#ff2a2a" ? bloodFx : dustFx, p, col === "#ff2a2a" ? 14 : 9);
    const s = B.MeshBuilder.CreateSphere("sp", { diameter: 0.12 }, scene); s.position.copyFrom(p); s.material = mat(col, true); s.isPickable = false;
    setTimeout(() => s.dispose(), 120);
  };

  const zoomed = () => ads && !!cur && !!(wd(cur).scope || (wd(cur).zoom ?? 0.85) <= 0.6); // scopes force first person while aiming
  const tpp = () => !fpp && phase !== "plane" && !zoomed();
  function shoot() {
    const w = WEAPONS[cur!], st = owned[cur!]!;
    st.mag--; fireCd = w.rate; flashT = 0.05; kick = 0.06;
    if (cur === "shotgun") { playGun("fire"); setTimeout(() => playGun("pump"), 350); }
    const f = fwdVec(), r = rightVec(), tp = tpp() && pGun;
    // 1) where the crosshair points (from the camera), 2) fire from the gun muzzle at that point
    const aimO = tp ? view.position.add(f.scale(V.Distance(view.position, cam.position))) : cam.position.clone();
    const ah = scene.pickWithRay(new B.Ray(aimO, f, w.range), (m) => m.isPickable && m.isEnabled());
    const aimP = ah?.hit ? ah.pickedPoint! : aimO.add(f.scale(Math.min(w.range, 300)));
    const muzzle = tp ? pGun!.getAbsolutePosition().add(f.scale(w.len * 1.2)) : cam.position.add(f.scale(0.8)).add(r.scale(0.15)).add(new V(0, -0.12, 0));
    burst(smokeFx, muzzle, 3);
    const base = aimP.subtract(muzzle).normalize();
    const sp = w.spread * (ads ? 0.35 : 1) * (keysDown() ? 1.6 : 1) * (eyeH < 1.4 ? 0.7 : 1);
    for (let i = 0; i < w.pellets; i++) {
      const d = base.add(new V(rnd(-sp, sp), rnd(-sp, sp), rnd(-sp, sp))).normalize();
      const hit = scene.pickWithRay(new B.Ray(muzzle, d, w.range), (m) => m.isPickable && m.isEnabled());
      const end = hit?.hit ? hit.pickedPoint! : muzzle.add(d.scale(Math.min(w.range, 200)));
      if (cur !== "shotgun" || i === 0) tracer(muzzle, end);
      const e = hit?.pickedMesh?.metadata?.enemy as Bot | undefined;
      if (e && !e.dead) {
        const head = hit!.pickedMesh!.name === "head", dist = V.Distance(muzzle, end);
        e.hp -= w.dmg * (head ? 2.2 : 1) * (1 - 0.4 * Math.min(1, dist / w.range)); hitAt = Date.now(); e.seen = true;
        spark(end, "#ff2a2a"); boom(0.12, 3500, 0.04);
        if (e.hp <= 0) killBot(e, true, head);
      } else if (hit?.hit) spark(end);
    }
    boom(w.dmg >= 90 ? 1 : 0.6, w.len < 0.4 ? 3000 : 1800, w.dmg >= 90 ? 0.5 : 0.25);
    cam.rotation.x -= w.kick * (ads ? 0.6 : 1); cam.rotation.y += rnd(-1, 1) * w.kick * 0.5;
    if (st.mag === 0 && ammo[w.ammo] > 0) beginReload(w.reload);
  }
  function startReload() {
    if (!cur || reloadT > 0 || busyKind) return;
    const w = WEAPONS[cur];
    if (owned[cur]!.mag < w.mag && ammo[w.ammo] > 0) beginReload(w.reload);
  }
  const nades: { m: B.Mesh; vx: number; vy: number; vz: number; t: number }[] = [];
  function throwNade() {
    if (driving || phase !== "ground" || items.grenade <= 0) return;
    items.grenade--;
    const f = fwdVec(), m = B.MeshBuilder.CreateSphere("nade", { diameter: 0.16 }, scene);
    m.material = mat("#4a5d2a"); m.isPickable = false; sg.addShadowCaster(m);
    m.position.copyFrom(cam.position.add(f.scale(0.8)).add(new V(0, -0.2, 0)));
    nades.push({ m, vx: f.x * 17, vy: f.y * 17 + 4, vz: f.z * 17, t: 2.6 }); boom(0.15, 1200, 0.08);
  }
  function explode(p: B.Vector3) {
    boom(1, 500, 0.7);
    const fx = B.MeshBuilder.CreateSphere("fx", { diameter: 1 }, scene); fx.position.copyFrom(p); fx.material = mat("#ff9a2a", true, 0.8); fx.isPickable = false;
    let k = 0; const iv = setInterval(() => { k++; fx.scaling.setAll(1 + k * 1.6); fx.visibility = Math.max(0, 1 - k * 0.14); if (k > 7) { clearInterval(iv); fx.dispose(); } }, 40);
    for (const b of bots) if (!b.dead) {
      const d = V.Distance(b.root.position.add(new V(0, 1, 0)), p);
      if (d < 9) { b.hp -= 130 * (1 - d / 9); b.seen = true; hitAt = Date.now(); if (b.hp <= 0) killBot(b, true); }
    }
    const dp = V.Distance(cam.position, p); if (dp < 9) hurt(90 * (1 - dp / 9), p);
  }
  function updateNades(dt: number) {
    for (let i = nades.length - 1; i >= 0; i--) {
      const n = nades[i], p = n.m.position; n.t -= dt; n.vy -= 20 * dt;
      p.x += n.vx * dt; p.y += n.vy * dt; p.z += n.vz * dt;
      const g = h(p.x, p.z) + 0.08; if (p.y < g) { p.y = g; n.vy = Math.abs(n.vy) * 0.35; n.vx *= 0.6; n.vz *= 0.6; }
      if (n.t <= 0) { explode(p.clone()); n.m.dispose(); nades.splice(i, 1); }
    }
  }
  function useItem(k: keyof typeof items, dur: number) {
    const nm = { bandage: "bandage", medkit: "med kit", drink: "energy drink", grenade: "grenade" }[k];
    if (busyKind) return log("Already using an item");
    if (items[k] <= 0) return log(`You have no ${nm}`);
    if (k === "medkit" && hp >= 100) return log("Health is already full");
    if (k === "bandage" && hp >= 75) return log("Bandages only heal up to 75 — use a med kit");
    if (k === "drink" && boost >= 100) return log("Boost is already full");
    busyKind = k; busyT = busyDur = dur; reloadT = 0; play("cloth", 0.5); log(`Using ${nm}…`);
  }
  function finishItem() {
    const k = busyKind as keyof typeof items; items[k]--; busyKind = "";
    if (k === "bandage") hp = Math.min(75, hp + 15); else if (k === "medkit") hp = 100; else boost = Math.min(100, boost + 40);
  }

  // ---------- drop: plane, freefall, parachute ----------
  const planeNode = new B.TransformNode("plane", scene);
  const canopy = B.MeshBuilder.CreateSphere("canopy", { diameter: 6, slice: 0.5, segments: 16, sideOrientation: B.Mesh.DOUBLESIDE }, scene);
  {
    const dtex = new B.DynamicTexture("stripes", { width: 256, height: 8 }, scene), c = dtex.getContext();
    for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? "#f5f5f5" : "#e0452b"; c.fillRect(i * 32, 0, 32, 8); }
    dtex.update();
    const cm = new B.StandardMaterial("cm", scene); cm.diffuseTexture = dtex; cm.emissiveColor = new B.Color3(0.35, 0.35, 0.35); cm.backFaceCulling = false;
    canopy.material = cm; canopy.isPickable = false; canopy.setEnabled(false);
    const lines = B.MeshBuilder.CreateLineSystem("ropes", { lines: Array.from({ length: 8 }, (_, i) => [new V(Math.cos(i * 0.785) * 3, 0, Math.sin(i * 0.785) * 3), new V(0, -3.3, 0)]) }, scene);
    lines.parent = canopy; lines.color = new B.Color3(0.1, 0.1, 0.1); lines.isPickable = false;
  }
  function jump() { if (phase !== "plane") return; phase = "fall"; vy = 0; }
  function openChute() { if (phase !== "fall") return; phase = "chute"; canopy.setEnabled(true); boom(0.3, 900, 0.15); }

  function toggleCar() {
    if (driving) { // get out on the car's right side
      const c = driving; driving = null; carHum?.s.stop(); carHum = null; c.speed = 0;
      cam.position.x = c.x + Math.cos(c.ry) * 2.4; cam.position.z = c.z - Math.sin(c.ry) * 2.4;
      c.cs.forEach((o, i) => { const k = [-1.3, 0, 1.3][i]; o.x = c.x + Math.sin(c.ry) * k; o.z = c.z + Math.cos(c.ry) * k; circles.push(o); });
      log("Left the car"); return;
    }
    const c = cars.find((q) => Math.hypot(q.x - cam.position.x, q.z - cam.position.z) < 3.6);
    if (!c) return;
    driving = c; c.cs.forEach((o) => circles.splice(circles.indexOf(o), 1));
    cam.rotation.y = c.ry; reloadT = 0; busyKind = ""; ads = false; carHum = play("engine", 0.25, true);
    log("Driving — W/S gas & brake, A/D steer, E to exit");
  }

  // ---------- input ----------
  on(canvas, "click", () => { loadSounds(); if (!over && !locked) canvas.requestPointerLock(); });
  on(document, "pointerlockchange", () => { locked = document.pointerLockElement === canvas; if (!locked) { trigger = triggerHeld = ads = false; } });
  on(document, "mousemove", (e: MouseEvent) => {
    if (!locked) return;
    const s = ads ? ((cur && wd(cur).zoom) ? (wd(cur).zoom! < 0.3 ? 0.0007 : 0.001) : 0.0013) : 0.002;
    cam.rotation.y += e.movementX * s; cam.rotation.x = clamp(cam.rotation.x + e.movementY * s, -1.5, 1.5);
  });
  on(document, "mousedown", (e: MouseEvent) => { if (!locked) return; if (e.button === 0) trigger = triggerHeld = true; if (e.button === 2) ads = true; });
  on(document, "mouseup", (e: MouseEvent) => { if (e.button === 0) triggerHeld = false; if (e.button === 2) ads = false; });
  on(document, "contextmenu", (e: Event) => e.preventDefault());
  on(document, "wheel", (e: WheelEvent) => { if (locked && phase === "ground" && !driving) cycleWeapon(e.deltaY > 0 ? 1 : -1); });
  on(window, "keydown", (e: KeyboardEvent) => {
    if (e.code === "Space") e.preventDefault();
    if (e.repeat) return; K[e.code] = true;
    if (!locked) return;
    if (e.code === "KeyV") fpp = !fpp;
    if (e.code === "Space") { if (phase === "plane" && planeT > 0.08) jump(); else if (phase === "fall") openChute(); }
    if (phase !== "ground") return;
    const n = ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5"].indexOf(e.code);
    if (n >= 0 && !busyKind) { const have = CATS[n].ids.filter((w) => owned[w]); if (have.length) equip(have[(have.indexOf(cur as WId) + 1) % have.length]); else log(`No ${CATS[n].name.toLowerCase()} yet`); }
    if (e.code === "KeyH") useItem("bandage", 2);
    if (e.code === "KeyJ") useItem("medkit", 4);
    if (e.code === "KeyK") useItem("drink", 3);
    if (e.code === "KeyQ" && prevW && owned[prevW]) equip(prevW);
    if (e.code === "KeyR") startReload();
    if (e.code === "KeyE") { const l = driving ? null : nearestLoot(); if (l) pickup(l); else toggleCar(); }
    if (e.code === "KeyT") { autoAll = !autoAll; log(autoAll ? "Auto-pickup: everything" : "Auto-pickup: ammo only (press E to grab the rest)"); }
    if (e.code === "KeyG") throwNade();
    if (e.code === "KeyF") trigger = triggerHeld = true;
    if (e.code === "KeyZ") ads = true;
    if (e.code === "KeyX") equip(null);
  });
  on(window, "keyup", (e: KeyboardEvent) => { K[e.code] = false; if (e.code === "KeyF") triggerHeld = false; if (e.code === "KeyZ") ads = false; });
  on(window, "resize", () => engine.resize());

  // ---------- main loop ----------
  const mctx = mini.getContext("2d")!;
  function drawMini() {
    const S = mini.width, px = (x: number) => ((x + HALF) / SIZE) * S, pz = (z: number) => ((HALF - z) / SIZE) * S;
    mctx.clearRect(0, 0, S, S); mctx.fillStyle = "rgba(20,35,20,.75)"; mctx.fillRect(0, 0, S, S);
    mctx.fillStyle = "#9a9a90"; for (const s of sites) mctx.fillRect(px(s.x) - 2, pz(s.z) - 2, 4, 4);
    const ring = (c: { x: number; z: number; r: number }, col: string) => { mctx.strokeStyle = col; mctx.lineWidth = 2; mctx.beginPath(); mctx.arc(px(c.x), pz(c.z), (c.r / SIZE) * S, 0, 7); mctx.stroke(); };
    ring(zone, "#3a8bff"); if (!zdone) ring(zNext, "#fff");
    if (phase === "plane") {
      mctx.strokeStyle = "#ffffff80"; mctx.setLineDash([4, 4]); mctx.lineWidth = 1; mctx.beginPath();
      mctx.moveTo(px(P0.x), pz(P0.z)); mctx.lineTo(px(P1.x), pz(P1.z)); mctx.stroke(); mctx.setLineDash([]);
    }
    mctx.fillStyle = "#ffd24a"; for (const l of loots) if (Math.hypot(l.x - cam.position.x, l.z - cam.position.z) < 25) mctx.fillRect(px(l.x) - 1, pz(l.z) - 1, 2, 2);
    mctx.fillStyle = "#ff4040"; for (const b of bots) if (!b.dead) { mctx.beginPath(); mctx.arc(px(b.root.position.x), pz(b.root.position.z), 3, 0, 7); mctx.fill(); }
    const y = cam.rotation.y, x0 = px(cam.position.x), z0 = pz(cam.position.z);
    mctx.fillStyle = "#ff3030"; mctx.beginPath();
    mctx.moveTo(x0 + Math.sin(y) * 8, z0 - Math.cos(y) * 8);
    mctx.lineTo(x0 + Math.sin(y + 2.5) * 5, z0 - Math.cos(y + 2.5) * 5);
    mctx.lineTo(x0 + Math.sin(y - 2.5) * 5, z0 - Math.cos(y - 2.5) * 5); mctx.fill();
  }

  let hudT = 0;
  scene.onBeforeRenderObservable.add(() => {
    const dt = Math.min(engine.getDeltaTime() / 1000, 0.05);
    const t = performance.now() / 1000;
    updateFlying(dt);
    sun.position.set(cam.position.x - sunDir.x * 120, cam.position.y - sunDir.y * 120, cam.position.z - sunDir.z * 120);
    scene.fogDensity = 0.0035 - 0.0026 * clamp((cam.position.y - 30) / 200, 0, 1); // clearer view from the plane
    zoneMesh.scaling.set(zone.r, 1, zone.r); zoneMesh.position.set(zone.x, 100, zone.z);

    if (locked && !over) {
      if (phase !== "plane") updateZone(dt);
      // movement
      const p = cam.position, yaw = cam.rotation.y;
      const mx = (K.KeyD ? 1 : 0) - (K.KeyA ? 1 : 0), mz = (K.KeyW ? 1 : 0) - (K.KeyS ? 1 : 0);
      const walkKey = K.AltLeft || K.KeyN, crouch = phase === "ground" && K.KeyC, sprint = phase === "ground" && K.ShiftLeft && mz > 0 && !ads && !crouch;
      const gdir = (len: number) => [(Math.sin(yaw) * mz + Math.cos(yaw) * mx) / len, (Math.cos(yaw) * mz - Math.sin(yaw) * mx) / len];
      if (planeT < 1.15) { // the plane keeps flying after you jump
        planeT += (dt * PSPEED) / planeLen;
        const pp = V.Lerp(P0, P1, planeT);
        planeNode.position.copyFrom(pp); planeNode.rotation.y = Math.atan2(pd.x, pd.z);
        if (planeT >= 1.15) planeNode.setEnabled(false);
      }
      if (!hum && phase === "plane" && samples.engine) hum = play("engine", 0.5, true);
      if (hum && phase !== "plane") { hum.g.gain.value = Math.max(0, hum.g.gain.value - dt * 0.25); if (hum.g.gain.value <= 0) { hum.s.stop(); hum = null; } }
      if (phase === "plane") {
        p.set(planeNode.position.x - pd.x * 16, ALT + 5, planeNode.position.z - pd.z * 16);
        hvx = pd.x * PSPEED; hvz = pd.z * PSPEED;
        if (planeT >= 1) jump();
      } else if (phase === "fall" || phase === "chute") {
        const fall = phase === "fall", top = fall ? 30 : 12, len = Math.hypot(mx, mz) || 1, [dx, dz] = gdir(len);
        hvx = lerp(hvx, (mx || mz ? dx : 0) * top, 1.5 * dt); hvz = lerp(hvz, (mx || mz ? dz : 0) * top, 1.5 * dt);
        p.x += hvx * dt; p.z += hvz * dt;
        vy = lerp(vy, fall ? -50 : -7, (fall ? 1.2 : 3) * dt); p.y += vy * dt;
        const gy = h(p.x, p.z) + 1.7;
        if (p.y - gy < 4) collide(p, 0.4); else p.set(clamp(p.x, -HALF + 2, HALF - 2), p.y, clamp(p.z, -HALF + 2, HALF - 2));
        if (fall && p.y - gy < 110) openChute();
        if (p.y <= gy) { p.y = gy; vy = 0; grounded = true; phase = "ground"; eyeH = 1.7; canopy.setEnabled(false); boom(0.4, 400, 0.3); }
        canopy.position.set(p.x, p.y + 3.6, p.z);
      } else if (driving) {
        const c = driving, thr = (K.KeyW ? 1 : 0) - (K.KeyS ? 1 : 0), st = (K.KeyD ? 1 : 0) - (K.KeyA ? 1 : 0);
        c.speed += (thr > 0 ? 14 : thr < 0 ? -12 : 0) * dt;
        if (!thr) c.speed -= Math.sign(c.speed) * Math.min(Math.abs(c.speed), 5 * dt);
        c.speed = clamp(c.speed, -8, 26);
        c.ry += st * 1.7 * dt * clamp(c.speed / 6, -1, 1);
        const sn = Math.sin(c.ry), cs = Math.cos(c.ry), pos = new V(c.x + sn * c.speed * dt, 0, c.z + cs * c.speed * dt), before = pos.clone();
        collide(pos, 1.6);
        if (Math.abs(pos.x - before.x) + Math.abs(pos.z - before.z) > 0.01) c.speed *= 0.5; // crashed into something
        c.x = pos.x; c.z = pos.z;
        const y = h(c.x, c.z);
        c.node.position.set(c.x, y, c.z);
        c.node.rotation.set(Math.atan2(h(c.x - sn * 2, c.z - cs * 2) - h(c.x + sn * 2, c.z + cs * 2), 4), c.ry, 0);
        p.set(c.x, y + 1.55, c.z); vy = 0; grounded = true;
        if (carHum) carHum.s.playbackRate.value = 0.7 + Math.abs(c.speed) / 20;
        if (c.speed > 7) for (const b of bots) if (!b.dead && Math.hypot(b.root.position.x - c.x, b.root.position.z - c.z) < 2.3) killBot(b, true);
      } else {
        let spd = crouch ? 2.5 : walkKey ? 2.8 : sprint ? 10 : 6.5; if (ads) spd *= 0.6; if (boost > 0) spd *= 1.1; if (busyKind) spd *= 0.7;
        if (mx || mz) {
          const [dx, dz] = gdir(Math.hypot(mx, mz));
          p.x += dx * spd * dt; p.z += dz * spd * dt; bob += dt * spd * 1.6; curSpeed = spd;
          stepD += dt * spd; if (stepD > (sprint ? 3.4 : 2.4) && grounded) { stepD = 0; play("step" + Math.floor(rnd(0, 5)), crouch ? 0.15 : 0.35); }
        }
        collide(p, 0.4);
        eyeH = lerp(eyeH, crouch ? 1.1 : 1.7, 10 * dt);
        const gy = h(p.x, p.z) + eyeH;
        if (grounded && K.Space) { vy = 6.5; grounded = false; }
        vy -= 22 * dt; p.y += vy * dt;
        if (vy <= 0 && p.y < gy + 0.15) { p.y = gy; vy = 0; grounded = true; } else grounded = false;
      }

      if (!(mx || mz)) curSpeed = 0;

      // regen / zone damage
      const air = phase !== "ground";
      if (boost > 0) { boost = Math.max(0, boost - 2 * dt); hp = Math.min(100, hp + 0.6 * dt); }
      const out = !air && !inZone(p.x, p.z);
      if (out) { hp -= phases[zk].dps * dt; hurtAt = Date.now() - 400; if (hp <= 0) { hp = 0; endGame("dead"); } }

      // weapon logic
      swapT = Math.max(0, swapT - dt); fireCd -= dt; flashT -= dt; kick = Math.max(0, kick - dt * 0.5);
      if (busyKind) { busyT -= dt; if (busyT <= 0) finishItem(); }
      if (reloadT > 0 && cur) {
        reloadT -= dt;
        if (reloadT <= 0) { const w = WEAPONS[cur], st = owned[cur]!, take = Math.min(w.mag - st.mag, ammo[w.ammo]); st.mag += take; ammo[w.ammo] -= take; boom(0.25, 4500, 0.05); } // mag-in clack
      }
      if (!air && !driving && cur && !busyKind && reloadT <= 0 && fireCd <= 0 && !sprint && (triggerHeld && WEAPONS[cur].auto || trigger)) {
        if (owned[cur]!.mag > 0) shoot(); else { startReload(); if (reloadT <= 0 && Date.now() - dryAt > 350) { dryAt = Date.now(); boom(0.1, 5000, 0.02); } } // dry-fire click
      }
      trigger = false;
      updateNades(dt);

      // ammo is picked up when you walk over it (everything, if auto-pickup is on with T); the rest is grabbed with E
      if (phase === "ground" && !driving) for (const l of [...loots]) if (Math.hypot(l.x - p.x, l.z - p.z) < 1.8 && (autoAll || l.id.startsWith("a:"))) pickup(l);

      // bots
      for (const b of bots) {
        if (b.dead) continue;
        const bp = b.root.position, dx = p.x - bp.x, dz = p.z - bp.z, d = Math.hypot(dx, dz);
        if (!inZone(bp.x, bp.z)) { b.hp -= phases[zk].dps * dt; if (b.hp <= 0) { killBot(b, false); continue; } }
        b.losT -= dt; b.fl -= dt; b.flash?.setEnabled(b.fl > 0);
        if (b.losT <= 0) {
          b.losT = 0.4; b.seen = false;
          if (phase === "ground" && d < 150) {
            const from = new V(bp.x, bp.y + 1.6, bp.z), dir = p.subtract(from);
            b.seen = !scene.pickWithRay(new B.Ray(from, dir.normalize(), dir.length()), (m) => !!m.metadata?.block && m.isPickable).hit;
          }
        }
        let mvx = 0, mvz = 0, sp = 0;
        if (b.seen) {
          b.root.rotation.y = Math.atan2(dx, dz);
          if (d > 14) { mvx = dx / d; mvz = dz / d; sp = 5.5; } else { const s = Math.sin(t * 1.3 + b.hp); mvx = (dz / d) * s; mvz = (-dx / d) * s; sp = 3.2; } // rush you, then strafe up close
          b.cd -= dt;
          if (b.cd <= 0) {
            b.cd = rnd(0.2, 0.5); b.fl = 0.06;
            boom(clamp(1 - d / 160, 0, 1) * 0.35, 1800, 0.2);
            const from = new V(bp.x + Math.sin(b.root.rotation.y) * 0.4, bp.y + 1.3, bp.z + Math.cos(b.root.rotation.y) * 0.4);
            const hitC = Math.max(0.12, 0.7 - d / 170) * (sprint ? 0.75 : 1) * (crouch ? 0.85 : 1);
            if (Math.random() < hitC) { hurt(rnd(8, 13), bp); tracer(from, p.clone()); } else tracer(from, p.add(new V(rnd(-2, 2), rnd(-1, 1), rnd(-2, 2))));
          }
        } else {
          b.wanderT -= dt;
          const tx = b.tgt.x - bp.x, tz = b.tgt.z - bp.z, td = Math.hypot(tx, tz);
          if (b.wanderT <= 0 || td < 2) {
            b.wanderT = rnd(6, 14);
            const c = inZone(bp.x, bp.z) ? bp : new V(zone.x, 0, zone.z), a = rnd(0, 6.28), r = rnd(15, 45);
            b.tgt.set(c.x + Math.cos(a) * r, 0, c.z + Math.sin(a) * r);
            if (!inZone(bp.x, bp.z)) b.tgt.set(zone.x + rnd(-10, 10), 0, zone.z + rnd(-10, 10));
          }
          mvx = tx / (td || 1); mvz = tz / (td || 1); sp = inZone(bp.x, bp.z) ? 2.6 : 7;
          b.root.rotation.y = Math.atan2(mvx, mvz);
        }
        setAnim(b.anims, sp >= 3.5 ? "run" : sp > 0 ? "walk" : "idle", sp >= 3.5 ? sp / 5.5 : sp / 2.8);
        bp.x += mvx * sp * dt; bp.z += mvz * sp * dt; collide(bp, 0.4); bp.y = h(bp.x, bp.z);
      }
    }

    const rp = reloadT > 0 ? Math.sin((1 - reloadT / reloadMax) * Math.PI) : busyKind ? 1 : 0, sw = swapT / 0.4; // 0..1 reload dip / weapon swap
    // camera rig: first person = the eye, third person = orbit behind the player (pulled in by walls)
    const tp = tpp(), air = phase === "fall" || phase === "chute";
    view.rotation.copyFrom(cam.rotation);
    if (!tp) view.position.copyFrom(cam.position);
    else {
      const f = fwdVec(), r = rightVec(), dist = driving ? 8 : air ? 5.5 : ads ? 1.7 : 3.6, side = driving || air ? 0 : ads ? 0.55 : 0.8;
      const pivot = cam.position.add(new V(0, 0.2, 0)), dv = pivot.subtract(f.scale(dist)).add(r.scale(side)).subtract(pivot), len = dv.length();
      const hit = scene.pickWithRay(new B.Ray(pivot, dv.scale(1 / len), len), (m) => !!m.metadata?.block && m.isPickable);
      view.position.copyFrom(pivot.add(dv.scale((hit?.hit ? Math.max(0.3, hit.distance - 0.3) : len) / len)));
      view.position.y = Math.max(view.position.y, h(view.position.x, view.position.z) + 0.35);
    }
    // the visible player character (third person only)
    if (pRoot && pGun) {
      pRoot.setEnabled(tp && !driving);
      if (tp && !driving) {
        const k = 1 - Math.exp(-12 * dt), yaw = cam.rotation.y, gnd = phase === "ground" && !driving;
        if (!wasGrounded && grounded && gnd) landDip = 0.7; // knees soak up the landing
        wasGrounded = grounded; landDip = Math.max(0, landDip - dt * 2.5);
        pose.crouch += ((gnd && (K.KeyC || landDip > 0) ? 1 : 0) - pose.crouch) * k;
        pose.jump += ((gnd && !grounded ? 1 : 0) - pose.jump) * k;
        pose.sky += ((phase === "fall" ? 1 : 0) - pose.sky) * k * 0.6;
        pose.chute += ((phase === "chute" ? 1 : 0) - pose.chute) * k * 0.6;
        const stand = new V(cam.position.x, cam.position.y - (air ? 1.7 : eyeH), cam.position.z);
        if (rig) { // belly-down skydive: tilt about the hips (not the feet), gentle sway under the canopy
          const tilt = 1.3 * pose.sky + Math.sin(t * 0.9) * 0.05 * pose.chute, hip = 0.95, f = new V(Math.sin(yaw), 0, Math.cos(yaw));
          pRoot.rotation.set(tilt, yaw, Math.sin(t * 0.7) * 0.06 * pose.chute);
          pRoot.position.copyFrom(stand.add(new V(0, hip, 0)).subtract(f.scale(hip * Math.sin(tilt))).subtract(new V(0, hip * Math.cos(tilt), 0)));
          pRoot.scaling.y = 1;
        } else {
          pRoot.position.copyFrom(stand); pRoot.rotation.set(phase === "fall" ? 1.2 : 0, yaw, 0); pRoot.scaling.y = air ? 1 : clamp(eyeH / 1.7, 0.65, 1);
        }
        if (pGear && !hasOwnGear(pKind)) { pGear.helmet.setEnabled(helmet > 0); pGear.vest.setEnabled(armor > 0); pGear.pack.setEnabled(pack); }
        const moving = !air && !driving && curSpeed > 0.1;
        setAnim(pAnims, !moving ? "idle" : curSpeed < 4 ? "walk" : "run", curSpeed < 4 ? curSpeed / 2.8 : curSpeed / 5.5); // foot speed follows move speed
        pGun.setEnabled(phase === "ground"); pGun.rotation.x = cam.rotation.x + rp * 0.9 + sw * 1.3; pGun.position.z = 0.25 - kick * 0.6;
        tg?.flash.setEnabled(flashT > 0);
      }
    }
    // first-person viewmodel
    if (vm) {
      vm.root.setEnabled(!tp && !driving && phase === "ground" && !zoomed());
      const a = ads ? 1 : 0, moving = keysDown();
      const bx = moving && !ads ? Math.sin(bob) * 0.012 : 0, by = moving && !ads ? Math.abs(Math.cos(bob)) * 0.012 : 0;
      const tgt = new V(lerp(0.26, 0, a) + bx + Math.sin(t * 1.1) * 0.002, lerp(-0.24, -0.15, a) - by - rp * 0.16 - sw * 0.3 + Math.sin(t * 1.7) * 0.002, lerp(0.5, 0.4, a) - kick);
      vm.root.position = V.Lerp(vm.root.position, tgt, 15 * dt);
      vm.root.rotation.x = rp * 0.7 + sw * 1.2; vm.root.rotation.z = -rp * 0.5; vm.flash.setEnabled(flashT > 0);
    }
    view.fov = lerp(view.fov, phase === "fall" ? 1.35 : curSpeed > 8 && !ads ? 1.22 : ads ? ((cur && wd(cur).zoom) || 0.85) : 1.1, 12 * dt);

    glowOn(phase === "ground" && !driving ? nearestLoot() : null);
    drawMini();
    hudT += dt;
    if (hudT > 0.08 || over) {
      hudT = 0;
      const w = cur ? WEAPONS[cur] : null;
      const now = Date.now(); while (feed.length && now - feed[0].t > 6000) feed.shift();
      onHud({
        locked, hp: Math.ceil(hp), armor: Math.ceil(armor), boost: Math.ceil(boost), weapon: w ? w.name : "Fists",
        mag: cur ? owned[cur]!.mag : 0, reserve: w ? ammo[w.ammo] : 0, cur, owned: SLOTS.filter((s) => owned[s]),
        alive: alive(), kills, zoneLabel: phase === "plane" ? "Zone starts when you jump" : zdone ? "Final zone" : zmode === "hold" ? "Zone shrinks in" : "Zone closing", zoneT: Math.max(0, Math.ceil(zt)),
        outside: !inZone(cam.position.x, cam.position.z), auto: autoAll, prompt: nearL && !driving ? `[E] Grab ${LOOT[nearL.id].label}` : driving ? "W/S gas · A/D steer · E exit" : phase === "ground" && cars.some((c) => Math.hypot(c.x - cam.position.x, c.z - cam.position.z) < 3.6) ? "[E] Drive car" : "", kmh: driving ? Math.round(Math.abs(driving.speed) * 3.6) : 0, driving: !!driving, move: driving ? "Driving" : phase !== "ground" ? "" : curSpeed < 0.1 ? "Standing" : K.KeyC ? "Crouch" : (K.AltLeft || K.KeyN) ? "Walk" : curSpeed > 8 ? "Sprint" : "Run", helmet: Math.ceil(helmet), pack, ammo: { ...ammo }, mags: Object.fromEntries(SLOTS.filter((x) => owned[x]).map((x) => [x, owned[x]!.mag])), items: { ...items },
        busy: busyKind, busyP: busyKind ? 1 - busyT / busyDur : 0, feed: feed.map((f) => f.s), hit: hitAt, hurtAt, hurtAngle,
        reloading: reloadT > 0, reloadP: reloadT > 0 ? 1 - reloadT / reloadMax : 0, scope: ads && !!cur && !!wd(cur).scope, over, rank: alive(), phase, yaw: ((cam.rotation.y * 180 / Math.PI) % 360 + 360) % 360, fpp: !tp, alt: Math.max(0, Math.round(cam.position.y - h(cam.position.x, cam.position.z) - 1.7)),
      });
    }
  });

  (async () => {
    const want = opts.character ?? "xbot", order = [want, "xbot", "soldier", "cesium"].filter((k, n, a) => a.indexOf(k) === n) as Kind[];
    for (const k of order) { // the chosen body first, then the rest for the bots
      try { models[k] = await B.SceneLoader.LoadAssetContainerAsync("/assets/", CHAR_FILES[k], scene); } catch (e) { console.warn(CHAR_FILES[k] + " failed", e); }
    }
    try { gunAsset = await B.SceneLoader.LoadAssetContainerAsync("/assets/guns/", "lightning.glb", scene); } catch (e) { console.warn("gun model failed", e); }
    try {
      const pcont = await B.SceneLoader.LoadAssetContainerAsync("/assets/", "aerobatic_plane.glb", scene);
      pcont.addAllToScene();
      const root = pcont.meshes[0] as B.TransformNode, { min, max } = root.getHierarchyBoundingVectors(true);
      const big = Math.max(max.x - min.x, max.y - min.y, max.z - min.z), holder = new B.TransformNode("ph", scene);
      root.parent = holder; holder.scaling.setAll(18 / big); holder.parent = planeNode; holder.rotation.y = PLANE_YAW;
      pcont.meshes.forEach((m) => { m.isPickable = false; });
    } catch (e) { console.warn("plane model failed", e); }
    if (disposed) return;
    seedLoot();
    for (let i = 0; i < BOTS; i++) makeBot(i);
    makePlayerModel();
    populate();
  })();
  if (process.env.NODE_ENV !== "production") (window as any).__g = { cam, view, bots, tog: () => (fpp = !fpp), get pRoot() { return pRoot; }, get pAnims() { return pAnims; }, cars, get driving() { return !!driving; }, hurt, sites, models, faceOf, get rig() { return rig; }, pose, give: () => SLOTS.forEach((w) => { owned[w] = { mag: WEAPONS[w].mag }; }), K, jump, openChute, get phase() { return phase; }, loots, pickup };
  engine.runRenderLoop(() => scene.render());
  buildVM();
  return () => { disposed = true; cleanup.forEach((f) => f()); engine.stopRenderLoop(); scene.dispose(); engine.dispose(); };
}
