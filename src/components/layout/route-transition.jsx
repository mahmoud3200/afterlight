"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

export default function RouteTransition({ children }) {
  const element = useRef(null);
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const content = element.current.querySelector("[data-route-content]");
    gsap.fromTo(content, { opacity: 0, y: 28, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", delay: 0.18, duration: 0.85, ease: "power3.out", clearProps: "transform,opacity,filter" });
  }, { scope: element });
  return <div ref={element} className="relative h-full">
    <div data-route-content className="h-full">{children}</div>
  </div>;
}
