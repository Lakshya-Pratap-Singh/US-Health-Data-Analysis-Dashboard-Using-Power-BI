import useInView from "../hooks/useInView";
import "./DataModelSection.css";

const DIMENSIONS = [
  { id: "date", name: "DimDate", fields: ["date_id", "year", "quarter", "month"], pos: "top" },
  { id: "location", name: "DimLocation", fields: ["location_id", "state", "region"], pos: "left" },
  { id: "age", name: "DimAge", fields: ["age_id", "age_group"], pos: "bottom-left" },
  { id: "indicator", name: "DimIndicator", fields: ["indicator_id", "category", "unit"], pos: "bottom-right" },
  { id: "gender", name: "DimGender", fields: ["gender_id", "gender"], pos: "right" },
];

const DATABASES = [
  { name: "PostgreSQL", note: "Primary relational store &mdash; planned for the live ETL target." },
  { name: "MySQL", note: "Alternate relational backend for lightweight deployments." },
  { name: "MongoDB", note: "Document store for unstructured survey metadata." },
];

// Anchor points (in the 0-100 viewBox) matching each dimension's position class.
const ANCHORS = {
  top: { x: 50, y: 8 },
  left: { x: 10, y: 42 },
  "bottom-left": { x: 26, y: 88 },
  "bottom-right": { x: 74, y: 88 },
  right: { x: 90, y: 42 },
};

export default function DataModelSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="data-model" className={`dmsec ${isInView ? "dmsec--visible" : ""}`} ref={ref}>
      <div className="dmsec__inner">
        <header className="dmsec__header">
          <span className="dmsec__eyebrow">Data Modeling</span>
          <h2 className="dmsec__title">Snowflake schema architecture</h2>
          <p className="dmsec__subtitle">
            A single fact table holds every recorded health measurement; five dimension tables
            normalize the descriptive attributes around it in a one-to-many relationship.
          </p>
        </header>

        <div className="dmsec__diagram">
          <svg className="dmsec__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {DIMENSIONS.map((d) => {
              const a = ANCHORS[d.pos];
              return (
                <line
                  key={d.id}
                  x1="50"
                  y1="46"
                  x2={a.x}
                  y2={a.y}
                  className="dmsec__line"
                />
              );
            })}
          </svg>

          <div className="dmsec__fact">
            <span className="dmsec__fact-badge">FACT</span>
            <h3 className="dmsec__fact-name">FactHealthData</h3>
            <ul className="dmsec__fact-fields">
              <li>record_id (PK)</li>
              <li>date_id &middot; location_id</li>
              <li>age_id &middot; indicator_id &middot; gender_id</li>
              <li>value &middot; sample_size</li>
            </ul>
          </div>

          {DIMENSIONS.map((d) => (
            <div className={`dmsec__dim dmsec__dim--${d.pos}`} key={d.id}>
              <span className="dmsec__dim-badge">DIM</span>
              <h4 className="dmsec__dim-name">{d.name}</h4>
              <ul className="dmsec__dim-fields">
                {d.fields.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="dmsec__relationships">
          <h3 className="dmsec__rel-heading">Database Relationships</h3>
          <p className="dmsec__rel-copy">
            The schema above is database-agnostic today. It's designed to map directly onto any of
            the following backends once live API integration begins:
          </p>
          <div className="dmsec__db-grid">
            {DATABASES.map((db) => (
              <div className="dmsec__db-card" key={db.name}>
                <div className="dmsec__db-dot" aria-hidden="true" />
                <h4 className="dmsec__db-name">{db.name}</h4>
                <p className="dmsec__db-note">{db.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
