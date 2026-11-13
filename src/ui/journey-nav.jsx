import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function JourneyNav({ previous, next }) {
  const linkClass =
    "flex h-full min-w-0 flex-1 items-center justify-center gap-2 px-2 py-2 text-xs sm:text-[17px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper";
  return (
    <nav
      aria-label="Story navigation"
      className={`flex h-17.75 max-w-full shrink-0 items-center overflow-hidden border-2 border-paper bg-pill ${previous ? "w-123.25 rounded-[36.5px]" : "w-71 rounded-tl-xl rounded-tr-[36.5px] rounded-br-[36.5px] rounded-bl-none"}`}
    >
      {previous && (
        <Link href={previous.href} className={linkClass}>
          <ChevronLeft size={18} />
          {previous.label}
        </Link>
      )}
      <span className={`flex h-10 shrink-0 items-center justify-center px-3 sm:px-5 ${previous ? "mx-1 border-x border-paper/40 sm:mx-2" : "ml-3"}`}>
      <Image
        src="/images/special-star.svg"
        alt=""
        width={40}
        height={40}
        className="size-8 shrink-0"
      />
      </span>
      {next && (
        <Link href={next.href} className={linkClass}>
          {next.label}
          <ChevronRight size={18} />
        </Link>
      )}
    </nav>
  );
}
