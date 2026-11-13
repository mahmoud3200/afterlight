"use client";

import { useGLTF } from "@react-three/drei";

export const DRACO_DECODER_PATH = "/decoders/draco/";

// Call inside a Client Component under Suspense. Drei caches models by URL.
export function useArtifactGLTF(url) {
  return useGLTF(url, DRACO_DECODER_PATH);
}

// Preload only a chapter's upcoming assets, not the entire collection.
export function preloadArtifactGLTF(url) {
  useGLTF.preload(url, DRACO_DECODER_PATH);
}
