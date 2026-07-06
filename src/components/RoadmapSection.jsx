import useInView from "../hooks/useInView";
import "./RoadmapSection.css";

const PHASES = [
  { phase: 1, title: "Dashboard Showcase", status: "done", note: "Power BI report embedded and live." },
  { phase: 2, title: "Dataset Explorer", status: "done", note: "Searchable sample data with CSV export." },
  { phase: 3, title: "Schema Visualization", status: "done", note: "Snowflake schema and relationships mapped." },
  { phase: 4, title: "API Integration", status: "planned", note: "Connect the explorer to a live backend." },
  { phase: 5, title: "Real-Time Analytics", status: "planned", note: "Streaming updates as new survey data lands." },
  { phase: 6, title: "Predictive Health Insights", status: "planned", note: "Forecasting models layered on top of trends." },
];

export default function RoadmapSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section className={`rsec ${isInView ? "rsec--visible" : ""}`} ref={ref}>
      <div className="rsec__inner">
        <header className="rsec__header">
          <span className="rsec__eyebrow">Future Roadmap</span>
          <h2 className="rsec__title">Where this project is headed</h2>
        </header>

        <div className="rsec__track">
          {PHASES.map((p, i) => (
            <div className="rsec__phase" style={{ transitionDelay: `${i * 80}ms` }} key={p.phase}>
              <div className={`rsec__marker rsec__marker--${p.status}`}>
                <span>{p.phase}</span>
              </div>
              <h3 className="rsec__phase-title">{p.title}</h3>
              <p className="rsec__phase-note">{p.note}</p>
              <span className={`rsec__status rsec__status--${p.status}`}>
                {p.status === "done" ? "Shipped" : "Planned"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
