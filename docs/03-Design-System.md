# Sdab: Design System

Covers Deliverable **7**. This is the literal source of truth: every token below exists in `tailwind.config.js` and `src/input.css` — nothing here is aspirational.

---

## 1. Colour tokens

See `02-Brand-Identity-Guide.md §3` for the palette rationale and contrast table. Reference table for implementation:

```js
// tailwind.config.js (excerpt)
colors: {
  primary:   { DEFAULT:'#4F46E5', 50:'#EEF2FF', 100:'#E0E7FF', 200:'#C7D2FE', 300:'#A5B4FC',
               400:'#818CF8', 500:'#6366F1', 600:'#4F46E5', 700:'#4338CA', 800:'#3730A3',
               900:'#312E81', 950:'#1E1B4B' },
  secondary: { DEFAULT:'#06B6D4', 50:'#ECFEFF', 100:'#CFFAFE', 200:'#A5F3FC', 300:'#67E8F9',
               400:'#22D3EE', 500:'#06B6D4', 600:'#0891B2', 700:'#0E7490', 800:'#155E75', 900:'#164E63' },
  accent:    { DEFAULT:'#22C55E', 50:'#F0FDF4', 100:'#DCFCE7', 200:'#BBF7D0', 300:'#86EFAC',
               400:'#4ADE80', 500:'#22C55E', 600:'#16A34A', 700:'#15803D', 800:'#166534', 900:'#14532D' },
  ink:   { 950:'#070B14', 900:'#0B1220', 800:'#111A2E', 700:'#1B263D', 600:'#2A3752' },
  paper: { DEFAULT:'#F8FAFC', 100:'#F1F5F9', 200:'#E8EDF4' },
}
```

Text, borders, and neutral surfaces use Tailwind's default **slate** scale — deliberately not reinvented, so it composes with the brand ramps without a third grey system.

## 2. Typography tokens

```js
fontFamily: {
  sans:    ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
  display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
}
```

| Class | Size | Line-height | Family / weight | Role |
|---|---|---|---|---|
| `text-[2.4rem] sm:text-5xl lg:text-[3.5rem]` + `font-display font-bold` | 38.4 / 48 / 56px | 1.08 | Poppins 700 | Hero H1 |
| `.section-title` (`text-3xl sm:text-4xl lg:text-[2.75rem]`) | 30 / 36 / 44px | 1.1 (lg) | Poppins 600 | Section H2 |
| `text-xl` / `text-2xl` + `font-display` | 20 / 24px | snug | Poppins 600 | Card / H3 |
| `.section-lead` (`text-lg`) | 18px | 1.6 | Inter 400 | Section intros |
| body default | 16px | 1.6 (`leading-relaxed`) | Inter 400 | Paragraphs |
| `text-sm` / `text-[13px]` | 14 / 13px | normal | Inter 400–600 | Meta, chips, captions |

Rules: `h1–h4` always render in `font-display font-semibold tracking-tight`; `text-wrap: balance` is applied to `h1–h3` so headlines break evenly instead of leaving a short orphan line.

## 3. Spacing system

Tailwind's default 4px base scale is used throughout (`1 = 0.25rem`), with two custom section-level tokens layered on top:

| Token | Value | Use |
|---|---|---|
| `.wrap` | `max-w-6xl` (1152px), `px-5` → `sm:px-8` | Page content width and side gutters |
| `.section` | `py-20` → `sm:py-28` (80px → 112px) | Vertical rhythm between major sections |
| Card padding | `p-7` (28px) small cards, `p-8`–`p-9` feature cards, `p-3`–`p-4` glass shells | Internal breathing room scaled to card importance |
| Grid gaps | `gap-3` (forms), `gap-4` (bento grid), `gap-6`–`gap-10` (content grids) | Tighter gaps for controls, looser for content blocks |
| Radius | `rounded-xl` (12px) controls · `rounded-2xl`/`3xl` (16–24px) cards · `rounded-4xl` (32px, custom) hero/stat shells | Radius scales with element size — one radius does not serve every element |

## 4. Elevation and surfaces

Three surface levels, used consistently instead of one generic "card" shadow everywhere:

| Level | Class | Light mode | Dark mode | Use |
|---|---|---|---|---|
| Glass (standard) | `.glass` | `bg-white/60`, blurred, soft shadow | `bg-white/[.04]`, border `white/10` | Feature cards, step cards |
| Glass (strong) | `.glass-strong` | `bg-white/80`, heavier blur/shadow | `bg-ink-800/70` | Nav, hero form, preview card, stat strip, mobile menu |
| Flat surface | `.surface` | `bg-white`, `border-slate-200` | `bg-ink-800/60`, `border-white/10` | Table container, dense content that shouldn't feel "floaty" |

Shadows are custom, not the default Tailwind grey shadow on every card:

```css
--shadow-glass:      0 1px 0 0 rgb(255 255 255 / .7) inset, 0 12px 40px -14px rgb(30 27 75 / .22);
--shadow-glass-dark: 0 1px 0 0 rgb(255 255 255 / .06) inset, 0 24px 60px -24px rgb(0 0 0 / .7);
--shadow-glow:       0 0 0 1px rgb(79 70 229 / .25), 0 12px 32px -8px rgb(79 70 229 / .55);
```

`shadow-glow` (brand-tinted) is reserved for primary CTAs and the one "hero" feature card — not applied to every button, which keeps it meaningful.

## 5. Breakpoints

Tailwind defaults, used consistently:

| Breakpoint | Min width | Primary layout change |
|---|---|---|
| (base) | 0 | Single column, stacked nav → hamburger, 2-col option grids |
| `sm` | 640px | Chips/options move to 4 columns, section padding increases |
| `md` | 768px | Desktop nav replaces hamburger, bento grid goes to 6-col track, comparison table gains side padding |
| `lg` | 1024px | Hero becomes 12-col grid (7/5 split), FAQ becomes 12-col (4/8 split), preview becomes 2-col |
| `xl` | 1280px | Format/quality grids expand to 4 columns even inside the 2-col preview layout |

No custom breakpoints were added — the default scale covers every layout change needed.

## 6. Component states (interaction system)

Every interactive primitive defines the same four states, using the same visual language:

| State | Treatment |
|---|---|
| Default | Base surface + `border-slate-300/80` (light) or `border-white/10` (dark) |
| Hover | Border darkens one step (`hover:border-slate-400` / `hover:border-primary-400`), or background lightens slightly; primary button also lifts (`hover:-translate-y-0.5`) |
| Focus-visible | 2px `ring-primary-500` with a 2px offset matching the current background — **never removed**, only restyled |
| Active / selected | Radio "option" tiles: `border-primary-600 bg-primary-600/10 ring-1 ring-primary-600` (light) or brand-tinted equivalents (dark) |
| Disabled / busy | `aria-disabled="true"` + `cursor-not-allowed opacity-70`; busy buttons additionally swap their icon for a spinner via `[data-busy="true"]` |

## 7. Motion tokens

```js
keyframes: {
  drift:   /* background blobs: translate + scale, 18–26s, ease-in-out infinite */
  bob:     /* floating glass chips: ±10px vertical, 6–7s */
  rise:    /* entrance: translateY 14px→0, opacity 0→1, .7s */
  shimmer: /* skeleton loading sweep, 1.4s */
  nudge:   /* error shake on the rights row, .35s, one-shot */
  unlock:  /* lock icon rotate -12deg and back, .45s, one-shot on check */
  fill:    /* demo progress-bar loop in the "how it works" card, 1.6s alternate */
}
```

Global rule (`prefers-reduced-motion: reduce`): `scroll-behavior` becomes `auto` and every animation/transition duration collapses to `0.01ms` — nothing is exempted.

## 8. Accessibility tokens (baked into components, not bolted on)

| Concern | Implementation |
|---|---|
| Skip link | First focusable element, visually hidden until focused |
| Landmarks | `header`, `nav[aria-label]`, `main#main`, `section[aria-labelledby]`, `footer` on every page |
| Live regions | `#url-error` / `#url-notice` (`role="alert"` / `role="status"`), `#pv-status` (`role="status"`), progress bar (`role="progressbar"` with `aria-valuenow`) |
| Labels | Every input has a `<label>` (visually hidden where the placeholder is sufficient) and `aria-describedby` linking help/error text |
| Radio tiles | Native `<input type="radio">` (visually hidden, not `display:none`) + `<label>` — fully keyboard operable, no custom ARIA widget needed |
| Focus management | On successful lookup, focus moves to the result heading (`tabindex="-1"` + `.focus()`); on reset, focus returns to the URL field |
| Colour independence | Every status (error/notice/success) pairs an icon + text, never colour alone |
| Target size | All primary controls ≥ 44px tall (`min-h-[44px]`/`[48px]`/`[52px]`) |

## 9. Design tokens quick reference (for engineers extending the site)

| Need | Use |
|---|---|
| A new primary action | `.btn .btn-primary` |
| A secondary/ghost action | `.btn .btn-quiet` |
| An icon-only button | `.btn-icon` |
| A floating panel | `.glass` (content) or `.glass-strong` (chrome: nav, forms, key cards) |
| A dense, non-floating panel | `.surface` |
| A text input | `.field` |
| A single-select tile (format/quality style) | Native radio + `.opt` label pattern (see `radioTile()` in `main.js`) |
| A small status/label pill | `.chip` |
| An accordion item | `<details class="faq">` |
