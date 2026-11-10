# Commonwealth AI Integrations website

Single-page static site. No build step.

- `index.html` — the whole site
- `favicon.png`, `apple-touch-icon.png`, `logo-512.png` — icons (stand-in lighthouse seal until the final logo is added)
- `vercel.json` — Vercel settings

## Deploy
Import this repo in Vercel (Add New → Project). Framework preset: **Other**. No build command, output directory is the repo root.

## Contact form
The quote form sends through Formspree. Create a form at formspree.io, copy its endpoint
(looks like `https://formspree.io/f/xxxxxxxx`) and paste it into `FORM_ENDPOINT` near the bottom of `index.html`.
