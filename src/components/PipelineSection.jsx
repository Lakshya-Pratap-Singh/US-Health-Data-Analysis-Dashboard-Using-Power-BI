import useInView from "../hooks/useInView";
import PulseDivider from "./PulseDivider";
import "./PipelineSection.css";

const STAGES = [
  { id: "raw", label: "Raw Dataset", detail: "487,500 rows ingested from CDC BRFSS annual survey exports." },
  { id: "clean", label: "Data Cleaning", detail: "Nulls resolved, types coerced, duplicate surveys deduplicated." },
  { id: "transform", label: "Transformation", detail: "Wide-format survey responses reshaped into long-format facts." },
  { id: "model", label: "Data Modeling", detail: "Snowflake schema built around FactHealthData and five dimensions." },
  { id: "bi", label: "Power BI", detail: "Star-aware relationships loaded and DAX measures authored." },
  { id: "insights", label: "Insights Dashboard", detail: "Interactive report published for exploration and drill-down." },
];

export default function PipelineSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section className={`pipe ${isInView ? "pipe--visible" : ""}`} ref={ref}>
      <div className="pipe__inner">
        <header className="pipe__header">
          <span className="pipe__eyebrow">ETL Pipeline</span>
          <h2 className="pipe__title">From raw survey data to insight</h2>
        </header>

        <div className="pipe__timeline">
          <div className="pipe__spine" aria-hidden="true" />
          {STAGES.map((stage, i) => (
            <div className="pipe__stage" style={{ transitionDelay: `${i * 110}ms` }} key={stage.id}>
              <div className="pipe__node">
                <span className="pipe__node-index">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="pipe__card">
                <h3 className="pipe__stage-label">{stage.label}</h3>
                <p className="pipe__stage-detail">{stage.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <PulseDivider label="Pipeline Status: Complete" />
      </div>
    </section>
  );
}
