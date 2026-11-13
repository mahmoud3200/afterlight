"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useAmbientAudio } from "@/components/layout/ambient-audio";

const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

export default function NarrationControl({ src }) {
  const audio = useRef(null);
  const { entered } = useAmbientAudio();
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");
  const [time, setTime] = useState({ current: 0, duration: 0 });
  useEffect(() => {
    const element = audio.current;
    if (!element || !entered) return;
    let cancelled = false;
    element.play().catch((failure) => {
      if (!cancelled && failure.name !== "AbortError") setError(failure.name === "NotAllowedError"
        ? "Your browser requires a tap to start narration." : "Narration is unavailable.");
    });
    return () => { cancelled = true; element.pause(); };
  }, [src, entered]);
  const play = () => {
    setError("");
    audio.current?.play().catch(() => setError("Narration could not start. Please try again."));
  };
  const updateTime = (event) => {
    const element = event.currentTarget;
    setTime({ current: element.currentTime, duration: Number.isFinite(element.duration) ? element.duration : 0 });
  };
  const remaining = Math.max(0, time.duration - time.current);
  const fraction = time.duration ? Math.min(1, remaining / time.duration) : 1;
  return <div className="mt-6">
    {src && <audio ref={audio} src={src} preload="metadata"
      onPlay={() => { setPlaying(true); setError(""); }} onPause={() => setPlaying(false)}
      onEnded={() => setPlaying(false)} onTimeUpdate={updateTime} onLoadedMetadata={updateTime}
      onDurationChange={updateTime} onSeeked={updateTime}
      onError={() => setError("Narration is unavailable.")} />}
    <div className="flex flex-wrap items-center gap-4">
      <button type="button" disabled={!src} aria-label={src ? playing ? "Pause narration" : "Resume narration" : "Narration coming soon"} aria-pressed={playing}
        onClick={() => playing ? audio.current.pause() : play()}
        className="group inline-flex cursor-pointer items-center gap-4 text-xs tracking-[.07em] uppercase disabled:cursor-default disabled:opacity-55">
        <span className="relative flex size-12 items-center justify-center rounded-full transition-[background-color,color,transform] group-aria-pressed:bg-paper/15 group-active:scale-90 group-active:bg-paper group-active:text-ink motion-reduce:transition-none">
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full [mask-image:radial-gradient(farthest-side,transparent_calc(100%_-_2px),black_calc(100%_-_2px))]"
            style={{ background: `conic-gradient(var(--color-paper) ${fraction * 360}deg, rgb(255 255 255 / .2) 0deg)` }} />
          {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} />}
        </span>
        <span>{src ? playing ? "Pause narration" : "Resume narration" : "Narration coming soon"}
          {src && time.duration > 0 && <span className="mt-1 block text-left text-[.65rem] text-muted tabular-nums">{formatTime(remaining)} remaining</span>}
        </span>
      </button>
      {src && <button type="button" aria-label="Replay narration" onClick={() => { audio.current.currentTime = 0; play(); }} className="cursor-pointer rounded-full p-3 transition-colors hover:bg-paper/10 active:bg-paper active:text-ink"><RotateCcw size={18} /></button>}
    </div>
    {error && <p role="status" className="mt-2 text-sm">{error}</p>}
  </div>;
}
