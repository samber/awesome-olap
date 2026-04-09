# CLAUDE.md — awesome-olap

## Single source of truth

**`README.md` is the only content file.** The website (`samber.github.io/awesome-olap`) is generated from it at build time. Never duplicate content between the README and the site.

- All edits go in `README.md`.
- `site/` contains only build tooling (Astro + marked). Do not add content there.
- After editing README.md, the site updates automatically on push to `main`.

## Lint

The README must pass `awesome-lint` with 0 errors before merging.

Run locally:
```
cd /tmp && mkdir -p lint-check && cd lint-check && echo '{}' > package.json && npm install awesome-lint && ./node_modules/.bin/awesome-lint /path/to/README.md
```

Key formatting rules enforced by awesome-lint:
- Every list item: `- [Name](url) - Description starting uppercase, ending in period.`
- No duplicate URLs anywhere in the file
- All headings must appear in the `## Contents` ToC
- Table pipes must be aligned

## Site (site/)

The site is a minimal Astro static site. It reads `../README.md` at build time via `site/src/lib/readme.ts`, which:
- Strips `<!--lint disable/enable-->` pragma comments
- Parses Markdown with `marked` (GFM tables + raw HTML)
- Wraps `<table>` in `<div class="table-wrapper">` for responsive scroll
- Rewrites relative `.md` links to GitHub URLs
- Generates GitHub-compatible heading slugs so ToC anchors work

To run locally:
```
cd site && npm install && npm run dev
```

To build:
```
cd site && npm run build
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy-site.yaml`, which builds the Astro site and deploys to GitHub Pages. No manual steps required.

## Adding content

1. Edit `README.md` only.
2. Keep alphabetical order within sections.
3. Follow the format: `- [Name](url) - Description.`
4. Run awesome-lint to verify 0 errors.
5. Do not edit `site/` unless changing the site's design or build tooling.
