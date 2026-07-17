# ru2ya — SEO Implementation Brief
### For the AI Coding Agent Building the Website

Read this alongside `README.md` (the main build brief). This document covers everything
needed to make the ru2ya site rank as well as technically possible **given it's a static,
backend-free React single-page site.** Follow every section — SEO on a client-rendered
SPA fails silently if any one of these is skipped (crawlers may see a blank page).

---

## 0. The core problem to solve first: React SPAs are bad for SEO by default

A plain Vite/React SPA renders an empty `<div id="root">` in the initial HTML and builds
the page with JavaScript. Google can usually execute JS and index it, but:
- Other bots (Bing, LinkedIn, Facebook, Twitter/X preview crawlers, some AI crawlers)
  often do **not** execute JS reliably, so they see nothing — no title, no description,
  no preview image.
- Time-to-first-contentful-paint for crawlers is worse, which can hurt ranking.

**Fix: pre-render the site to static HTML at build time.** Since this project has no
backend and no dynamic per-user data, this is fully compatible with the "static-only"
requirement — it just means the build step outputs real HTML instead of relying purely
on runtime JS.

Use **`vite-plugin-ssr`** or, simpler for a single-page site, **`vite-plugin-prerender`**
/ **`@prerenderer/rollup-plugin`** to generate fully-formed static HTML for the page (and
for each in-page anchor section if they're ever split into real routes later). If none of
these plugins integrate cleanly, the fallback is **`react-snap`** run as a
`postbuild` script — it launches headless Chrome against the built `dist/`, executes the
React app, and writes the final rendered HTML back to disk. Either approach must produce
a `dist/index.html` that already contains the real headline, nav text, and meta tags
without needing JS to run — view-source should show real content, not an empty root div.

If the agent genuinely cannot get a prerender step working, the fallback minimum is: put
all critical SEO tags (title, meta description, Open Graph, JSON-LD) directly and
statically in `index.html` (not injected via JS/react-helmet only) — see section 2.

---

## 1. Information Architecture & Keywords

The site is a single scrolling page (per the main brief), which is actually good for SEO
consolidation — all authority accumulates on one URL rather than being split. Make sure:

- One clear **H1** exists exactly once, on the hero, containing the primary value
  proposition (not just the brand name). Example direction: an H1 like
  "Web & Software Solutions That Bring Your Vision to Life" communicates both the
  service and ties to the رؤية/vision meaning — adjust wording but keep it descriptive,
  not just "ru2ya".
- Each section (Services, About, Portfolio, Contact) uses exactly one **H2**, with **H3**s
  for individual service/portfolio items. Never skip levels (no H2 straight to H4).
- Target keyword themes to weave naturally into headings/body copy (do not keyword-stuff):
  - "web design agency", "custom software development", "e-commerce website
    development", "web & software solutions", and a **local-intent variant** —
    "web development Algeria" / "software company Algeria" — since this is a real
    services business with a real location. Ask the human for the exact city/region if
    local SEO matters, and include it naturally in the About/Contact copy and structured
    data (see section 4).
- Anchor link text in the nav should match section headings closely (e.g. nav link
  "Services" → section H2 "Our Services") — consistency between nav labels, URL
  fragments (`#services`), and heading text is a minor but real ranking signal.

---

## 2. Meta Tags (in `index.html`, static — not only via JS)

Set these directly in the `<head>` of `index.html` so they exist even before/without JS
execution:

```html
<title>ru2ya — Web & Software Solutions</title>
<meta name="description" content="ru2ya builds fast, modern websites and custom software for businesses — from web design to full-stack applications. Turn your vision into reality." />
<link rel="canonical" href="https://www.ru2ya.com/" />
<meta name="robots" content="index, follow" />
<meta name="theme-color" content="#134369" />
<link rel="icon" type="image/png" href="/favicon.png" />
```

(Replace the domain placeholder `https://www.ru2ya.com/` with the real domain once the
human confirms it — search-replace every occurrence across this file and the sitemap.)

Keep the `<title>` under ~60 characters and the meta description under ~155 characters so
neither gets truncated in search results.

### Open Graph & Twitter Card (for social link previews — also crawled by many bots)

```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="ru2ya" />
<meta property="og:title" content="ru2ya — Web & Software Solutions" />
<meta property="og:description" content="Websites and custom software, built with precision. See what ru2ya can build for you." />
<meta property="og:url" content="https://www.ru2ya.com/" />
<meta property="og:image" content="https://www.ru2ya.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="ru2ya — Web & Software Solutions" />
<meta name="twitter:description" content="Websites and custom software, built with precision." />
<meta name="twitter:image" content="https://www.ru2ya.com/og-image.png" />
```

Create a dedicated **1200×630px `og-image.png`** social preview image (logo + tagline on
the brand gradient background) and place it at the site root (`public/og-image.png`) —
do not just reuse the raw transparent logo file, it won't fill the preview frame
correctly.

If the page ever has more than one real route in the future, use
**`react-helmet-async`** to manage per-route tags dynamically — but combine it with the
prerendering step from section 0 so tags still exist in the static HTML output, not only
after hydration.

---

## 3. Semantic HTML & Content Quality

- Use real semantic tags: `<header>`, `<nav>`, `<main>`, `<section>` (one per site
  section, each with an `id` matching its nav anchor and an `aria-labelledby` pointing to
  its heading), `<footer>`.
- Every meaningful image needs descriptive `alt` text (e.g. portfolio screenshots:
  `alt="Screenshot of an e-commerce website built by ru2ya"`, not `alt="image1"`).
  Decorative-only elements (background blobs, icon dividers) get `alt=""` or
  `aria-hidden="true"` so they don't dilute crawlable content with noise.
- Write real, unique body copy for each section (not just short marketing fragments) —
  search engines reward substantive, unique text. Aim for the About section especially to
  have a genuine paragraph (60–120 words) about the studio's approach, not just a tagline.
- Avoid content hidden behind interactions that never render text into the DOM at all
  (e.g., don't put important copy only inside a canvas/image with no text alternative).

---

## 4. Structured Data (JSON-LD)

Add this to `index.html` `<head>` (static, not JS-injected) so crawlers get an explicit,
unambiguous description of the business. Use `Organization` (or `ProfessionalService` if
the human wants to lean into "agency" positioning) plus a `WebSite` entry:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "ru2ya",
  "description": "ru2ya builds websites and custom software for businesses.",
  "url": "https://www.ru2ya.com/",
  "logo": "https://www.ru2ya.com/logo.png",
  "image": "https://www.ru2ya.com/og-image.png",
  "sameAs": [
    "https://www.instagram.com/ru2ya",
    "https://www.linkedin.com/company/ru2ya"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "DZ"
  }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ru2ya",
  "url": "https://www.ru2ya.com/"
}
</script>
```

Notes:
- Replace the `sameAs` links with the real social profile URLs once known (drop any that
  don't exist — don't leave placeholder links live).
- If the human gives a specific city, add `"addressLocality"` and `"addressRegion"` to
  the `PostalAddress` block for stronger local search relevance.
- Validate the final markup with Google's Rich Results Test before shipping.

---

## 5. Technical SEO Files

Create these in `public/` so they're served at the domain root untouched by the build:

**`public/robots.txt`**
```
User-agent: *
Allow: /

Sitemap: https://www.ru2ya.com/sitemap.xml
```

**`public/sitemap.xml`** (single-page site — one URL entry; expand if real routes are
added later)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.ru2ya.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

Submit both to Google Search Console and Bing Webmaster Tools after launch (manual step
for the human — note it in the final handoff, it can't be automated from the codebase).

---

## 6. Performance (Core Web Vitals directly affect ranking)

- Serve the logo and any portfolio images as compressed **WebP** (with a PNG/JPEG
  fallback via `<picture>` if broad compatibility matters) — never ship unoptimized
  multi-MB PNGs.
- Lazy-load below-the-fold images (`loading="lazy"` on `<img>` tags for Portfolio
  section images; the Hero logo/above-the-fold assets should NOT be lazy-loaded).
- Self-host fonts via the `@fontsource/*` packages already specified in the main brief
  (avoids extra DNS/round-trip to Google Fonts CDN) and use `font-display: swap` so text
  isn't invisible while fonts load.
- Code-split any heavy non-critical libraries; keep the initial JS bundle lean since this
  is a one-page site — there's no reason for a large bundle.
- Avoid layout shift: set explicit width/height (or `aspect-ratio`) on all images and
  embedded media so the browser reserves space before the image loads.
- Run a Lighthouse pass before final handoff and target 90+ on Performance, Accessibility,
  Best Practices, and SEO categories; fix whatever it flags.

---

## 7. Analytics Hook (optional, human decides)

Leave a clearly commented placeholder in `index.html` or a small `analytics.js` for
adding Google Search Console verification (`<meta name="google-site-verification" ...>`)
and an analytics snippet (e.g. Plausible or GA4) later — do not wire up a real tracking ID
without the human providing one, but make it a one-line drop-in so it's not forgotten.

---

## 8. Final Pre-Launch SEO Checklist

- [ ] `dist/index.html` contains real, rendered text content when viewed via "view page
      source" (prerendering confirmed working, not just an empty root div)
- [ ] Title, meta description, canonical, Open Graph, Twitter Card all present and
      accurate with the real domain
- [ ] `og-image.png` (1200×630) created and referenced
- [ ] JSON-LD structured data present and validated
- [ ] `robots.txt` and `sitemap.xml` present at the domain root
- [ ] Exactly one H1; logical H2/H3 hierarchy; no skipped heading levels
- [ ] All images have meaningful `alt` text (or are marked decorative)
- [ ] Lighthouse SEO + Performance scores both 90+
- [ ] Real domain confirmed and all placeholder URLs replaced throughout the codebase
