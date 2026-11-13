import GradientLine from "@/ui/gradient-line";
import Image from "next/image";
import MenuMark from "@/ui/menu-mark";

export default function SiteHeader({ onOpenMenu, menuOpen, story = false }) {
  return (
    <header className="flex items-start justify-between">
      <div className="flex items-center justify-center">
        <Image
          src="/images/logo.svg"
          alt="NASA Space Apps Challenge"
          width={152}
          height={120}
          className="h-14 w-auto md:h-20 lg:h-24"
        />
        {story ? (
          <><GradientLine orientation="horizontal" className="w-10 sm:w-20" /><span className="ml-3 text-xs tracking-[0.2em] text-paper">AFTERLIGHT</span></>
        ) : <>
        <GradientLine
          orientation="horizontal"
          className="w-[clamp(24px,12vw,186px)]"
        />
        <Image
          src="/images/special-star.svg"
          alt="NASA Space Apps Challenge"
          width={44}
          height={44}
          className="size-11"
        />
        <GradientLine
          orientation="horizontal"
          className="w-[clamp(24px,12vw,186px)]"
        />
        </>}
      </div>

      <button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-haspopup="dialog"
        aria-controls="site-menu"
        aria-expanded={menuOpen}
        onClick={onOpenMenu}
        className="mt-8.25 flex flex-col items-end gap-1.75 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-paper"
      >
        <MenuMark className="w-14.25 lg:w-18" />
      </button>
    </header>
  );
}
