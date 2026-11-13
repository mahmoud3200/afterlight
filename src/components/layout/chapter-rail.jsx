"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import GradientLine from "@/ui/gradient-line";

gsap.registerPlugin(useGSAP);

export default function ChapterRail({ chapters, activeHref }) {
  const rail = useRef(null);
  const previousIndex = useRef(null);
  const ending = chapters.at(-1);
  const current = chapters.find((chapter) => chapter.href === activeHref);
  const points = [{ href: "/", label: "Home" }, current && current !== ending ? current : chapters[0], ending];
  const activeIndex = activeHref === "/" ? 0 : activeHref === ending?.href ? 2 : 1;

  useGSAP(() => {
    const previous = previousIndex.current;
    previousIndex.current = activeIndex;
    if (previous === null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const slots = Array.from(rail.current.querySelectorAll("[data-trail-point]"));
    const rings = slots.map((slot) => slot.querySelector("[data-trail-ring]"));
    const dots = slots.map((slot) => slot.querySelector("[data-trail-dot]"));
    const lines = rail.current.querySelectorAll("[data-trail-line]");
    const offset = slots[previous].getBoundingClientRect().top - slots[activeIndex].getBoundingClientRect().top;
    const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    rings.forEach((ring, index) => {
      timeline.fromTo(ring, { scale: index === previous ? 1 : 3 / 7 },
        { scale: index === activeIndex ? 1 : 3 / 7, duration: 0.65, clearProps: "transform" }, 0);
    });
    timeline.fromTo(lines, { scaleY: 0.45, opacity: 0.25, transformOrigin: activeIndex < previous ? "bottom" : "top" },
      { scaleY: 1, opacity: 1, duration: 0.8, stagger: 0.06, clearProps: "transform,opacity" }, 0);
    timeline.fromTo(dots[activeIndex], { y: offset, scale: previous === activeIndex ? 0.65 : 0.45, opacity: 0.4 },
      { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity" }, 0.08);
  }, { scope: rail, dependencies: [activeHref], revertOnUpdate: true });

  return (
    <nav
      ref={rail}
      aria-label="Chapters"
      className="hidden flex-col items-center w-fit ml-8.25 lg:flex"
    >
      <ol className="flex min-h-0 flex-1 flex-col items-center">
        {points.map((chapter, index) => {
          const isActive = index === activeIndex;

          return (
            <Fragment key={index}>
              <li
                aria-hidden="true"
                className={[
                  "flex min-h-6 justify-center",
                  // The lead-in gradient runs longer than the chapter gaps.
                  index === 0 ? "flex-[1.6]" : "flex-1",
                ].join(" ")}
              >
                <span data-trail-line className="flex self-stretch"><GradientLine /></span>
              </li>

              <li data-trail-point className="relative flex size-14 shrink-0 items-center justify-center">
                <Link
                  href={chapter.href}
                  aria-label={chapter.label}
                  aria-current={isActive ? "step" : undefined}
                  className={[
                    "relative flex size-14 items-center justify-center rounded-full",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper",

                  ].join(" ")}
                >
                  <span data-trail-ring aria-hidden="true" className={`pointer-events-none absolute inset-0 rounded-full border border-paper ${isActive ? "scale-100" : "scale-[0.428571]"}`} />
                  <span data-trail-dot aria-hidden="true" className={`pointer-events-none size-9 rounded-full bg-paper ${isActive ? "opacity-100" : "opacity-0"}`} />
                </Link>
              </li>
            </Fragment>
          );
        })}

        {activeIndex !== 2 ? (
          <li
            aria-hidden="true"
            className="mt-2 flex h-[8vh] max-h-17.75 shrink-0 justify-center opacity-60"
          >
            <GradientLine fade="end" />
          </li>
        ) : null}
      </ol>
    </nav>
  );
}

