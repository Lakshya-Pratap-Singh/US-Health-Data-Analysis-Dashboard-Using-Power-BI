# US Health Analysis Dashboard — Project Showcase

A data-analytics case study page built with React + Vite and pure CSS.

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Structure

```
src/
  main.jsx                     entry point
  App.jsx                      renders the page
  index.css                    minimal global reset
  pages/
    HealthDashboardProject.jsx main page (design tokens live in its .css)
    HealthDashboardProject.css
  components/
    HeroSection.jsx/.css
    KPISection.jsx/.css
    DashboardSection.jsx/.css      (your Power BI embed lives here)
    DatasetSection.jsx/.css
    DataModelSection.jsx/.css      (snowflake schema + DB relationships)
    PipelineSection.jsx/.css
    InsightsSection.jsx/.css
    TechStackSection.jsx/.css
    RoadmapSection.jsx/.css
    PulseDivider.jsx/.css          shared animated waveform motif
  hooks/
    useInView.js                   scroll-reveal hook used across sections
```

## Notes

- Design tokens (colors, fonts, spacing) are defined as CSS variables on
  `.hd-page` in `src/pages/HealthDashboardProject.css`. Change them there to
  re-theme the whole page.
- The dataset table and metadata are placeholder data, structured so you can
  swap in a real `fetch()` call later without changing the component shape.
- Google Fonts are loaded via `<link>` tags in `index.html`.
