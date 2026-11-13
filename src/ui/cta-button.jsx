import Link from "next/link";

/**
 * The hero call to action: white pill with the layered inner/outer shadows
 * from the Figma design (node 5:178).
 */
export default function CtaButton({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex h-[39px] items-center justify-center rounded-[28px] border border-ink bg-paper px-12",
        "font-sans text-[14px] font-semibold tracking-[0.42px] whitespace-nowrap text-ink",
        "shadow-[0_4px_8px_0_rgba(0,0,0,0.37),0_2px_4px_0_rgba(0,0,0,0.13),inset_0_-2px_4px_0_rgba(147,147,147,0.85),inset_0_1px_23px_2px_#bfbfbf]",
        "hover:bg-paper/90",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper",
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
