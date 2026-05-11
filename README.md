# Theme Starter — a React theme for the Websites Portal

A theme is a **React project**. Every section is a React component — real JSX: `div`,
`h1`/`h2`/`h3`, lists, `<details>`, whatever — with its CSS next to it. A developer can:

- `npm install && npm run dev` → see the theme, edit components, wire in `fetch()` / an API,
  and deploy `app/` to **any React platform** (Vercel, Netlify, Cloudflare Pages) to test it live;
- `npm run build:sections` → render each component to `sections/<slug>.{html,css,json}`.

The **portal** imports `theme.json` + `theme.css` + every `sections/*` file and turns the
sections into **drag-and-drop blocks** in the visual builder, where a content editor changes
text, colours, layout — no code.

> **Source of truth:** `components/sections/*.jsx` (+ their `*.css`). `sections/*` is *generated*
> by `npm run build:sections` and committed so the portal can fetch it. Edit the component, rebuild, push.

## Layout

```
components/sections/
  Hero.jsx      Hero.css        # a section = one React component + its CSS + an exported `meta`
  Features.jsx                  # (Features uses inline styles + theme.css primitives — no .css file)
  Cta.jsx       Cta.css
  Faq.jsx       Faq.css
  Footer.jsx    Footer.css
scripts/build-sections.mjs      # renders the components above -> sections/*.{html,css,json}

sections/                       # GENERATED — what the portal imports (commit it; don't hand-edit)
  aurora-hero.html  aurora-hero.css  aurora-hero.json   # html + css + meta(name/slug/category/sequence/description)
  aurora-features.html  aurora-features.json
  aurora-cta.html   aurora-cta.css   aurora-cta.json
  aurora-faq.html   aurora-faq.css   aurora-faq.json
  aurora-footer.html  aurora-footer.css  aurora-footer.json

theme.json                      # name, slug, version, description, colors{primary,accent,bg,text,muted}, fonts{body,display}, extra_tokens{}
theme.css                       # shared primitives: .wrap .section .h1/.h2/.h3 .eyebrow .lead .btn .surface .grid-auto … (responsive)
head.html / body-end.html       # optional extra <head> / pre-</body> markup the portal injects

app/                            # Next.js preview/test harness — layout.jsx injects theme vars; page.jsx composes the sections
package.json  next.config.mjs   # standard Next.js
```

### A section component

```jsx
// components/sections/Hero.jsx
export const meta = { name: "Hero — centered", slug: "aurora-hero", category: "Aurora • Heroes", sequence: 10, description: "Centered headline, subtitle, two CTAs." };

export default function Hero({
  eyebrow = "What we do",
  heading = "Headline that says exactly what you do",
  subtitle = "One or two supporting sentences.",
  primaryHref = "/contact", primaryLabel = "Get started",
  secondaryHref = "/services", secondaryLabel = "See what we do",
} = {}) {
  return (
    <section className="aurora-hero">
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="h1">{heading}</h1>
        <p className="lead">{subtitle}</p>
        <div className="actions">
          <a className="btn btn-primary" href={primaryHref}>{primaryLabel}</a>
          <a className="btn btn-ghost" href={secondaryHref}>{secondaryLabel}</a>
        </div>
      </div>
    </section>
  );
}
```

- **Props default to content.** That's how the section reads on the live site / in the preview;
  in the portal builder the editor edits the rendered text directly.
- **`export const meta`** = how the block shows up in the builder (`name`, `slug`, `category`,
  `sequence`, `description`). `slug` becomes the section's file name and the portal record's slug.
- **CSS** goes in `Section.css` next to it, using the theme vars (`var(--primary)`, `var(--bg)`,
  `var(--text)`, `var(--accent)`, `var(--muted)`, `var(--font-display)`). The build copies it.
- **Needs live data?** Make the component `async` and `fetch()` in it (App Router server component),
  or pass props from `app/page.jsx`. Whatever you can do in React, you can do here.
- **`{{tokens}}`** — put `{{site_title}}`, `{{tagline}}`, `{{year}}`, `{{focus_keyword}}`, or any
  custom per-site token (including rotating ones) anywhere as text; they resolve on the live site.
  The preview substitutes a few sample values.

## Run / test / deploy

```bash
npm install
npm run dev                   # http://localhost:3000 — composes the section components (app/page.jsx)
npm run build:sections        # render components -> sections/*.{html,css,json}
npm run build && npm start    # production build of the preview app
# deploy app/ to Vercel / Netlify / Cloudflare Pages to test the theme live on your platform
```

Typical change: edit a component in `components/sections/`, `npm run build:sections`,
`git add -A && git commit && git push`, then **Fetch from GitHub** in the portal.

## Import into the portal

1. **Websites Portal → Themes → Import theme from GitHub** → paste this repo's URL.
   It creates a Theme record, pulls in the colours/fonts/`theme.css`, and imports every section.
2. Create a site, pick this theme. Open a page → **Visual editor** → **Open visual builder** →
   the sections appear as draggable blocks (grouped by their `meta.category`). Edit text, restyle,
   publish. The builder canvas uses the theme colours, so it matches the live site.
3. Edited the repo? **Theme → GitHub import → Fetch from GitHub** again — it updates the theme +
   sections in place (matched by slug). Bump `version` in `theme.json` so the change is visible.

## Add a new section

1. `components/sections/MyThing.jsx` — a default-exported component **and** `export const meta = { name, slug, category, sequence, description }`.
2. (Optional) `components/sections/MyThing.css` for its styles; add `@import "../components/sections/MyThing.css";` to `app/globals.css` so the preview picks it up.
3. Use it in `app/page.jsx` (or not — it'll still be built).
4. `npm run build:sections` → generates `sections/<slug>.{html,css,json}`. Commit everything, push, re-fetch in the portal.

## Make it *your* theme

1. Change the 5 colours + 2 fonts (and `extra_tokens`) in `theme.json`.
2. Rewrite `theme.css` — keep the CSS-var names so colours apply; keep it responsive (`clamp()`,
   `grid auto-fit`, `flex-wrap`, `@media`).
3. Add/replace section components. `npm run build:sections`. Push. Re-fetch in the portal.

## Need genuinely interactive React on the live site?

Static section HTML (this repo) is editable in the builder and covers the common case. For
sandboxed interactive widgets, the live renderer (`websites-portal-web`) also supports a
`react_widget` block and typed React block components in its `community/blocks/` folder — see
`community/PLUGIN_SPEC.md` there.
