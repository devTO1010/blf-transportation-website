# BLF Transportation — Website

A static marketing site (plain HTML/CSS/JS, no build step) deployable to GitHub Pages or any static host.

## Structure
```
index.html                     Home
about-us.html                  About Us (Who We Are, Mission, Vision, Safety)
our-culture.html               Our Culture
services.html                  Services (OTR, Power Only, Drop & Hook, TL + cargo types)
contact.html                   Contact form
privacy-policy.html            Privacy Policy
404.html                       Branded not-found page (self-contained)
css/styles.css                 All styling + design tokens
js/site.js                     Injects shared header/footer/chat + wires nav, chat, forms
assets/blf-logo-trim.png       Official BLF logo (auto-trimmed of white padding)
.github/workflows/deploy.yml   GitHub Pages deploy workflow
.nojekyll                      Tells Pages to serve files as-is (no Jekyll build)
serve.ps1                      Optional local dev server (PowerShell)
```

The shared header, footer and chat widget live in `js/site.js` and are injected into `<div id="site-header">` / `<div id="site-footer">` on every page, so edit them in one place. Each page's `<body data-page="...">` marks the active nav item. All internal links are **relative**, so the site works from a subpath (project page), a user page, or a custom domain without changes.

## Run locally
No Node/Python required — use the included PowerShell server:
```powershell
powershell -File serve.ps1
```
Then open http://localhost:8123/ . (Or use any static server / VS Code Live Server.)

## Deploy to GitHub Pages

The repo ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`) that publishes the site on every push to `main`.

**One-time setup:**
1. Create a repo on GitHub and add it as a remote (if not already):
   ```bash
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions.**
3. Push to `main` (or run the workflow manually from the **Actions** tab). The site publishes to
   `https://<you>.github.io/<repo>/`.

**Custom domain (blftransportation.com):**
- In **Settings → Pages → Custom domain**, enter the domain. GitHub commits a `CNAME` file for you.
- At your DNS provider, point the domain at GitHub Pages (A/AAAA records to GitHub's IPs, or a `CNAME` record to `<you>.github.io`).
- Once a custom domain (or user/organization page) is used, the `404.html` "Back to Home" link (`/`) resolves correctly.

## Before going live — checklist
- [ ] **Re-host images.** Hero/section photos currently hot-link the original site's CDN (`images.leadconnectorhq.com`). Download real photos into `/assets` and update the `background-image` URLs. Service-detail rows use gradient placeholders — swap in real photos.
- [x] **Logo.** Using the client's official logo (`assets/blf-logo-trim.png`). A vector (`.svg`/`.ai`) would be ideal for print/retina but the HD PNG is fine for web.
- [ ] **Activate forms.** Forms POST via `js/site.js` and are ready to go live — just set `FORM_ENDPOINT` (and `WEB3FORMS_KEY` if using Web3Forms) near the bottom of `js/site.js`. Get a free endpoint from [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com). Until then they run in demo mode (validate + confirm, but don't send). Inline success/error messages are already wired.
- [ ] **Chat widget.** The bubble is a static stub — connect the client's real chat/SMS widget or remove it.
- [ ] **Social links.** Top-bar Facebook / Instagram / LinkedIn icons link to `#` — add real URLs.
- [ ] **reCAPTCHA.** Original had Google reCAPTCHA on forms; add if desired.
- [ ] **Privacy Policy.** Review `privacy-policy.html` with legal counsel before publishing.
- [ ] **Favicon / analytics / Open Graph tags** as needed.
```
```
