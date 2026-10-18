import { parse as parseYaml } from "yaml";

export interface Page {
  slug: string;
  title?: string;
  date?: Date;
  description?: string;
  body: string;
}

const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n?---\r?\n?/;

function parsePage(path: string, raw: string): Page {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const match = raw.match(FRONT_MATTER);
  const meta = (match && parseYaml(match[1])) || {};
  return {
    slug,
    title: meta.title,
    date: meta.date ? new Date(meta.date) : undefined,
    description: meta.description,
    body: match ? raw.slice(match[0].length) : raw,
  };
}

function load(files: Record<string, string>): Page[] {
  return Object.entries(files).map(([path, raw]) => parsePage(path, raw));
}

export const posts: Page[] = load(
  import.meta.glob("/content/posts/*.md", { query: "?raw", import: "default", eager: true }),
).sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));

const topLevel = load(
  import.meta.glob("/content/*.md", { query: "?raw", import: "default", eager: true }),
);

export const home: Page = topLevel.find((p) => p.slug === "_index")!;

export const pages: Page[] = topLevel.filter((p) => p.slug !== "_index");

/** The first paragraph of a page, used as a summary in post lists. */
export function summary(page: Page): string {
  return page.description ?? page.body.trim().split(/\r?\n\s*\r?\n/)[0];
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
