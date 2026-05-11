/** Footer — React section. Built to sections/footer.html. Styles in ./Footer.css.
 *  {{site_title}} / {{year}} / {{tagline}} pass through as text and resolve on the live site. */
export const meta = { name: "Footer — columns", slug: "aurora-footer", category: "Aurora • Layout", sequence: 90, description: "Multi-column footer with link lists and copyright bar." };

const colStyle = { fontFamily: "var(--font-display)" };

function LinkCol({ title, links }) {
  return (
    <div>
      <h4>{title}</h4>
      {links.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}
    </div>
  );
}

export default function Footer({
  siteTitle = "{{site_title}}",
  tagline = "{{tagline}}",
  year = "{{year}}",
  columns = [
    { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Contact", href: "/contact" }] },
    { title: "Services", links: [{ label: "All services", href: "/services" }, { label: "Pricing", href: "/pricing" }] },
    { title: "Legal", links: [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }] },
  ],
} = {}) {
  return (
    <footer className="aurora-ft">
      <div className="wrap">
        <div className="aurora-ft-cols">
          <div>
            <strong style={colStyle}>{siteTitle}</strong>
            <p style={{ color: "var(--muted)", marginTop: "8px", maxWidth: "320px" }}>{tagline}</p>
          </div>
          {columns.map((c, i) => <LinkCol key={i} {...c} />)}
        </div>
        <div className="aurora-ft-bar">© {year} {siteTitle}. All rights reserved.</div>
      </div>
    </footer>
  );
}
