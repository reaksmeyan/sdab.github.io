/*!
 * Sdab: main.js
 * Vanilla JS, no dependencies. Safe to load on every page (all modules guard for missing elements).
 *
 * MODES
 *  - Demo mode (default): API_BASE_URL is empty. The preview shows SAMPLE data and no file is created.
 *  - Live mode: set API_BASE_URL to a processing service you operate (see README → "Connecting a backend").
 *    GitHub Pages is static hosting, so real media processing cannot run on this site itself.
 */
(() => {
  'use strict';

  /* ───────────────────────── Configuration ───────────────────────── */
  const CONFIG = {
    API_BASE_URL: '',            // e.g. 'https://api.your-domain.com'  (empty = demo mode)
    REQUEST_TIMEOUT_MS: 15000,

    // Never accepted: DRM-protected / subscription streaming services.
    BLOCKED_HOSTS: [
      'netflix.com', 'primevideo.com', 'disneyplus.com', 'hulu.com', 'max.com', 'hbomax.com',
      'spotify.com', 'music.apple.com', 'tv.apple.com', 'peacocktv.com', 'paramountplus.com',
    ],
    // Accepted, but the platform's terms generally restrict downloads → show a notice.
    NOTICE_HOSTS: [
      'youtube.com', 'youtu.be', 'vimeo.com', 'tiktok.com', 'instagram.com', 'facebook.com',
      'fb.watch', 'x.com', 'twitter.com', 'soundcloud.com', 'twitch.tv',
    ],
  };

  const isDemo = () => !CONFIG.API_BASE_URL;

  /* ───────────────────────── Helpers ───────────────────────── */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) { /* storage unavailable */ } },
  };
  const hostMatches = (host, list) => list.some((d) => host === d || host.endsWith('.' + d));
  const setVisible = (el, on, display = 'flex') => {
    if (!el) return;
    el.classList.toggle('hidden', !on);
    el.classList.toggle(display, on);
  };

  /* ───────────────────────── Theme ───────────────────────── */
  function initTheme() {
    const btn = $('#theme-toggle');
    if (!btn) return;
    const root = document.documentElement;
    const sync = () => {
      const dark = root.classList.contains('dark');
      btn.setAttribute('aria-pressed', String(dark));
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    };
    btn.addEventListener('click', () => {
      root.classList.toggle('dark');
      store.set('sdab-theme', root.classList.contains('dark') ? 'dark' : 'light');
      sync();
    });
    sync();
  }

  /* ───────────────────────── Mobile menu ───────────────────────── */
  function initMenu() {
    const btn = $('#menu-toggle');
    const menu = $('#mobile-menu');
    if (!btn || !menu) return;
    const icon = $('use', btn);
    const set = (open) => {
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (icon) icon.setAttribute('href', open ? '#i-x' : '#i-menu');
    };
    btn.addEventListener('click', () => set(menu.hidden));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) { set(false); btn.focus(); }
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => { if (e.matches) set(false); });
  }

  /* ───────────────────────── Counters (one-time, when scrolled into view) ───────────────────────── */
  function initCounters() {
    const els = $$('[data-count]');
    if (!els.length || !('IntersectionObserver' in window) || reducedMotion()) return;
    const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
    const format = (el, v) => {
      const decimals = Number(el.dataset.decimals || 0);
      const base = el.dataset.compact === 'true' ? compact.format(v) : v.toFixed(decimals);
      return base + (el.dataset.suffix || '');
    };
    const run = (el) => {
      const target = Number(el.dataset.count);
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1400, 1);
        el.textContent = format(el, target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    els.forEach((el) => { el.classList.add('tabular-nums'); io.observe(el); });
  }

  /* ───────────────────────── URL validation ───────────────────────── */
  function parseUrl(raw) {
    const value = (raw || '').trim();
    if (!value) return { error: 'Paste a link to get started.' };
    if (value.length > 2048) return { error: 'That link is too long. Check that you pasted just one link.' };
    if (/\s/.test(value)) return { error: 'That link contains spaces. Paste one link only.' };

    // Be forgiving: allow "example.com/file" without a scheme.
    const candidate = /^[a-z][a-z0-9+.-]*:/i.test(value) ? value : 'https://' + value;
    let u;
    try { u = new URL(candidate); } catch (_) {
      return { error: "That doesn't look like a web address. Check it and try again." };
    }
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return { error: 'Only http and https links are supported.' };
    if (u.username || u.password) return { error: "Links that include a username or password aren't supported." };

    const host = u.hostname.toLowerCase().replace(/^www\./, '');
    const isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.includes(':');
    if (host === 'localhost' || isIp || !host.includes('.')) return { error: 'Use a public web address, such as https://example.com/video.' };

    return { url: u, host };
  }

  /* ───────────────────────── Formatting ───────────────────────── */
  const pad = (n) => String(n).padStart(2, '0');
  function formatDuration(sec) {
    const s = Math.max(0, Math.round(sec));
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
    return h ? `${h}:${pad(m)}:${pad(r)}` : `${m}:${pad(r)}`;
  }
  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return 'Unknown';
    const mb = bytes / 1e6;
    return mb >= 1000 ? `${(mb / 1000).toFixed(2)} GB` : `${mb.toFixed(mb < 10 ? 1 : 0)} MB`;
  }

  /* ───────────────────────── Demo data (no network, no files) ───────────────────────── */
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  const DEMO_GRADIENTS = [
    'linear-gradient(135deg,#4338CA,#4F46E5 45%,#06B6D4)',
    'linear-gradient(135deg,#312E81,#4F46E5 55%,#22C55E)',
    'linear-gradient(135deg,#0E7490,#06B6D4 50%,#6366F1)',
    'linear-gradient(135deg,#1E1B4B,#4338CA 50%,#22D3EE)',
  ];
  function buildDemo(url, host) {
    const seed = hash(url.href);
    const duration = 95 + (seed % 780);
    const bytesFor = (mbps) => Math.round((duration * mbps * 1e6) / 8);
    const formats = [
      ...[['1080p', 5.0], ['720p', 2.5], ['480p', 1.2], ['360p', 0.7]].map(([q, m]) => ({ id: `mp4-${q}`, kind: 'video', container: 'mp4', quality: q, bytes: bytesFor(m) })),
      ...[['1080p', 4.2], ['720p', 2.0], ['480p', 1.0]].map(([q, m]) => ({ id: `webm-${q}`, kind: 'video', container: 'webm', quality: q, bytes: bytesFor(m) })),
      ...[['320 kbps', 0.32], ['192 kbps', 0.192], ['128 kbps', 0.128]].map(([q, m]) => ({ id: `mp3-${q}`, kind: 'audio', container: 'mp3', quality: q, bytes: bytesFor(m) })),
      ...[['256 kbps', 0.256], ['128 kbps', 0.128]].map(([q, m]) => ({ id: `m4a-${q}`, kind: 'audio', container: 'm4a', quality: q, bytes: bytesFor(m) })),
    ];
    const last = decodeURIComponent(url.pathname.split('/').filter(Boolean).pop() || '').replace(/\.[a-z0-9]{2,4}$/i, '');
    return {
      title: `Sample preview: ${last || host}`,
      author: 'Demo creator',
      durationSeconds: duration,
      source: host,
      thumbnailUrl: null,
      gradient: DEMO_GRADIENTS[seed % DEMO_GRADIENTS.length],
      formats,
    };
  }
  function demoLookup(url, host, signal) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => resolve(buildDemo(url, host)), 1100);
      signal.addEventListener('abort', () => { clearTimeout(timer); reject(new DOMException('Aborted', 'AbortError')); });
    });
  }

  /* ───────────────────────── Live lookup (your backend) ─────────────────────────
   * GET  {API}/v1/inspect?url=<encoded>   → { title, author, durationSeconds, thumbnailUrl?, formats:[{id,kind,container,quality,bytes?}] }
   * GET  {API}/v1/download?url=<encoded>&format=<id>  → file (Content-Disposition: attachment)
   * Errors → JSON { code, message } with a non-2xx status.
   */
  async function liveLookup(url, host, signal) {
    const res = await fetch(`${CONFIG.API_BASE_URL}/v1/inspect?url=${encodeURIComponent(url.href)}`, {
      signal, headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw Object.assign(new Error(body.message || 'Request failed'), { code: body.code || String(res.status) });
    }
    const data = await res.json();
    if (!data || typeof data.title !== 'string' || !Array.isArray(data.formats) || !data.formats.length) {
      throw Object.assign(new Error('Unexpected response'), { code: 'bad_response' });
    }
    const safeThumb = typeof data.thumbnailUrl === 'string' && /^https:\/\//i.test(data.thumbnailUrl) ? data.thumbnailUrl : null;
    return {
      title: data.title,
      author: typeof data.author === 'string' && data.author ? data.author : 'Unknown',
      durationSeconds: Number(data.durationSeconds) || 0,
      source: host,
      thumbnailUrl: safeThumb,
      gradient: DEMO_GRADIENTS[0],
      formats: data.formats.filter((f) => f && f.id && f.container && f.quality && (f.kind === 'video' || f.kind === 'audio')),
    };
  }

  function friendlyError(err) {
    switch (err && err.code) {
      case 'unsupported': return "This source isn't supported. Sdab works with content you own, have permission to use, or that is openly licensed.";
      case 'protected': return 'This content is protected and cannot be downloaded.';
      case 'not_found': return "We couldn't find any media at that link. Check that it's public and try again.";
      case 'rate_limited': return 'Too many requests. Wait a minute and try again.';
      case 'timeout': return 'The request took too long. Check your connection and try again.';
      default: return 'Something went wrong while reading that link. Check it and try again.';
    }
  }

  /* ───────────────────────── Downloader UI ───────────────────────── */
  function initDownloader() {
    const form = $('#hero-form');
    const card = $('#preview-card');
    if (!form || !card) return;

    const input = $('#url-input', form);
    const rights = $('#rights', form);
    const submitBtn = $('#fetch-btn', form);
    const submitLabel = $('.btn-label', submitBtn);
    const spinner = $('.spinner', submitBtn);
    const errorBox = $('#url-error', form);
    const noticeBox = $('#url-notice', form);
    const pasteBtn = $('#paste-btn', form);

    const states = $$('[data-state]', card);
    const formatWrap = $('#format-options');
    const qualityWrap = $('#quality-options');
    const sizeEl = $('#pv-size');
    const downloadBtn = $('#download-btn');
    const progressWrap = $('#pv-progress-wrap');
    const progress = $('#pv-progress');
    const progressBar = $('#pv-progress-bar');
    const statusEl = $('#pv-status');
    const demoNote = $('#demo-note');

    let media = null;
    let controller = null;
    let busy = false;
    let progressTimer = null;

    /* Messages */
    const showError = (msg) => {
      $('span', errorBox).textContent = msg;
      setVisible(errorBox, true);
    };
    const clearError = () => {
      setVisible(errorBox, false);
      input.removeAttribute('aria-invalid');
    };
    const updateNotice = () => {
      const parsed = parseUrl(input.value);
      if (parsed.host && hostMatches(parsed.host, CONFIG.NOTICE_HOSTS)) {
        $('span', noticeBox).textContent = `${parsed.host} generally limits downloads to its own features. Continue only if you own this content or the owner has given you written permission.`;
        setVisible(noticeBox, true);
      } else {
        setVisible(noticeBox, false);
      }
    };

    /* Preview states */
    const setState = (name) => {
      states.forEach((el) => { el.hidden = el.dataset.state !== name; });
      card.setAttribute('aria-busy', String(name === 'loading'));
    };
    const scrollToCard = () => card.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });

    const setBusy = (on) => {
      busy = on;
      submitBtn.setAttribute('aria-disabled', String(on));
      submitBtn.dataset.busy = String(on);
      submitLabel.textContent = on ? 'Reading link…' : 'Get media';
      spinner.classList.toggle('hidden', !on);
    };

    /* Inputs */
    input.addEventListener('input', () => { clearError(); updateNotice(); });
    rights.addEventListener('change', () => {
      form.dataset.unlocked = String(rights.checked);
      if (rights.checked) clearError();
    });
    pasteBtn.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          input.value = text.trim();
          input.dispatchEvent(new Event('input'));
          input.focus();
        } else {
          toast('Your clipboard is empty.');
        }
      } catch (_) {
        toast('Could not read your clipboard. Paste with Ctrl+V or ⌘V instead.');
        input.focus();
      }
    });
    $$('a[href="#hero-form"]').forEach((a) => a.addEventListener('click', () => setTimeout(() => input.focus({ preventScroll: true }), 350)));

    /* Submit */
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (busy) return;
      clearError();

      const parsed = parseUrl(input.value);
      if (parsed.error) {
        input.setAttribute('aria-invalid', 'true');
        showError(parsed.error);
        input.focus();
        return;
      }
      if (hostMatches(parsed.host, CONFIG.BLOCKED_HOSTS)) {
        input.setAttribute('aria-invalid', 'true');
        showError(`${parsed.host} uses copy protection, so it isn't supported. Sdab only works with content you're allowed to save.`);
        input.focus();
        return;
      }
      if (!rights.checked) {
        showError('Confirm that you own this content or have permission to download it.');
        rights.focus();
        const row = rights.closest('div.flex');
        if (row && !reducedMotion()) { row.classList.remove('animate-nudge'); void row.offsetWidth; row.classList.add('animate-nudge'); }
        return;
      }
      await lookup(parsed.url, parsed.host);
    });

    async function lookup(url, host) {
      if (controller) controller.abort();
      controller = new AbortController();
      let timedOut = false;
      const timer = setTimeout(() => { timedOut = true; controller.abort(); }, CONFIG.REQUEST_TIMEOUT_MS);

      resetDownloadUi();
      setBusy(true);
      setState('loading');
      scrollToCard();
      try {
        media = await (isDemo() ? demoLookup(url, host, controller.signal) : liveLookup(url, host, controller.signal));
        media.sourceUrl = url.href;
        renderMedia(media);
        setState('ready');
        const title = $('#pv-title');
        title.setAttribute('tabindex', '-1');
        title.focus({ preventScroll: true });
      } catch (err) {
        if (err && err.name === 'AbortError' && !timedOut) return;   // superseded by a newer request
        $('#error-text').textContent = friendlyError(timedOut ? { code: 'timeout' } : err);
        setState('error');
      } finally {
        clearTimeout(timer);
        setBusy(false);
      }
    }

    /* Render preview */
    function renderMedia(m) {
      $('#pv-title').textContent = m.title;
      $('#pv-author').textContent = m.author;
      $('#pv-length').textContent = m.durationSeconds ? formatDuration(m.durationSeconds) : 'Unknown';
      $('#pv-duration').textContent = m.durationSeconds ? formatDuration(m.durationSeconds) : '';
      $('#pv-source').textContent = m.source;
      setVisible(demoNote, isDemo(), 'flex');

      const thumb = $('#pv-thumb');
      $$('.pv-thumb-media', thumb).forEach((n) => n.remove());
      const wrapper = document.createElement('div');
      wrapper.className = 'pv-thumb-media absolute inset-0';
      wrapper.style.background = m.gradient;
      if (m.thumbnailUrl) {
        const img = document.createElement('img');
        img.src = m.thumbnailUrl;
        img.alt = '';
        img.loading = 'lazy';
        img.referrerPolicy = 'no-referrer';
        img.className = 'h-full w-full object-cover';
        img.addEventListener('error', () => img.remove());
        wrapper.append(img);
      }
      thumb.prepend(wrapper);

      // Formats: one option per container, in a stable order.
      const order = ['mp4', 'webm', 'mp3', 'm4a'];
      const containers = [...new Set(m.formats.map((f) => f.container))].sort((a, b) => order.indexOf(a) - order.indexOf(b));
      formatWrap.replaceChildren(...containers.map((c, i) => {
        const kind = m.formats.find((f) => f.container === c).kind;
        return radioTile('format', c, labelFor(c), kind === 'video' ? 'Video' : 'Audio', i === 0);
      }));
      buildQualities();
    }

    const labelFor = (c) => ({ mp4: 'MP4', webm: 'WebM', mp3: 'MP3', m4a: 'M4A' }[c] || c.toUpperCase());

    function buildQualities() {
      const container = selectedValue('format');
      const options = media.formats.filter((f) => f.container === container);
      qualityWrap.replaceChildren(...options.map((f, i) => radioTile('quality', f.id, f.quality, f.bytes ? formatBytes(f.bytes) : '', i === 0)));
      updateSize();
    }
    function selectedValue(name) {
      const el = $(`input[name="${name}"]:checked`, card);
      return el ? el.value : null;
    }
    function selectedFormat() {
      const id = selectedValue('quality');
      return media ? media.formats.find((f) => f.id === id) : null;
    }
    function updateSize() {
      const f = selectedFormat();
      sizeEl.textContent = f && f.bytes ? `about ${formatBytes(f.bytes)}` : 'Unknown';
    }
    function radioTile(name, value, title, sub, checked) {
      const wrap = document.createElement('div');
      const id = `${name}-${value}`.replace(/[^a-z0-9-]/gi, '-');
      const inputEl = document.createElement('input');
      inputEl.type = 'radio';
      inputEl.name = name;
      inputEl.value = value;
      inputEl.id = id;
      inputEl.checked = checked;
      inputEl.className = 'sr-only';
      const label = document.createElement('label');
      label.htmlFor = id;
      label.className = 'opt';
      const t = document.createElement('span');
      t.className = 'font-semibold text-slate-900 dark:text-white';
      t.textContent = title;
      label.append(t);
      if (sub) {
        const s = document.createElement('span');
        s.className = 'text-xs text-slate-600 dark:text-slate-400';
        s.textContent = sub;
        label.append(s);
      }
      wrap.append(inputEl, label);
      return wrap;
    }

    formatWrap.addEventListener('change', () => { buildQualities(); resetDownloadUi(); });
    qualityWrap.addEventListener('change', () => { updateSize(); resetDownloadUi(); });

    /* Download */
    downloadBtn.addEventListener('click', async () => {
      const f = selectedFormat();
      if (!f || downloadBtn.getAttribute('aria-disabled') === 'true') return;
      downloadBtn.setAttribute('aria-disabled', 'true');
      $('.btn-label', downloadBtn).textContent = 'Preparing…';
      setVisible(progressWrap, true, 'block');
      statusEl.textContent = 'Preparing your file…';

      await animateProgress(isDemo() ? 2400 : 1200);

      if (isDemo()) {
        statusEl.textContent = 'Demo finished. No file was created because this site is not connected to a processing service.';
      } else {
        const a = document.createElement('a');
        a.href = `${CONFIG.API_BASE_URL}/v1/download?url=${encodeURIComponent(media.sourceUrl || input.value.trim())}&format=${encodeURIComponent(f.id)}`;
        a.rel = 'noopener';
        a.download = '';
        document.body.append(a);
        a.click();
        a.remove();
        statusEl.textContent = 'Your download has started. Check your downloads folder.';
      }
      $('.btn-label', downloadBtn).textContent = 'Download';
      downloadBtn.removeAttribute('aria-disabled');
    });

    function animateProgress(ms) {
      return new Promise((resolve) => {
        clearInterval(progressTimer);
        const t0 = performance.now();
        progressTimer = setInterval(() => {
          const p = Math.min((performance.now() - t0) / ms, 1);
          const pct = Math.round((1 - Math.pow(1 - p, 2)) * 100);
          progressBar.style.width = pct + '%';
          progress.setAttribute('aria-valuenow', String(pct));
          if (p >= 1) { clearInterval(progressTimer); resolve(); }
        }, 80);
      });
    }
    function resetDownloadUi() {
      clearInterval(progressTimer);
      progressBar.style.width = '0%';
      progress.setAttribute('aria-valuenow', '0');
      setVisible(progressWrap, false, 'block');
      statusEl.textContent = '';
      if (downloadBtn) { downloadBtn.removeAttribute('aria-disabled'); $('.btn-label', downloadBtn).textContent = 'Download'; }
    }

    /* Reset ("Start over" / "Try another link"): each link needs its own rights confirmation */
    $$('[data-action="reset"]', card).forEach((btn) => btn.addEventListener('click', () => {
      if (controller) controller.abort();
      media = null;
      input.value = '';
      rights.checked = false;
      form.dataset.unlocked = 'false';
      clearError();
      setVisible(noticeBox, false);
      resetDownloadUi();
      setState('empty');
      input.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' });
      input.focus({ preventScroll: true });
    }));
  }

  /* ───────────────────────── Toasts ───────────────────────── */
  function toast(message) {
    const host = $('#toasts');
    if (!host) return;
    const el = document.createElement('div');
    el.className = 'pointer-events-auto glass-strong animate-rise rounded-xl px-4 py-3 text-sm font-medium text-slate-900 dark:text-white';
    el.textContent = message;
    host.append(el);
    setTimeout(() => el.remove(), 4200);
  }

  /* ───────────────────────── Boot ───────────────────────── */
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  initTheme();
  initMenu();
  initCounters();
  initDownloader();
})();
