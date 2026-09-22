# Sdab: Folder Structure, HTML Structure, and Tailwind Architecture

Covers Deliverables **10** (GitHub Pages folder structure), **11** (full HTML structure), and **12** (Tailwind CSS architecture).

---

## 1. GitHub Pages folder structure (Deliverable 10)

```
sdab/
├─ index.html                 Landing page (the entire single-page product)
├─ privacy.html                Legal: Privacy Policy
├─ terms.html                  Legal: Terms of Service
├─ copyright.html              Legal: Copyright Notice + takedown process
├─ 404.html                    Not-found page (noindex)
├─ robots.txt                  Crawl rules + sitemap pointer
├─ sitemap.xml                 4 canonical URLs with lastmod/priority
├─ site.webmanifest            PWA metadata (name, icons, theme colors)
├─ .nojekyll                   Tells GitHub Pages to skip Jekyll processing
│
├─ assets/
│  ├─ css/
│  │  └─ styles.css            Compiled, minified Tailwind output (committed)
│  ├─ js/
│  │  └─ main.js               All site behaviour, vanilla JS, no build step needed to run it
│  ├─ fonts/
│  │  ├─ inter-latin-wght-normal.woff2       Self-hosted variable font
│  │  ├─ poppins-latin-600-normal.woff2
│  │  └─ poppins-latin-700-normal.woff2
│  └─ img/
│     ├─ favicon.svg                          Vector favicon (brand mark)
│     ├─ og-image.svg / og-image.png          Social share card, 1200×630
│     ├─ apple-touch-icon.png                 180×180
│     └─ icon-192.png / icon-512.png          PWA icons
│
├─ src/
│  └─ input.css                Tailwind source (directives + design-system layer) — NOT deployed
│
├─ docs/                       This documentation set — NOT deployed
│  ├─ 01-PRD-Strategy-Compliance.md
│  ├─ 02-Brand-Identity-Guide.md
│  ├─ 03-Design-System.md
│  ├─ 04-Component-Library.md
│  ├─ 05-Homepage-Wireframe.md
│  ├─ 06-High-Fidelity-Mockup.md
│  ├─ 07-Mobile-Design-Mockups.md
│  ├─ 08-Structure-HTML-Tailwind.md   (this file)
│  └─ screenshots/              Real screenshots referenced by the docs above
│
├─ .github/workflows/
│  └─ pages.yml                 CI: npm ci → tailwind build → assemble _site/ → deploy
│
├─ tailwind.config.js           Design tokens (colors, fonts, shadows, keyframes)
├─ package.json                 Build scripts (`npm run build` / `dev` / `serve`)
├─ package-lock.json
├─ .gitignore                   node_modules, logs, OS files
└─ README.md                    Setup, deployment, and "what's real vs. demo" explanation
```

### 1.1 What actually gets deployed

`docs/`, `src/`, `node_modules/`, config files, and lockfiles are **not** needed at runtime — the CI workflow copies only `index.html`, the three legal pages, `404.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, and `assets/` into a `_site/` directory before publishing. This keeps the deployed site minimal and avoids ever exposing `docs/` (design rationale, screenshots) or `src/input.css` (unminified source) at a public URL — deploying the whole repo as-is would work too, since GitHub Pages will happily serve extra files, but it's needless surface area.

### 1.2 Two ways to deploy

| Method | How |
|---|---|
| **A — GitHub Actions (recommended, included)** | Repo → Settings → Pages → Source: "GitHub Actions". Push to `main`; `.github/workflows/pages.yml` builds Tailwind and deploys automatically. No build tooling needed on the reader's machine. |
| **B — Deploy the `main` branch directly** | Repo → Settings → Pages → Source: "Deploy from a branch" → `main` → `/ (root)`. Simpler, but `assets/css/styles.css` must be committed pre-built (already is) and kept in sync manually — remember to run `npm run build` before every commit that touches `src/input.css` or `tailwind.config.js`. |

### 1.3 Custom domain checklist

1. Add a `CNAME` file at the repo root containing your domain (e.g. `sdab.app`).
2. Point DNS: an `ALIAS`/`ANAME`/`A` record set to GitHub's IPs (or a `CNAME` for a subdomain) — see GitHub's Pages custom-domain docs for current IPs.
3. In Settings → Pages, enter the domain and wait for DNS check to pass, then tick **Enforce HTTPS**.
4. Update every placeholder `https://reaksmeyan.github.io/sdab.github.io/` in `index.html`'s canonical/OG/JSON-LD tags, the legal pages, `sitemap.xml`, and `robots.txt` to the real domain — it appears in each of those files individually since this repo ships plain static HTML with no templating step.

---

## 2. Full HTML structure (Deliverable 11)

`index.html` is one semantic document; the outline below is the actual landmark/heading structure, not an idealized one.

```html
<html lang="en">
<head> … meta, OG, Twitter, icons, preloads, inline theme-init script, JSON-LD … </head>
<body>
  <a href="#main" class="sr-only …">Skip to main content</a>
  <svg class="absolute h-0 w-0 overflow-hidden"> …icon <symbol> defs… </svg>

  <header class="sticky top-0 z-50">
    <nav aria-label="Primary"> logo · links · theme toggle · CTA · menu button </nav>
    <div id="mobile-menu" hidden> … </div>
  </header>

  <main id="main">
    <section aria-labelledby="hero-title">                <!-- H1 -->
      <h1 id="hero-title">…</h1>
      <form id="hero-form">…</form>
    </section>

    <section id="preview" aria-labelledby="preview-title">  <!-- H2 -->
      <h2 id="preview-title">…</h2>
      <div id="preview-card">
        <div data-state="empty">…</div>
        <div data-state="loading" hidden>…</div>
        <div data-state="error" hidden>…</div>
        <div data-state="ready" hidden>
          <h3 id="pv-title" tabindex="-1">…</h3>
          <fieldset><legend>Format</legend>…</fieldset>
          <fieldset><legend>Quality</legend>…</fieldset>
        </div>
      </div>
    </section>

    <section id="features" aria-labelledby="features-title">…</section>   <!-- H2 + H3s -->
    <section id="how" aria-labelledby="how-title">
      <ol> <li><h3>Paste the link</h3></li> <li><h3>Choose a format</h3></li> <li><h3>Download the file</h3></li> </ol>
    </section>
    <section id="responsible" aria-labelledby="responsible-title">…</section>
    <section id="why" aria-labelledby="why-title">
      <table><caption class="sr-only">…</caption>…</table>
    </section>
    <section aria-labelledby="stats-title"><h2 id="stats-title" class="sr-only">…</h2><dl>…</dl></section>
    <section id="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">…</h2>
      <details class="faq"> <summary>…</summary> …</details>   <!-- ×8 -->
    </section>
    <section id="contact" aria-labelledby="contact-title">…</section>
  </main>

  <footer> logo/blurb · nav(Product) · nav(Legal) · contact · disclaimer · © </footer>
  <div id="toasts" role="status" aria-live="polite"></div>
  <script src="assets/js/main.js" defer></script>
</body>
</html>
```

**Heading levels never skip:** exactly one `<h1>` (hero), one `<h2>` per section (some visually hidden via `.sr-only` where the section is self-explanatory, e.g. the stats strip), `<h3>` only inside cards/steps. `<legend>` (not a styled `<div>`) labels each fieldset so screen readers announce "Format, group" / "Quality, group" correctly.

**Keeping the FAQ and its structured data in sync:** the FAQ's visible accordion (8 `<details>` blocks) and its `FAQPage` JSON-LD `<script>` block were generated from one shared list of question/answer pairs, rather than hand-duplicating the same eight answers in two places, so the structured data can't silently drift out of sync with what a visitor actually reads — a common, easy-to-miss SEO bug. If you edit the FAQ, update both the visible `<details>` blocks and the matching `FAQPage` JSON-LD entry in `<head>` together.

**Legal pages and 404** share a much smaller `shell()` template (logo, back-to-home, theme toggle, minimal footer) instead of the full marketing chrome, since they're utility pages, not landing content.

---

## 3. Tailwind CSS architecture (Deliverable 12)

### 3.1 File layout

```
tailwind.config.js   → design tokens only (colors, fonts, shadows, keyframes/animation, one custom radius)
src/input.css        → @tailwind directives, @font-face rules, @layer base, @layer components
assets/css/styles.css→ compiled + minified output, committed to the repo (build artifact, not hand-edited)
```

### 3.2 Why `@layer components` instead of only utility classes in markup

Utilities are used directly in markup for one-off layout (`grid`, `gap-4`, `md:col-span-4`, …), but every **repeating, semantically meaningful pattern** is named once in `@layer components` and reused everywhere:

| Component class | Replaces repeating this utility soup | Used in |
|---|---|---|
| `.btn` / `.btn-primary` / `.btn-quiet` / `.btn-icon` | ~10 utilities per button, ×12 buttons on the page | Nav CTA, form submit, download, reset, theme/menu toggles |
| `.glass` / `.glass-strong` / `.surface` | Border + background + backdrop-blur + shadow, ×20 cards | Feature cards, steps, preview card, nav, mobile menu, stats |
| `.field` | Input sizing/border/placeholder treatment | URL input (today; ready for any future text input) |
| `.opt` (+ native radio) | The entire selected/unselected/hover/focus state machine for a tile | Format tiles, quality tiles |
| `.chip` | Pill badge styling | Hero highlight chips |
| `.faq` | `<details>`/`<summary>` reset + icon rotation + open-state animation | All 8 FAQ rows |
| `.wrap` / `.section` / `.section-title` / `.section-lead` | Page gutter, vertical rhythm, heading/lead sizing | Every section on the page |

This keeps `index.html` readable (a reviewer can tell `class="opt"` means "this is a selectable option tile" without decoding ten utilities) and means a visual tweak to, say, every glass card happens in **one place** in `input.css` instead of a find-and-replace across the HTML.

### 3.3 Dark mode strategy

`darkMode: 'class'` in `tailwind.config.js`. A tiny inline script in `<head>` (before any CSS loads) reads `localStorage.getItem('sdab-theme')`, falls back to `prefers-color-scheme`, and adds `.dark` to `<html>` **before first paint** — this avoids the classic flash-of-wrong-theme. Every component class defines its own `.dark …` variant right next to the light-mode rule in `input.css` (rather than relying on scattered `dark:` utilities in markup for shared components), so the two states can't drift apart silently.

### 3.4 Responsive strategy

Mobile-first authoring throughout: base (unprefixed) utilities target the smallest viewport, `sm:`/`md:`/`lg:`/`xl:` prefixes layer on changes as the viewport grows — never the reverse. No custom breakpoints were needed; the default scale (640/768/1024/1280) maps cleanly onto the four layout tiers documented in `07-Mobile-Design-Mockups.md`.

### 3.5 Purge / content configuration

```js
content: ['./*.html', './assets/js/**/*.js'],
```
Scans every HTML file at the repo root (so `privacy.html`, `terms.html`, `copyright.html`, `404.html` all keep working even though they're generated by a separate template) plus `main.js`, because a handful of classes (`.opt`, `.hidden`, state-toggle classes) are applied dynamically from JavaScript rather than appearing verbatim in HTML — without including the JS path, Tailwind's build would tree-shake those classes away as "unused."

### 3.6 Build commands

```bash
npm run dev      # tailwindcss --watch, for local editing
npm run build    # tailwindcss --minify, what CI runs before deploying
npm run serve    # quick local static server for manual QA
```

### 3.7 Measured output size

| File | Raw | Gzipped |
|---|---|---|
| `assets/css/styles.css` | 50.0 KB | 8.8 KB |
| `assets/js/main.js` | 24.6 KB | 7.8 KB |
| `index.html` | 61.6 KB | 12.6 KB |

No other CSS or JS framework is loaded — the entire visual system compiles to under 9 KB gzipped.
