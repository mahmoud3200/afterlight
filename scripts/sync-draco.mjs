import { copyFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const threeRoot = path.resolve(path.dirname(require.resolve("three")), "..");
const source = path.join(threeRoot, "examples/jsm/libs/draco");
const destination = path.join(root, "public/decoders/draco");

await mkdir(destination, { recursive: true });
for (const name of ["draco_decoder.js", "draco_decoder.wasm", "draco_wasm_wrapper.js"]) {
  await copyFile(path.join(source, "gltf", name), path.join(destination, name));
}
await copyFile(path.join(source, "README.md"), path.join(destination, "README.md"));
await copyFile(path.join(root, "docs/licenses/draco-LICENSE.txt"), path.join(destination, "LICENSE.txt"));
console.log("Synced local glTF Draco decoders from the installed Three.js release.");
