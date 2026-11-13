import Image from "next/image";
import "./loading.css";

export default function LoadingScreen({ label = "Loading chapter…", progress, children }) {
  const measured = typeof progress === "number";
  const value = measured ? Math.max(0, Math.min(100, Math.round(progress))) : undefined;
  return (
    <div className="loading-surface">
      <div aria-hidden="true" className="grain-layer" />
      <div className="flex flex-col items-center">
        <Image
          src="/images/logo.svg"
          alt=""
          width={152}
          height={120}
          className="h-auto w-[clamp(64px,7.9vw,152px)] shrink-0"
        />
        <div className="relative mt-6 inline-block text-[clamp(20px,2.5vw,48px)]">
          <p className="font-sans leading-normal font-extralight tracking-[0.6em] whitespace-nowrap">
            AFTERLIGHT
          </p>
          <div aria-hidden="true" className="relative mt-[0.34em] h-px w-full">
            <span className="loading-rule absolute inset-0" />
            <Image
              src="/images/loader/star.svg"
              alt=""
              width={32}
              height={32}
              className="absolute top-1/2 left-1/2 size-[0.67em] -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
        <div className="mt-7 flex items-center gap-4">
          <div
            role="progressbar"
            aria-label="Preparing experience"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            className="loading-track"
          >
            <span
              className={measured ? "loading-fill" : "loading-fill loading-fill-indeterminate"}
              style={measured ? { transform: `scaleX(${value / 100})` } : undefined}
            />
          </div>
          {measured && (
            <p aria-hidden="true" className="font-sans text-[clamp(16px,1.67vw,32px)] font-extralight tabular-nums">
              {value}%
            </p>
          )}
        </div>
        <p className="mt-3 text-center font-serif text-[clamp(12px,1.25vw,24px)] text-muted">
          THE MISSION ENDS, THE LEGACY DOESN’T.
        </p>
        <p role="status" className="sr-only">{label}</p>
        {children}
      </div>
    </div>
  );
}
