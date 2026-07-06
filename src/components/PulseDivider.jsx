import "./PulseDivider.css";

/**
 * PulseDivider
 * The page's signature motif: an ECG-style waveform that "draws" itself.
 * Used as a section divider (label + tick) and, scaled up, as hero atmosphere.
 * variant: "divider" (thin, labeled) | "ambient" (large, background)
 */
export default function PulseDivider({ label, variant = "divider" }) {
  return (
    <div className={`pulse ${variant === "ambient" ? "pulse--ambient" : "pulse--divider"}`}>
      {variant === "divider" && label && <span className="pulse__label">{label}</span>}
      <svg
        className="pulse__wave"
        viewBox="0 0 600 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="pulse__path"
          d="M0,30 L120,30 L145,30 L158,8 L172,52 L186,18 L198,30 L230,30 L600,30"
        />
      </svg>
    </div>
  );
}
