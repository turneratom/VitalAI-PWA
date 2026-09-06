import { readFile } from "fs/promises";
import path from "path";

const contentRoot = path.join(process.cwd(), "content");

export async function readChapterMarkdown(bookSlug: string, chapterNumber: number) {
  const file = path.join(
    contentRoot,
    "books",
    bookSlug,
    "chapters",
    `${String(chapterNumber).padStart(2, "0")}.md`,
  );
  return readFile(file, "utf8");
}

export async function readFilmFile(bookSlug: string, name: "treatment" | "screenplay") {
  const file = path.join(contentRoot, "books", bookSlug, "film", `${name}.md`);
  return readFile(file, "utf8");
}

/** Rough print-page estimate (~250 words per page). */
export function estimatePages(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 250));
}

export function estimateWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function markdownToParagraphs(markdown: string) {
  const withoutTitle = markdown.replace(/^#\s+.+\n+/, "").trim();
  return withoutTitle
    .split(/\n{2,}/)
    .map((block) => block.replace(/\n/g, " ").trim())
    .filter(Boolean);
}
