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
