const WORDS_PER_MINUTE = 200;

export function getReadingTime(text: string): string {
  const clean = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]*)\]\(.*?\)/g, "$1")
    .replace(/#{1,6}\s/g, "")
    .replace(/[*_~>-]/g, "")
    .replace(/\n/g, " ")
    .trim();

  const words = clean.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}
