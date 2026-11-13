"""Convert Hameed's NASA_Lunar_Rover.blend to a texture-free web GLB.

Run with Blender --background --factory-startup --disable-autoexec --python
scripts/convert-lunar-rover.py -- SOURCE.blend OUTPUT.glb

The mesh is CC0; bundled texture provenance is incomplete. This conversion
deliberately replaces materials with simple PBR colors and includes no images.
"""
import bpy
import sys
from pathlib import Path

source, output = map(Path, sys.argv[sys.argv.index('--') + 1:])
bpy.ops.wm.open_mainfile(filepath=str(source.resolve()))
collection = bpy.data.collections.get('Lunar Rover')
assert collection, 'Expected Lunar Rover collection not found'
bpy.ops.object.select_all(action='DESELECT')
objects = [o for o in collection.all_objects if o.type == 'MESH']
assert objects, 'No rover meshes found'

# Replace all material graphs, excluding third-party images and procedural shaders.
for material in bpy.data.materials:
    name = material.name.lower()
    color = (0.45, 0.46, 0.48, 1)
    metallic, roughness = 0.6, 0.45
    if any(word in name for word in ('cloth', 'fabric', 'seat', 'chair')):
        color, metallic, roughness = (0.75, 0.73, 0.65, 1), 0, 0.9
    elif any(word in name for word in ('gold', 'foil')):
        color, metallic = (0.65, 0.43, 0.12, 1), 0.8
    elif any(word in name for word in ('black', 'rubber', 'solar', 'console')):
        color, metallic = (0.035, 0.04, 0.05, 1), 0.15
    elif 'white' in name:
        color, metallic = (0.8, 0.8, 0.78, 1), 0.1
    material.use_nodes = True
    nodes = material.node_tree.nodes
    nodes.clear()
    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.inputs['Base Color'].default_value = color
    bsdf.inputs['Metallic'].default_value = metallic
    bsdf.inputs['Roughness'].default_value = roughness
    out = nodes.new('ShaderNodeOutputMaterial')
    material.node_tree.links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    material.diffuse_color = color

for obj in objects:
    obj.hide_set(False)
    obj.hide_viewport = False
    obj.select_set(True)
    if len(obj.data.polygons) > 10000:
        modifier = obj.modifiers.new('Web geometry reduction', 'DECIMATE')
        modifier.ratio = 0.15
        modifier.use_collapse_triangulate = True

output.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.export_scene.gltf(
    filepath=str(output.resolve()), export_format='GLB', use_selection=True,
    export_apply=True, export_animations=False, export_cameras=False,
    export_lights=False, export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=6,
)
print('Exported', output, flush=True)
