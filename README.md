# Survival Royale

A browser-based 3D battle-royale survival shooter built with **Babylon.js** and **Next.js**. Drop from a plane, loot weapons and gear, stay inside the shrinking blue zone and be the last one alive.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000  (or: npx next dev -p 3457)
```

Click the game to capture the mouse. Press `Esc` to pause.

## Controls

| Key | Action |
|---|---|
| **W A S D** | Move (run) |
| **Shift** + W | Sprint |
| **N** or **Alt** (hold) | Slow walk |
| **C** | Crouch |
| **Space** | Jump · jump out of the plane · open the parachute |
| **Mouse** | Aim |
| **Left click** or **F** | Fire |
| **Right click** or **Z** | Aim down sights |
| **R** | Reload |
| **1 – 5** | Weapon group: Rifles / SMGs / Shotguns / Marksman / Pistols. Press again to cycle through the guns you hold in that group |
| **Mouse wheel** | Next / previous weapon |
| **Q** | Swap back to the last weapon |
| **X** | Put the weapon away (fists) |
| **E** | Grab the highlighted item · enter / exit a car |
| **T** | Auto-pickup everything on / off (ammo is always picked up on touch) |
| **H** | Use bandage |
| **J** | Use med kit |
| **K** | Drink energy drink |
| **G** | Throw grenade |
| **V** | First / third person |
| **Tab** | Show / hide inventory |
| **/** | Show every shortcut in-game |

**Driving:** stand next to a car and press `E`. `W`/`S` gas and brake, `A`/`D` steer, `E` to get out. Driving fast into a bot kills it.

## How a match works

1. You start in a plane crossing the map. Press **Space** to jump out; the parachute opens automatically at 110 m (or press Space again earlier).
2. Land, then loot. Items lie on the ground: walk up, look for the yellow outline, press **E**.
3. A blue zone shrinks in five phases. Standing outside it hurts, and the damage grows each phase.
4. Bots hunt you. Eliminate all of them to win.

## Features

- **21 weapons** in 5 groups (pistols, SMGs, rifles, shotguns, marksman/sniper rifles) with recoil, spread, reload and weapon-swap animations, scopes and zoom levels
- **Loot:** ammo, bandages, med kits, energy drinks, grenades, helmet, body armor, backpack (raises the carry limit from 4 to 10)
- **Inventory panel** and quick-use bar showing everything you carry
- **Plane drop, skydive and parachute** with procedural body poses; procedural **crouch and jump** poses blended over the walk/run animations
- **3 playable characters** (pick one on the start screen: Operator, Soldier, Civilian) and a mix of body types, camo colours and heights for the bots
- **Drivable cars**, lakes, houses, forests, rocks, tents, grass and flowers
- **Lighting:** golden-hour sun, cascaded shadows, ambient occlusion, bloom, film grain, vignette, terrain that blends grass / dirt / rock
- First- and third-person cameras, compass, minimap, kill feed, damage-direction indicator

## Tech

Next.js 14 (App Router) · React 18 · TypeScript · Babylon.js 7 (`@babylonjs/core`, `materials`, `loaders`). The game logic lives in `lib/game.ts`; the HUD is React in `components/Game.tsx`. Sounds for gunshots and impacts are synthesised in code.

## Credits

All third-party assets live in `public/assets/`.

| Asset | Source | Licence |
|---|---|---|
| Trees, rocks, bushes, grass, flowers, tents, logs, stumps | [Kenney Nature Kit](https://kenney.nl) | CC0 |
| Footstep, pickup, cloth and equip sounds; plane engine hum | Kenney RPG Sounds and Sci-fi Sounds (via [OpenGameArt](https://opengameart.org)) | CC0 |
| Grass001, Ground037, Rock035 textures | [ambientCG](https://ambientcg.com) | CC0 |
| Sky HDRI (`kloofendal_48d_partly_cloudy_puresky`) | [Poly Haven](https://polyhaven.com) | CC0 |
| "Lightning" pump-action shotgun model | [OpenGameArt](https://opengameart.org) | CC0 |
| Soldier and Xbot character models | [Mixamo](https://www.mixamo.com), as shipped in the [three.js examples](https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf) | Mixamo terms (see note) |
| CesiumMan character | [Cesium](https://github.com/KhronosGroup/glTF-Sample-Assets) | CC-BY 4.0 |
| Aerobatic plane, wood texture | [Babylon.js sample assets](https://assets.babylonjs.com) | Babylon.js samples |

**Note on the Mixamo characters:** Mixamo lets you use its characters and animations in your own projects, but not redistribute them as standalone assets. Check Adobe's current terms before making this repository public or shipping the game, and swap those models out if needed.

Gun models other than the shotgun are built in code from simple shapes.
