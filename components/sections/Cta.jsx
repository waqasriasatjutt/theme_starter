/** Call-to-action — React section. Built to sections/cta.html. Styles in ./Cta.css. */
export const meta = { name: "Call-to-action band", slug: "aurora-cta", category: "Aurora • Conversion", sequence: 30, description: "Full-width gradient band with heading and button." };

export default function Cta({
  heading = "Ready when you are",
  subtitle = "Tell us what you're trying to grow and we'll map a plan.",
  href = "/contact", label = "Get in touch",
} = {}) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="aurora-cta">
          <h2 className="h2">{heading}</h2>
          <p className="lead" style={{ margin: "10px auto 0" }}>{subtitle}</p>
          <div className="actions" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href={href}>{label}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
