/** FAQ — React section (native <details> accordion, no JS). Built to sections/faq.html. Styles in ./Faq.css. */
export const meta = { name: "FAQ — accordion", slug: "aurora-faq", category: "Aurora • Content", sequence: 40, description: "Native <details> accordion, no JavaScript." };

export default function Faq({
  heading = "Frequently asked",
  items = [
    { q: "How fast can we launch?", a: "Most sites go live within two weeks." },
    { q: "Do you handle hosting?", a: "Yes — fully managed, monitored and backed up." },
    { q: "Can we edit content ourselves?", a: "Yes — drag-drop builder plus full code access." },
  ],
} = {}) {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: "760px" }}>
        <h2 className="h2" style={{ textAlign: "center" }}>{heading}</h2>
        <div className="aurora-faq" style={{ marginTop: "20px" }}>
          {items.map((it, i) => (
            <details key={i}><summary>{it.q}</summary><p>{it.a}</p></details>
          ))}
        </div>
      </div>
    </section>
  );
}
