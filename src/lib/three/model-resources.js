import { useGLTF } from "@react-three/drei";

const retained = new Map();

// Keep a short reuse window for rapid navigation and shared twin-spacecraft
// meshes, then release the GPU resources and the loader's cache together.
export function retainModel(url, scene) {
  const record = retained.get(url) ?? { users: 0, timer: null };
  clearTimeout(record.timer);
  record.users += 1;
  retained.set(url, record);
  return () => {
    record.users -= 1;
    if (record.users > 0) return;
    record.timer = setTimeout(() => {
      const disposed = new Set();
      const dispose = (resource) => {
        if (!resource || disposed.has(resource)) return;
        disposed.add(resource);
        resource.dispose?.();
      };
      scene.traverse((object) => {
        dispose(object.geometry);
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        for (const material of materials) {
          if (!material) continue;
          for (const value of Object.values(material)) if (value?.isTexture) dispose(value);
          dispose(material);
        }
      });
      useGLTF.clear(url);
      retained.delete(url);
    }, 15000);
  };
}
