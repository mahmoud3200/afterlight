import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function JourneyNav({ previous, next }) {
  const linkClass = "flex min-h-12 items-center gap-2 px-3 py-2 text-xs sm:px-5 sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper";
  return <nav aria-label="Story navigation" className="flex items-center rounded-full border border-paper bg-pill p-1">
    {previous && <Link href={previous.href} className={linkClass}><ChevronLeft size={18} />{previous.label}</Link>}
    <Image src="/images/special-star.svg" alt="" width={40} height={40} className="mx-1 size-8 border-x border-paper/40 px-1" />
    {next && <Link href={next.href} className={linkClass}>{next.label}<ChevronRight size={18} /></Link>}
  </nav>;
}
