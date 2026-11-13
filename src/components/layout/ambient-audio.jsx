"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import EntryScreen from "@/components/loading/entry-screen";

const AmbientAudioContext = createContext(null);

// Ambient bed level after the fade-in. HTMLMediaElement.volume is ignored on
// iOS, where the level follows the system volume instead.
const TARGET_VOLUME = 0.2;
const FADE_MS = 1600;
const FADE_STEP_MS = 40;

export function useAmbientAudio() {
  return useContext(AmbientAudioContext);
}

export default function AmbientAudio({ children }) {
  const audio = useRef(null);
  // Bumped on every play/pause so a late play() promise cannot overwrite the
  // user's newer decision.
  const gesture = useRef(0);
  const fadeTimer = useRef(0);
  const [entered, setEntered] = useState(false);
  // off | starting | on | blocked | error
  const [status, setStatus] = useState("off");
  const [message, setMessage] = useState("");

  const stopFade = useCallback(() => {
    window.clearInterval(fadeTimer.current);
    fadeTimer.current = 0;
  }, []);

  const fadeTo = useCallback((target, onDone) => {
    const element = audio.current;
    stopFade();
    const from = element.volume;
    const startedAt = performance.now();
    fadeTimer.current = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - startedAt) / FADE_MS);
      element.volume = from + (target - from) * progress;
      if (progress === 1) {
        stopFade();
        onDone?.();
      }
    }, FADE_STEP_MS);
  }, [stopFade]);

  useEffect(() => () => {
    gesture.current += 1;
    stopFade();
  }, [stopFade]);

  const play = useCallback(() => {
    const element = audio.current;
    const attempt = ++gesture.current;
    setMessage("");
    setStatus("starting");
    stopFade();
    // Asking for a playback audio session keeps the ambience audible on iOS
    // when the ring/silent switch is engaged; without it Safari mutes Web Audio
    // and media with no API to detect that.
    try {
      if (navigator.audioSession) navigator.audioSession.type = "playback";
    } catch {}
    element.volume = 0;
    // Keep play() synchronous with the user's gesture for browser autoplay rules.
    const started = element.play();
    const settle = (failure) => {
      if (attempt !== gesture.current) return;
      if (failure) {
        const blocked = failure.name === "NotAllowedError";
        setStatus(blocked ? "blocked" : "error");
        setMessage(blocked
          ? "Your browser blocked ambient sound. Use “Try again” to allow it."
          : "Ambient sound could not start. You can keep exploring and try again from the menu.");
        return;
      }
      setStatus("on");
      fadeTo(TARGET_VOLUME);
    };
    if (started?.then) started.then(() => settle(), settle);
    else settle();
  }, [fadeTo, stopFade]);

  const pause = useCallback(() => {
    gesture.current += 1;
    const element = audio.current;
    setStatus("off");
    setMessage("");
    fadeTo(0, () => element.pause());
  }, [fadeTo]);

  const toggle = status === "off" || status === "blocked" || status === "error" ? play : pause;

  // The entry screen reports when its preparation work is done. Warming the
  // media element then keeps the 4.6 MB bed from competing with the hero image
  // and fonts, so the first audible sample follows the click closely.
  const prepare = useCallback(() => {
    if (navigator.connection?.saveData) return;
    const element = audio.current;
    if (element.readyState === 0) element.load();
  }, []);

  return (
    <AmbientAudioContext.Provider value={{ enabled: status === "on", status, toggle, retry: play }}>
      <audio
        ref={audio}
        src="/audio/romansenykmusic-drone-deep-ambient.mp3"
        loop
        preload="none"
        onPlaying={() => setStatus("on")}
        onPause={() => setStatus((current) => (current === "blocked" || current === "error" ? current : "off"))}
        onError={() => {
          setStatus("error");
          setMessage(audio.current?.error?.code === 4
            ? "Ambient sound is unavailable. You can continue exploring."
            : "Ambient sound stopped unexpectedly. Try again from the menu.");
        }}
      />
      {children}
      {!entered && <EntryScreen onEnable={play} onFinished={() => setEntered(true)} onReady={prepare} />}
      {message && (
        <div role="status" className="fixed bottom-4 left-4 z-50 flex max-w-sm flex-wrap items-center gap-x-4 gap-y-2 rounded bg-ink p-4 text-sm text-paper">
          <span>{message}</span>
          {(status === "blocked" || status === "error") && (
            <button type="button" onClick={play} className="cursor-pointer underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper">Try again</button>
          )}
        </div>
      )}
    </AmbientAudioContext.Provider>
  );
}
