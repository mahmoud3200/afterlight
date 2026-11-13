"use client";
import { useState } from "react";
import ArtifactViewer from "./artifact-viewer";
import NarrationControl from "./narration-control";
import StoryTranscript from "./story-transcript";
import "./chapter.css";
import "@/components/loading/loading.css";
export default function ChapterSection({ chapter }) {
  const [selected, setSelected] = useState(0);
  const artifact = chapter.artifacts[selected];
  const text = artifact?.text ?? chapter.text;
  return <section className={`chapter-section ${artifact ? "" : "chapter-text-only"}`} aria-labelledby="chapter-title">
    <div className="chapter-copy">
      <p className="chapter-eyebrow">{chapter.label}{chapter.region !== chapter.label && <><span aria-hidden="true" />{chapter.region}</>}</p>
      <h1 id="chapter-title" className="chapter-title">{artifact?.displayTitle ?? chapter.title}</h1>
      {chapter.artifacts.length > 1 && <nav aria-label="Objects in this chapter" className="mb-5 flex flex-wrap gap-2">{chapter.artifacts.map((item, index) => <button key={item.id} aria-pressed={selected === index} onClick={() => setSelected(index)} className="artifact-tab">{item.title.split(" — ")[0]}</button>)}</nav>}
      <StoryTranscript key={`text-${artifact?.id ?? chapter.id}`} paragraphs={text} />
      <NarrationControl key={`narration-${artifact?.id ?? chapter.id}`} src={artifact?.audio || chapter.audio} />
      {artifact && <details className="mt-5 text-xs text-muted"><summary className="cursor-pointer py-2">Sources &amp; visual credits</summary><ul className="space-y-2">{artifact.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="underline">{source.label}</a><p>{source.claims}</p></li>)}<li><a href={artifact.assetSource} target="_blank" rel="noreferrer" className="underline">Visual source — {artifact.credit}</a></li></ul></details>}
    </div>
    {artifact && <ArtifactViewer key={artifact.id} artifact={artifact} />}
  </section>;
}
