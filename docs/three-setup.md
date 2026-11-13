# Three.js setup

Installed: `three`, `@react-three/fiber` (React renderer), and `@react-three/drei` (helpers). Exact versions are in `package-lock.json`. Fiber 9 pairs with this project's React 19, as documented in the [installation guide](https://r3f.docs.pmnd.rs/getting-started/installation). See also [Drei's documentation](https://drei.docs.pmnd.rs/getting-started/introduction).

`npm install` / `npm ci` runs `postinstall` to copy Three.js's glTF Draco decoders to `public/decoders/draco`, including the Apache 2.0 license. Run `npm run assets:draco` manually after upgrades or when lifecycle scripts were disabled. These are unmodified vendor files, excluded from ESLint. Recheck the upstream license when upgrading Three.js.

Use `useArtifactGLTF` from `@/lib/three/use-artifact-gltf` to load project models with the local decoder path. `preloadArtifactGLTF` uses the same configuration. Plain Drei `useGLTF` otherwise defaults to an external decoder CDN. No models are preloaded by the helper itself.

Example scene for a future designer-approved component (not mounted on the homepage):

```jsx
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Clone, Html, OrbitControls } from "@react-three/drei";
import { useArtifactGLTF } from "@/lib/three/use-artifact-gltf";

function LunarModule() {
  const { scene } = useArtifactGLTF("/models/apollo-lunar-module.glb");
  return <Clone object={scene} />;
}

export default function ExampleScene() {
  return (
    <div style={{ height: 480 }}>
      <Canvas dpr={[1, 1.5]} fallback={<p>3D rendering is unavailable.</p>}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 8, 5]} intensity={3} />
        <Suspense fallback={<Html center>Loading model…</Html>}>
          <Bounds fit clip observe margin={1.2}>
            <LunarModule />
          </Bounds>
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
```

Canvas needs a parent with a nonzero height. Keep scene components behind `"use client"`; keep hooks using the R3F context under Canvas. Clone cached models when mounting multiple instances, and do not dispose shared cached resources while other instances use them.

Before production integration, add an error boundary with retry for asset/rendering failures, accessible inspection controls, readable chapter text, context-loss handling, and an image fallback. The example is setup guidance, not a finished implementation of FR-03/07/08/17/20. Follow the asset catalogue for credits, scale, and proxy limitations. No visual design or homepage scene was introduced by this setup.
