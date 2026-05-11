/**
 * Home page — imports the section components directly and composes a page, the way
 * a developer would in any React app. Pass props to override the defaults; connect
 * `fetch()` / your API / a CMS here when a section needs live data.
 *
 * `npm run dev`  → see this page.
 * `npm run build:sections` → render each component to `sections/<slug>.{html,css,json}`,
 *                            which is what the Websites Portal imports.
 *
 * The components in `components/sections/` are the single source of truth: edit them,
 * re-run the build, commit & push, then "Fetch from GitHub" in the portal.
 */
import Hero from "../components/sections/Hero.jsx";
import Features from "../components/sections/Features.jsx";
import Cta from "../components/sections/Cta.jsx";
import Faq from "../components/sections/Faq.jsx";
import Footer from "../components/sections/Footer.jsx";

export default function Page() {
  const year = new Date().getFullYear();
  return (
    <main>
      <Hero
        eyebrow="What we do"
        heading="Build a site you can actually edit"
        subtitle="Themes are plain React. Compose, override props, wire in your API — then publish."
      />
      <Features />
      <Cta />
      <Faq />
      <Footer siteTitle="Acme Co" tagline="We build things that work." year={year} />
    </main>
  );
}
