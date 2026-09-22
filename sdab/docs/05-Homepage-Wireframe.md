# Sdab: Homepage Wireframe

Covers Deliverable **5**. Low-fidelity structure and alignment logic, ahead of the high-fidelity description in `06-High-Fidelity-Mockup.md`. Boxes are structure only — no color, type, or final copy.

---

## Desktop (≥1024px), 12-column grid, content capped at 1152px

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [Logo]        Features  How it works  FAQ  Contact      [◐] [Get media]  │  sticky nav
├──────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  H1 headline (7 cols)                        ┌────────────────────────┐  │
│  Supporting paragraph                         │   hero illustration     │  │  hero
│  ┌──────────────────────────────────┐         │   (video thumb mock,    │  │  7/5 split
│  │ [url input........] [Paste][Go]  │         │    floating chips)      │  │  left-aligned
│  │ [x] rights confirmation row      │         └────────────────────────┘  │  text
│  └──────────────────────────────────┘                                     │
│  (chip)(chip)(chip)                                                       │
├──────────────────────────────────────────────────────────────────────────┤
│  H2 "Check the details…"                                                  │
│  ┌──────────────────────────────────────────────────────────────────┐    │  preview
│  │  [thumb]        title / author / length / source                  │    │  2-col inside
│  │                 [format tiles ×4]  [quality tiles ×4]  [Download]  │    │  one card
│  └──────────────────────────────────────────────────────────────────┘    │
├──────────────────────────────────────────────────────────────────────────┤
│  H2 "A downloader that stays out of your way"                            │
│  ┌───────────────────────────────┐ ┌───────────┐ ┌───────────┐           │  bento
│  │ big feature (4 cols)          │ │ feature   │ │ feature   │           │  6-col track
│  └───────────────────────────────┘ └───────────┘ └───────────┘           │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐                              │
│  │ feature   │ │ feature   │ │ feature   │                              │
│  └───────────┘ └───────────┘ └───────────┘                              │
├──────────────────────────────────────────────────────────────────────────┤
│  H2 "Three steps, about ten seconds"                                      │
│  ┌───────────┐   ┌───────────┐   ┌───────────┐                          │  3 equal
│  │ ① step    │   │ ② step    │   │ ③ step    │                          │  columns
│  └───────────┘   └───────────┘   └───────────┘                          │
├──────────────────────────────────────────────────────────────────────────┤
│  H2 "Download responsibly"                                                │
│  │ Good to go   │ Not supported │ Your part    │  (border-left columns)   │  3 columns
├──────────────────────────────────────────────────────────────────────────┤
│  H2 "Why people switch…"                                                  │
│  ┌──────────────────────────────────────────────────────────────────┐    │  full-width
│  │  table: feature | Sdab | typical converter sites                │    │  table
│  └──────────────────────────────────────────────────────────────────┘    │
├──────────────────────────────────────────────────────────────────────────┤
│  [ stat ]        [ stat ]        [ stat ]           (divided strip)      │  stats
├──────────────────────────────────────────────────────────────────────────┤
│  H2 "Questions,      │  Q  ⌄                                             │  4/8 split
│   answered" (4 cols) │  Q  ⌄                                             │
│                       │  Q  ⌄  … accordion                               │
├──────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────────┐    │  dark CTA
│  │ H2 "Feedback…"              [ email card ]  [ copyright card ]    │    │  panel
│  └──────────────────────────────────────────────────────────────────┘    │
├──────────────────────────────────────────────────────────────────────────┤
│ Logo/blurb   Product links   Legal links   Contact                       │  footer
│ Disclaimer line · © year                                                  │
└──────────────────────────────────────────────────────────────────────────┘
```

**Alignment logic**

| Zone | Alignment | Why |
|---|---|---|
| Hero | Left-aligned text, asymmetric 7/5 split | A left-aligned headline reads fastest; the illustration counterbalances without competing for the eye's first stop |
| Feature bento | Left-aligned within cards, asymmetric column spans (4+2+2+2+2+2) | Establishes one clear "lead" feature (speed) without making every card visually equal/generic |
| Steps | Centered numbering badge, left-aligned body text | Numbers mark real sequence (see design-system rationale); body copy still reads left-to-right |
| Responsible-use / Why-choose-us | Left-aligned, rule-separated columns | Scannable comparison without needing card chrome |
| FAQ | 4/8 asymmetric split | Keeps the heading anchored while giving the accordion room to breathe at a comfortable line length |
| Contact | Centered panel, 2-col content | The one moment the page becomes an "action panel" rather than an article — asymmetry would undercut that |

## Tablet (640–1023px)

- Nav collapses to hamburger at `<768px`; CTA button hides, kept in the menu via anchor link.
- Hero becomes a single column: headline/form first, illustration below (order preserved, not reversed) — a user should encounter the *task* before the decoration.
- Bento grid drops to 2 columns; big feature card spans full width.
- Steps grid drops to 1 column (readable at 640–767px) then 3 at `md`.
- FAQ split collapses to a single column, heading above accordion.
- Comparison table becomes horizontally scrollable inside its own container (`overflow-x-auto`) rather than shrinking illegibly.

## Mobile (<640px)

- Single column throughout; `.wrap` gutter narrows to `px-5` (20px).
- Chips wrap to 2 lines.
- Preview card: thumbnail stacked above format/quality tiles (2 tiles per row).
- Floating hero badges reposition inward (`left-1`/`right` insets) so nothing clips the viewport edge at 320–390px — verified at 390×844 with zero horizontal overflow.
- Stats strip: 3 rows divided by horizontal rules instead of 3 columns divided by vertical rules.

## Wireframe-stage decisions carried into the final build

1. **One CTA in the hero, not two.** An early instinct is "primary + secondary" hero buttons; here the secondary action (learn more) is just the natural scroll, so a second button was cut.
2. **Preview lives in its own section, not inside the hero.** Keeping it separate lets the empty/loading/ready states breathe and gives search engines/crawlers a clean, labelled `<section>` rather than an overloaded hero.
3. **Stats sit low, between "why choose us" and FAQ** — after the case has been made, not as an unearned trust signal before any content.
