/**
 * Hero — React section. This file is the source of truth for this block:
 * `npm run build:sections` renders it to `sections/hero.html` (which the portal
 * imports and lets editors modify visually). Wire APIs/state here for the live
 * site; tokens like {{site_title}} pass through and resolve on the live site.
 * Styles: ./Hero.css. Block metadata: the `meta` export below.
 */
export const meta = { name: "Hero — centered", slug: "aurora-hero", category: "Aurora • Heroes", sequence: 10, description: "Centered headline, subtitle, two CTAs." };

export default function Hero({
  eyebrow = "What we do",
  heading = "Headline that says exactly what you do",
  subtitle = "One or two sentences of supporting copy. Use your focus keyword naturally.",
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
