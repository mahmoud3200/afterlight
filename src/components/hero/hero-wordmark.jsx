import Image from "next/image";
import CtaButton from "@/ui/cta-button";
import SwooshIcon from "@/ui/icons/swoosh";

export default function HeroWordmark() {
  return (
    <div className="flex w-full max-w-157.5 flex-col items-center">
      <div className="relative inline-block text-[clamp(2.5rem,5.2vw,6.25rem)]">
        <SwooshIcon className="pointer-events-none absolute top-[-1.1em] left-[0.98em] w-[4.16em]" />
        <Image
          src="/images/special-star.svg"
          alt=""
          width={45}
          height={46}
          className="pointer-events-none absolute top-[-0.5em] right-[0.7em] size-[0.59em]"
        />

        <h1
          id="hero-title"
          className={[
            "relative z-10 font-display text-[clamp(30px, 3.2vw, 100px)] leading-none whitespace-nowrap text-paper",
            // The rule under the wordmark is drawn as a pseudo-element so it
            // always matches the rendered title width.
            "before:absolute before:top-full before:left-0 before:mt-7 before:h-0.5 before:w-full before:bg-paper before:content-['']",
          ].join(" ")}
        >
          AFTER LIGHT
        </h1>
      </div>

      <p className="mt-10.5 text-center font-display text-[clamp(0.875rem,1.05vw,1.25rem)] text-muted">
        The mission ends. The legacy doesn&apos;t
      </p>

      <CtaButton href="/chapter/introduction" className="mt-5">
        Hear The Story
      </CtaButton>
    </div>
  );
}
