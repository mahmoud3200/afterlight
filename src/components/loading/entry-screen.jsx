"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LoadingScreen from "./loading-screen";

export default function EntryScreen({ onEnable, onFinished, onReady }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const ready = progress === 100;
  const announced = useRef(false);
  const fade = useRef(null);
  const dialog = useRef(null);
  const follower = useRef(null);

  useEffect(() => () => fade.current?.kill(), []);

  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    // The dialog is rendered with `open` so the entry screen covers the hero
    // from the first paint, before React hydrates. Hand it over to the browser
    // as a real modal so focus stays inside and Escape is reported via onCancel.
    element.close();
    element.showModal();
    document.body.style.overflow = "hidden";
    let cancelled = false;
    let completed = 0;
    const cleanups = [];
    const image = Array.from(document.images).find((image) =>
      image.src.includes("hero-background"),
    );
    const imageReady = new Promise((resolve) => {
      if (!image || image.complete) return resolve();
      const done = () => resolve();
      image.addEventListener("load", done, { once: true });
      image.addEventListener("error", done, { once: true });
      cleanups.push(() => {
        image.removeEventListener("load", done);
        image.removeEventListener("error", done);
      });
    });
    // Count completed preparation tasks, not invented download percentages.
    const tasks = [imageReady, document.fonts.ready];
    for (const task of tasks)
      Promise.resolve(task).finally(() => {
        if (!cancelled) {
          const nextProgress = Math.round((++completed / tasks.length) * 100);
          setProgress((previous) => Math.max(previous, nextProgress));
        }
      });
    // A failed image/font must never trap the visitor on the entry screen.
    const timeout = window.setTimeout(() => {
      if (!cancelled) setProgress(100);
    }, 8000);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      cleanups.forEach((cleanup) => cleanup());
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Let the audio bed start buffering as soon as the critical assets are done,
  // so the entry click is not followed by seconds of silence.
  useEffect(() => {
    if (!ready || announced.current) return;
    announced.current = true;
    onReady?.();
  }, [ready, onReady]);

  const followPointer = (event) => {
    if (
      event.pointerType !== "mouse" ||
      !window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const x = Math.max(
      12,
      Math.min(event.clientX + 20, window.innerWidth - 230),
    );
    const y = Math.max(
      12,
      Math.min(event.clientY + 20, window.innerHeight - 60),
    );
    follower.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    follower.current.style.opacity = "1";
  };

  const enter = () => {
    if (!ready || leaving) return;
    setLeaving(true);
    onEnable();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    fade.current = gsap.to(dialog.current, {
      opacity: 0,
      duration: reduced ? 0 : 0.6,
      ease: "none",
      onComplete: () => onFinished?.(),
    });
  };

  return (
    <dialog
      open
      ref={dialog}
      aria-labelledby="entry-title"
      className="entry-screen"
      onCancel={(event) => {
        event.preventDefault();
      }}
      onPointerMove={followPointer}
      onPointerLeave={() => {
        follower.current.style.opacity = "0";
      }}
      onClick={enter}
    >
      <LoadingScreen
        progress={progress}
        label={ready ? "Ready to explore" : "Preparing your journey"}
      >
        <div className="mt-8 flex flex-col items-center gap-4">
          <h1 id="entry-title" className="sr-only">
            Enter AfterLight
          </h1>
          <button
            autoFocus
            disabled={!ready}
            aria-disabled={leaving || !ready}
            onClick={(event) => {
              event.stopPropagation();
              enter();
            }}
            className="entry-enter min-h-12 cursor-pointer rounded-full border border-paper/50 px-8 py-3 text-sm disabled:cursor-wait disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper active:-translate-y-1"
          >
            <span className="entry-desktop-label">Click to enter</span>
            <span className="entry-touch-label">Tap to enter</span>
          </button>
          <p className="text-xs text-muted">Enter with quiet ambient sound</p>
        </div>
      </LoadingScreen>
      <span ref={follower} aria-hidden="true" className="entry-pointer">
        {ready ? "Click to enter" : "Preparing your journey"}
      </span>
    </dialog>
  );
}
