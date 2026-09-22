# Sdab: Landing Page Copy

Covers Deliverable **15**. This is the exact copy shipped in `index.html` — a reference for translators, reviewers, or anyone adjusting tone, collected in one place instead of scattered across markup.

---

## Navigation
- Logo: **Sdab**
- Links: Features · How it works · FAQ · Contact
- CTA: **Get media**
- Theme toggle labels: "Switch to dark mode" / "Switch to light mode" (aria-only)

## Hero
- **H1:** Save the media you have the right to keep.
- **Lead:** Paste a link to something you made, have permission to use, or that's openly licensed. Pick a quality and format, then download. No account, no pop-ups.
- **URL field placeholder:** Paste a link to your media
- **Paste button:** Paste
- **Submit button:** Get media (→ "Reading link…" while busy)
- **Rights checkbox label:** I own this content or have permission to download it, and I'll follow the source platform's terms.
- **Rights helper line:** Not sure? Read *what's okay to download*.
- **Highlight chips:** No account · Free to use · MP4, WebM, MP3, M4A · Phone, tablet, desktop

### Inline validation copy
| Situation | Message |
|---|---|
| Empty field | Paste a link to get started. |
| Too long | That link is too long. Check that you pasted just one link. |
| Contains spaces | That link contains spaces. Paste one link only. |
| Unparseable | That doesn't look like a web address. Check it and try again. |
| Wrong scheme | Only http and https links are supported. |
| Has credentials | Links that include a username or password aren't supported. |
| Localhost/IP/no dot | Use a public web address, such as https://example.com/video. |
| DRM/streaming host | *{host}* uses copy protection, so it isn't supported. Sdab only works with content you're allowed to save. |
| Rights not confirmed | Confirm that you own this content or have permission to download it. |
| Platform-terms notice | *{host}* generally limits downloads to its own features. Continue only if you own this content or the owner has given you written permission. |

## Media preview section
- **H2:** Check the details before you download
- **Lead:** Title, length, source, and available formats appear here as soon as your link is read.
- **Empty state:** Nothing to preview yet — Paste a link above and choose **Get media**. You'll pick a format and quality here before anything downloads. *(button: Go to link box)*
- **Loading:** (visually hidden status) Reading your link…
- **Error heading:** We couldn't read that link *(button: Try another link)*
- **Error copy by cause:** unsupported source / protected content / not found / rate limited / timeout / generic — see `main.js friendlyError()` for exact wording.
- **Ready-state confirmation strip:** You confirmed you have the right to download this. Keep it for personal, licensed, or permitted use.
- **Field legends:** Format · Quality
- **Size line:** Estimated file size: **{size}**
- **Buttons:** Download (→ "Preparing…") · Start over
- **Demo-mode note:** Demo mode. This site isn't connected to a processing service, so the details above are sample data and no file is created. See the README to connect one.
- **Post-download status (demo):** Demo finished. No file was created because this site is not connected to a processing service.
- **Post-download status (live):** Your download has started. Check your downloads folder.

## Features
- **H2:** A downloader that stays out of your way
- **Lead:** Everything you need to get a file you're allowed to keep, and nothing that gets in the way.
- **Fast processing:** Most links are read in a few seconds, and you see progress the whole way. No waiting on a mystery spinner.
- **Secure downloads:** Everything runs over HTTPS. We ask only for the link, nothing about you.
- **Mobile friendly:** Big tap targets, one-handed layout, and a paste button that works with your keyboard.
- **No registration:** No sign-up, no email, no password. Paste, choose, download.
- **Multiple formats:** Video as MP4 or WebM. Audio as MP3 or M4A. Choose the quality that fits your storage.

## How it works
- **H2:** Three steps, about ten seconds
- **Lead:** The whole flow fits on one screen, so there's nothing to learn.
1. **Paste the link** — Copy the address of your media and paste it in the box. Confirm you have the right to download it.
2. **Choose a format** — Check the title and length, then pick video or audio and the quality you want.
3. **Download the file** — Tap Download. The file is prepared on the spot and saved straight to your device.

## Download responsibly
- **H2:** Download responsibly
- **Lead:** Sdab is a tool. Whether a download is allowed depends on who owns the content and what the source's terms say. Here's how to stay on the right side of both.
- **Good to go:** Videos and audio you made and uploaded yourself · Content the owner gave you written permission to save · Public-domain and Creative Commons media, with attribution where required
- **Not supported:** DRM-protected content from streaming and subscription services · Private, paid, or login-only content you don't own · Anything you plan to re-upload, sell, or redistribute without rights
- **Your part:** Read the source platform's terms. Many only allow downloads through their own features. · Copyright law varies by country. This page isn't legal advice. · Own something we've processed? *Send a takedown request.*

## Why choose us
- **H2:** Why people switch from generic converters
- **Lead:** The category has a reputation for pop-ups, redirects, and fine print. We built the opposite.
- **Table rows (Sdab / typical converter sites):** Rights guidance: Built into every download / Rarely mentioned · Ads and pop-ups: None / Frequent redirects · Account needed: Never / Often for full quality · Details before you download: Title, length, size / Revealed at the end · Privacy: No tracking cookies / Heavy third-party tracking · On a phone: Designed touch-first / Cluttered layouts
- **Footnote:** Comparison reflects common patterns across the category; individual sites vary.

## Statistics
- 1.2M+ Users served · 4.8M+ Downloads completed · 3.1 s Average processing time
- **Footnote:** Sample figures for the design preview. Replace with your own analytics before launch.

## FAQ
1. **Is it legal to download media with Sdab?** — It depends on the content and your rights, not on the tool. Downloading is fine when you own the media, the owner has given you permission, or it is in the public domain or under a licence that allows it. Downloading anything else may break copyright law or the source platform's terms. This isn't legal advice.
2. **What can I download?** — Your own uploads, content you have written permission to save, and public-domain or Creative Commons media. Check the licence for attribution or reuse limits.
3. **Why do I have to confirm my rights every time?** — Every link is different, so every link needs its own confirmation. It's a reminder that you're responsible for what you download, and it helps keep the service to its intended use.
4. **Which formats and qualities are available?** — Video as MP4 or WebM in up to 1080p, and audio as MP3 or M4A. What you see depends on the source file. You'll see the exact options and an estimated file size before you download.
5. **Do I need an account?** — No. There's no sign-up, no email address, and no password.
6. **Is my data safe?** — Links are sent over HTTPS and we don't ask for personal details. We don't use advertising or tracking cookies. Read the Privacy Policy for the details.
7. **Why doesn't it work with streaming services?** — Movies, shows, and music from subscription services are protected by DRM and licensing agreements. Sdab doesn't support them and doesn't try to bypass that protection.
8. **How do I report content or request removal?** — If you own content that was processed through Sdab without your permission, send a notice using the Copyright Notice page. We review valid requests promptly and act on them.

## Contact
- **H2:** Feedback, questions, or a takedown request?
- **Lead:** We read every message. Rights holders can reach us directly and we'll act on valid requests promptly.
- **Cards:** General support (hello@example.com) · Copyright and takedowns (How to submit a notice)

## Footer
- **Blurb:** A fast, private way to save media you have the right to keep.
- **Columns:** Product (Features, How it works, FAQ) · Legal (Privacy Policy, Terms of Service, Copyright Notice) · Contact (email, entity name, address)
- **Disclaimer:** Sdab is an independent tool. It is not affiliated with, endorsed by, or sponsored by any media platform. You are responsible for making sure you have the right to download the content you process.
- **Copyright line:** © {year} Sdab. All rights reserved.

## Writing rules applied throughout
- Active voice; buttons name the action ("Download," not "Submit").
- No word-of-the-headline accenting, no ALL-CAPS labels, no invented urgency ("only 3 left," "act now").
- Errors state cause + fix, never apologize or joke.
- Every legal/compliance sentence is written to be read, not skimmed past — short sentences, no jargon.
- All copy is original placeholder content; replace entity name, addresses, and emails (marked `[bracketed]` in the legal pages) before launch.
