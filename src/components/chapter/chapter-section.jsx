"use client";
import { useState } from "react";
import ArtifactViewer from "./artifact-viewer";
import NarrationControl from "./narration-control";
import StoryTranscript from "./story-transcript";
import StorySources from "./story-sources";
import "@/components/loading/loading.css";
export default function ChapterSection({ chapter }) {
  const [selected, setSelected] = useState(0);
  const artifact = chapter.artifacts[selected];
  const text = artifact?.text ?? chapter.text;
  return <section className={`grid grid-cols-1 items-center gap-8 pt-8 pb-10 [&_:is(button,a,summary,[tabindex]):focus-visible]:outline-2 [&_:is(button,a,summary,[tabindex]):focus-visible]:outline-paper [&_:is(button,a,summary,[tabindex]):focus-visible]:outline-offset-4 ${artifact ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[2vw]" : "mx-auto min-h-[66svh] max-w-[900px]"}`} aria-labelledby="chapter-title">
    <div className="min-w-0">
      <p className="flex flex-wrap items-center gap-4 text-[.65rem] tracking-[.12em] text-muted uppercase md:text-xs">{chapter.label}{chapter.region !== chapter.label && <><span aria-hidden="true" className="h-px w-12 bg-muted" />{chapter.region}</>}</p>
      <h1 id="chapter-title" className="mt-4 mb-5 font-display text-[clamp(2rem,3.8vw,4.5rem)] leading-[1.08] font-bold text-balance">{artifact?.displayTitle ?? chapter.title}</h1>
      {chapter.artifacts.length > 1 && <nav aria-label="Objects in this chapter" className="mb-5 flex flex-wrap gap-2">{chapter.artifacts.map((item, index) => <button key={item.id} aria-pressed={selected === index} onClick={() => setSelected(index)} className="cursor-pointer rounded-[2rem] border border-muted px-[.8rem] py-2 text-[.7rem] aria-pressed:bg-paper aria-pressed:text-ink active:scale-95">{item.title.split(" — ")[0]}</button>)}</nav>}
      <StoryTranscript key={`text-${artifact?.id ?? chapter.id}`} paragraphs={text} unbounded={!artifact} />
      <NarrationControl key={`narration-${artifact?.id ?? chapter.id}`} src={artifact?.audio || chapter.audio} />
      {artifact && <StorySources key={artifact.id} artifact={artifact} />}
    </div>
    {artifact && <ArtifactViewer key={artifact.id} artifact={artifact} />}
  </section>;
}
