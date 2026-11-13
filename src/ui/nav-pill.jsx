import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Chapter navigation pill from the hero (Figma node 3:129).
 * The hero only ever shows "next"; chapter pages use the same pill for
 * previous and next.
 */
export default function NavPill({
  href,
  label,
  direction = "next",
  className = "",
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={href}
      className={[
        "group inline-flex h-13 items-center gap-3 rounded-[36.5px] rounded-bl-none rounded-tl-xl border-2 border-paper bg-pill px-4",
        "font-sans text-base whitespace-nowrap text-paper",
        "hover:bg-ink/80",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper",
        "md:h-17.75 md:gap-4 md:text-xl",
        className,
      ].join(" ")}
    >
      {isNext ? (
        <>
          <Image
            src="/images/special-star.svg"
            alt=""
            width={45}
            height={46}
            className="size-8 shrink-0 md:size-[46.7px]"
          />
          <span aria-hidden="true" className="h-8.25 w-px bg-paper/70" />
        </>
      ) : (
        <ChevronRight
          aria-hidden="true"
          strokeWidth={3}
          className="mr-1 size-3.5 rotate-180 md:size-4.5"
        />
      )}

      <span>{label}</span>

      {isNext ? (
        <ChevronRight
          aria-hidden="true"
          strokeWidth={3}
          className="ml-auto size-3.5 md:size-4.5"
        />
      ) : null}
    </Link>
  );
}
