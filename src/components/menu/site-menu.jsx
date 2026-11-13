"use client";

import { useImperativeHandle, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AudioLines } from "lucide-react";
import MenuMark from "@/ui/menu-mark";
import { useAmbientAudio } from "@/components/layout/ambient-audio";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const menuLinkState =
  "hover:bg-menu-ink hover:text-menu-paper focus-visible:bg-menu-ink focus-visible:text-menu-paper aria-[current=page]:bg-menu-ink aria-[current=page]:text-menu-paper transition-colors duration-200 motion-reduce:transition-none";

export default function SiteMenu({ ref, pageRef, chapters, onOpenChange }) {
  const {
    enabled: soundEnabled,
    status: soundStatus,
    toggle: toggleSound,
  } = useAmbientAudio();
  const dialog = useRef(null);
  const timeline = useRef(null);
  const previousOverflow = useRef("");
  const destination = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const finishClose = () => {
    dialog.current.close();
    document.body.style.overflow = previousOverflow.current;
    onOpenChange(false);
    if (destination.current) {
      router.push(destination.current);
      destination.current = null;
    }
  };

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        ({ conditions }) => {
          const { desktop, reduced } = conditions;
          const animation = gsap.timeline({
            paused: true,
            onReverseComplete: finishClose,
          });
          const bars = (position) => [
            ...pageRef.current.querySelectorAll(
              `[data-menu-bar="${position}"]`,
            ),
            ...dialog.current.querySelectorAll(`[data-menu-bar="${position}"]`),
          ];
          animation
            .to(
              bars("top"),
              {
                rotation: 45,
                y: 6,
                width: "100%",
                duration: reduced ? 0.01 : 0.35,
                ease: "power2.inOut",
              },
              0,
            )
            .to(
              bars("bottom"),
              {
                rotation: -45,
                y: -6,
                duration: reduced ? 0.01 : 0.35,
                ease: "power2.inOut",
              },
              0,
            );
          animation
            .to(
              pageRef.current,
              {
                xPercent: desktop ? -22.8 : 0,
                scale: desktop ? 0.946 : 1,
                borderRadius: desktop ? 61 : 0,
                opacity: desktop ? 1 : 0,
                duration: reduced ? 0.01 : 0.65,
                ease: "power3.inOut",
              },
              0,
            )
            .fromTo(
              dialog.current.querySelectorAll("[data-menu-item]"),
              { opacity: 0, y: reduced ? 0 : 18 },
              {
                opacity: 1,
                y: 0,
                duration: reduced ? 0.01 : 0.3,
                stagger: reduced ? 0 : 0.045,
                ease: "power2.out",
              },
              reduced ? 0 : 0.25,
            );
          timeline.current = animation;
          if (dialog.current.open) animation.progress(1);
        },
      );
      return () => {
        media.revert();
        if (dialog.current?.open)
          document.body.style.overflow = previousOverflow.current;
      };
    },
    { scope: dialog },
  );

  const close = () => {
    if (timeline.current?.progress() > 0) timeline.current.reverse();
    else finishClose();
  };

  useImperativeHandle(ref, () => ({
    open() {
      if (dialog.current.open) return;
      destination.current = null;
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      dialog.current.showModal();
      onOpenChange(true);
      timeline.current?.play(0);
    },
  }));

  const navigate = (event, href) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    destination.current = href === pathname ? null : href;
    close();
  };

  return (
    <dialog
      ref={dialog}
      id="site-menu"
      aria-label="Site navigation"
      className="site-menu cursor-pointer"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="menu-panel cursor-auto text-menu-ink">
        <div data-menu-item className="flex items-center justify-between gap-3">
          <button
            onClick={toggleSound}
            aria-label="Ambient sound"
            aria-pressed={soundEnabled}
            className="flex min-h-11 cursor-pointer items-center gap-2 text-xs"
          >
            <span
              aria-hidden="true"
              className="relative inline-flex size-[27px] shrink-0 items-center justify-center"
            >
              <AudioLines size={27} />
              {!soundEnabled && (
                <span className="pointer-events-none absolute h-0.5 w-8 -rotate-45 rounded-full bg-current" />
              )}
            </span>{" "}
            Music:{" "}
            {soundEnabled
              ? "on"
              : soundStatus === "blocked"
                ? "blocked"
                : soundStatus === "error"
                  ? "unavailable"
                  : "off"}
          </button>
          <button
            onClick={close}
            className="flex size-11 cursor-pointer items-center justify-center rounded-full hover:bg-menu-ink/10 active:bg-menu-ink/20 lg:hidden"
            aria-label="Close menu"
          >
            <MenuMark className="w-6" />
          </button>
        </div>
        {soundStatus === "blocked" && (
          <p data-menu-item className="mt-2 text-xs text-menu-ink/70">
            Your browser blocked sound. Press “Sound” to allow it.
          </p>
        )}
        {soundStatus === "error" && (
          <p data-menu-item className="mt-2 text-xs text-menu-ink/70">
            Ambient sound could not start. Press “Sound” to try again.
          </p>
        )}
        <nav aria-label="Main navigation" className="mt-12 lg:mt-[7vh]">
          <Link
            data-menu-item
            href="/"
            onClick={(event) => navigate(event, "/")}
            aria-current={pathname === "/" ? "page" : undefined}
            className={`${menuLinkState} block px-2 font-display text-[clamp(2rem,2.45vw,3rem)] font-semibold`}
          >
            Home
          </Link>
          <h2
            data-menu-item
            className="mt-5 font-display text-[clamp(2rem,2.45vw,3rem)] font-semibold"
          >
            Chapters
          </h2>
          <ol className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
            {chapters.map((chapter) => (
              <li data-menu-item key={chapter.href}>
                <Link
                  href={chapter.href}
                  onClick={(event) => navigate(event, chapter.href)}
                  aria-current={pathname === chapter.href ? "page" : undefined}
                  className={`${menuLinkState} flex min-h-11 w-full items-center justify-between gap-2 border-b border-menu-ink/40 px-2 py-2 text-sm xl:text-base 2xl:text-xl`}
                >
                  {chapter.label}
                  <span className="text-xs opacity-60">
                    {chapter.number
                      ? String(chapter.number).padStart(2, "0")
                      : ""}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </dialog>
  );
}
