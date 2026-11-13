"use client";

import { useEffect, useRef, useState } from "react";

export default function StoryTranscript({ paragraphs }) {
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
    <div ref={container} data-overflow={hasMore} className="chapter-transcript" tabIndex={0} role="region" aria-label="Complete story text">
      <div ref={content}>{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
    </div>
  );
}
