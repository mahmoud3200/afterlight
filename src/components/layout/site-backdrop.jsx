import Image from "next/image";

export default function SiteBackdrop({ src = "/images/hero/hero-background.png" }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 isolate">
      {src && <Image
        src={src}
        alt=""
        fill
        preload
        sizes="(min-width: 1770px) 1770px, 100vw"
        className="object-cover"
      />}
      <div className="absolute inset-0 bg-ink/40" />
      <div className="grain-layer" />
    </div>
  );
}
