import HeroWordmark from "./hero-wordmark";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="flex h-full items-center justify-center px-6 py-12"
    >
      <HeroWordmark />
    </section>
  );
}
