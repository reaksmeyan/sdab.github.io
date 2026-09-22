# Sdab: Component Library

Covers Deliverable **8**. Every component listed here exists in `index.html` today — this is a catalogue of what was built, with the markup pattern to reuse it, not a separate spec to implement later.

---

## 1. Navigation bar

**Markup pattern**
```html
<header class="sticky top-0 z-50">
  <div class="wrap pt-3">
    <nav class="glass-strong flex h-16 items-center justify-between rounded-2xl px-3 sm:px-5">
      <a class="flex items-center gap-2.5 font-display text-xl font-bold">…logo…</a>
      <ul class="hidden md:flex">…links…</ul>
      <div class="flex items-center gap-2">
        <button id="theme-toggle" class="btn-icon" aria-pressed="false">…</button>
        <a class="btn btn-primary hidden md:inline-flex">Get media</a>
        <button id="menu-toggle" class="btn-icon md:hidden" aria-expanded="false">…</button>
      </div>
    </nav>
    <div id="mobile-menu" class="glass-strong absolute inset-x-5 top-full mt-2 rounded-2xl p-2 md:hidden" hidden>…</div>
  </div>
</header>
```
**Behaviour:** sticky at all scroll positions; mobile menu is an absolutely-positioned overlay (doesn't push content); closes on link click, `Escape`, or resize to `md`. Theme button toggles `.dark` on `<html>` and persists to `localStorage`.

## 2. Buttons

| Variant | Class | Example use |
|---|---|---|
| Primary | `.btn .btn-primary` | Get media, Download |
| Quiet / ghost | `.btn .btn-quiet` | Start over, Back to home |
| Icon-only | `.btn-icon` | Theme toggle, menu toggle |

All are `min-h-[44–48px]`, accept `aria-disabled="true"` for a non-interactive-but-visible state, and `[data-busy="true"]` to swap an icon for a spinner without changing layout.

## 3. Downloader form (hero)

Composed of: URL field with paste button → rights-confirmation row (icon + checkbox + label + help link) → submit button whose icon swaps lock → unlock → spinner depending on state. Container carries `data-unlocked="true|false"` purely for the icon swap; the actual gate is the checkbox's `checked` state, validated on submit.

**States surfaced inline:** `#url-error` (red, `role="alert"`), `#url-notice` (amber, `role="status"`) — both hidden by default, shown by adding back their display class (never by removing `hidden` alone, see `main.js` `setVisible()`).

## 4. Media preview card

Single container (`#preview-card`) with four mutually-exclusive children switched via `data-state` + `hidden`:

| State | Contents |
|---|---|
| `empty` | Dashed placeholder + short instructions + link back to the form |
| `loading` | Skeleton blocks (`.skeleton`, shimmer animation), `role="status"` |
| `error` | Icon + heading + message + "Try another link" |
| `ready` | Thumbnail, title, author/length/source, format tiles, quality tiles, size, Download + Start over, progress bar, status text |

**Reusable sub-pattern — option tile** (used for both Format and Quality):
```html
<input type="radio" name="format" value="mp4" id="format-mp4" class="sr-only" checked>
<label for="format-mp4" class="opt">
  <span class="font-semibold">MP4</span>
  <span class="text-xs text-slate-600">Video</span>
</label>
```
Built dynamically in JS (`radioTile()`), but hand-authorable identically for a static variant.

## 5. Feature "bento" grid

One large gradient hero card (`md:col-span-4`, brand gradient, `shadow-glow`, contains a mini illustrated progress bar) + five equal `.glass` cards (`md:col-span-2`) in a 6-column track. Pattern:
```html
<div class="grid gap-4 md:grid-cols-6">
  <article class="md:col-span-4 rounded-4xl bg-gradient-to-br from-primary-700 … shadow-glow p-7 sm:p-9">…</article>
  <article class="glass md:col-span-2 rounded-3xl p-7">…</article>
  <!-- ×5 -->
</div>
```

## 6. Step cards ("How it works")

`<ol>` of three `.glass` cards, each with a numbered badge absolutely positioned above the top-left corner (`absolute -top-4 left-7`, a filled circle) and a small illustrative mock (typed URL, format pills, or a progress bar) inside. Numbering is real here — the content is a genuine sequence — so plain numerals are appropriate (see design-system rationale).

## 7. Responsible-use columns

Three-column `border-l-4` list group (green / red / indigo), each item pairing a check/x/info icon with text. Reused pattern for any "do / don't / know" content elsewhere on the site.

## 8. Comparison table

Semantic `<table>` inside `.glass`, `<caption class="sr-only">` for assistive tech, `scope="col"`/`scope="row"` throughout, each cell pairing an icon (check/x) with text rather than colour alone.

## 9. Stats strip

`<dl>` in a `.glass-strong` shell, three columns divided by hairlines (`divide-x` desktop, `divide-y` mobile). Numbers animate via `data-count`/`data-compact`/`data-decimals`/`data-suffix` attributes, counted up once via `IntersectionObserver` (skipped entirely under reduced motion).

## 10. FAQ accordion

Native `<details class="faq">` / `<summary>` pairs — zero JS required, keyboard and screen-reader support comes free from the browser. The `+` glyph rotates 45° into an "×" via `.faq[open] .faq-icon`. Content fades/rises in on open (skipped under reduced motion).

## 11. Contact / CTA banner

Dark gradient panel (`from-ink-800 via-primary-950 to-ink-900`) with two link "cards" (email, copyright) built from the same pill pattern as nav/footer links — reuse this for any future "high-emphasis, dark, two-column" section.

## 12. Toasts

`#toasts` fixed container, `role="status" aria-live="polite"`. `toast(message)` in `main.js` appends a `.glass-strong` pill that self-removes after ~4.2s. Used today for clipboard-read failures; reusable for any transient, non-blocking message.

## 13. Legal page shell

`privacy.html`, `terms.html`, `copyright.html`, and `404.html` share one minimal header (logo + back-to-home + theme toggle) and footer, kept visually identical across all four pages so a change to that chrome only needs to happen in one place conceptually, even though each is a static file.

## 14. Icon sprite

One `<svg class="absolute h-0 w-0 overflow-hidden">` block near the top of `<body>` defines every icon as a `<symbol>` (24×24, 1.8px stroke) plus the logo gradient/mark. Every icon in the page is `<svg><use href="#i-name"/></svg>` — add new icons here once, reference anywhere, and gradients defined inside resolve correctly (the sprite is visually hidden via clipping, not `display:none`, which would break the gradient — see the "hidden sprite" pitfall in the README).
