import useInView from "../hooks/useInView";
import "./TechStackSection.css";

const STACK = [
  { name: "Power BI", role: "Reporting & Visualization", initial: "PB" },
  { name: "SQL", role: "Querying & Aggregation", initial: "SQ" },
  { name: "Excel", role: "Initial Data Auditing", initial: "XL" },
  { name: "Python", role: "Cleaning & Transformation", initial: "PY" },
  { name: "PostgreSQL", role: "Relational Data Store", initial: "PG" },
  { name: "React", role: "Case Study Front End", initial: "R" },
  { name: "Vite", role: "Build Tooling", initial: "V" },
];

export default function TechStackSection() {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <section className={`tsec ${isInView ? "tsec--visible" : ""}`} ref={ref}>
      <div className="tsec__inner">
        <header className="tsec__header">
          <span className="tsec__eyebrow">Technologies Used</span>
          <h2 className="tsec__title">The tools behind the analysis</h2>
        </header>

        <div className="tsec__grid">
          {STACK.map((tech, i) => (
            <div className="tsec__card" style={{ transitionDelay: `${i * 70}ms` }} key={tech.name}>
              <div className="tsec__logo" aria-hidden="true">
                {tech.initial}
              </div>
              <h3 className="tsec__name">{tech.name}</h3>
              <p className="tsec__role">{tech.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
