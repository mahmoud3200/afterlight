import { CHAPTERS } from "./chapters";
export { CHAPTERS };
export const CHAPTER_ROUTE = "/chapter";
export function chapterHref(slug) { return `${CHAPTER_ROUTE}/${slug}`; }
export function getChapter(slug) { return CHAPTERS.find((chapter) => chapter.slug === slug) ?? null; }
export function getAdjacentChapters(slug) {
  const index = CHAPTERS.findIndex((chapter) => chapter.slug === slug);
  return { index, total: CHAPTERS.length, previous: CHAPTERS[index - 1] ?? null, next: index >= 0 ? CHAPTERS[index + 1] ?? null : null };
}
