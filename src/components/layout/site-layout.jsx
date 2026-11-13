"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import SiteBackdrop from "./site-backdrop";
import SiteHeader from "./site-header";
import ChapterRail from "./chapter-rail";
import SiteBrand from "./site-brand";
import JourneyNav from "@/ui/journey-nav";
import RouteTransition from "./route-transition";
import PageCurtain from "./page-curtain";
import SiteMenu from "@/components/menu/site-menu";

export default function SiteLayout({ children, chapters }) {
  const pathname = usePathname();
  const page = useRef(null);
  const menu = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = chapters.find((chapter) => chapter.href === pathname);
  const index = chapters.indexOf(active);
  const next = pathname === "/" ? chapters[0] : chapters[index + 1];
  const previous =
    index > 0 ? chapters[index - 1] : { href: "/", label: "Home" };
  const isHome = pathname === "/";

  return (
    <div className="relative isolate min-h-svh overflow-x-clip bg-menu-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 grain-layer"
      />
      <div
        ref={page}
        className="relative z-10 min-h-svh overflow-hidden bg-ink text-paper"
      >
        <SiteBackdrop
          key={pathname}
          src={
            isHome
              ? "/images/hero/hero-background.png"
              : active?.backgroundImage || ""
          }
        />
        <div className="relative mx-auto flex min-h-svh w-full flex-col px-5 pt-8.25 lg:pr-10">
          <div className="relative grid flex-1 grid-rows-[auto_minmax(0,1fr)_auto]">
            <SiteHeader
              story={!isHome}
              onOpenMenu={() => menu.current?.open()}
              menuOpen={menuOpen}
            />
            <div
              className={
                isHome
                  ? "grid items-stretch lg:grid-cols-[16%_minmax(0,1fr)_16%]"
                  : "grid items-stretch lg:grid-cols-[12%_minmax(0,1fr)]"
              }
            >
              <ChapterRail chapters={chapters} activeHref={pathname} />
              <main id="main-content" className="min-w-0">
                <RouteTransition key={pathname}>{children}</RouteTransition>
              </main>
              {isHome && <div aria-hidden="true" className="hidden lg:block" />}
            </div>
            <footer className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6 pb-7.5 lg:pl-8.25">
              <SiteBrand />
              <JourneyNav
                previous={isHome ? null : previous}
                next={
                  next ?? { href: "/chapter/introduction", label: "Revisit" }
                }
              />
            </footer>
          </div>
        </div>
      </div>
      <SiteMenu
        ref={menu}
        pageRef={page}
        chapters={chapters}
        onOpenChange={setMenuOpen}
      />
      <PageCurtain pathname={pathname} />
    </div>
  );
}
