const capabilities = [
  {
    num: "01",
    title: "AI & Machine Learning",
    text: "Forecasting, computer vision, and generative models — from retail demand prediction to chest X-ray augmentation and EEG classification.",
  },
  {
    num: "02",
    title: "Data & Business Intelligence",
    text: "Dashboards and reporting systems that turn raw operational and financial data into decisions teams can act on.",
  },
  {
    num: "03",
    title: "Software & Systems",
    text: "Full-stack applications and backend systems — from AI-enabled chatbots to cloud-hosted mobile platforms.",
  },
  {
    num: "04",
    title: "Automation & Cloud",
    text: "ETL pipelines and workflow automation that remove manual, repetitive work from financial and healthcare operations.",
  },
];

export function ChapterBuild() {
  return (
    <section id="build" className="chapter chapter-build">
      <div className="chapter-label reveal">
        <span className="chapter-eyebrow">Chapter III</span>
        <span className="chapter-eyebrow-title">What I Build</span>
      </div>

      <p className="chapter-intro-line reveal">Four ways I turn problems into working systems.</p>

      <div className="build-list">
        {capabilities.map((item) => (
          <article className="build-row reveal" key={item.num}>
            <span className="build-row-number">{item.num}</span>
            <div className="build-row-body">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
