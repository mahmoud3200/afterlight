import GradientLine from "@/ui/gradient-line";
import Image from "next/image";

export default function SiteBrand() {
  return (
    <div className="flex items-center gap-3 md:gap-6">
      <Image
        src="/images/nasa-space-app-challenge-logo.svg"
        alt=""
        width={152}
        height={120}
        className="h-10 w-auto md:h-14"
      />
      <GradientLine className="h-10" thickness={1} />
      <p className="font-sans text-[11px] text-paper md:text-[15px]">
        A NASA Spaceapps 2026 project
      </p>
    </div>
  );
}
