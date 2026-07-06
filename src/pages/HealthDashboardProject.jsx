import useInView from "../hooks/useInView";
import HeroSection from "../components/HeroSection";
import KPISection from "../components/KPISection";
import DashboardSection from "../components/DashboardSection";
import DatasetSection from "../components/DatasetSection";
import DataModelSection from "../components/DataModelSection";
import PipelineSection from "../components/PipelineSection";
import InsightsSection from "../components/InsightsSection";
import TechStackSection from "../components/TechStackSection";
import RoadmapSection from "../components/RoadmapSection";
import "./HealthDashboardProject.css";

const OVERVIEW_CARDS = [
  {
    id: "description",
    label: "Project",
    title: "A national health snapshot, made explorable",
    body: "The US Health Analysis Dashboard turns twelve years of CDC survey responses into a single interactive report, letting anyone move from a national trend down to a single state and age group in a few clicks.",
  },
  {
    id: "problem",
    label: "Problem",
    title: "Health data is public, but not usable",
    body: "Federal health datasets are large, wide, and inconsistently coded across years. Analysts without a SQL background had no fast way to compare indicators across states or demographics.",
  },
  {
    id: "objectives",
    label: "Objective",
    title: "One model, every angle",
    body: "Build a single snowflake schema flexible enough to answer questions about trends, demographics, and geography without rebuilding the model for each new question.",
  },
  {
    id: "impact",
    label: "Impact",
    title: "Minutes, not spreadsheets",
    body: "What used to take a pivot table and an afternoon now takes a filter click: comparing obesity trends across ten states takes under thirty seconds in the published dashboard.",
  },
];

function ProjectOverviewSection() {
  const [ref, isInView] = useInView({ threshold: 0.15 });
  return (
    <section className={`overview ${isInView ? "overview--visible" : ""}`} ref={ref}>
      <div className="overview__inner">
        <header className="overview__header">
          <span className="overview__eyebrow">Project Overview</span>
          <h2 className="overview__title">Why this dashboard exists</h2>
        </header>
        <div className="overview__grid">
          {OVERVIEW_CARDS.map((card, i) => (
            <article className="overview__card" style={{ transitionDelay: `${i * 90}ms` }} key={card.id}>
              <span className="overview__card-label">{card.label}</span>
              <h3 className="overview__card-title">{card.title}</h3>
              <p className="overview__card-body">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * HealthDashboardProject
 * Top-level page for the "US Health Analysis Dashboard" case study.
 * Section order follows the brief's layout structure. Each section is a
 * self-contained component so future sections (API integration, real-time
 * analytics) can be dropped in without touching existing ones.
 */
export default function HealthDashboardProject() {
  return (
    <main className="hd-page">
      <HeroSection />
      <ProjectOverviewSection />
      <KPISection />
      <DashboardSection />
      <DatasetSection />
      <DataModelSection />
      <PipelineSection />
      <InsightsSection />
      <TechStackSection />
      <RoadmapSection />
    </main>
  );
}
