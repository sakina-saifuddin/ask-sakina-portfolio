const groups = [
  {
    num: "01",
    title: "Engineering",
    tools: ["Python", "JavaScript", "TypeScript", "Java", "Node.js", "React", "Next.js", "MongoDB"],
  },
  {
    num: "02",
    title: "ML / AI",
    tools: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "Hugging Face", "OpenAI / LLM APIs", "CNN / GAN / SVM", "LightGBM"],
  },
  {
    num: "03",
    title: "Data / BI",
    tools: ["SQL", "Pandas", "BigQuery", "Power BI", "Tableau", "DAX / Power Query", "Teradata / HiveQL"],
  },
  {
    num: "04",
    title: "Automation / Cloud",
    tools: ["AWS", "Power Automate", "SharePoint", "PowerApps", "REST APIs", "Docker", "Git"],
  },
];

export function ChapterExpertise() {
  return (
    <section id="expertise" className="chapter chapter-expertise">
      <div className="chapter-label reveal">
        <span className="chapter-eyebrow">Chapter V</span>
        <span className="chapter-eyebrow-title">Tools &amp; Expertise</span>
      </div>

      <p className="chapter-intro-line reveal">The tools behind the work above, grouped by how I actually use them.</p>

      <div className="expertise-grid">
        {groups.map((group) => (
          <div className="expertise-group reveal" key={group.num}>
            <div className="expertise-group-head"><span>{group.num}</span><h3>{group.title}</h3></div>
            <p className="expertise-tools">{group.tools.join(" · ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
