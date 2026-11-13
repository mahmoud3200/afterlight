"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function PageCurtain({ pathname }) {
  const curtain = useRef(null);
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(curtain.current, { scaleX: 1 }, {
      scaleX: 0, transformOrigin: "right center", duration: 0.7, ease: "power3.inOut",
    });
  }, { scope: curtain, dependencies: [pathname], revertOnUpdate: true });

  return <div ref={curtain} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] origin-right scale-x-0 bg-ink" />;
}
