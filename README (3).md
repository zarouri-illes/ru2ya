# ru2ya — Web & Software Solutions
### Website Build Brief for AI Coding Agent

This document is a complete brief for building the **ru2ya** marketing/portfolio website.
Read it fully before writing code. Everything here (colors, fonts, structure, animation
behavior, responsiveness rules) is a requirement, not a suggestion — follow it precisely
unless something is technically impossible, in which case pick the closest equivalent and
note the substitution in a code comment.

---

## 1. Brand Overview

- **Name:** ru2ya (stylized lowercase: `ru2ya`)
- **Meaning:** "ru2ya" is a stylized transliteration of the Arabic word **رؤية (Ru'ya)**,
  meaning **"vision."** The "2" replaces the Arabic letter ء/ع sound, a common Arabizi
  (Arabic chat alphabet) convention — this is intentional, keep it.
- **What the company does:** Building websites and custom software for clients
  (web design agency / software studio).
- **Tagline:** "Web & Software Solutions"
- **Tone:** Modern, technical, trustworthy, forward-looking. Think "vision / clarity /
  precision" — not playful or cartoonish. Premium/enterprise-lite, not corporate-stiff.
- **Logo:** Provided separately as an image asset (an eye motif built from Kufic-style
  Arabic calligraphy spelling رؤية, paired with the "ru2ya" wordmark in a flowing script,
  and "WEB & SOFTWARE SOLUTIONS" underneath in a clean uppercase sans-serif).
  Place the logo file at `src/assets/logo.png` (and export/request an SVG version if
  possible for crisp scaling — flag to the human if only PNG is available).

### Logo usage rules
- Never recolor, distort, stretch, rotate, or add drop shadows/effects to the logo file
  itself — use it as-is.
- Maintain clear space around the logo equal to roughly the height of the eye icon on
  all sides.
- On light backgrounds use the full-color logo as given. If a dark-mode/dark-section
  variant is ever needed, use a white/light monochrome version — do not attempt to
  auto-generate one with CSS filters that distort the gradient; just place it on a light
  card/container instead if no light variant exists.
- Minimum display width: 120px (icon + wordmark together) to keep the calligraphy legible.

---

## 2. Color Palette

Colors were extracted directly from the logo. Use these as CSS custom properties
(`:root` variables) so the whole site stays consistent.

| Token | Hex | Usage |
|---|---|---|
| `--color-navy` | `#134369` | Primary dark brand color. Body text on light bg, dark UI sections, headings. |
| `--color-navy-2` | `#144F79` | Secondary dark blue, gradient stops, hover states on navy elements. |
| `--color-teal` | `#21879E` | Mid-tone brand color, links, icons, secondary buttons. |
| `--color-cyan` | `#28CBD2` | Bright accent — CTAs, highlights, underlines, active states, glow effects. |
| `--color-bg` | `#F4F4F4` | Main page background (the logo's own background is this off-white, not pure white). |
| `--color-bg-alt` | `#FFFFFF` | Card/panel backgrounds, alternating sections. |
| `--color-text` | `#152B3C` | Default body text (slightly darker/neutral than navy for readability). |
| `--color-text-muted` | `#5B7285` | Secondary/muted text, captions, meta info. |
| `--color-border` | `#E2E6E9` | Hairline borders, dividers. |

### Signature gradient
The logo itself is built on a **navy → teal → cyan diagonal gradient**. Reuse this as the
site's signature gradient wherever a "hero" or "brand" moment needs emphasis (buttons,
headline text, section backgrounds, animated blobs/orbs):

```css
--gradient-brand: linear-gradient(135deg, #134369 0%, #21879E 55%, #28CBD2 100%);
```

Use this gradient sparingly and deliberately — on the primary CTA button, on key headline
text (as a background-clip: text effect), and in subtle background shapes/orbs — not on
every element, or it loses impact.

Dark mode is **not required** for v1. Build light mode only unless the human asks otherwise.

---

## 3. Typography

The logo uses two distinct type styles — mirror this pairing on the website:

1. **Wordmark/script font** (used only for the "ru2ya" logotype itself, and optionally
   for large decorative headline moments like the hero H1 if it fits the brand feel):
   a flowing, connected cursive/script typeface. Closest available Google Fonts:
   **"Yellowtail"**, **"Alex Brush"**, or **"Sacramento"** — pick whichever renders
   closest to the logo's loose calligraphic swash and use it consistently everywhere a
   script accent is needed. Do not use this font for body copy or UI — decorative only.

2. **Sans-serif** (used for the "WEB & SOFTWARE SOLUTIONS" subtitle in the logo, and for
   ALL real website UI: headings, body, nav, buttons): a clean, geometric, slightly wide
   sans with generous letter-spacing on uppercase labels.
   Use **"Poppins"** for headings/UI and **"Inter"** for body paragraphs (Inter has
   better long-form readability; Poppins gives the geometric brand feel for headings and
   nav). Both are free on Google Fonts — load via `@fontsource/poppins` and
   `@fontsource/inter` npm packages (no external `<link>` calls, since npm packages keep
   the build fully static/offline-capable) or a self-hosted `@font-face`.

### Type scale (rem, mobile-first — scale up at `md`/`lg` breakpoints via clamp())
```css
--fs-h1: clamp(2.25rem, 5vw + 1rem, 4rem);
--fs-h2: clamp(1.75rem, 3vw + 1rem, 2.75rem);
--fs-h3: clamp(1.25rem, 2vw + 1rem, 1.75rem);
--fs-body: 1rem;      /* 16px */
--fs-small: 0.875rem; /* 14px */
--fs-label: 0.8125rem; /* 13px, use with uppercase + letter-spacing: 0.08em for eyebrows/labels */
```
- Headings: Poppins, weight 600–700.
- Body: Inter, weight 400, line-height 1.6.
- Uppercase eyebrow labels/nav links: Poppins or Inter, weight 500, letter-spacing 0.08–0.12em, small size.

---

## 4. Tech Stack & Project Setup

- **Framework:** React (functional components + hooks only, no class components).
- **Build tool:** Vite (`npm create vite@latest ru2ya -- --template react`).
- **Static only — no backend, no database, no API calls.** Contact form (if included)
  should either: (a) be a `mailto:` link, or (b) post to a third-party form endpoint
  (e.g. Formspree) that the human can wire up later — leave the endpoint as a clearly
  marked placeholder constant. Do not build custom form-handling servers.
- **Routing:** This should be a **single-page site** with smooth-scroll anchor navigation
  between sections (Home/Hero, Services, About, Portfolio, Contact) — not multiple routed
  pages. If a real 404/multi-page structure is later needed, use `react-router-dom`, but
  default to single-page for v1.
- **Styling:** Plain CSS with custom properties (as defined above) organized per-component,
  or CSS Modules — either is fine, but stay consistent across the whole codebase. Do not
  mix Tailwind and hand-written CSS in the same project (pick one; hand-written CSS
  variables are preferred here since the palette/type system above is already fully
  specified and custom).
- **Animation library:** `framer-motion` for all React-driven animation (scroll reveals,
  hover/tap states, page-load sequencing, layout transitions). Use native CSS transitions
  only for very simple hover states (color/opacity changes on links).
- **Icons:** `lucide-react` for any UI icons (arrows, menu, social icons, etc.) — keep
  icon stroke-width consistent (1.5–2px) and color them with the palette tokens above.
- **Fonts:** installed via npm (`@fontsource/poppins`, `@fontsource/inter`, plus a script
  font package like `@fontsource/yellowtail`), imported in the root entry file. No CDN
  `<link>` tags.
- **Package manager:** npm.
- **No TypeScript required** unless the agent strongly prefers it — plain JSX (`.jsx`) is fine.

### Suggested folder structure
```
src/
  assets/           logo.png, favicon, portfolio screenshots/mockups (placeholders ok)
  components/
    Navbar.jsx
    Hero.jsx
    Services.jsx
    About.jsx
    Portfolio.jsx
    Contact.jsx
    Footer.jsx
    ui/             small reusable pieces: Button.jsx, SectionHeading.jsx, etc.
  styles/
    variables.css   all the CSS custom properties from section 2 & 3
    global.css      resets, base typography, utility classes
  App.jsx
  main.jsx
```

---

## 5. Site Structure & Content

Single scrolling page, sections in this order, each a full-width section with generous
vertical padding (`--space-section: clamp(4rem, 8vw, 8rem)` top/bottom):

1. **Navbar** — sticky/fixed on scroll, transparent over the hero then transitions to a
   solid `--color-bg-alt` background with a subtle bottom border once the user scrolls
   past the hero (animate this transition, don't hard-cut it). Contains: logo (small),
   nav links (Home, Services, About, Portfolio, Contact), and a CTA button ("Get in
   Touch" / "Start a Project"). Collapses into a hamburger menu with a slide-in/fade
   mobile drawer below the `md` breakpoint.

2. **Hero** — Full viewport height (or close to it). Large headline using the brand
   gradient as a `background-clip: text` effect on a key phrase (e.g. "We build your
   [vision] into reality" — with "vision" as the emphasized gradient word, tying back to
   the ru2ya/رؤية meaning). Subheading in muted text explaining the value prop in one or
   two sentences (placeholder copy is fine — write something reasonable about building
   websites and custom software for businesses). Primary CTA button + secondary
   ghost/outline button. Add an animated background: soft blurred gradient "orb" shapes
   using `--gradient-brand`, slowly drifting/pulsing with framer-motion (subtle, slow,
   large blur radius — not distracting). Logo icon (the eye) can appear large and
   semi-transparent as a background watermark, or animate in on load.

3. **Services** — 3–4 cards (e.g. "Web Design", "Custom Software", "E-Commerce",
   "Maintenance & Support" — adjust/reduce as reasonable). Each card: icon, title, short
   description. Cards animate in with a staggered fade/slide-up on scroll (framer-motion
   `whileInView`). Hover state: slight lift (`translateY(-6px)`) + shadow increase +
   border/icon color shifts toward `--color-cyan`.

4. **About** — Short section on the studio's approach/philosophy (2–3 sentences of
   placeholder copy, tone: precise, modern, client-focused). Optionally a simple stats
   row (e.g. "Projects Delivered", "Client Satisfaction", "Years Combined Experience") with
   animated count-up numbers on scroll-into-view.

5. **Portfolio** — Grid of project cards (use neutral placeholder images/mockup
   rectangles with labels like "Project One" — the human will swap in real screenshots
   later). Cards should have a subtle image zoom-on-hover and a gradient overlay with
   project name/tag appearing on hover.

6. **Contact** — Simple contact section: heading, short prompt line, and either a
   `mailto:` styled button or a minimal form (Name/Email/Message) with a clearly
   commented placeholder for the form submission endpoint. Include social/contact icons
   (email, and placeholders for socials) styled with the palette.

7. **Footer** — Small logo mark, copyright line, and repeat nav links. Solid
   `--color-navy` background with light text as the one deliberate "dark" moment on the
   page, tying back to the logo's dark tone.

All section copy can be reasonable placeholder text — the important part is structure,
styling, and animation quality, not final marketing copy (the human will refine wording).

---

## 6. Animation & Motion Requirements

Motion is a core brand requirement here, not decoration — the whole site should feel
fluid, alive, and precise. Specifics:

- **Scroll-reveal:** every section and card group animates in with `framer-motion`'s
  `whileInView` (fade + translateY of ~24px, duration ~0.6s, easing `easeOut`), staggered
  by ~0.1s per child in grids/lists. Use `viewport={{ once: true, amount: 0.2 }}` so
  animations don't re-trigger annoyingly on scroll-up.
- **Page load:** hero content (headline, subheading, buttons) should animate in
  sequentially on first load (not all at once) — headline first, then subheading, then
  buttons, ~0.15s stagger.
- **Hover/interactive states:** buttons scale slightly (1.02–1.05) and shift toward the
  cyan accent on hover; links get an animated underline that grows from 0 to full width
  (CSS `transform: scaleX()` transition, not `width`, for smoothness); cards lift with
  shadow growth.
- **Navbar:** background/blur fade-in transition on scroll (see section 5).
- **Smooth scrolling:** enable smooth anchor scrolling site-wide (`scroll-behavior:
  smooth` in CSS, plus framer-motion or a small helper for offsetting the fixed navbar
  height when jumping to an anchor).
- **Background ambience:** the drifting gradient orbs in the hero (and optionally
  repeated faintly in other sections) should use slow, continuous, looping animations
  (10–20s duration, ease `easeInOut`, alternating) — never fast or jittery.
- **Performance:** prefer animating `transform` and `opacity` only (GPU-friendly); avoid
  animating `width`/`height`/`top`/`left` directly. Respect
  `prefers-reduced-motion: reduce` — wrap heavy/ambient animations in a check and fall
  back to simple fades or no animation for users who have that OS setting enabled.

---

## 7. Responsiveness

Fully responsive, mobile-first. Breakpoints:

```css
/* mobile: default, no media query, up to 639px */
--bp-sm: 640px;   /* small tablets */
--bp-md: 768px;   /* tablets */
--bp-lg: 1024px;  /* small laptops */
--bp-xl: 1280px;  /* desktop */
```

- Layout containers: max-width `1200px`, centered, with responsive horizontal padding
  (`clamp(1.25rem, 5vw, 3rem)`).
- Services/portfolio grids: 1 column on mobile → 2 columns at `md` → 3 (or 4 for
  services) at `lg`.
- Navbar collapses to a hamburger + slide-in drawer below `md`.
- Hero headline font-size and vertical spacing scale down gracefully on small screens
  (use the `clamp()` values from section 3 rather than fixed breakpoint overrides where
  possible).
- Touch targets (buttons, nav links) minimum 44px tall on mobile.
- Test/consider layout at common widths: 375px, 768px, 1024px, 1440px.

---

## 8. Accessibility & Quality Bar

- Sufficient color contrast: body text (`--color-text` on `--color-bg`/`--color-bg-alt`)
  must meet WCAG AA. Avoid placing `--color-cyan` text directly on the light background
  for body copy (fails contrast) — cyan is for accents/buttons/large headline moments
  with dark backing, not small text on light background.
- All interactive elements reachable via keyboard, with visible focus states (e.g. a
  2px outline in `--color-cyan` with offset).
- Images need meaningful `alt` text; decorative background shapes get `aria-hidden`.
- Semantic HTML: proper heading hierarchy (one `h1` in the hero, `h2` per section, etc.),
  `nav`, `main`, `footer` landmarks.
- Add a favicon derived from the logo's eye icon.
- Include a basic `<title>` and meta description in `index.html` for the ru2ya brand.

---

## 9. Deliverable

A fully static, buildable React app (`npm install && npm run dev` works out of the box,
`npm run build` produces a deployable `dist/` folder — no environment variables, no
server, no database required). The result should be deployable as-is to any static host
(Netlify, Vercel, GitHub Pages, etc.).
