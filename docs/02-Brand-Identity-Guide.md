# Sdab: Brand Identity Guide

Covers Deliverable **2**. Read alongside `03-Design-System.md` for exact component tokens — this document is the "why", the design system is the "how".

---

## 1. Brand concept

**Name:** Sdab — plain-English verb ("fetch") + a light, modern suffix. Reads as a tool, not a trend.

**One sentence:** Sdab is the calm, permission-first alternative to cluttered converter sites — it looks and behaves like a small, well-made SaaS product, not a downloader.

**Personality dial**

| Trait | Sdab is… | Sdab is not… |
|---|---|---|
| Tone | Direct, warm, quietly confident | Hyped, salesy, apologetic |
| Visual energy | Calm gradients, one animated moment per view | Constant motion, flashing badges |
| Trust posture | Transparent about limits and rights | "100% legal", "unlimited", "no restrictions" |
| Density | Generous space, few choices per screen | Cluttered ad-supported layout |

## 2. Logo

**Mark:** a rounded square in the brand gradient (Primary → Secondary) containing a download arrow, with a short accent underline in Accent green — the "confirmed / safe to keep" motif reused from the rights-lock interaction.

```
┌───────────┐
│   ╱╲      │   Rounded square, radius ≈ 28% of size
│  │  │     │   Downward arrow, 2.4px stroke, rounded caps
│   ╲╱      │   Short green underline (the "confirmed" mark)
│  ▔▔▔▔▔    │
└───────────┘
```

- **Minimum size:** 20px (favicon) up to any size; the mark is vector (SVG symbol `#i-logo` in `index.html`, and `favicon.svg`/`og-image.svg` in `assets/img`).
- **Clear space:** at least the height of the mark on all sides.
- **Lockup:** mark + "Sdab" in Poppins SemiBold, one size step below the surrounding heading.
- **Don't:** recolour the mark to a flat single colour, stretch it to non-square, add a drop shadow, or place it on a busy photo without a scrim.
- **Favicon:** same mark, no wordmark, exported as `favicon.svg` (and rasterised PNGs for Apple touch icon / PWA icons).

## 3. Colour palette

### 3.1 Core (as specified in the brief)

| Role | Token | Hex | Usage |
|---|---|---|---|
| Primary | `primary-600` | `#4F46E5` | Buttons, links, focus rings, primary gradient stop |
| Secondary | `secondary-500` | `#06B6D4` | Gradient stop, secondary accents, info states |
| Accent | `accent-500` | `#22C55E` | Success, "rights confirmed", positive checkmarks |
| Background (light) | `paper` | `#F8FAFC` | Light-mode page background |
| Background (dark) | `ink-900` | `#0B1220` | Dark-mode page background |

### 3.2 Extended ramps (generated for depth, not decoration)

| Ramp | 50 | 100 | 300 | 500 | 600 | 700 | 900 |
|---|---|---|---|---|---|---|---|
| **Primary** (indigo) | `#EEF2FF` | `#E0E7FF` | `#A5B4FC` | `#6366F1` | `#4F46E5` | `#4338CA` | `#312E81` |
| **Secondary** (cyan) | `#ECFEFF` | `#CFFAFE` | `#67E8F9` | `#06B6D4` | `#0891B2` | `#0E7490` | `#164E63` |
| **Accent** (green) | `#F0FDF4` | `#DCFCE7` | `#86EFAC` | `#22C55E` | `#16A34A` | `#15803D` | `#14532D` |
| **Ink** (dark slate surfaces) | — | — | — | — | `ink-700 #1B263D` | `ink-800 #111A2E` | `ink-950 #070B14` |
| **Paper** (soft white surfaces) | `paper-100 #F1F5F9` | `paper-200 #E8EDF4` | | | | | |

Slate (Tailwind's default slate scale) is used for all body text and borders, so text colour and surface colour come from two disciplined, related scales rather than ad hoc greys.

### 3.3 Why this palette

The brief specifies indigo/cyan/green. That combination naturally reads as "developer tool" or "fintech" — the risk is that it becomes generic. Two choices keep it specific to Sdab:

1. **Green is scarce and meaningful.** It appears almost only at the rights/permission moments (the unlock icon, "rights confirmed" badge, "good to go" column). It is not used as a generic success colour elsewhere, which gives the confirmation moment more weight.
2. **Indigo carries the brand; cyan is the motion colour.** Indigo→cyan gradients are reserved for the hero glow, the primary button, and progress fills — places where something is *happening*. Static surfaces (cards, borders) stay in slate, so the product doesn't look like gradients-as-wallpaper.

### 3.4 Contrast (WCAG 2.2 AA, measured)

| Pair | Ratio | Passes |
|---|---|---|
| White text on `primary-600` | 6.29 : 1 | AA (normal + large text) |
| `primary-600` on paper | 6.01 : 1 | AA |
| `secondary-700` on paper | 5.12 : 1 | AA |
| `accent-700` on paper | 4.79 : 1 | AA |
| `secondary-300` on `ink-900` | 9.39 : 1 (primary-300 shown; secondary/accent similarly ≥ 7.7:1) | AAA |
| `slate-600` on paper (body text, light) | 7.24 : 1 | AAA |
| `slate-400` on `ink-900` (body text, dark) | 7.30 : 1 | AAA |
| `slate-900` on paper (headings) | 17.06 : 1 | AAA |

Raw `secondary-500` and `accent-500` on white fall **below** AA for text (2.3:1 and 2.2:1) — that's expected and by design: those exact tones are only ever used as fills, icons on tinted chips, or large gradient surfaces, never as small text on a plain light background. Where those hues carry text (links, labels) the design system steps to `-700` or `-300`(on dark), which is what the components already do.

## 4. Typography

| Role | Typeface | Weights used | Why |
|---|---|---|---|
| Display / headings | **Poppins** | 600, 700 | Geometric, confident, slightly rounded — friendly without being playful. Used sparingly (headings, stat numbers, nav wordmark) so it stays a signal, not wallpaper |
| Body / UI | **Inter** (variable) | 400–700 via variable axis | Neutral, extremely legible at small sizes, excellent number rendering for file sizes and durations |

Both are self-hosted (`assets/fonts/*.woff2`, latin subset) — no Google Fonts request, no third-party origin, no layout shift from a slow CDN.

### 4.1 Type scale

| Token | Size / line-height | Weight | Used for |
|---|---|---|---|
| Display XL | 3.5rem / 1.1 (desktop) → 2.4rem (mobile) | Poppins 700 | Hero H1 |
| Display L | 2.75rem / 1.1 | Poppins 600 | Section H2 |
| Display M | 1.5rem–1.875rem | Poppins 600 | Card / subsection H3 |
| Body L | 1.125rem / 1.6 | Inter 400 | Section leads |
| Body | 1rem / 1.6 | Inter 400–500 | Paragraphs, labels |
| Small | 0.875–0.9375rem | Inter 400–600 | Meta text, captions, chips |

Rules applied throughout: line length capped near 60–70 characters for prose (`max-w-[Nch]` utilities), no all-caps labels, no single-word accent styling in headlines — the type itself (weight + size jump) carries hierarchy, not colour tricks.

## 5. Iconography

- Single **SVG sprite** (`<symbol>` definitions once in `index.html`), referenced with `<use href="#i-name">` everywhere — one download, consistent stroke.
- Style: 24×24 viewbox, **1.8px stroke**, rounded caps/joins, no fill except the logo mark and a few solid glyphs (play button, checkmarks in lists).
- Never mix this stroke set with a different icon library — visual consistency is the whole point of the sprite.

## 6. Imagery and illustration

No stock photography. The hero and preview visuals are **inline SVG/CSS**: a gradient "video thumbnail" with a play glyph and duration badge, floating glass chips ("MP4 · 1080p", "Rights confirmed", "Ready to download"). This:

- keeps the payload near zero for imagery,
- avoids implying any real creator's content is involved,
- doubles as a live demonstration of the product's own UI.

If real screenshots are added later, keep them inside the same rounded, glass-bordered frame used elsewhere, never edge-to-edge.

## 7. Voice and tone

| Situation | Do | Don't |
|---|---|---|
| Errors | State what happened and what to do: "That doesn't look like a web address. Check it and try again." | "Oops!", "Something went wrong :(" |
| Success | Plain confirmation: "Your download has started." | Exclamation-heavy celebration |
| Legal/rights | Direct, unhedged about the user's responsibility | Vague reassurance ("don't worry about it") |
| CTAs | Name the action: "Get media", "Download", "Start over" | "Submit", "Go", "Click here" |

Full rationale for these choices lives in the frontend-design skill's writing guidance; the short version: every word is there to help someone use the product or understand a rule, never to decorate.

## 8. Motion identity

One deliberate animated moment per context, not motion everywhere:

- **Hero:** slow drifting gradient blobs (`animate-drift`, 18–26s) behind a static grid — reads as "alive" without demanding attention.
- **Preview card:** skeleton shimmer while loading (the one moment users are *waiting*, so motion earns its keep).
- **Rights lock:** the lock icon rotates open (`animate-unlock`) the instant the checkbox is ticked — motion tied directly to the user's action, not decorative.
- **Everything else** (cards, buttons) uses simple hover transitions only; `prefers-reduced-motion` disables all non-essential animation sitewide.

## 9. Applying the identity elsewhere

If Sdab extends to app icons, social banners, or print:

1. Always start from the mark + gradient, never a flat recolour.
2. Keep green reserved for permission/confirmation states, even outside the product.
3. Default to dark-ink backgrounds for marketing/social (the gradient blobs read best there); use the paper background for in-product light mode.
4. Headlines in Poppins 600/700, everything else in Inter — never introduce a third typeface.
