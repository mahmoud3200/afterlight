import { Fragment } from "react";
import Link from "next/link";
import GradientLine from "@/ui/gradient-line";

export default function ChapterRail({ chapters, activeHref }) {
  const ending = chapters.at(-1);
  const current = chapters.find((chapter) => chapter.href === activeHref);
  const points = [{ href: "/", label: "Home" }, current && current !== ending ? current : chapters[0], ending];
  const activeIndex = activeHref === "/" ? 0 : activeHref === ending?.href ? 2 : 1;

  return (
    <nav
      aria-label="Chapters"
      className="hidden flex-col items-center w-fit ml-8.25 lg:flex"
    >
      <ol className="flex min-h-0 flex-1 flex-col items-center">
        {points.map((chapter, index) => {
          const isActive = index === activeIndex;

          return (
            <Fragment key={chapter.href}>
              <li
                aria-hidden="true"
                className={[
                  "flex min-h-6 justify-center",
                  // The lead-in gradient runs longer than the chapter gaps.
                  index === 0 ? "flex-[1.6]" : "flex-1",
                ].join(" ")}
              >
                <GradientLine />
              </li>

              <li className="relative flex size-14 shrink-0 items-center justify-center">
                <Link
                  href={chapter.href}
                  aria-label={chapter.label}
                  aria-current={isActive ? "step" : undefined}
                  className={[
                    "flex items-center justify-center rounded-full border border-paper",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper",
                    isActive ? "size-14" : "size-6",
                  ].join(" ")}
                >
                  {isActive ? (
                    <span className="size-9 rounded-full bg-paper" />
                  ) : null}
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
