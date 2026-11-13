import { notFound } from "next/navigation";
import {
  CHAPTERS,
  getChapter,
} from "@/constants";
import ChapterSection from "@/components/chapter/chapter-section";

/**
 * Chapter routes are prerendered from the chapter registry, so every link the
 * hero renders resolves to a static page at build time.
 */
export function generateStaticParams() {
  return CHAPTERS.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const chapter = getChapter(slug);

  return {
    title: chapter ? `${chapter.title} — AfterLight` : "Chapter not found — AfterLight",
  };
}

export default async function ChapterPage({ params }) {
  const { slug } = await params;
  const chapter = getChapter(slug);

  if (!chapter) {
    notFound();
  }

  return <ChapterSection key={chapter.id} chapter={chapter} />;
}
