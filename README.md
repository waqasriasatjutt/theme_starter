# Theme Starter — a Next.js theme for the Websites Portal

This is a real **Next.js (React) project** *and* a portal theme:

- A developer runs `npm install && npm run dev`, sees the theme, tweaks it, and can
  deploy it to **any React platform** (Vercel, Netlify, Cloudflare Pages, …) to test it live.
- The **portal** imports `theme.json`, `theme.css` and every `sections/*` file and
  turns the sections into **drag-and-drop blocks** in the visual builder, where a
  content editor can change text, colours, styling, etc. — no code.

> The `sections/*.html` + `sections/*.css` files are the **source of truth for the portal**.
> The Next.js app (`app/`, `components/`) is the preview/test/deploy harness around them.

## Layout

```
theme.json                # name, slug, version, description, colors{…}, fonts{…}   <- portal reads this
theme.css                 # the whole stylesheet — responsive, uses var(--primary)/--bg/--text/…  <- portal reads this
head.html                 # extra <head> markup (webfonts, icon libs)               <- portal reads this  (optional)
body-end.html             # markup/JS injected before </body>                        <- portal reads this  (optional)
sections/
  hero.html  hero.css  hero.json   # one reusable block — html + css (+ json: name/slug/category/sequence)
  features.html  features.json
  cta.html  cta.css
  faq.html  faq.css
  footer.html  footer.css
components/sections/Hero.jsx        # OPTIONAL — author a section in React if you like (see the file's header)
app/                                # the Next.js preview app (layout.jsx -> theme vars; page.jsx -> renders all sections)
package.json  next.config.mjs       # standard Next.js
```

Use `{{tokens}}` anywhere in section/theme HTML — `{{site_title}}`, `{{tagline}}`,
`{{focus_keyword}}`, `{{year}}`, plus any custom per-site token (incl. rotating ones).
They resolve on the live site; the preview substitutes a few sample values.

## Run / test / deploy

```bash
npm install
npm run dev                   # http://localhost:3000 — the theme, exactly as the portal will show it
npm run build && npm start    # production build
# deploy app/ to Vercel / Netlify / Cloudflare Pages to test live on your React platform
```

## Import into the portal

1. **Websites Portal -> Developer Tools -> Import theme from GitHub** -> paste this repo's URL.
   It creates a Theme record and pulls in the colours/fonts/CSS and the sections.
2. Create a site, pick this theme. Open a page -> **Visual editor** -> **Open visual builder** ->
   the sections appear as draggable blocks (grouped by their `category`). Edit text, restyle,
   publish. The builder canvas uses the theme's colours, so it matches the live site.
3. Edited the repo? Open the Theme -> **GitHub import** tab -> **Fetch from GitHub** again —
   it updates the theme + sections in place (matched by slug). Bump `version` in `theme.json`.

## Add / edit a section

- Add `sections/<name>.html` (the markup), `sections/<name>.css` (its styles — use the theme
  vars), and optionally `sections/<name>.json` (`{ "name", "slug", "category", "sequence", "description" }`).
- Add an `@import "../sections/<name>.css";` line to `app/globals.css` so the preview picks it up.
- Prefer React? Write `components/sections/<Name>.jsx`, render it to static HTML and write that to
  `sections/<name>.html` (see `components/sections/Hero.jsx` for the snippet). The `.html` file is
  what the portal imports.

## Make it *your* theme

1. Change the 5 colours + 2 fonts in `theme.json`.
2. Rewrite `theme.css` (keep the CSS-var names so the colours apply). Keep it responsive
   (`clamp()`, `grid auto-fit`, `flex-wrap`, `@media`).
3. Add/replace sections. Push. Re-fetch in the portal.

## Want full React components on the live site (not just static HTML)?

The portal's live renderer (`websites-portal-web`) can host typed React block components in its
`community/blocks/` folder (see `community/PLUGIN_SPEC.md` there) and a `react_widget` block for
sandboxed widgets. Static HTML sections (this repo) cover the common case and are editable in the
builder; React components are for genuinely interactive widgets.
