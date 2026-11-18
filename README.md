# Estúdio Isaac B. Castro — website

One-page site for the AI video-ad studio. Plain static files: HTML, CSS and vanilla JS modules. There is no build step.

## Run it locally

```bash
npx serve .            # or
python3 -m http.server 8080
```

Then open http://localhost:8080. Open it through a server, not by double-clicking `index.html` (ES modules do not load from `file://`).

## Before going live

1. **`config.js`** — set `email`, `whatsapp` (digits only, country code first, e.g. `351912345678`) and optionally `instagram`. Empty or placeholder values hide that contact option; with none set, the form offers "Copy message" instead.
2. **Domain** — replace `https://YOUR-DOMAIN.com` in `index.html` (canonical, Open Graph, Twitter, JSON-LD), `robots.txt` and `sitemap.xml`.
3. **Copy to confirm** — the page says the 48 hours start "when the brief is agreed", that usage terms are "agreed in writing with your quote", and that formats are agreed in the quote. Adjust in `index.html` (Process and FAQ sections) if your terms differ.

## Editing

| What | Where |
| --- | --- |
| Contact details | `config.js` |
| All text and the film list | `index.html` |
| Above-the-fold styles | `css/critical.css`, then run `python3 tools/inline-critical.py` to inline it into `index.html` |
| Everything else visual | `css/style.css` |
| Behaviour | `js/` (`main.js` is the entry point) |

To add a film: put `assets/video/<slug>.mp4` (full film), `assets/video/<slug>-preview.mp4` (short muted loop), `assets/img/<slug>-poster.webp` and `-poster-sm.webp` in place, then copy one `<article class="film">` block in `index.html` and change `data-slug`, the texts and the colour class (`film--cobalt`, `--lime`, `--pink`, `--vermilion`, `--cream`).

## How it stays fast

- Critical CSS is inlined; the rest loads without blocking. Fonts are two self-hosted WOFF2 files, preloaded.
- Only the hero poster is preloaded. The showreel video attaches after page load (a smaller file on phones). Film previews download on first hover or when scrolled into view on touch; full films download only when the player opens.
- GSAP, ScrollTrigger and Lenis are vendored in `/vendor` (no CDN). The WebGL hover effect is hand-written (`js/gl.js`), with a plain image fallback.
- With `prefers-reduced-motion`, there is no smooth-scroll, pinning, preloader or autoplay: the page is a normal static layout.

## Deploy

**Any static host** (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3…): upload the folder as is. The site uses root-relative paths (`/assets/...`), so serve it from the domain root.

**Docker / Cloud Run** (nginx on port 8080):

```bash
docker build -t estudio-ibc .
docker run --rm -p 8080:8080 estudio-ibc

# Cloud Run, from this folder
gcloud run deploy estudio-ibc --source . --port 8080 --allow-unauthenticated --region europe-west1
```

`nginx.conf` sets gzip, long-lived caching for `/assets` and `/vendor`, no-cache for `index.html` and `config.js`, and serves MP4 with range requests. Because `/assets` is cached for a year, rename a media file when you replace it.

## Third-party code

GSAP 3.15 (standard no-charge licence), Lenis 1.3 (MIT), Bricolage Grotesque and Newsreader (SIL Open Font License).
