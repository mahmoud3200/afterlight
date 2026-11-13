"use client";

import { useEffect, useRef, useState } from "react";

export default function StoryTranscript({ paragraphs, unbounded = false }) {
  const container = useRef(null);
  const content = useRef(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const element = container.current;
    const update = () => setHasMore(element.scrollHeight - element.clientHeight - element.scrollTop > 2);
    const observer = new ResizeObserver(update);
    observer.observe(element);
    observer.observe(content.current);
    element.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div ref={container} data-overflow={hasMore} className={`overflow-y-auto pr-4 font-serif text-[clamp(1.1rem,1.45vw,1.7rem)] leading-[1.6] [scrollbar-width:thin] [scrollbar-color:transparent_transparent] hover:[scrollbar-color:var(--color-muted)_transparent] focus-within:[scrollbar-color:var(--color-muted)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-muted focus-within:[&::-webkit-scrollbar-thumb]:bg-muted [&_p+p]:mt-[1em] data-[overflow=true]:[mask-image:linear-gradient(to_bottom,black_45%,transparent_100%)] ${unbounded ? "max-h-none" : "max-h-[38svh] md:max-h-[27vh]"}`} tabIndex={0} role="region" aria-label="Complete story text">
      <div ref={content}>{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
    </div>
  );
}
