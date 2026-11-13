"""Check local asset provenance and GLB structure without installing dependencies.

Run from any directory: python scripts/verify-assets.py
This does not replace rendering/visual QA or the Khronos glTF validator.
"""
import hashlib
import json
import struct
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def verify_glb(data):
    magic, version, declared_size = struct.unpack_from('<4sII', data)
    assert (magic, version, declared_size) == (b'glTF', 2, len(data)), 'Invalid GLB header'
    offset, chunks = 12, []
    while offset < len(data):
        length, kind = struct.unpack_from('<II', data, offset)
        offset += 8
        assert length % 4 == 0 and offset + length <= len(data), 'Invalid chunk length'
        chunks.append((kind, data[offset:offset + length]))
        offset += length
    assert offset == len(data) and chunks[0][0] == 0x4E4F534A, 'Missing JSON chunk'
    doc = json.loads(chunks[0][1])
    assert doc['asset']['version'] == '2.0' and doc.get('meshes'), 'Missing glTF meshes'
    for category in ('buffers', 'images'):
        for resource in doc.get(category, []):
            assert 'uri' not in resource or resource['uri'].startswith('data:'), 'External dependency'
    bins = [chunk for kind, chunk in chunks if kind == 0x004E4942]
    for buffer in doc.get('buffers', []):
        if 'uri' not in buffer:
            assert bins and buffer['byteLength'] <= len(bins[0]), 'Truncated binary buffer'
    for view in doc.get('bufferViews', []):
        buffer = doc['buffers'][view['buffer']]
        assert view.get('byteOffset', 0) + view['byteLength'] <= buffer['byteLength'], 'Invalid buffer view'
    return doc


def main():
    manifest = json.loads((ROOT / 'docs/asset-manifest.json').read_text(encoding='utf-8'))
    seen = set()
    for asset in manifest['assets']:
        assert asset['id'] not in seen, 'Duplicate ID'
        seen.add(asset['id'])
        path = (ROOT / 'public' / asset['path'].lstrip('/')).resolve()
        assert path.is_relative_to(ROOT / 'public'), 'Asset path escapes public'
        data = path.read_bytes()
        assert len(data) == asset['bytes'], f'{path.name}: size mismatch'
        assert hashlib.sha256(data).hexdigest() == asset['sha256'], f'{path.name}: hash mismatch'
        assert asset.get('source') and asset.get('credit'), f'{path.name}: missing provenance'
        if path.suffix == '.glb':
            doc = verify_glb(data)
            assert doc.get('extensionsRequired', []) == asset['extensionsRequired'], 'Decoder mismatch'
        elif path.suffix in ('.jpg', '.jpeg'):
            assert data.startswith(b'\xff\xd8\xff') and data.endswith(b'\xff\xd9'), 'Invalid JPEG signature'
        print(f'OK {asset["id"]}: {len(data):,} bytes')
    for artifact in manifest.get('artifacts', []):
        assert artifact['assetId'] in seen, f'{artifact["id"]}: missing asset mapping'
    print(f'Checked {len(seen)} assets. Rendering and scientific accuracy require separate review.')


if __name__ == '__main__':
    main()
