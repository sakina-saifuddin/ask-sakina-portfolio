// Pre-written conversation threads for /ask — each one a static, recruiter-style
// back-and-forth. Every claim here is pulled directly from data/portfolio.ts
// (profile, experience, projects, qaItems) — nothing here is invented.

export type PresetMessage =
  | { role: "user"; text: string }
  | { role: "assistant"; text: string; facts?: string[]; links?: { label: string; href: string }[] };

export type PresetConversation = {
  id: string;
  title: string;
  messages: PresetMessage[];
};

export const presetConversations: PresetConversation[] = [
  {
    id: "why-hire-me",
    title: "What makes Sakina a strong AI & automation engineer?",
    messages: [
      { role: "user", text: "What makes Sakina a strong AI & automation engineer?" },
      {
        role: "assistant",
        text: "Her work covers both engineering and analysis. She has shipped production applications, built dashboards, automated manual workflows, integrated healthcare data, worked with clients and campaign performance, and trained machine-learning models. The portfolio links those claims to screenshots, metrics, code, and case studies — not just a list of buzzwords.",
        facts: ["Production software", "Analytics", "Machine learning"],
        links: [{ label: "Review the work", href: "/books" }],
      },
      { role: "user", text: "What makes her different from other early-career candidates?" },
      {
        role: "assistant",
        text: "Breadth backed by evidence. Her project results include 94% mean accuracy on an EEG seizure-detection model, a DCGAN project that improved chest X-ray classifier accuracy from 73.56% to 82.21%, 1,074 automated financial reports in production use, and a retail forecasting pipeline validated on 3M+ sales records. Most candidates at this stage have one or two of those categories — she has all of them, each with a documented case study.",
        facts: ["94% EEG accuracy", "82.21% X-ray accuracy", "1,074 reports live"],
        links: [{ label: "Project archive", href: "/books" }],
      },
      { role: "user", text: "What roles is she looking for?" },
      {
        role: "assistant",
        text: "Machine Learning Engineer, Software Engineer, Data / BI Analyst, AI & Automation, and Systems / Performance Analyst roles — anywhere she can work across data, software, analytics, and machine learning rather than being boxed into just one.",
        facts: ["ML Engineer", "Software Engineer", "Data / BI"],
      },
      { role: "user", text: "Is she available to start soon?" },
      {
        role: "assistant",
        text: "She's open to internships, co-ops, and early-career opportunities now. She's based in Houston, Texas and pursuing an M.S. in Engineering Data Science & AI at the University of Houston, expected to graduate in 2027.",
        facts: ["Open now", "Houston, TX", "Grad. 2027"],
        links: [{ label: "Open resume", href: "/resume" }],
      },
    ],
  },
  {
    id: "experience",
    title: "How did she automate 1,074 recurring reports?",
    messages: [
      { role: "user", text: "How did she automate 1,074 recurring reports?" },
      {
        role: "assistant",
        text: "At TMAC / NIST-MEP, she built Python and SQL pipelines over PeopleSoft data to automate 1,074 recurring reports across 11+ departments and 50+ grant and financial datasets, plus 10+ Power BI / PowerApps dashboards for financial review and a monthly Oracle-to-Excel fiscal-year merge workflow — cutting manual workload roughly in half.",
        facts: ["1,074 reports", "11+ departments", "50% less manual work"],
        links: [{ label: "Power BI case study", href: "/works/financial-reconciliation" }],
      },
      { role: "user", text: "That's just one role — what does her full experience look like?" },
      {
        role: "assistant",
        text: "3.5+ years across six roles: currently an AI Automation Engineer intern at Dental-X AI and a BI & Automation intern at TMAC / NIST-MEP, plus prior roles in marketing operations at the University of Houston, BI consulting at BluTech Consulting, performance management at The Walnut Agency, and software engineering at SoftSyncDev.",
        facts: ["3.5+ years", "6 roles", "software → BI → ML"],
        links: [{ label: "Full experience", href: "/#chapter-four" }],
      },
      { role: "user", text: "What is she doing at Dental-X AI?" },
      {
        role: "assistant",
        text: "She built a Python ETL pipeline combining CareStack, DentalXchange, SQL sources, APIs, and JSON data into one consistent schema for dental insurance eligibility. She built normalization logic for conflicting payer responses and validated the output in BigQuery across 7 production deployments — reducing manual eligibility lookup by roughly 2 hours per case and improving validated data accuracy from about 20% to 80%.",
        facts: ["7 deployments", "20% → 80% accuracy", "BigQuery"],
      },
      { role: "user", text: "What about her earlier roles, before the internships?" },
      {
        role: "assistant",
        text: "At BluTech Consulting she built 10+ Power BI and Tableau dashboards over 500K+ banking records for UBL and cut reporting turnaround by 25%. Before that, at The Walnut Agency, she progressed from Performance Management Analyst to Senior, managing 70+ client accounts and improving organic engagement 60%+. And at SoftSyncDev, as a Software Engineer, she shipped 5+ full-stack apps and a production AI chatbot used by 1,000+ people, cutting response latency 40%.",
        facts: ["500K+ records", "70+ accounts", "1,000+ chatbot users"],
        links: [{ label: "See all experience", href: "/#chapter-four" }],
      },
    ],
  },
  {
    id: "projects",
    title: "How does she turn messy data into shipped ML models?",
    messages: [
      { role: "user", text: "How does she turn messy data into shipped ML models?" },
      {
        role: "assistant",
        text: "Take her retail demand-forecasting project: over 3M+ sales records, she handled missing values based on what each field actually meant rather than filling every column the same way, engineered calendar, lag, and rolling-demand features, and shifted historical sales to prevent future-data leakage — then compared Linear Regression, Random Forest, and LightGBM with time-ordered validation. LightGBM won with a 0.4516 RMSE on the unseen holdout set.",
        facts: ["3M+ records", "LightGBM RMSE 0.4516", "No data leakage"],
        links: [{ label: "See all projects", href: "/books" }],
      },
      { role: "user", text: "Tell me more about the AI job-search platform." },
      {
        role: "assistant",
        text: "It's called Sakina Job OS — a 12-stage n8n workflow that discovers and deduplicates postings, verifies each one is still official, runs a Claude-based fit and strong-job gate before generating tailored resumes and cover letters, matches first-degree LinkedIn connections for warm outreach, and logs everything to Airtable. Nothing gets auto-sent — it ends at a human-review gate.",
        facts: ["n8n + Claude", "Human review gate", "Airtable system of record"],
        links: [{ label: "Sakina Job OS", href: "/works/sakina-job-os" }],
      },
      { role: "user", text: "What about outside of retail — has she shipped models in other domains?" },
      {
        role: "assistant",
        text: "Yes — on the medical-imaging side, a DCGAN-augmented chest X-ray classifier improved pneumonia-detection test accuracy from 73.56% to 82.21% after she diagnosed why her first GAN attempt failed and redesigned the training strategy. A separate EEG seizure-detection model reached 94% mean classification accuracy.",
        facts: ["73.56% → 82.21%", "94% EEG accuracy", "DCGAN"],
        links: [{ label: "ML projects", href: "/books" }],
      },
      { role: "user", text: "Where can I see the full case studies?" },
      {
        role: "assistant",
        text: "Every project on the portfolio has a full write-up — problem, approach, evaluation, outcomes, and the actual evidence (screenshots, code, reports) it's based on, plus honest limitations where the evidence doesn't fully support a bigger claim.",
        links: [{ label: "Browse all projects", href: "/books" }],
      },
    ],
  },
  {
    id: "skills",
    title: "What are her core AI & data skills?",
    messages: [
      { role: "user", text: "What are her core AI & data skills?" },
      {
        role: "assistant",
        text: "Across four areas: AI & ML — PyTorch, TensorFlow, Scikit-learn, OpenCV, Hugging Face, and OpenAI / LLM APIs. Data & BI — SQL, Pandas, Power BI, Tableau, BigQuery, and DAX / Power Query. Software — JavaScript, TypeScript, React, Next.js, Node.js, MongoDB, and Git. Cloud & Automation — AWS, Docker, Power Automate, SharePoint, and REST APIs.",
        facts: ["24 tools", "4 categories", "AI to cloud"],
      },
      { role: "user", text: "What machine-learning models has she actually trained herself?" },
      {
        role: "assistant",
        text: "Linear Regression, Random Forest, LightGBM, SVMs, CNNs, bidirectional LSTMs, multilayer neural networks, DCGANs, and a Deep Q-Network decision layer — with both TensorFlow/Keras and PyTorch.",
        facts: ["CNN / Bi-LSTM", "DCGAN", "LightGBM / DQN"],
        links: [{ label: "ML projects", href: "/books" }],
      },
      { role: "user", text: "Has she worked with LLMs and RAG in production?" },
      {
        role: "assistant",
        text: "Yes to LLMs — she has production experience with the OpenAI API, including a chatbot used by 1,000+ users, plus LLM-assisted data workflows. On RAG specifically, she's actively expanding into retrieval-based AI work, but the portfolio is careful not to claim production RAG experience the project evidence doesn't yet support.",
        facts: ["1,000+ chatbot users", "LLM integration", "RAG: expanding"],
      },
    ],
  },
  {
    id: "background",
    title: "Where is she based, and when can she start?",
    messages: [
      { role: "user", text: "Where is she based, and when can she start?" },
      {
        role: "assistant",
        text: "She's based in Houston, Texas, and is open to internships, co-ops, and early-career opportunities right now — she's not waiting on anything to start. She's currently pursuing an M.S. in Engineering Data Science & AI at the University of Houston, expected to graduate in 2027.",
        facts: ["Houston, Texas", "Available now", "Grad. 2027"],
        links: [{ label: "Resume", href: "/resume" }],
      },
      { role: "user", text: "What's her overall experience level?" },
      {
        role: "assistant",
        text: "3.5+ years across software engineering, data analytics, business intelligence, automation, healthcare data, performance analytics, and applied machine learning.",
        facts: ["3.5+ years", "6 disciplines"],
      },
      { role: "user", text: "What specific roles is she targeting?" },
      {
        role: "assistant",
        text: "Machine Learning Engineer, Software Engineer, Data / BI Analyst, AI & Automation, or Systems / Performance Analyst — she's aiming for roles where she can work across data, software, and machine learning rather than being boxed into just one.",
        facts: ["ML Engineer", "Software Engineer", "Data / BI"],
        links: [{ label: "Open resume", href: "/resume" }],
      },
    ],
  },
];
