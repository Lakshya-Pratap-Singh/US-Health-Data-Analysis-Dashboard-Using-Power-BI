import { useRef, useState } from "react";
import useInView from "../hooks/useInView";
import "./DashboardSection.css";

const POWERBI_SRC =
  "https://app.powerbi.com/view?r=eyJrIjoiOTI0MWYxMDItZDY1OC00MzEyLTg5YmQtZDMzZjMyNDUwMGU3IiwidCI6ImUxNGU3M2ViLTUyNTEtNDM4OC04ZDY3LThmOWYyZTJkNWE0NiIsImMiOjEwfQ%3D%3D";

const FEATURES = [
  "Cross-filtering across every visual on the page",
  "Drill-through from state-level to county-level detail",
  "Bookmarked views for common analysis scenarios",
  "Tooltip pages with contextual demographic breakdowns",
];

const FILTERS = ["Year", "State", "Age Group", "Gender", "Health Indicator"];

const VISUAL_TYPES = ["Choropleth Map", "Trend Line", "Stacked Bar", "Donut", "KPI Card", "Matrix Table"];

export default function DashboardSection() {
  const [ref, isInView] = useInView({ threshold: 0.15 });
  const [loaded, setLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const frameWrapRef = useRef(null);

  const toggleFullscreen = () => {
    const node = frameWrapRef.current;
    if (!node) return;

    if (!document.fullscreenElement) {
      node.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <section id="dashboard" className={`dbsec ${isInView ? "dbsec--visible" : ""}`} ref={ref}>
      <div className="dbsec__inner">
        <header className="dbsec__header">
          <span className="dbsec__eyebrow">Power BI Dashboard</span>
          <h2 className="dbsec__title">Explore the live dashboard</h2>
          <p className="dbsec__subtitle">
            A full Power BI report embedded directly &mdash; filter, drill through, and cross-highlight
            exactly as it behaves in production.
          </p>
        </header>

        <div className="dbsec__frame-shell" ref={frameWrapRef}>
          <div className="dbsec__frame-glow" aria-hidden="true" />
          <div className="dbsec__frame-toolbar">
            <div className="dbsec__traffic" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="dbsec__frame-title">US-Health-Analysis.pbix</span>
            <button type="button" className="dbsec__fullscreen-btn" onClick={toggleFullscreen}>
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
          </div>

          <div className="dbsec__frame-body">
            {!loaded && (
              <div className="dbsec__skeleton" aria-hidden="true">
                <div className="dbsec__skeleton-bar" style={{ width: "40%" }} />
                <div className="dbsec__skeleton-grid">
                  <div className="dbsec__skeleton-block" />
                  <div className="dbsec__skeleton-block" />
                  <div className="dbsec__skeleton-block" />
                </div>
                <div className="dbsec__skeleton-block dbsec__skeleton-block--wide" />
                <span className="dbsec__skeleton-label">Loading dashboard&hellip;</span>
              </div>
            )}
            <iframe
              title="US Health Analysis Dashboard"
              className={`dbsec__iframe ${loaded ? "dbsec__iframe--visible" : ""}`}
              src={POWERBI_SRC}
              frameBorder="0"
              allowFullScreen
              onLoad={() => setLoaded(true)}
            />
          </div>
        </div>

        <div className="dbsec__meta">
          <div className="dbsec__meta-col">
            <h3 className="dbsec__meta-heading">Dashboard Features</h3>
            <ul className="dbsec__meta-list">
              {FEATURES.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="dbsec__meta-col">
            <h3 className="dbsec__meta-heading">Filters Used</h3>
            <div className="dbsec__tags">
              {FILTERS.map((f) => (
                <span className="dbsec__tag" key={f}>
                  {f}
                </span>
              ))}
            </div>

            <h3 className="dbsec__meta-heading dbsec__meta-heading--spaced">Visual Types</h3>
            <div className="dbsec__tags">
              {VISUAL_TYPES.map((v) => (
                <span className="dbsec__tag dbsec__tag--amber" key={v}>
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="dbsec__interactivity">
          Every visual is wired for two-way interaction: selecting a state highlights its trend across
          all other charts, and hovering an indicator surfaces a tooltip page with a demographic
          breakdown for that exact selection.
        </p>
      </div>
    </section>
  );
}
