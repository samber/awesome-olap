import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Marked, Renderer } from 'marked';

// process.cwd() is the site/ directory when running astro build/dev
const README_PATH = resolve(process.cwd(), '..', 'README.md');

function githubSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/gu, '')  // strip emoji and non-word chars
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function preprocessMarkdown(md: string): string {
  // Strip awesome-lint pragma comments
  md = md.replace(/<!--lint\s+(disable|enable)[^>]*-->\n?/g, '');

  // Strip <div align="center"> wrappers — marked does not parse markdown inside HTML blocks,
  // so the H1 heading and badges would render as raw text. Removing the wrapper lets marked
  // process the content normally; centering is handled via CSS on the first h1.
  md = md.replace(/<div[^>]*align="center"[^>]*>\n?/gi, '');
  md = md.replace(/<\/div>\n?/gi, '');

  // Strip the top-level H1 — the hero section already provides the page's semantic H1.
  // Keeping both would result in two <h1> elements, which hurts SEO.
  md = md.replace(/^#\s+.+\n?/m, '');

  return md;
}

function renderMarkdown(md: string): string {
  // Use a fresh Marked instance per render to avoid stacking global renderer mutations.
  const slugCount = new Map<string, number>();
  const renderer = new Renderer();

  renderer.heading = function ({ text, depth }: { text: string; depth: number }): string {
    const raw = text.replace(/<[^>]*>/g, '').trim();
    let slug = githubSlug(raw);
    const count = slugCount.get(slug) ?? 0;
    slugCount.set(slug, count + 1);
    if (count > 0) slug += `-${count}`;
    return `<h${depth} id="${slug}">${text}</h${depth}>\n`;
  };

  const instance = new Marked({ renderer });
  let html = instance.parse(md, { async: false }) as string;

  // Wrap tables for responsive horizontal scroll
  html = html.replace(/<table>/g, '<div class="table-wrapper"><table>');
  html = html.replace(/<\/table>/g, '</table></div>');

  // Rewrite relative .md links to GitHub
  html = html.replace(
    /href="((?!https?:\/\/|#)[^"]+\.md)"/g,
    'href="https://github.com/samber/awesome-olap/blob/main/$1"'
  );

  return html;
}

export function getReadmeHtml(): string {
  let md = readFileSync(README_PATH, 'utf-8');
  md = preprocessMarkdown(md);
  return renderMarkdown(md);
}

export interface Section {
  slug: string;
  title: string;
  html: string;
}

// Sections that are meta/administrative and should not get their own pages.
const SKIP_SLUGS = new Set([
  'contents',
  'contributing',
  'contributors',
  'show-your-support',
]);

export function getAllSections(): Section[] {
  let md = readFileSync(README_PATH, 'utf-8');
  md = preprocessMarkdown(md);

  // Split on H2 boundary — each chunk starts with "## Heading\n"
  const chunks = md.split(/(?=^## )/m).filter(c => c.trim());

  return chunks
    .map((chunk): Section | null => {
      const match = chunk.match(/^## (.+)\n/);
      if (!match) return null;
      const rawTitle = match[1].replace(/<[^>]*>/g, '').trim();
      const slug = githubSlug(rawTitle);
      if (SKIP_SLUGS.has(slug)) return null;
      return { slug, title: rawTitle, html: renderMarkdown(chunk) };
    })
    .filter((s): s is Section => s !== null);
}
