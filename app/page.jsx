import fs from "node:fs";
import path from "node:path";

/**
 * Preview page — renders every section in `sections/*.html`, in the order their
 * `.json` `sequence` says (falling back to filename). This is *exactly* what the
 * Websites Portal imports, so `npm run dev` shows the theme as it will appear in
 * the portal's visual builder and on the live site.
 *
 * If you prefer authoring a section in React, write it as a component in
 * `components/sections/` (see Hero.jsx for the pattern) and export its rendered
 * HTML to `sections/<name>.html` (and the CSS to `sections/<name>.css`) — that's
 * what the portal reads. The `.html` files are the source of truth for the portal.
 */
function loadSections() {
  const dir = path.join(process.cwd(), "sections");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
  const items = files.map((f) => {
    const name = f.replace(/\.html$/, "");
    const html = fs.readFileSync(path.join(dir, f), "utf8");
    let meta = {};
    const jp = path.join(dir, name + ".json");
    if (fs.existsSync(jp)) {
      try { meta = JSON.parse(fs.readFileSync(jp, "utf8")); } catch { /* ignore */ }
    }
    return { name, html, sequence: Number(meta.sequence ?? 999), label: meta.name || name };
  });
  items.sort((a, b) => a.sequence - b.sequence || a.name.localeCompare(b.name));
  return items;
}

export default function Page() {
  const sections = loadSections();
  return (
    <main>
      {/* Resolve {{tokens}} for the preview so the page reads naturally. */}
      {sections.map((s) => (
        <section key={s.name} data-section={s.name}
          dangerouslySetInnerHTML={{
            __html: s.html
              .replaceAll("{{site_title}}", "Acme Co")
              .replaceAll("{{tagline}}", "We build things that work.")
              .replaceAll("{{focus_keyword}}", "your service")
              .replaceAll("{{eyebrow}}", "What we do")
              .replaceAll("{{year}}", String(new Date().getFullYear())),
          }}
        />
      ))}
    </main>
  );
}
