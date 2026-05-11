import "./globals.css";
import theme from "../theme.json";

export const metadata = {
  title: theme.name || "Theme Starter",
  description: theme.description || "Websites Portal theme preview",
};

// :root vars from theme.json so the section CSS (which uses var(--primary) …) resolves —
// same set the portal injects into its visual-builder canvas.
function themeVarsCss() {
  const c = theme.colors || {};
  const f = theme.fonts || {};
  return (
    ":root{" +
    `--primary:${c.primary || "#0ea5e9"};--wp-primary:${c.primary || "#0ea5e9"};` +
    `--accent:${c.accent || "#9eff00"};--wp-accent:${c.accent || "#9eff00"};` +
    `--bg:${c.bg || "#0a0e27"};--wp-bg:${c.bg || "#0a0e27"};` +
    `--text:${c.text || "#f8fafc"};--wp-text:${c.text || "#f8fafc"};` +
    `--muted:${c.muted || "#94a3b8"};--wp-muted:${c.muted || "#94a3b8"};` +
    `--font-body:'${f.body || "Inter"}';--wp-font-body:'${f.body || "Inter"}';` +
    `--font-display:'${f.display || "Space Grotesk"}';--wp-font-display:'${f.display || "Space Grotesk"}';` +
    "}body{margin:0;background:var(--bg);color:var(--text);font-family:var(--font-body),system-ui,-apple-system,sans-serif}"
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <style dangerouslySetInnerHTML={{ __html: themeVarsCss() }} />
        {children}
      </body>
    </html>
  );
}
