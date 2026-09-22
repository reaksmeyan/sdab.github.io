# Sdab

A modern, permission-first media downloader landing page for **GitHub Pages** — HTML5, Tailwind CSS, vanilla JavaScript. Glassmorphism UI, light/dark themes, mobile-first, SEO-ready, zero third-party requests on load.

> **Read this first — what this project is, and isn't**
>
> GitHub Pages serves static files only; it cannot run server code. So this repository is the **complete front-end** — every screen, state, animation, validation rule, and piece of copy — running in **demo mode**: it simulates reading a link and shows sample metadata, but it does not actually fetch or download anything. To go live, you connect it to a small backend you build and operate, per §3 below and `docs/01-PRD-Strategy-Compliance.md §1.9 and §2.3`. That separation is deliberate: this repo can be reviewed, deployed, and iterated on safely without ever touching real media processing.

---

## 1. What's in the box

| | |
|---|---|
| **Live demo behaviour** | Paste any valid, non-DRM URL, tick the rights box, and the full flow runs end-to-end with realistic sample data (title, thumbnail, duration, formats, sizes) — no network request is made. |
| **Compliance-first UX** | A rights-confirmation step gated on every submission, a hard client-side block on known DRM/streaming domains, a notice for platforms whose terms restrict downloads, and a "Download responsibly" section, FAQ, and legal pages (Privacy/Terms/Copyright) covering the rest. |
| **Design** | Custom indigo/cyan/green palette, Inter + Poppins (self-hosted), glassmorphism cards, one deliberate animated hero moment, dark mode, WCAG AA-checked contrast. |
| **Performance** | ~85 KB total on first load (see `docs/08-Structure-HTML-Tailwind.md §3.7`), no external requests, self-hosted fonts. |
| **Docs** | Nine documents in `docs/` covering strategy, compliance, brand, design system, components, wireframes, mockups, structure, and copy — see the index below. |

## 2. Quick start

```bash
npm install
npm run build      # compiles src/input.css -> assets/css/styles.css
npm run serve       # serves the folder locally, e.g. http://localhost:8080
```

Or just open `index.html` through any static server (fonts and some browser APIs misbehave under a bare `file://` URL, so avoid double-clicking the file directly).

To edit styles: change `tailwind.config.js` (tokens) or `src/input.css` (component classes), then `npm run dev` for a live-recompiling watch build.

## 3. Connecting a real backend (going from demo to live)

1. Build a small service (any stack) exposing:
   - `GET /v1/inspect?url=<encoded>` → `{ title, author, durationSeconds, thumbnailUrl?, formats:[{id, kind, container, quality, bytes?}] }`
   - `GET /v1/download?url=<encoded>&format=<id>` → the file, as an attachment
   - Errors as JSON `{ code, message }` with a non-2xx status. Recognised `code` values (for friendly, pre-written error text) are listed in `assets/js/main.js` → `friendlyError()`.
2. In `assets/js/main.js`, set `CONFIG.API_BASE_URL` to your service's origin. That's the only switch — the whole UI (loading, preview, formats, download, progress, errors) already calls `liveLookup()` instead of the built-in demo data the moment this is non-empty.
3. **Before you enable it:** read `docs/01-PRD-Strategy-Compliance.md §2.3` in full. It lists the non-negotiable requirements for the backend — source allowlisting, no DRM circumvention, no platforms whose terms prohibit third-party downloads, abuse controls, no file retention, and takedown handling. **This repository intentionally contains no extraction, scraping, or DRM-circumvention code**, and the backend you connect is your responsibility to build and operate lawfully.

## 4. Deploying to GitHub Pages

**Recommended — GitHub Actions (included):**
1. Push this repo to GitHub.
2. Settings → Pages → Source: **GitHub Actions**.
3. Push to `main`; `.github/workflows/pages.yml` runs `npm ci`, builds Tailwind, and deploys `index.html`, the legal pages, `404.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, and `assets/` (not `docs/`, `src/`, or config files).

**Alternative — deploy `main` directly:** Settings → Pages → Source: **Deploy from a branch** → `main` → `/(root)`. Simpler, but you must run `npm run build` yourself before every commit that touches `src/input.css` or `tailwind.config.js`, since nothing rebuilds it for you.

**Before going live, replace every placeholder:**
- `https://reaksmeyan.github.io/sdab.github.io/` — canonical URLs, Open Graph/Twitter tags, and JSON-LD in `index.html`, plus `sitemap.xml` and `robots.txt`.
- `[Your legal entity name]`, `[postal address]`, `hello@example.com`, `copyright@example.com` — footer, contact section, and all three legal pages.
- The statistics section (1.2M+ users, 4.8M+ downloads, 3.1s) — clearly labelled as sample data; replace with real analytics or remove.
- Custom domain: add a `CNAME` file, point DNS, and enable **Enforce HTTPS** in Pages settings (see `docs/08-Structure-HTML-Tailwind.md §1.3`).

## 5. Have a lawyer review before launch

This repo ships **template legal text**, not legal advice: `privacy.html`, `terms.html`, `copyright.html`, plus every `[bracketed]` placeholder inside them. Copyright, DMCA/safe-harbour eligibility, consumer-protection law, and platform terms of service vary by country and change over time. See the pre-launch legal checklist in `docs/01-PRD-Strategy-Compliance.md §2.5`.

## 6. Documentation index

| # | Document | Covers |
|---|---|---|
| 1 | `docs/01-PRD-Strategy-Compliance.md` | Product requirements, personas, user stories, functional/non-functional requirements, risks, the compliance framework, sitemap, user flow, SEO strategy, conversion recommendations |
| 2 | `docs/02-Brand-Identity-Guide.md` | Logo, palette rationale + contrast data, typography, iconography, imagery approach, voice, motion |
| 3 | `docs/03-Design-System.md` | Every design token actually in `tailwind.config.js`/`input.css`: color, type, spacing, elevation, breakpoints, component states, motion, accessibility |
| 4 | `docs/04-Component-Library.md` | Every UI component as built, with its markup pattern |
| 5 | `docs/05-Homepage-Wireframe.md` | Low-fidelity ASCII wireframes for desktop/tablet/mobile and the alignment logic behind each section |
| 6 | `docs/06-High-Fidelity-Mockup.md` | Screen-by-screen description of the real, rendered UI, referencing actual screenshots |
| 7 | `docs/07-Mobile-Design-Mockups.md` | Mobile/tablet/desktop screenshots and the breakpoint behaviour table |
| 8 | `docs/08-Structure-HTML-Tailwind.md` | GitHub Pages folder structure, full HTML landmark/heading structure, Tailwind architecture |
| 9 | `docs/09-Landing-Page-Copy.md` | Every piece of copy on the site, collected in one place |

## 7. Known limits, honestly stated

- **No Lighthouse score is claimed.** The build targets a 95+ budget (payload size, no render-blocking requests, semantic HTML, contrast) but was not measured against a deployed URL from this environment. Run Lighthouse yourself after deploying.
- **Demo mode has no network activity.** That's intentional, not a bug — see §3.
- **The FAQ's rich-result eligibility is Google's call, not this repo's.** The JSON-LD is correct and kept in sync with the visible FAQ, but Google limits FAQ rich snippets to a small set of authoritative site types.
- **The blocklist/notice-list of platform domains in `main.js` is UX guidance, not enforcement.** Real enforcement belongs in the backend you connect (§3).
