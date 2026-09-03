import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Every page is generated from README.md, so they all change together whenever the list
// is updated — a single site-wide lastmod and changefreq is accurate for all of them.
const BUILD_DATE = new Date();
const CHANGE_FREQUENCY = 'weekly';

// The homepage carries the full list and is the canonical entry point; section pages are
// slices of it, so they rank below it rather than against it.
const HOMEPAGE_PRIORITY = 1.0;
const SECTION_PAGE_PRIORITY = 0.8;

const HOMEPAGE_URL = 'https://samber.github.io/awesome-olap/';

export default defineConfig({
  site: 'https://samber.github.io',
  base: '/awesome-olap/',
  output: 'static',
  integrations: [
    sitemap({
      changefreq: CHANGE_FREQUENCY,
      lastmod: BUILD_DATE,
      serialize(item) {
        item.priority = item.url === HOMEPAGE_URL ? HOMEPAGE_PRIORITY : SECTION_PAGE_PRIORITY;
        return item;
      },
    }),
  ],
});
