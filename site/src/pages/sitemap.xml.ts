import type { APIRoute } from 'astro';
import { getAllSections } from '../lib/readme';

const SITE_URL = 'https://samber.github.io/awesome-olap/';
const TODAY = new Date().toISOString().slice(0, 10);

export const GET: APIRoute = () => {
  const sections = getAllSections();

  const urls = [
    `  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,
    ...sections.map(
      ({ slug }) => `  <url>
    <loc>${SITE_URL}${slug}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    ),
  ];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
};
