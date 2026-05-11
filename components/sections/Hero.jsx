/**
 * Hero section — React version (example).
 *
 * Authoring a section in React is fine. Two rules so the portal can use it:
 *   1. Output the SAME markup that lives in `sections/hero.html` (the portal
 *      reads the .html file, not this component). Keep them in sync — easiest
 *      is to render this component to static HTML and write it to that file:
 *
 *        import { renderToStaticMarkup } from "react-dom/server";
 *        import Hero from "./components/sections/Hero.jsx";
 *        fs.writeFileSync("sections/hero.html", renderToStaticMarkup(<Hero/>));
 *
 *   2. Put the section's styles in `sections/hero.css` (the portal reads that),
 *      not CSS-in-JS — and use the theme variables (var(--primary), var(--bg),
 *      var(--text), var(--accent), var(--muted), var(--font-display)).
 *
 * Props are optional — the portal renders the markup statically; tokens like
 * {{site_title}} are substituted server-side on the live site.
 */
export default function Hero({ eyebrow = "What we do", heading = "Headline that says exactly what you do", subtitle = "One or two sentences of supporting copy — work your focus keyword naturally.", primaryHref = "/contact", primaryLabel = "Get started", secondaryHref = "/services", secondaryLabel = "See what we do" } = {}) {
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
