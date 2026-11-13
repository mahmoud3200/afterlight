"use client";
import { Component, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
const ArtifactCanvas = dynamic(() => import("./artifact-canvas"), { ssr: false });
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}
export default function ArtifactViewer({ artifact }) {
  const [status, setStatus] = useState(artifact.model ? "loading" : "image");
  const [attempt, setAttempt] = useState(0);
  const ready = useCallback(() => setStatus("ready"), []);
  const failure = useCallback(() => setStatus("failed"), []);
  useEffect(() => {
    if (status !== "loading") return;
    const timeout = setTimeout(() => setStatus("failed"), 30000);
    return () => clearTimeout(timeout);
  }, [status, attempt]);
  return <figure className="artifact-viewer">
    <div aria-hidden="true" className="artifact-orbits" />
    {artifact.model && status !== "failed" ? <SceneBoundary key={attempt} onFailure={failure}><ArtifactCanvas artifact={artifact} onReady={ready} onFailure={failure} /></SceneBoundary> : artifact.image ? <div className="relative h-[min(52vh,500px)] w-full"><Image src={artifact.image} alt={artifact.caption} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-contain" /></div> : <div className="flex min-h-72 items-center justify-center px-8 text-center text-muted">The 3D view is unavailable. You can still read the complete story.</div>}
    {status === "loading" && <div className="model-loading" role="status"><span className="loading-track"><span className="loading-fill loading-fill-indeterminate" /></span><p>Loading 3D object…</p></div>}
    {status === "failed" && <button className="viewer-retry" onClick={async () => { const { useGLTF } = await import("@react-three/drei"); useGLTF.clear(artifact.model); setAttempt((value) => value + 1); setStatus("loading"); }}>Retry 3D</button>}
    <figcaption className="relative mt-4 text-center text-xs leading-relaxed text-muted">{artifact.caption}<br />Credit: {artifact.credit}</figcaption>
  </figure>;
}
