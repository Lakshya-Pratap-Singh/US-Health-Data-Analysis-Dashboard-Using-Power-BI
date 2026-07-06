import useInView from "../hooks/useInView";
import "./InsightsSection.css";

const INSIGHTS = [
  {
    id: "trend",
    title: "Obesity rates climbed steadily",
    detail: "National obesity prevalence rose 4.2 points over the 12-year window, with the steepest increase among the 35-44 age group.",
    icon: (
      <path d="M4 20 L9 13 L14 16 L20 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    id: "demo",
    title: "Age is the strongest predictor",
    detail: "Across nearly every indicator, age group explained more variance than gender or geography combined.",
    icon: (
      <>
        <circle cx="8" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17" cy="10" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 20c0-3.3 2.5-5.5 5.5-5.5S14 16.7 14 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: "region",
    title: "Southern states over-index on hypertension",
    detail: "Eight of the ten highest hypertension states sit in the South, well above the national median.",
    icon: (
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    ),
  },
  {
    id: "yoy",
    title: "Smoking rates fell year over year",
    detail: "Every single year in the dataset shows a decline in smoking prevalence &mdash; the only indicator with a monotonic trend.",
    icon: (
      <path d="M4 17 L9 11 L13 14 L20 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

export default function InsightsSection() {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <section className={`insec ${isInView ? "insec--visible" : ""}`} ref={ref}>
      <div className="insec__inner">
        <header className="insec__header">
          <span className="insec__eyebrow">Key Insights</span>
          <h2 className="insec__title">What the data reveals</h2>
        </header>

        <div className="insec__grid">
          {INSIGHTS.map((item, i) => (
            <article className="insec__card" style={{ transitionDelay: `${i * 90}ms` }} key={item.id}>
              <svg className="insec__icon" viewBox="0 0 24 24">
                {item.icon}
              </svg>
              <h3 className="insec__card-title">{item.title}</h3>
              <p className="insec__card-detail">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
