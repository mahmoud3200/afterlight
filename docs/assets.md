# AfterLight asset catalogue

Retrieved 2026-11-13. Runtime paths below are relative to `public`; use `/models/...` and `/images/artifacts/...` in the application. [asset-manifest.json](asset-manifest.json) records original URLs, byte counts, SHA-256 hashes, formats, and decoder requirements.

## Downloaded official models

| Artifact | Runtime URL | Credit | Notes |
| --- | --- | --- | --- |
| Apollo Lunar Module | `/models/apollo-lunar-module.glb` | NASA/Michael D. Carbajal | Complete mission-era vehicle; not an exact depiction of the descent stage left behind. |
| Spirit and Opportunity | `/models/spirit-opportunity.glb` | NASA/JPL-Caltech | Reuse geometry with separate mission identities, locations, and stories. |
| Viking 1 and 2 | `/models/viking-lander.glb` | NASA/Michael D. Carbajal | Generic shared lander geometry; verify mission-specific instruments and presentation. |
| InSight | `/models/insight.glb` | NASA Visualization Technology Applications and Development (VTAD) | Deployed configuration; about 22 MB, so load on demand. |
| Ingenuity | `/models/ingenuity.glb` | NASA/Brian E. Kumanchik | Mission-era model; do not present intact rotors as its final damaged condition. |
| Dawn | `/models/dawn.glb` | NASA/Brian E. Kumanchik | Deep-space chapter. |
| NEAR Shoemaker | `/models/near-shoemaker.glb` | NASA | Source page does not name an individual model author. |
| Pioneer 10 | `/models/pioneer-10.glb` | NASA/JPL/Eyes on the Solar System | Also usable as a clearly labeled visual proxy for Pioneer 11. |
| Pioneer 11 | `/models/pioneer-10.glb` | NASA/JPL/Eyes on the Solar System | Shared file, not a separately verified Pioneer 11 model. |
| Kepler | `/models/kepler.glb` | NASA/Brian E. Kumanchik; NASA/Christian A. Lopez | Deep-space chapter. |

These are original GLB downloads, not renamed archives. All nine pass binary header/version/length, JSON, mesh-presence, and embedded-resource checks. They also import successfully in Blender 5.2, including Draco decoding, and their geometry previews were visually inspected. These workbench previews do not validate textures/PBR appearance in Three.js; camera framing, physical scale, materials, and runtime rendering still need review in the implementation. Viking in particular needs scale normalization against mission dimensions.

Recheck local files with `python scripts/verify-assets.py` (Python standard library only).

NASA publishes its [3D catalogue](https://science.nasa.gov/3d-resources/) as free to download and use. Follow the [NASA image/media usage guidance](https://www.nasa.gov/nasa-brand-center/images-and-media/), retain named creator credits, and do not imply endorsement. No blanket CC0 license has been assigned to NASA assets here.

## Converted Lunar Roving Vehicle

`/models/lunar-rover.glb` is a free alternative supplied by [Hameed / OldSchool3D](https://blenderartists.org/t/nasa-lunar-rover-scene-file/1610886), converted from the vehicle-only Blender file in the linked [source archive](https://drive.google.com/drive/folders/1f9qUuz4Q7fYuOeYMCc_9tmY-30K5qGQr).

The included [license document](licenses/lunar-rover-source.pdf) assigns CC0 1.0 to the mesh and original author materials but flags incomplete provenance for some included textures. The delivered GLB contains **no source textures**: material graphs were replaced with simple PBR colors. Dense meshes were reduced and the result Draco-compressed. No lunar terrain, scene cameras, lights, or animations were exported. It is a simplified artistic representation, not a scientifically exact reconstruction or a reproduction of the original textured render.

The 8.2 MB GLB passed structural validation, reimport, and geometry-preview inspection. It still has about 1.51 million imported vertices across 132 mesh objects; profile and reduce further for mobile if necessary. Its source scale is not normalized to real-world meters. Like the compressed NASA models, it requires Draco decoding.

Reproduce using Blender 5.2 with [scripts/convert-lunar-rover.py](../scripts/convert-lunar-rover.py); its header contains the invocation. The large archive and original Blender files remain in the ignored `.asset-work` directory, outside the runtime asset collection. Preserve the author credit even though CC0 does not require attribution.

## Hero key art and brand marks

Exported from the approved hero frame (`Desktop - 1`, node 1:2) on 2026-11-13. The Figma source file is [`uQRdhMfVjV1AGkThTjxAiF`](https://www.figma.com/design/uQRdhMfVjV1AGkThTjxAiF).

| Asset | Runtime URL / location | Figma node | Notes |
| --- | --- | --- | --- |
| Hero key art | `/images/hero/hero-background.png` | 5:164 | 1672×941 source, rendered `object-cover` under a 70% black scrim inside the 1770px hero container. Artist, licence, and whether it is a photographic composite or an illustration have **not** been supplied. Do not caption it as archival NASA imagery and do not release it without a credit. |
| Hackathon logo | `/images/logo.svg` | supplied by the team | 152×120 vector mark for the NASA Space Apps Challenge. Appears in the top-left corner, in the entry/loading screen, and in the bottom-left credit lockup beside "A NASA Spaceapps 2026 project". Supplied by the team rather than exported from Figma; the challenge brand has its own usage rules, so confirm them before any external promotion. |
| Special star | `/images/special-star.svg` | 5:167 | 45×46 four-point star with the offset cross. Used at the wordmark arc and in the chapter pill. |
| Arc behind the wordmark | `src/ui/icons/swoosh.jsx` | 5:166 | Vector path reproduced exactly (white, 4px stroke) so it can be stroke-animated later. The only hand-written icon left: rail stars and chevrons come from `lucide-react`. |
| Loader star | `/images/loader/star.svg` | 42:51 | 32×32 four-point star exported from the entry/loading frame (node 42:6), centred on the wordmark rule. The 1px gradient rule (node 42:22) is drawn in CSS as `.loading-rule`, so no image is shipped for it. |

The entry/loading composition follows node 42:6: 152×120 logo, `AFTERLIGHT` in Poppins ExtraLight with 0.6em tracking, the star on the gradient rule, a 650px progress bar with a percentage, and the tagline "THE MISSION ENDS, THE LEGACY DOESN’T." in Playfair. The frame supplies a 67% state; the running implementation shows measured task progress and keeps the chapter-route loading bar indeterminate.

The large `logo11 (1) 1` overlay (node 5:200) was removed from the design at the designer's request and is intentionally not implemented. The hero key art was exported directly from Figma; the Figma MCP download quota was reached partway through, so the remaining decorative nodes were rebuilt from the exact exported geometry rather than re-exported. The former `/images/hero/orbit-logo.png` export (node 4:147) was replaced by the team-supplied hackathon logo and removed from `public`.

## Image fallbacks and unresolved models

| Artifact | Local fallback | Research result |
| --- | --- | --- |
| ALSEP | `/images/artifacts/alsep.jpg` | The supplied [Free3D listing](https://free3d.com/3d-model/alsep-apollo-experiments-8616.html) is a paid candidate. No trustworthy freely downloadable mesh was verified; use NASA imagery or a future team-made model. |
| Surveyor 3 | `/images/artifacts/surveyor-3.jpg` | No trustworthy free downloadable mesh verified. NASA archival photograph shows the Apollo 12 visit. |
| Phoenix | `/images/artifacts/phoenix.jpg` | Replaced the proposed paid [TurboSquid asset](https://www.turbosquid.com/3d-models/3d-model-phoenix-mars-lander/418936) with NASA imagery. A free [CC0 Mars Lander by argonius](https://blendswap.com/blend/16168) exists but is only roughly based on Phoenix and [requires sign-in to download](https://blendswap.com/blend/16168/download). Not downloaded. Image shows the actual vehicle in a cleanroom on Earth. |
| Sojourner | `/images/artifacts/sojourner.jpg` | [AiZity](https://aizity.com/assets/free-3d-model-download/mars-sojourner-rover-model-3d-model) returned HTTP 429 on initial attempt and retry. Its linked [original model by Dan](https://sketchfab.com/3d-models/mars-sojourner-rover-model-8b3810e7cd804bd6b0009520c67984c6) is CC BY 4.0. Download remains outstanding; fallback is NASA/JPL's PIA00621 color mosaic. |

The Sojourner mirror describes both CC BY 4.0 and separate editorial/brand restrictions; retain the original creator/license link and check the actual downloaded package before redistributing. If obtained, credit “Mars Sojourner Rover Model” by Dan, link [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), and list any conversions or other changes. Do not claim the blocked file is present.

Images are useful fallbacks and modeling references, not 3D representations. FR-03 remains open for image-only artifacts. Keep NASA photographic/processed-image captions accurate; do not describe a mosaic as a single exposure or a cleanroom photo as a Mars surface image.

## Three.js integration

GLB is glTF 2.0 with binary data packaged into one file. Apollo Lunar Module, Ingenuity, Dawn, NEAR Shoemaker, Pioneer, Kepler, and the converted Lunar Rover require `KHR_draco_mesh_compression`. Spirit/Opportunity, Viking, and InSight do not require Draco in the downloaded files. Three.js, Fiber, Drei, and local decoder files are now installed; see [the setup guide](three-setup.md) and the shared `useArtifactGLTF` helper. `npm run assets:draco` refreshes decoder JS/WASM and license files from the installed release.

Equivalent low-level integration using the installed Three.js package:

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const draco = new DRACOLoader();
draco.setDecoderPath('/decoders/draco/');
const loader = new GLTFLoader();
loader.setDRACOLoader(draco);
const gltf = await loader.loadAsync('/models/apollo-lunar-module.glb');
scene.add(gltf.scene);
```

Run this inside client-side scene lifecycle code with error handling, stale-load cancellation, and resource cleanup. Measure bounds before setting the camera; do not assume all source units/origins are consistent. Share immutable source assets where practical, clone scene instances deliberately, and dispose only resources no remaining instance uses.

For future conversions: open `.blend` with automatic Python execution disabled; select the intended hardware rather than its entire environment; bake unsupported procedural materials as needed; export glTF Binary with embedded textures; preserve credits; verify the exported geometry/materials visually. Do not put multi-gigabyte source archives in `public`.


## Menu grain texture

- Runtime file: `/images/grains-effect.png`, supplied by the team, 250x250 PNG.
- Reference: [menu frame](https://www.figma.com/design/uQRdhMfVjV1AGkThTjxAiF/Untitled?node-id=11-5).
- Treatment: original tile repeated at 250 CSS pixels, 15% opacity, multiply blend, behind content. No image transformations.
- Original author, source download, and redistribution terms have not been supplied; provenance remains unresolved. This is a decorative design asset, not NASA imagery.


## Ambient audio

- Runtime file: `/audio/romansenykmusic-drone-deep-ambient.mp3` (4,610,925 bytes), supplied by the team.
- Use: looping background ambience faded in to 20% volume after an explicit user gesture; persists across client-side chapter navigation. No audible autoplay is attempted before the entry click, because browsers block it — a blocked or failed start is reported in the menu and in an actionable status message. Independent menu toggle; not narration.
- No conversion or trimming performed. The filename suggests a creator credit, but original source URL, confirmed author, and license have not been supplied; attribution and redistribution terms remain unverified.
- Chapter route loading uses an indeterminate fallback. Model loading/progress is not connected yet; FR-17/FR-18 require scene integration when chapters receive 3D assets.


## Chapter runtime integration — 2026-11-13

- Shared chapter layout follows Figma node `22:148`; the model replaces the static cutout in that design. No Figma screenshot is used as page content.
- Team-supplied `/images/chapter/moon-background.png` and `/images/chapter/mars-background.png` provide artistic background scenery. Moon reference: Figma node `38:194`; Mars export/source details and original artist/license are not supplied. These are not treated as documentary landing-site photographs.
- All ten local GLBs are connected and were observed rendering in the browser: Apollo LM, Lunar Rover, Viking, Spirit/Opportunity, InSight, Ingenuity, Dawn, NEAR, Pioneer, Kepler. Geometry is centered and normalized at runtime; source bytes remain unchanged. Framing and lighting are artistic, not mission-scale measurements.
- Pointer orbit/zoom and focusable keyboard arrow/plus/minus/Home inspection are available, with no visible inspection toolbar. AABB camera fitting responds to viewport size. Loading uses an indeterminate line, a 30-second timeout, error boundary, context-loss fallback, and retry. Context loss and timeout have not been fault-injected during this pass.
- Model geometry/material/texture caches are released 15 seconds after their final viewer unmounts, allowing rapid reuse of shared twin models. No collection-wide preloading.
- ALSEP, Surveyor 3, Sojourner, and Phoenix remain image fallbacks; their FR-03 3D coverage gaps remain open. Pioneer 11 is visibly labeled as a Pioneer 10 proxy. The Apollo LM is labeled as the complete mission-era vehicle.
- Narrative audio paths are deliberately empty, pending ElevenLabs recordings. No narration coverage is claimed. Ambient audio remains separate.
- Verified: production route generation; all content/asset paths; model loading across all ten GLBs; selected orbit controls; object switching; image fallback rendering; introduction/ending without scene imagery; transcript fade removal at scroll end. Full mobile hardware performance, reduced-motion device testing, narration playback, and exhaustive error injection remain outstanding.


## Chapter backgrounds — 2026-11-14

- Team-supplied space artwork: `/images/chapter/space-background.png`, from attachment `codex-clipboard-4f353c4c-76e0-4171-967f-42281ab4edf9.png`. Used by chapters 8–10; replaces the Hubble star field.

Original image copied unchanged; CSS cover cropping and darkening apply. Original author, source URL, and license were not supplied. Artistic scenery including Earth and hardware is not evidence of featured spacecraft locations.

Model inspection (FR-08/19): slower orbit/zoom, softer damping, grab/grabbing cursors, slow idle orbit paused by pointer/zoom/keyboard inspection and resumed after two seconds. Reduced-motion preference disables idle rotation. Image-only FR-03 gaps remain unchanged.


## Introduction background — 2026-11-14

Team-supplied `/images/chapter/introduction-background.jpg`, from attachment `codex-clipboard-6f791545-02c7-49e7-b897-c9584a9c4f2f.jpg`. Copied unchanged; existing cover cropping and dark overlay apply. Original author, source URL, and license were not supplied. Decorative space imagery, not documentary mission evidence.

## Ending background — 2026-11-14

Team-supplied `/images/chapter/ending-background.jpg`, from `Gemini_Generated_Image_fezf3dfezf3dfezf.jpg`. Generated artwork per supplied filename; artistic rover illustration, not documentary mission imagery. Copied unchanged; existing cover cropping and dark overlay apply. Original license and redistribution terms were not supplied.
