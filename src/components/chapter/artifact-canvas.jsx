"use client";
import { Suspense, useEffect, useId, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Bounds, Clone, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import { useArtifactGLTF } from "@/lib/three/use-artifact-gltf";
import { retainModel } from "@/lib/three/model-resources";
function Model({ artifact, onReady }) {
  const { scene } = useArtifactGLTF(artifact.model);
  const framing = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const scale = 4.3 / Math.max(size.x, size.y, size.z, 0.001);
    return { scale, position: center.multiplyScalar(-scale).toArray() };
  }, [scene]);
  useEffect(() => { onReady(); }, [onReady]);
  useEffect(() => retainModel(artifact.model, scene), [artifact.model, scene]);
  return <group rotation={artifact.camera.rotation}><group scale={framing.scale} position={framing.position} dispose={null}><Clone object={scene} /></group></group>;
}
function Controls({ controlsRef, onContextLost }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event) => { event.preventDefault(); onContextLost(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onContextLost]);
  return <OrbitControls ref={controlsRef} makeDefault enablePan={false} minDistance={2.4} maxDistance={24} enableDamping dampingFactor={0.1} />;
}
export default function ArtifactCanvas({ artifact, onReady, onFailure }) {
  const controls = useRef(null);
  const instructionsId = useId();
  const inspectWithKeyboard = (event) => {
    const orbit = controls.current;
    if (!orbit) return;
    const delta = Math.PI / 16;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") orbit.setAzimuthalAngle(orbit.getAzimuthalAngle() + (event.key === "ArrowLeft" ? -delta : delta));
    else if (event.key === "ArrowUp" || event.key === "ArrowDown") orbit.setPolarAngle(orbit.getPolarAngle() + (event.key === "ArrowUp" ? -delta : delta));
    else if (["+", "=", "-"].includes(event.key)) {
      const offset = orbit.object.position.clone().sub(orbit.target);
      offset.setLength(Math.max(orbit.minDistance, Math.min(orbit.maxDistance, offset.length() * (event.key === "-" ? 1.1 : 0.9))));
      orbit.object.position.copy(orbit.target).add(offset);
    } else if (event.key === "Home") orbit.reset();
    else return;
    event.preventDefault();
    orbit.update();
  };
  return <>
    <p id={instructionsId} className="sr-only">Drag to orbit, pinch or scroll to zoom. Keyboard: arrow keys rotate, plus and minus zoom, Home resets the view.</p>
    <div className="artifact-canvas" tabIndex={0} role="group" aria-label={`Interactive 3D representation of ${artifact.title}`} aria-describedby={instructionsId} onKeyDown={inspectWithKeyboard}>
      <Canvas dpr={[1, 1.5]} camera={{ position: artifact.camera.position, fov: 32, near: 0.1, far: 100 }} gl={{ antialias: true, alpha: true }} fallback={null}>
        <ambientLight intensity={0.3} /><hemisphereLight args={["#dceaff", "#55463a", 0.6]} />
        <directionalLight position={[5, 6, 5]} intensity={1.8} /><directionalLight position={[-4, 2, -3]} intensity={0.8} color="#c4d9ff" />
        <Environment resolution={128} frames={1}><Lightformer position={[3, 2, 5]} rotation={[0, Math.PI, 0]} scale={[6, 6, 1]} intensity={2} /><Lightformer position={[0, 5, -3]} scale={[8, 4, 1]} intensity={1.8} /><Lightformer position={[-5, 1, 2]} rotation={[0, Math.PI / 2, 0]} scale={[5, 5, 1]} intensity={1} /></Environment>
        <Suspense fallback={null}><Bounds fit clip observe margin={1.12} maxDuration={0}><Model artifact={artifact} onReady={onReady} /></Bounds></Suspense>
        <Controls controlsRef={controls} onContextLost={onFailure} />
      </Canvas>
    </div>

  </>;
}
