# SuraLink website

A lightweight, independent marketing website for the SuraLink iPhone app. No dependencies, trackers, forms, or account setup. Every download button goes to the real App Store listing.

## Run locally

From this folder:

```sh
npm run dev
```

Open http://127.0.0.1:5174. Python 3 is required for the local server. The website is fully saved on disk even when the server stops or the laptop turns off.

## Files and deployment

`dist/` is the complete static website. Publish its contents with any static host when ready. No build step is required. This project is a separate Git repository inside the app folder; the parent repository ignores `/website/`.

The site is saved locally and in its GitHub repository. A GitHub Pages workflow is prepared in `.github/workflows/deploy-pages.yml`; it publishes only `dist/` after the website checks pass. GitHub Pages must be enabled with GitHub Actions as the source before deploying.

Once enabled, pushes to `main` automatically redeploy the site. You can also run **Deploy website to GitHub Pages** manually from the repository’s Actions tab. The project uses relative asset links so it works under the `/suralink-website/` project path. No custom domain is configured.

## Content notes

- The phone illustration is explicitly labeled as a preview of the unreleased redesign.
- No ratings, testimonials, user counts, prices, or release dates are invented.
- The Arabic interaction is an illustrative word gloss for Al-Fatihah 1:2, not tafsir.
- Fonts are hosted locally; their SIL licenses are included in `dist/assets/fonts/`.
- Contact email is the existing app support email. Update it when ownership is transferred.
- `dist/privacy.html` identifies GitHub Pages as the intended host.
- Canonical and Open Graph URLs use the GitHub Pages project address. A raster social-card export can be added for platforms that do not support SVG previews.

Run `npm run check` to check local references, the App Store destination, and JavaScript syntax. Browser QA covers the word exploration, FAQs, and narrow layouts.
