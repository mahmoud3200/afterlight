import GradientLine from "@/ui/gradient-line";
import Image from "next/image";
import MenuMark from "@/ui/menu-mark";
import Link from "next/link";

export default function SiteHeader({ onOpenMenu, menuOpen, story = false }) {
  return (
    <header className="flex items-start justify-between">
      <div className="flex items-center justify-center">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="AfterLight logo"
            width={152}
            height={120}
            className="h-14 w-auto md:h-20 lg:h-24"
          />
        </Link>
        {story ? (
          <>
            <GradientLine
              orientation="horizontal"
              className="hidden w-20 lg:block"
            />
            <span className="ml-3 text-xs tracking-[0.2em] text-paper">
              AFTERLIGHT
            </span>
          </>
        ) : (
          <>
            <GradientLine
              orientation="horizontal"
              className="hidden w-[clamp(24px,12vw,186px)] lg:block"
            />
            <Image
              src="/images/special-star.svg"
              alt="NASA Space Apps Challenge"
              width={44}
              height={44}
              className="hidden size-11 lg:block"
            />
            <GradientLine
              orientation="horizontal"
              className="hidden w-[clamp(24px,12vw,186px)] lg:block"
            />
          </>
        )}
      </div>

      <button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-haspopup="dialog"
        aria-controls="site-menu"
        aria-expanded={menuOpen}
        onClick={onOpenMenu}
        className="h-full flex flex-col items-center justify-center gap-1.75 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-paper"
      >
        <MenuMark className="w-14.25 lg:w-18" />
      </button>
    </header>
  );
}
