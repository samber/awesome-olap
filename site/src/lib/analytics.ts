// Analytics and search-engine identifiers for the public site.
//
// Kept in one module because they are consumed from two places that cannot share a
// layout: `Base.astro` (the homepage) and `[category].astro` (the section pages),
// which builds its own `<head>`.

// GA4 measurement ID for the Awesome OLAP property.
export const GA4_MEASUREMENT_ID = 'G-VEXMKE0FH4';

// Google Search Console ownership token for the `https://samber.github.io/awesome-olap/`
// URL-prefix property. Google re-checks this tag periodically: removing it un-verifies
// the property and silently stops Search Console reporting, so it must stay on every page.
export const GSC_VERIFICATION_TOKEN = '0eAhRs43bpa9oRa-zAVjWLYK93eKcZZztlnF3Vq_4BE';

// PostHog project "awesome-olap" (org samber-oss2, project 592294). This is a
// publishable client-side key, not a secret — PostHog expects it in page source.
export const POSTHOG_PROJECT_KEY = 'phc_xohem34so4VhPQUXLp56cb82r8t4hqvX52JMecfKvkxb';

// First-party reverse proxy in front of PostHog's ingestion endpoint. Sending events to
// a samber.dev host instead of *.i.posthog.com keeps them off tracking-protection
// blocklists, which otherwise drop a large share of traffic from this audience.
export const POSTHOG_API_HOST = 'https://hogpost3.samber.dev';

// PostHog Cloud US region — where the project actually lives. Only used to build in-app
// links; no event data is sent here directly.
export const POSTHOG_UI_HOST = 'https://us.posthog.com';
