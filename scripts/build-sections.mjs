/**
 * build-sections — render each React section (components/sections/*.jsx) to plain
 * HTML and write sections/<slug>.{html,css,json}.
 *
 * The React components are the source of truth for the theme. This produces what
 * the Websites Portal imports (it reads sections/*). Run after editing a section:
 *
 *     npm install            # first time only
 *     npm run build:sections
 *     git add -A && git commit -m "..." && git push
 *     # then in the portal: open the theme → "Fetch from GitHub"
 *
 * Each section file should `export const meta = { name, slug, category, sequence, description }`.
 * The output file names come from meta.slug (falling back to the lowercased file name),
 * so the portal section slugs match what you declare in the component.
 */
import esbuild from "esbuild";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readdirSync, writeFileSync, copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const SRC = join(process.cwd(), "components", "sections");
const OUT = join(process.cwd(), "sections");
rmSync(OUT, { recursive: true, force: true });   // start clean so renamed/removed sections don't linger
mkdirSync(OUT, { recursive: true });

const jsxFiles = readdirSync(SRC).filter((f) => f.endsWith(".jsx"));
if (!jsxFiles.length) { console.error("No .jsx sections found in components/sections/"); process.exit(1); }

for (const f of jsxFiles) {
  const base = f.replace(/\.jsx$/, "");          // e.g. "Hero"
  const tmp = join(SRC, `.__build_${base}.mjs`);
  await esbuild.build({
    entryPoints: [join(SRC, f)],
    outfile: tmp,
    bundle: true,
    format: "esm",
    platform: "node",
    jsx: "automatic",
    jsxImportSource: "react",
    external: ["react", "react-dom", "react-dom/server", "react/jsx-runtime", "react/jsx-dev-runtime"],
    loader: { ".css": "empty" },                 // components shouldn't import CSS, but be safe
    logLevel: "silent",
  });
  let mod;
  try { mod = await import(`${pathToFileURL(tmp).href}?t=${Date.now()}`); }
  finally { try { rmSync(tmp); } catch {} }

  const Comp = mod.default;
  if (typeof Comp !== "function") { console.warn(`skip ${f}: no default-exported component`); continue; }
  const meta = mod.meta || {};
  const slug = (meta.slug || base.toLowerCase()).trim();

  const html = renderToStaticMarkup(React.createElement(Comp));
  writeFileSync(join(OUT, `${slug}.html`), html + "\n");

  const cssSrc = join(SRC, `${base}.css`);
  const hasCss = existsSync(cssSrc);
  if (hasCss) copyFileSync(cssSrc, join(OUT, `${slug}.css`));

  const json = {
    name: meta.name || base,
    slug,
    category: meta.category || "Sections",
    sequence: meta.sequence ?? 10,
    description: meta.description || "",
  };
  writeFileSync(join(OUT, `${slug}.json`), JSON.stringify(json, null, 2) + "\n");

  console.log(`built  sections/${slug}.html  +json` + (hasCss ? "  +css" : "") + `   (${base}.jsx)`);
}
console.log("\nDone. Commit & push, then re-fetch the theme in the portal.");
