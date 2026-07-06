import { useMemo, useState } from "react";
import useInView from "../hooks/useInView";
import "./DatasetSection.css";

const SAMPLE_ROWS = [
  { year: 2022, state: "California", indicator: "Obesity Rate", age: "18-24", gender: "All", value: "22.4%" },
  { year: 2022, state: "Texas", indicator: "Diabetes Prevalence", age: "45-54", gender: "Male", value: "14.1%" },
  { year: 2021, state: "New York", indicator: "Physical Inactivity", age: "25-34", gender: "Female", value: "19.8%" },
  { year: 2021, state: "Florida", indicator: "Hypertension", age: "55-64", gender: "All", value: "31.6%" },
  { year: 2020, state: "Ohio", indicator: "Smoking Rate", age: "35-44", gender: "Male", value: "17.2%" },
  { year: 2020, state: "Illinois", indicator: "Obesity Rate", age: "65+", gender: "Female", value: "27.9%" },
];

const METADATA = [
  { label: "Source", value: "Data.gov" },
  { label: "Format", value: "CSV" },
  { label: "Rows", value: "487,500" },
  { label: "Columns", value: "9" },
  { label: "License", value: "Public Domain" },
  { label: "Last Updated", value: "2024" },
];

export default function DatasetSection() {
  const [ref, isInView] = useInView({ threshold: 0.15 });
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    if (!query.trim()) return SAMPLE_ROWS;
    const q = query.toLowerCase();
    return SAMPLE_ROWS.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(q))
    );
  }, [query]);

  const handleDownload = () => {
    const header = Object.keys(SAMPLE_ROWS[0]).join(",");
    const rows = SAMPLE_ROWS.map((r) => Object.values(r).join(","));
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "us-health-analysis-sample.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="dataset" className={`dsec ${isInView ? "dsec--visible" : ""}`} ref={ref}>
      <div className="dsec__inner">
        <header className="dsec__header">
          <span className="dsec__eyebrow">Dataset Explorer</span>
          <h2 className="dsec__title">Inspect the source data</h2>
          <p className="dsec__subtitle">
            Sample rows shown below. This panel is wired to accept a live API response &mdash; swap the
            static array for a fetch call and the table, search, and stats update automatically.
          </p>
        </header>

        <div className="dsec__stats">
          {METADATA.map((m) => (
            <div className="dsec__stat-card" key={m.label}>
              <span className="dsec__stat-label">{m.label}</span>
              <span className="dsec__stat-value">{m.value}</span>
            </div>
          ))}
        </div>

        <div className="dsec__panel">
          <div className="dsec__toolbar">
            <div className="dsec__search">
              <svg viewBox="0 0 20 20" className="dsec__search-icon" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <line x1="13" y1="13" x2="18" y2="18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search state, indicator, year&hellip;"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="dsec__search-input"
                aria-label="Search dataset"
              />
            </div>
            <button type="button" className="dsec__download-btn" onClick={handleDownload}>
              Download CSV
            </button>
          </div>

          <div className="dsec__table-wrap">
            <table className="dsec__table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>State</th>
                  <th>Indicator</th>
                  <th>Age Group</th>
                  <th>Gender</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="dsec__empty">
                      No rows match &ldquo;{query}&rdquo;.
                    </td>
                  </tr>
                )}
                {filteredRows.map((row, i) => (
                  <tr key={`${row.state}-${row.indicator}-${i}`}>
                    <td>{row.year}</td>
                    <td>{row.state}</td>
                    <td>{row.indicator}</td>
                    <td>{row.age}</td>
                    <td>{row.gender}</td>
                    <td className="dsec__table-value">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="dsec__table-note">Showing sample rows &mdash; placeholder data pending backend integration.</p>
        </div>
      </div>
    </section>
  );
}
