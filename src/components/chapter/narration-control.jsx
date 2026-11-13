"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
export default function NarrationControl({ src }) {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const element = audio.current;
    return () => element?.pause();
  }, [src]);
  const play = () => { setError(""); audio.current.play().catch(() => setError("Narration could not start. Please try again.")); };
  return <div className="mt-6">
    {src && <audio ref={audio} src={src} preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => setError("Narration is unavailable.")} />}
    <div className="flex flex-wrap items-center gap-4"><button disabled={!src} onClick={() => playing ? audio.current.pause() : play()} className="narration-button"><span className="flex size-12 items-center justify-center rounded-full border border-paper">{playing ? <Pause size={18} /> : <Play size={18} />}</span>{src ? playing ? "Pause narration" : "Listen to the story" : "Narration coming soon"}</button>{src && <button aria-label="Replay narration" onClick={() => { audio.current.currentTime = 0; play(); }} className="p-3"><RotateCcw size={18} /></button>}</div>
    {error && <p role="status" className="mt-2 text-sm">{error}</p>}
  </div>;
}
