<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AfterLight project instructions

## Purpose and product direction

AfterLight is a short, immersive, chapter-by-chapter educational journey for the NASA Space Apps Challenge. Visitors discover NASA hardware left on the Moon and Mars through interactive 3D scenes, documentary-style narration, archival imagery, and readable storytelling.

**Core message: The mission may end, but its discoveries and legacy remain.**

Every story connects the hardware's original purpose, the scientific work it enabled, and its fate and lasting legacy. Write for school-age space enthusiasts in clear, engaging language; explain terminology and distinguish historical evidence from artistic reconstruction.

- Challenge: https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/?tab=details
- Required resource inventory and coverage plan: [docs/challenge-resources.md](docs/challenge-resources.md).
- Asset availability, credits, limitations, and Three.js integration: [docs/assets.md](docs/assets.md), with machine-readable records in [docs/asset-manifest.json](docs/asset-manifest.json).
- The team requires meaningful use of **all** resources listed by the challenge. This is a team requirement, not a claim that the challenge requires every resource. Track where each resource informs content; a link in credits alone is not substantive use.
- The core concept focuses on Moon/Mars. The supplied resource list also includes Dawn, NEAR Shoemaker, Pioneer 10/11, and Kepler. Cover these in a clearly labeled beyond-Moon-and-Mars extension; never locate them on the Moon or Mars. Chapter grouping and final ordering remain design decisions.

## Design collaboration and scope

The UI/UX designer is developing the experience. Follow supplied designs and approved assets when available. Preserve the intended chapter flow, typography, layout, camera framing, and interaction language. Keep temporary scaffolding clearly identified; do not invent a competing visual system or treat an asset inventory as an approved storyboard.

Priorities: **Must** = MVP essential; **Should** = important if time allows; **Could** = optional; **Won't** = excluded from this version. No explicit Won't requirements have been supplied. Do not invent exclusions or expand into unrelated features. Implement Must requirements before optional polish. Image fallback permission does not silently remove FR-03: an image-only featured object remains a documented 3D coverage gap.

## File structure

`src/app` holds the routes only. Every page and section component lives in `src/components`, grouped by feature, so the app folder stays a route map and components can be found by what they render rather than by which route happens to use them.

```
src/
├─ app/
│  ├─ layout.js                 # fonts, metadata, <html>/<body>
│  ├─ page.js                   # "/" — hero entry point
│  └─ chapter/[slug]/page.js    # SSG chapter routes
├─ components/                  # page and section components, grouped by feature
│  └─ hero/                     # hero composition
├─ ui/                          # buttons, pills and icons reused inside components
├─ hooks/                       # client hooks
├─ constants/index.js           # chapter registry — build-time data for SSG only
├─ styles/globals.css           # Tailwind entry, design tokens, base styles
└─ lib/                         # non-visual helpers (Three.js setup today)
```

- **`src/app`** — routes only: `layout.js`, `page.js`, and the chapter route. No feature components here.
- **`src/components`** — every page/section component, grouped in a folder per feature (`hero/`). A component lives with the feature that owns it and moves to a shared folder only when a second feature imports it.
- **`src/ui`** — primitives: buttons, navigation pills, icons. No page content, no data fetching, and no imports from `src/components`; a component here receives its destination through props such as `href`. Use [lucide-react](https://lucide.dev) for icons instead of hand-written SVG; keep a custom SVG only for brand artwork that lucide does not provide (the hero arc).
- **`src/hooks`** — client-only React hooks. Add a folder here only when a hook is shared; one-off logic stays with its component.
- **`src/constants/index.js`** — build-time chapter registry only: chapter order, slugs, titles, plus `chapterHref()` / `getChapter()` / `getAdjacentChapters()`. Chapter pages are prerendered from `CHAPTERS` through `generateStaticParams`. Static screens such as the hero write their copy directly in the component instead of importing this module; the root layout passes a serializable navigation list from `CHAPTERS` to the shared layout and menu.
- **`src/styles/globals.css`** — Tailwind entry, the font bridge for `next/font`, and the design tokens (`--color-ink`, `--color-paper`, `--color-muted`, `--color-scrim`, `--color-pill`). Use the generated utilities (`bg-ink`, `text-paper`, …) instead of raw hex values in components.
- **`src/lib`** — framework-agnostic helpers grouped by concern (`three/`, animation later).
- Files use kebab-case and export a PascalCase default component. Runtime images live under `public/images/<feature>/` and their provenance is recorded in [docs/assets.md](docs/assets.md).
- Use `next/link` for chapter and hero navigation so transitions stay client-side (FR-05).

## Functional requirements and acceptance criteria

| ID | Priority | Required behavior |
| --- | --- | --- |
| FR-01 | Must | A clear entry point lets visitors intentionally start the experience. |
| FR-02 | Must | Visitors can reach every main story chapter through navigation. |
| FR-03 | Must | Every featured object has a 3D representation; track missing models explicitly. |
| FR-04 | Must | Each chapter conveys its essential information in readable on-screen content. |
| FR-05 | Must | Chapter navigation does not reload the entire website. |
| FR-06 | Should | Provide a clear ending and a way to revisit earlier chapters. |
| FR-07 | Must | Visitors can view featured objects in a 3D scene. |
| FR-08 | Should | Visitors can rotate or otherwise inspect objects. |
| FR-09 | Could | Important object components expose interactive information points. |
| FR-10 | Must | Camera movement and scene transitions follow the current story chapter. |
| FR-11 | Must | Main chapters include voice narration. |
| FR-12 | Must | Narration can be paused and resumed from its current position. |
| FR-13 | Must | Narration can be enabled or disabled. |
| FR-14 | Should | Ambient audio has controls independent of narration. |
| FR-15 | Should | Visitors can replay the current chapter's narration. |
| FR-16 | Must | All narrated information is also available as readable text. |
| FR-17 | Must | Show a loading interface while essential 3D assets load. |
| FR-18 | Should | Report actual loading progress when measurable; otherwise use an indeterminate indicator. |
| FR-19 | Must | Navigation controls and current state provide clear feedback. |
| FR-20 | Should | When 3D is unavailable, offer a meaningful image/text experience with usable navigation. |

## Implementation principles

- This repository uses Next.js App Router, React, JavaScript, Tailwind, Three.js, React Three Fiber, and Drei; source lives in `src/app`, public assets in `public`. Use npm and preserve `package-lock.json`. Inspect `package.json` before selecting commands or dependencies. Read [docs/three-setup.md](docs/three-setup.md) for scene integration and the local Draco loading helper.
- Read the installed Next.js documentation before implementation. Keep the generated block above intact and put project guidance outside its markers.
- Keep browser-only rendering, audio, and interaction behind appropriate Client Component boundaries. Keep content readable independently of WebGL initialization.
- Model chapters as structured content with stable IDs, artifact references, narrative text/transcript, audio, source citations, and camera/scene cues. Keep mission content separate from rendering logic.
- Use one authoritative active-chapter state to coordinate text, scene, camera, and narration. Cancel stale loading/transition callbacks on navigation; stop outgoing narration so voices never overlap. Preserve user audio preferences between chapters.
- Start audio only after an intentional user gesture; handle blocked playback and missing audio without blocking reading/navigation. Pause/resume and enable/disable are distinct controls. Do not use narration completion as the only way to advance.
- Prefer reusable scene infrastructure and lazy loading of current/adjacent chapter assets. Do not preload the entire model collection at entry. Dispose resources when no longer needed and avoid duplicate downloads for shared models.
- Use GLB/glTF 2.0 with Three.js GLTFLoader; consult the manifest for required decoders. Never rename OBJ, Blender, or USDZ files to `.glb`. Preserve provenance when converting or optimizing.
- Handle loading failures, unsupported WebGL, and context loss. Do not leave visitors in an infinite loading screen. Offer retry and readable fallback where implemented.
- Support keyboard navigation, visible focus, semantic buttons, accessible names, adequate contrast, responsive text, and reduced-motion preferences. Essential information must not exist only in canvas, sound, hover, or animation.

## Scientific and asset integrity

- Use primary NASA mission/resource pages and NSSDCA for facts. Record claim-level sources for dates, discoveries, instruments, final locations, and operational status. Avoid invented quotations, exact locations, or unsupported claims of permanent/perpetual conditions.
- Distinguish end of flight, end of communication, and end of scientific operation. Distinguish a complete mission-era model from what remains today (especially the Apollo Lunar Module's descent stage).
- Shared meshes are allowed with honest labels: Spirit/Opportunity and Viking 1/2 need separate mission facts; Pioneer 11 uses a Pioneer 10 visual proxy unless replaced. Artistic illustrations and simplified reconstructions must be identified.
- Before adding assets, record source page, direct download, author/credit, license or usage policy, transformations, and limitations. Free download does not automatically establish redistribution permission. Preserve third-party attribution and do not imply NASA endorsement.
- Do not purchase models. Prefer official free assets, then clearly licensed free alternatives; use credited images when downloads/models are unavailable and retain the 3D gap in the backlog.
- Keep large source archives and tools outside runtime public folders; only serve usable models/images. Do not commit temporary downloads or Blender installation files.

## Verification and handoff

For implementation changes run `npm run lint` and `npm run build` when applicable; report failures or environmental blockers honestly. For documentation/asset-only work, check links, paths, file signatures, model dependencies, credits, and manifest consistency instead of claiming application tests prove asset rendering.

Before calling the experience MVP-ready, manually verify start → every chapter → ending/revisit, no full reloads, interrupted/rapid navigation, camera/text synchronization, narration pause/resume/toggle, complete transcripts, loading and error states, mobile layout, keyboard use, and reduced motion. Verify the Should features that were implemented separately. Test actual model rendering, textures, orientation, and scale; structural GLB validation alone is insufficient.

Describe what changed, which FR IDs are covered, what was actually verified, and any remaining missing assets/content. Keep resource coverage and asset status current. Do not mark planned content, downloaded models, or temporary fallbacks as completed product functionality.
