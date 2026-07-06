import { useEffect, useState } from "react";
import useInView from "../hooks/useInView";
import "./KPISection.css";

const KPIS = [
  { id: "records", label: "Total Records", value: 487500, suffix: "+", format: "compact" },
  { id: "years", label: "Years Covered", value: 12, suffix: "", format: "plain" },
  { id: "indicators", label: "Health Indicators", value: 34, suffix: "", format: "plain" },
  { id: "states", label: "States Covered", value: 51, suffix: "", format: "plain" },
  { id: "visuals", label: "Dashboard Visuals", value: 22, suffix: "", format: "plain" },
];

function formatValue(n, format) {
  if (format === "compact") {
    return new Intl.NumberFormat("en-US").format(Math.round(n));
  }
  return Math.round(n).toString();
}

function CountUp({ value, format, active, duration = 1600 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value, duration]);

  return <>{formatValue(display, format)}</>;
}

export default function KPISection() {
  const [ref, isInView] = useInView({ threshold: 0.3 });

  return (
    <section className="kpi" aria-label="Key performance indicators">
      <div className="kpi__inner" ref={ref}>
        <div className="kpi__grid">
          {KPIS.map((kpi, i) => (
            <div
              key={kpi.id}
              className={`kpi__card ${isInView ? "kpi__card--visible" : ""}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="kpi__corner kpi__corner--tl" aria-hidden="true" />
              <span className="kpi__corner kpi__corner--br" aria-hidden="true" />
              <div className="kpi__value">
                <CountUp value={kpi.value} format={kpi.format} active={isInView} />
                {kpi.suffix}
              </div>
              <div className="kpi__label">{kpi.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
