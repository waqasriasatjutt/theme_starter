/** Features — React section. Built to sections/features.html by `npm run build:sections`.
 *  Inline styles here just keep this section self-contained; the heavy lifting is in theme.css. */
export const meta = { name: "Features — 3 columns", slug: "aurora-features", category: "Aurora • Content", sequence: 20, description: "Three feature cards with icon, title, text." };

const cardStyle = { padding: "26px" };
const iconStyle = { fontSize: "1.8rem", marginBottom: "10px" };
const mutedP = { color: "var(--muted)", margin: 0 };

function Card({ icon, title, text }) {
  return (
    <div className="surface" style={cardStyle}>
      <div style={iconStyle}>{icon}</div>
      <h3 className="h3">{title}</h3>
      <p style={mutedP}>{text}</p>
    </div>
  );
}

export default function Features({
  eyebrow = "Why us",
  heading = "Built for the way you actually work",
  items = [
    { icon: "⚡", title: "Fast", text: "Live in days, not months." },
    { icon: "🔒", title: "Reliable", text: "Monitored, backed up, boring in the best way." },
    { icon: "📈", title: "Measurable", text: "Every change tied to a number." },
  ],
} = {}) {
  return (
    <section className="section">
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="h2">{heading}</h2>
        <div className="grid-auto" style={{ marginTop: "32px" }}>
          {items.map((it, i) => <Card key={i} {...it} />)}
        </div>
      </div>
    </section>
  );
}
