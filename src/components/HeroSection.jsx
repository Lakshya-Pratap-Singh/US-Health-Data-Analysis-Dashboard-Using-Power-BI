import { useEffect, useRef } from "react";
import PulseDivider from "./PulseDivider";
import "./HeroSection.css";

/**
 * HeroSection
 * Full-width banner. Ambient floating data points sit behind a large
 * ECG waveform (the page's signature motif) and the project title.
 */
export default function HeroSection() {
  const fieldRef = useRef(null);

  // Generate floating data points once on mount (randomized but stable per load).
  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    const count = 26;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i += 1) {
      const dot = document.createElement("span");
      dot.className = "hero__dot";
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.setProperty("--drift-x", `${(Math.random() - 0.5) * 40}px`);
      dot.style.setProperty("--dur", `${8 + Math.random() * 10}s`);
      dot.style.setProperty("--delay", `${Math.random() * -12}s`);
      dot.style.opacity = 0.25 + Math.random() * 0.5;
      frag.appendChild(dot);
    }
    field.appendChild(frag);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero" aria-label="Project introduction">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__field" ref={fieldRef} aria-hidden="true" />
      <PulseDivider variant="ambient" />

      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          Case Study &middot; Health Data Analytics
        </div>

        <h1 className="hero__title">
          US Health Analysis <span className="hero__title-accent">Dashboard</span>
        </h1>

        <p className="hero__subtitle">Transforming Healthcare Data into Actionable Insights</p>

        <div className="hero__actions">
          <button type="button" className="hero__btn hero__btn--primary" onClick={() => scrollTo("dashboard")}>
            View Dashboard
          </button>
          <button type="button" className="hero__btn hero__btn--ghost" onClick={() => scrollTo("dataset")}>
            View Dataset
          </button>
          <button type="button" className="hero__btn hero__btn--ghost" onClick={() => scrollTo("data-model")}>
            View Data Model
          </button>
        </div>

        <div className="hero__readout" role="presentation">
          <div className="hero__readout-item">
            <span className="hero__readout-label">Status</span>
            <span className="hero__readout-value hero__readout-value--live">Live</span>
          </div>
          <div className="hero__readout-item">
            <span className="hero__readout-label">Source</span>
            <span className="hero__readout-value">CDC &middot; BRFSS</span>
          </div>
          <div className="hero__readout-item">
            <span className="hero__readout-label">Refresh</span>
            <span className="hero__readout-value">Annual</span>
          </div>
        </div>
      </div>
    </section>
  );
}
