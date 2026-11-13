import { Playfair, Playfair_Display, Poppins } from "next/font/google";
import "@/styles/globals.css";
import SiteLayout from "@/components/layout/site-layout";
import AmbientAudio from "@/components/layout/ambient-audio";
import { CHAPTERS, chapterHref } from "@/constants";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const playfair = Playfair({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  axes: ["opsz", "wdth"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "AfterLight — The mission ends. The legacy doesn’t",
  description:
    "Discover the NASA hardware left behind on the Moon and Mars, and the discoveries it still carries.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${playfair.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-paper">
        <AmbientAudio>
        <SiteLayout
          chapters={CHAPTERS.map((chapter) => ({
            href: chapterHref(chapter.slug),
            label: chapter.label,
            backgroundImage: chapter.backgroundImage,
            number: chapter.number,
          }))}
        >
          {children}
        </SiteLayout>
        </AmbientAudio>
      </body>
    </html>
  );
}
