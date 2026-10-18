export const profile = {
  name: "Sakina Saifuddin",
  shortName: "Sakina",
  location: "Houston, Texas",
  email: "sakinasaifee006@gmail.com",
  linkedin: "https://www.linkedin.com/in/sakinasaifuddin/",
  github: "https://github.com/sakina-saifuddin",
  education: "M.S. in Engineering Data Science & AI · University of Houston",
  graduation: "Expected 2027",
  availability: "Open to internships, co-ops, and early-career opportunities",
  headline: "I build AI, data, and software systems with clear results.",
  intro: "I build data products, automate workflows, create dashboards, train machine learning models, and work with LLM-based tools. My work spans software engineering, business intelligence, healthcare automation, and machine learning.",
  targetRoles: [
    "Machine Learning Engineer",
    "Software Engineer",
    "Data / BI Analyst",
    "AI & Automation",
    "Systems / Performance Analyst",
  ],
  organizations: [
    { name: "Dental-X AI", href: "https://dental-x.ai/", logo: "/company-logos/dentalx-user.png" },
    { name: "TMAC / NIST-MEP", href: "https://tmac.org/", logo: "/company-logos/tmac-user.png" },
    { name: "University of Houston", href: "https://www.uh.edu/", logo: "/company-logos/uh-user.png" },
    { name: "BluTech Consulting", href: "https://blutechconsulting.com/", logo: "/company-logos/blutech-user.png" },
    { name: "SoftSyncDev", href: "https://www.softsyncdev.com/", logo: "/company-logos/softsync-user.png" },
    { name: "The Walnut Agency", href: "https://thewalnutagency.com/", logo: "/company-logos/walnut.webp" },
  ],
  heroStats: [
    { value: "3.5+", label: "years of experience" },
    { value: "5+", label: "production apps shipped" },
    { value: "10+", label: "BI dashboards built" },
    { value: "1,074", label: "reports automated" },
  ],
};

export type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  companyUrl: string;
  location: string;
  intro: string;
  stats: { value: string; label: string }[];
  bullets: string[];
  tools: string[];
};

export const experience: ExperienceItem[] = [
  {
    period: "May 2026 — Sep 2026",
    role: "AI Automation Engineer (Intern)",
    company: "Dental-X AI",
    companyUrl: "https://dental-x.ai/",
    location: "Los Angeles, CA · Remote",
    intro: "I worked on healthcare automation for dental insurance workflows, bringing data from APIs, SQL sources, practice-management systems, and payer responses into one consistent structure.",
    stats: [
      { value: "15–20", label: "data sources integrated" },
      { value: "~2 hrs", label: "manual lookup reduced per case" },
      { value: "20% → 80%", label: "validated data accuracy" },
      { value: "7", label: "production deployments validated" },
    ],
    bullets: [
      "Built a Python ETL pipeline that combines CareStack, DentalXchange, SQL sources, APIs, JSON data, and other eligibility inputs into one consistent schema.",
      "Built normalization and reconciliation logic for conflicting payer and insurance responses so downstream eligibility data uses standardized values.",
      "Validated output in BigQuery across seven production deployments while working with real dental revenue-cycle and insurance eligibility workflows.",
    ],
    tools: ["Python", "ETL", "REST APIs", "SQL", "BigQuery", "Healthcare Data"],
  },
  {
    period: "Feb 2026 — Present",
    role: "Business Intelligence & Automation Intern",
    company: "Texas Manufacturing Assistance Center (TMAC / NIST-MEP)",
    companyUrl: "https://tmac.org/",
    location: "Houston, TX",
    intro: "I automate financial reporting and reconciliation work and turn large university datasets into dashboards that are easier for teams to review.",
    stats: [
      { value: "1,074", label: "recurring reports automated" },
      { value: "11+", label: "departments supported" },
      { value: "50+", label: "grant / financial datasets" },
      { value: "50%", label: "manual workload reduction" },
    ],
    bullets: [
      "Built Python and SQL pipelines over PeopleSoft data to automate 1,074 recurring reports across 11+ departments and 50+ grant and financial datasets.",
      "Built 10+ Power BI / PowerApps dashboards and workflows for financial review, verification, and discrepancy tracking.",
      "Built a monthly Oracle-to-Excel conversion and fiscal-year merge workflow that prepares validated data for SharePoint, Power Automate, and Power BI.",
    ],
    tools: ["Power BI", "PowerApps", "Python", "SQL", "PeopleSoft", "Power Automate", "SharePoint"],
  },
  {
    period: "Aug 2025 — Jan 2026",
    role: "Marketing Operations Analyst",
    company: "University of Houston",
    companyUrl: "https://www.uh.edu/",
    location: "Houston, TX · Part-time",
    intro: "I supported program marketing and campus engagement for the A.D. Bruce Religion Center, using content and event data to improve reach and turnout.",
    stats: [
      { value: "3+", label: "weekly programs marketed" },
      { value: "10–15", label: "social posts per week" },
      { value: "25–30%", label: "improvement in average event reach" },
      { value: "5+", label: "campus activations per month" },
    ],
    bullets: [
      "Marketed recurring campus programs including Free Wednesday Lunches, Good Morning Mondays, and LEGO stress-relief events.",
      "Created and scheduled 10–15 social posts per week and planned content around upcoming events.",
      "Used engagement results to refine content strategy and improve average event reach by 25–30%.",
    ],
    tools: ["Marketing Analytics", "Content Strategy", "Campaign Reporting", "Event Operations"],
  },
  {
    period: "May 2024 — Aug 2025",
    role: "Business Intelligence Consultant",
    company: "BluTech Consulting",
    companyUrl: "https://blutechconsulting.com/",
    location: "Karachi, Pakistan",
    intro: "I built analytics and reporting solutions for UBL, working with large banking datasets and business stakeholders.",
    stats: [
      { value: "10+", label: "Power BI & Tableau dashboards" },
      { value: "500K+", label: "records processed" },
      { value: "25%", label: "faster reporting turnaround" },
    ],
    bullets: [
      "Built 10+ Power BI and Tableau dashboards using SQL, Teradata, and HiveQL over 500K+ records for UBL.",
      "Automated anomaly-detection workflows used in recurring reporting.",
      "Reduced reporting turnaround by 25% and presented findings in clear language for non-technical stakeholders.",
    ],
    tools: ["Power BI", "Tableau", "SQL", "Teradata", "HiveQL", "Data Modeling"],
  },
  {
    period: "Aug 2022 — Sep 2025",
    role: "Performance Management Analyst → Senior Performance Management Analyst",
    company: "The Walnut Agency",
    companyUrl: "https://thewalnutagency.com/",
    location: "Karachi, Pakistan · Remote",
    intro: "I progressed from Performance Management Analyst to Senior Performance Management Analyst, managing client accounts, campaign performance, content coordination, and regular reporting.",
    stats: [
      { value: "70+", label: "client accounts managed" },
      { value: "60%+", label: "engagement growth" },
      { value: "25%", label: "conversion improvement" },
      { value: "30%", label: "higher reach" },
    ],
    bullets: [
      "Managed 70+ client accounts across industries and used performance data to improve organic engagement by 60%+.",
      "Analyzed campaign performance and optimized content and channel choices, contributing to a 25% improvement in conversions.",
      "Coordinated content creation and influencer partnerships, improved reach by 30%, and kept campaign delivery on time.",
      "Earlier in the role, managed social communities, content calendars, and day-to-day audience engagement across client accounts.",
    ],
    tools: ["Performance Analytics", "Campaign Analysis", "Meta Ads", "Client Management", "Content Strategy"],
  },
  {
    period: "Jan 2021 — May 2024",
    role: "Software Engineer",
    company: "SoftSyncDev",
    companyUrl: "https://www.softsyncdev.com/",
    location: "Karachi, Pakistan",
    intro: "I built and improved production web, mobile, backend, and AI-enabled applications.",
    stats: [
      { value: "5+", label: "full-stack applications shipped" },
      { value: "1,000+", label: "chatbot users" },
      { value: "40%", label: "response-latency reduction" },
      { value: "99.9%", label: "uptime across releases" },
    ],
    bullets: [
      "Shipped a production AI chatbot through the OpenAI REST API for 1,000+ users.",
      "Resolved Prisma and Node.js query bottlenecks and reduced response latency by 40%.",
      "Built and deployed 5+ full-stack applications with TypeScript, Node.js, React, React Native, AWS S3, and CI/CD pipelines.",
    ],
    tools: ["TypeScript", "Node.js", "React", "React Native", "Prisma", "AWS S3", "OpenAI API", "CI/CD"],
  },
];

export type ProjectEvidence = {
  type: "image" | "placeholder";
  src?: string;
  label: string;
  caption: string;
};

export type CaseStudySection = {
  title: string;
  text: string;
};

export type Project = {
  slug: string;
  category: string;
  title: string;
  problem: string;
  summary: string;
  headlineMetric: string;
  headlineLabel: string;
  approach: string[];
  evaluation: string[];
  outcomes: { value: string; label: string }[];
  caseStudySections?: CaseStudySection[];
  limitations: string;
  /** Shown as a standalone highlighted callout next to the evidence gallery
   *  (not buried in prose) when a project's screenshots use fabricated
   *  sample data in place of real/sensitive records. */
  evidencePrivacyNotice?: string;
  tech: string[];
  evidence: ProjectEvidence[];
  links: { label: string; href: string }[];
  documentGallery?: {
    title: string;
    description: string;
    items: ProjectEvidence[];
    downloadHref?: string;
    downloadLabel?: string;
  };
  localVideo?: string;
  videoId?: string;
};

const retailCaptions: Record<number, string> = {
  1: "Technical report cover for the store-sales forecasting project.",
  4: "The raw sales target is extremely right-skewed, so I used log(1 + sales) to reduce the effect of extreme values.",
  6: "Daily and monthly plots show spikes, seasonality, and changing demand over time. That is why the model needed time-aware features instead of a simple static regression.",
  7: "Sales differ strongly by store and product family, showing that location and category information are important predictors.",
  8: "Promotion days have much higher average sales than non-promotion days, so promotion information was kept as a key model feature.",
  9: "I cleaned missing values and created calendar and lag features so the models could learn weekly, monthly, and recent-demand patterns.",
  10: "Rolling averages were shifted by one day to avoid using today's answer to predict today. The final model-ready data had over 3 million rows and 104 predictors.",
  14: "Five time-ordered validation folds compare Linear Regression, Random Forest, and LightGBM without leaking future dates into training.",
  16: "On the unseen holdout set, LightGBM had the lowest RMSE at 0.4516, followed by Random Forest at 0.4845 and Linear Regression at 1.3541.",
  18: "Predictions were converted back to the original sales scale so the model output could be read as real sales values.",
  21: "Key feature-engineering code for missing-value handling, calendar variables, lag features, and rolling averages."
};

const retailReportPages: ProjectEvidence[] = Array.from({ length: 21 }, (_, i) => {
  const page = i + 1;
  return {
    type: "image" as const,
    src: `/project-evidence/retail-report/page-${String(page).padStart(2, "0")}.png`,
    label: `Technical report · page ${page}`,
    caption: retailCaptions[page] || "A page from the full technical report. Scroll left or right to continue through the project." ,
  };
});

const ganCaptions: Record<number, string> = {
  1: "Project overview: a DCGAN was used to generate chest X-rays and test whether synthetic data could improve pneumonia classification.",
  2: "The training set was imbalanced: 3,876 pneumonia images versus 1,342 normal images. This imbalance became the main problem to solve.",
  3: "Architecture overview for the baseline CNN, GAN generator, and discriminator.",
  4: "Experiment 2 changed the training strategy: more GAN epochs, 2,000 synthetic images for the underrepresented NORMAL class, dropout, class weights, and a lower CNN learning rate.",
  5: "Experiment 1 baseline reached 82.85% accuracy but normal recall was only 0.57, showing bias toward pneumonia.",
  7: "The first GAN trained for only 20 epochs. The discriminator dominated and the generated images remained noisy.",
  8: "The first synthetic X-rays had weak lung structure, so they were not good enough to improve the classifier.",
  9: "Adding 500 synthetic images to the already larger pneumonia class made performance worse: test accuracy fell to 75%.",
  11: "This slide explains what failed in Experiment 1 and the exact changes made for Experiment 2.",
  14: "Experiment 2 trained the GAN for 50 epochs and generated 2,000 images for the NORMAL class.",
  15: "The 50-epoch GAN produced visibly clearer chest structure than the 20-epoch version.",
  16: "After the improved augmentation strategy, test accuracy reached 82.21% and normal recall increased to 0.76.",
  17: "The final classification report shows much better balance between normal and pneumonia recognition, with Macro F1 reaching 0.82.",
  18: "Full model comparison across both experiments. Experiment 2 augmentation produced the strongest balanced result.",
  20: "Final conclusion and next step: class-aware synthetic generation helped, while future work could explore a conditional GAN."
};

const ganSlides: ProjectEvidence[] = Array.from({ length: 20 }, (_, i) => {
  const slide = i + 1;
  return {
    type: "image" as const,
    src: `/project-evidence/gan-deck/slide-${String(slide).padStart(2, "0")}.png`,
    label: `Presentation · slide ${slide}`,
    caption: ganCaptions[slide] || "A slide from the complete experiment deck. Scroll left or right to follow the full experiment." ,
  };
});

export const projects: Project[] = [
  {
    slug: "power-guard-360",
    category: "MACHINE LEARNING · IOT · 3D WEB · HACKATHON (2ND PLACE)",
    title: "Power Guard 360 — Predictive Maintenance for a Power Plant Feeding an AI Data Center",
    problem: "When a gas turbine at a power plant fails without warning, the AI data center it feeds loses power. How can a plant spot failures early, tell the manager why, and get an engineer to the right turbine before that happens?",
    summary: "Built at CodeRED Orion, the University of Houston's biggest hackathon, where our team placed 2nd out of 70+ teams. Two Random Forest models watch every turbine's sensor data and flag failures with the reasons behind them. A live Arduino sensor board drives one turbine and watches for gas leaks, a 3D digital twin shows the whole plant, and the engineer's phone app takes them to the job.",
    headlineMetric: "2nd of 70+",
    headlineLabel: "teams at CodeRED Orion 2026",
    approach: [
      "Trained two Random Forests on the AI4I 2020 predictive maintenance dataset: one gives a calibrated failure risk, the other names the failure type.",
      "Used SHAP to give the three sensor readings that drove each prediction, so every alert comes with its reasons.",
      "Served both models through a FastAPI service that the Node.js plant server calls for every running turbine once a second.",
      "Connected a real Arduino sensor board: a hand-spun motor, a barometer and an air quality sensor drive turbine GT-08 live and watch the gas metering skid for leaks.",
      "Showed the plant as a live 3D digital twin with React Three Fiber, with a maintenance board where the manager approves a repair and dispatches an engineer to their phone."
    ],
    evaluation: ["Tested on 2,000 readings the models never saw", "96% precision and 78% recall for failure detection", "PR-AUC 0.90, ahead of XGBoost (0.88) and logistic regression (0.50)", "Macro F1 0.93 for the failure type", "Live sensor board demoed at the judging table", "Deployed at powerguard360.us"],
    outcomes: [
      { value: "2nd", label: "place out of 70+ teams" },
      { value: "96%", label: "precision on unseen data" },
      { value: "0.90", label: "PR-AUC for failure detection" },
      { value: "0.93", label: "macro F1 for failure type" }
    ],
    caseStudySections: [
      { title: "The challenge", text: "The Chevron track was built around plants like Project Kilby, where gas turbines power an AI data center directly. If a turbine fails suddenly, the data center's computers go dark. The plant needs to catch failures before they happen and get the right engineer to the right turbine fast." },
      { title: "What we built", text: "Power Guard 360 covers the whole loop: sense, predict, protect, see, act and fix. Sensors feed the plant server, the models flag a turbine and explain why, a battery covers the gap if a unit trips, the manager sees everything on a 3D plant and a dashboard, approves a repair, and the engineer gets the job on their phone." },
      { title: "My part", text: "I built the machine learning pipeline: both Random Forest models, the SHAP explanations and the trained model bundle the plant server uses. I also built the 3D plant model with a Blender script, the version 2 logo and interface, the About page, the read-only public view with admin sign-in, the phone layout, and the deployment of the plant server on a cloud VM." },
      { title: "The result", text: "We placed 2nd out of more than 70 teams at CodeRED Orion. The judges saw the live sensor board, a physical model of the plant and data center, and the full loop from a sensor reading to an engineer arriving at the turbine." }
    ],
    limitations: "Seven of the eight turbines replay rows from the public AI4I 2020 dataset rather than real turbine data, and the models were trained on that dataset. The live sensor board stands in for one turbine.",
    tech: ["Python", "scikit-learn", "SHAP", "FastAPI", "React", "TypeScript", "three.js", "Node.js", "WebSockets", "Expo / React Native", "Arduino", "Gemini API", "Blender"],
    evidence: [
      { type: "image", src: "/project-evidence/powerguard360/live-01-plant-3d-twin.png", label: "3D digital twin of the plant", caption: "Eight gas turbines, the AI data center, the battery yard and gas metering, with live readings and the model's diagnosis for the selected turbine." },
      { type: "image", src: "/project-evidence/powerguard360/live-03-maintenance.png", label: "Maintenance recommendation", caption: "The Random Forest flags GT-03 with a 99% overstrain risk and lists the readings that drove it. The manager decides what happens next." },
      { type: "image", src: "/project-evidence/powerguard360/hw-1-sensor-board-setup.jpg", label: "Live sensor board", caption: "Arduino UNO R4 WiFi with a motor speed sensor and an air quality sensor, posting readings to the plant server twice a second." },
      { type: "image", src: "/project-evidence/powerguard360/hw-7-physical-model.jpg", label: "Physical model at the judging table", caption: "The power plant and the AI data center it feeds, built for the demo." },
      { type: "image", src: "/project-evidence/powerguard360/11-complete-solution-loop.png", label: "The whole loop", caption: "Sense, predict, protect, see, act and fix, all in one place." }
    ],
    videoId: "1z6rV0uYjOI",
    links: [
      { label: "Live website", href: "https://powerguard360.us/" },
      { label: "YouTube demo", href: "https://www.youtube.com/watch?v=1z6rV0uYjOI" },
      { label: "Source code", href: "https://github.com/YatoVoid/PowerGuard360" },
      { label: "Hackathon achievement", href: "/achievements" }
    ]
  },
  {
    slug: "sakina-job-os",
    category: "AGENTIC AI · AUTOMATION · JOB SEARCH",
    title: "Sakina Job OS — Agentic AI Job Search & Outreach Platform",
    problem: "How can job discovery, fit-checking, application materials, and warm-path outreach be run as one automated pipeline instead of dozens of manual, repetitive steps, while still keeping a human in control of what actually gets sent?",
    summary: "Built a 12-stage n8n agentic automation that discovers and deduplicates job postings, verifies the official listing, checks fit with Claude, generates resumes and cover letters, matches first-degree LinkedIn connections for warm outreach, drafts follow-ups, and logs everything to Airtable behind a human-review gate before anything is sent.",
    headlineMetric: "12-stage",
    headlineLabel: "agentic job search & outreach pipeline",
    approach: [
      "Pulled source-of-truth rules and resume/brief data from Google Drive into one shared \"brain\" object used by every downstream stage.",
      "Discovered and deduplicated postings, then verified each one against the official employer/ATS page before spending any reasoning budget on it.",
      "Used a Claude-based fit and strong-job gate to filter for real matches before generating tailored resumes and cover letters.",
      "Matched first-degree LinkedIn connections at the company for warm-path outreach, then drafted personalized outreach and follow-ups.",
      "Logged jobs, materials, and outreach status to Airtable, with a required human-review step before any message is auto-sent."
    ],
    evaluation: ["12 pipeline stages, from discovery to human review", "Official-listing verification before reasoning/generation stages", "Claude-based fit + strong-job gating", "First-degree LinkedIn connection matching for warm outreach", "Airtable as the operational system of record", "Human-approval gate before outreach or follow-ups send"],
    outcomes: [
      { value: "12", label: "pipeline stages" },
      { value: "n8n", label: "automation engine" },
      { value: "Human", label: "review gate before send" },
      { value: "Airtable", label: "operational system of record" }
    ],
    caseStudySections: [
      { title: "The challenge", text: "A real job search involves the same repetitive steps over and over: find postings, check whether they're still real and official, decide if they're actually a fit, write tailored materials, find a warm path in, and follow up. Doing this by hand does not scale, but fully automated outreach without a human check is risky." },
      { title: "What I built", text: "I designed a 12-stage n8n workflow that treats job search as a pipeline: a shared \"brain\" of source-of-truth rules feeds discovery and deduplication, an official-verification stage filters out stale or unofficial postings, and a Claude-based reasoning and strong-job gate decides what is worth pursuing before any resume or cover letter is generated." },
      { title: "Keeping a human in the loop", text: "Application materials, connection research, and outreach drafts are all prepared automatically, but the workflow ends at a human-review stage — nothing is auto-sent without approval. Airtable is used as the operational database so every job, material, and outreach action is tracked in one place." },
      { title: "What the screenshot shows", text: "The screenshot is the actual n8n automation graph: source ingestion and the shared brain object on the left, discovery/verification/reasoning stages in the middle, application-materials and connection-matching branches, and outreach/QA/Airtable/human-review stages on the right." }
    ],
    limitations: "This is a personal automation project rather than a client deliverable, so the evidence shown is the internal n8n workflow graph itself rather than live outreach metrics.",
    tech: ["n8n", "Claude / Anthropic API", "Google Drive", "Airtable", "LinkedIn Data", "Workflow Automation", "Agentic AI"],
    evidence: [
      { type: "image", src: "/projects/job-os-placeholder.png", label: "Main automation workflow", caption: "The full 12-stage n8n pipeline: brain/source ingestion, discovery, official verification, Claude reasoning and fit gating, application materials, connection matching, outreach, QA, Airtable, and human review." }
    ],
    links: []
  },
  {
    slug: "retail-demand-forecasting",
    category: "MACHINE LEARNING · TIME SERIES · RETAIL",
    title: "AI-Driven Retail Inventory Forecasting & Autonomous Inventory Optimization",
    problem: "How can a retailer forecast store-level demand accurately enough to make better inventory decisions when sales change by date, store, product family, promotions, holidays, and recent demand?",
    summary: "Built a complete store-sales forecasting pipeline over more than 3 million records, engineered time-series features, compared three machine-learning models, and selected LightGBM as the best model on unseen data.",
    headlineMetric: "0.4516",
    headlineLabel: "best final test RMSE · LightGBM",
    approach: [
      "Merged historical sales with store metadata, oil prices, transactions, promotions, and holiday information.",
      "Handled missing values based on what each field meant instead of filling every column the same way.",
      "Created calendar, lag, and rolling-demand features while shifting historical sales to prevent future-data leakage.",
      "Compared Linear Regression, Random Forest, and LightGBM using time-ordered validation and a final unseen holdout set."
    ],
    evaluation: [
      "3,054,348 rows in the merged training data",
      "3,004,452 model-ready rows after historical features were created",
      "104 predictors after feature engineering and encoding",
      "5-fold time-series cross-validation",
      "Final RMSE: LightGBM 0.4516 · Random Forest 0.4845 · Linear Regression 1.3541"
    ],
    outcomes: [
      { value: "3.05M+", label: "merged sales rows" },
      { value: "104", label: "model predictors" },
      { value: "5 folds", label: "time-aware validation" },
      { value: "0.4516", label: "best test RMSE" }
    ],
    caseStudySections: [
      { title: "The challenge", text: "Retail demand was not a clean straight-line problem. About 31% of the observations had zero sales, the target had extreme high values, and demand changed with stores, product families, weekends, promotions, holidays, and time. A normal random train/test split would also let future dates leak into training, which would make the result look better than it really was." },
      { title: "What I did", text: "I merged the raw files into one analytical dataset and treated each missing field according to its meaning. I then created calendar features plus 1-, 7-, 14-, and 28-day sales lags and 7-, 14-, and 28-day rolling averages. I used log(1 + sales) so a few very large sales values would not dominate training." },
      { title: "How I checked it", text: "Instead of shuffling dates, I trained on earlier periods and validated on later periods using five time-series folds. I compared a simple Linear Regression baseline with Random Forest and LightGBM, then tested all three on 602,316 unseen rows." },
      { title: "The result", text: "LightGBM produced the lowest final test error at 0.4516 RMSE on log-sales. Random Forest was next at 0.4845, while Linear Regression was much worse at 1.3541. The result showed that nonlinear tree models handled the mix of promotions, store behavior, seasonality, and recent sales history much better." },
      { title: "What this means in plain English", text: "The project turns millions of historical sales records into a forecast that can support inventory planning. The uploaded report documents the forecasting portion in detail; it does not document the autonomous optimization layer, so the portfolio does not invent results for that part." }
    ],
    limitations: "The technical report documents the forecasting pipeline and model comparison. Future work listed in the report includes stockout/overstock business metrics, prediction intervals, wider hyperparameter tuning, and more specialized forecasting models.",
    tech: ["Python", "Pandas", "Scikit-learn", "LightGBM", "Random Forest", "Linear Regression", "TimeSeriesSplit", "Feature Engineering"],
    evidence: [
      { type: "image", src: "/project-evidence/retail-report/page-16.png", label: "Final model comparison", caption: "LightGBM achieved the lowest test RMSE on the unseen holdout set." },
      { type: "image", src: "/project-evidence/retail-report/page-06.png", label: "Demand over time", caption: "Daily and monthly sales show trend changes, spikes, and seasonality that the forecasting features needed to capture." },
      { type: "image", src: "/project-evidence/retail-report/page-10.png", label: "Feature engineering", caption: "Lag and rolling features capture recent demand while the time-aware setup avoids using future information." }
    ],
    documentGallery: {
      title: "Read the full technical report",
      description: "Scroll left or right through the complete report. The most important pages include a plain-English caption underneath so a recruiter can follow the project without needing a machine-learning background.",
      items: retailReportPages,
      downloadHref: "/project-evidence/retail-report/technical-report.pdf",
      downloadLabel: "Open technical report"
    },
    links: [{ label: "GitHub", href: "https://github.com/sakina-saifuddin/AI-Driven-Retail-Inventory-Forecasting-and-Autonomous-Inventory-Optimization" }]
  },
  {
    slug: "financial-reconciliation",
    category: "POWER BI · DAX · FINANCIAL ANALYTICS",
    title: "Grant Financial Analytics & Reporting Dashboards",
    problem: "How can grant and cost-center managers review budget, expense, commitments, payroll, and monthly activity without working through hundreds of separate recurring reports?",
    summary: "Built a centralized Power BI reporting system for grant and cost-center review, with a Databricks data-processing layer that automated a preparation process which used to take two days. One data model with DAX measures and Power Query transformations sits behind a grant overview, current-month verification, and payroll / non-payroll drilldowns.",
    headlineMetric: "1,074",
    headlineLabel: "recurring reports automated",
    approach: [
      "Built a Databricks data-processing layer that automatically prepares the budget, revenue, expense, payroll, commitment, award, project, and cost-center data — a process that used to take two days by hand.",
      "Combined the processed data into one reporting model.",
      "Built Power Query transformations and DAX measures for fiscal periods, budget available, commitments, project dates, and review filters.",
      "Created separate grant overview, current-month verification, payroll, non-payroll, and drilldown experiences.",
      "Designed the dashboards as the evidence layer for the monthly cost center verification workflow, which became its own Power Apps project."
    ],
    evaluation: ["1,074 recurring reports automated", "2-day manual data preparation automated with Databricks", "11+ departments supported", "50+ grants / financial datasets", "50% manual workload reduction", "10+ Power BI dashboards and views"],
    outcomes: [
      { value: "1,074", label: "reports automated" },
      { value: "50%", label: "manual work reduced" },
      { value: "11+", label: "departments" },
      { value: "10+", label: "dashboard views" }
    ],
    caseStudySections: [
      { title: "The challenge", text: "Financial review was spread across recurring reports and different types of financial data. A reviewer needed to understand budget, actual expenses, open and soft commitments, payroll, project dates, and the current month before confirming that a cost center looked correct." },
      { title: "What I built", text: "I created one reporting system in Power BI with the calculations and filters needed to move from a high-level grant view into the underlying records. I also built monthly verification and payroll/non-payroll views so a reviewer could check the exact transactions behind a balance." },
      { title: "Automating the data processing", text: "Before the dashboards could be refreshed, the financial data had to be pulled together and prepared by hand, which took about two days. I added a Databricks data-processing layer that does this preparation automatically, so the reporting model always receives clean, consistent data without the two-day manual effort." },
      { title: "A difficult part I solved", text: "The source tables did not all use the same level of detail. Budget, commitments, projects, payroll, and fiscal periods had to line up correctly before the totals could be trusted. I built lookup logic, Power Query transformations, DAX measures, and project/fiscal filters so the same selection produced consistent results across pages." },
      { title: "The result", text: "The system automated 1,074 recurring reports across 11+ departments and 50+ grant or financial datasets, while reducing manual review work by about 50%. Instead of jumping between separate files, reviewers can start with the grant overview and drill into current-month, payroll, and non-payroll details." },
      { title: "What the screenshots show", text: "The first dashboard is the grant overview, the second is the current-month verification screen, and the third is the payroll drilldown. Together they show the main path from summary review to transaction-level evidence." }
    ],
    limitations: "The screenshots are work samples with all real figures, grant names, and employee data replaced by sample values — sensitive university financial and personnel records are not shown.",
    evidencePrivacyNotice: "The dashboards below are real — every figure, name, and ID shown in them has been replaced with fabricated sample data. The actual grant, financial, and employee records are private and are not shown.",
    tech: ["Power BI", "Databricks", "DAX", "Power Query", "Python", "SQL", "PeopleSoft"],
    evidence: [
      { type: "image", src: "/project-evidence/financial-reconciliation/grants-overview1-dummy.png", label: "Grant cost center overview", caption: "Grant cost center financial overview with total budget, expenses, commitments, available balance, and budget-vs-expenses breakdowns by status. Underlying dollar figures are sample data for privacy; the charts reflect the real shape of the dashboard." },
      { type: "image", src: "/project-evidence/financial-reconciliation/grants-overview-dummy.png", label: "Grant overview", caption: "High-level grant view with budget, expenses, commitments, balance, funding dates, and cost-center status. Shown with sample data to protect real grant and personnel records." },
      { type: "image", src: "/project-evidence/financial-reconciliation/current-month-dummy.png", label: "Current-month verification", caption: "Monthly review screen for selecting a cost center and checking budget, payroll, non-payroll, and fiscal-period activity. Shown with sample data to protect real financial records." },
      { type: "image", src: "/project-evidence/financial-reconciliation/payroll-dummy.png", label: "Payroll expense drilldown", caption: "Detailed employee-level payroll view with award, project, speed type, fiscal year, period, and date filters. Shown with sample data to protect real employee payroll records." }
    ],
    links: []
  },
  {
    slug: "cost-center-verification",
    category: "POWER APPS · SHAREPOINT · WORKFLOW AUTOMATION",
    title: "Cost Center Verification App — Monthly Manager & DBA Sign-off",
    problem: "University policy requires every active cost center to be verified every month: a Department Business Administrator (DBA) checks the transactions and the cost center manager reviews and approves them. How do you run that sign-off for every manager in a college every month, without email chains and spreadsheets, and with a clear record of who confirmed what?",
    summary: "Designing and building a Power Apps canvas app for the Cullen College of Engineering at the University of Houston. Each month every cost center manager gets one review listing all of their active cost centers. They answer Yes or No for each one. Anything marked No is routed to the department's DBA, who records how it was fixed. Then the review locks as complete.",
    headlineMetric: "2-step",
    headlineLabel: "manager → DBA verification workflow",
    approach: [
      "Modelled one SharePoint list row per manager per month, holding the reporting month, due date, manager, DBA(s), department, status, and the month's active cost centers as a JSON array with each answer, comment, and DBA resolution.",
      "Built the manager screen: Yes / No for every cost center, a required comment for No, filters (All / Not answered / Marked No / Marked Yes), and a Submit button that stays disabled until every cost center has an answer.",
      "Built the DBA screen: only the cost centers marked No, a resolution note for each, and a Resolve button that stays disabled until every flagged item has one.",
      "Encoded the business rules in the app: an all-Yes review skips the DBA and completes immediately; after Submit or Resolve the review is read-only and cannot be reopened; only the assigned manager or a listed DBA can make changes.",
      "Designed role-based navigation (home, My Reviews, Awaiting Submission, Completed, Assigned, Needs Resolution, Resolved) plus a step-by-step guided tour on each screen for first-time users."
    ],
    evaluation: [
      "2 roles: Cost Center Manager and Department Business Administrator",
      "4 statuses: Initiated → Pending CCM Review → Pending DBA Review → Verify/Certify Complete",
      "30-day window for managers and DBAs to finish each month's review",
      "Departments can have several DBAs and a DBA can cover several departments. Any listed DBA can resolve",
      "Every review is locked once submitted, which leaves an audit trail"
    ],
    outcomes: [
      { value: "2", label: "roles (manager · DBA)" },
      { value: "4", label: "workflow statuses" },
      { value: "30 days", label: "review window" },
      { value: "1", label: "review per manager / month" }
    ],
    caseStudySections: [
      { title: "The challenge", text: "Under UH policy MAPP 05.04.02, every department has to verify transactions on every active cost center each month. The DBA checks the UGLS1074 verification worksheet, and the cost center manager reviews and approves it. Before this app, that sign-off depended on reports, emails, and follow-ups. It was hard to see which managers had finished, what was flagged, and whether each issue had actually been fixed." },
      { title: "How the monthly cycle works", text: "PeopleSoft closes a month around the 15th of the following month. Between the 15th and the 25th, that month's reviews are generated: active cost centers come from Power BI, which is fed by the monthly 1074 upload. Each cost center's department code is mapped to its DBA(s) through a shared department / DBA table. Each manager then gets one review for the closed month, due 30 days after it is generated." },
      { title: "What I built", text: "A role-based Power Apps canvas app on SharePoint. Managers open their review and mark each cost center Yes (correct) or No (something is wrong, with a comment). Submitting an all-Yes review completes it straight away. A review with any No goes to the DBA, who sees only the flagged cost centers, writes what they did to fix each one, and sends it back. The manager then sees the DBA's note next to every item they flagged." },
      { title: "Design decisions", text: "Submit and Resolve stay disabled until every item has an answer, so half-finished reviews can't be sent. Reviews can't be reopened after they're submitted, which keeps a clean audit record. Status badges always show words as well as colour. Each screen has a short guided tour, and View details opens the cost center in Power BI so a reviewer can check the transactions before answering." },
      { title: "A difficult part I solved", text: "DBA routing isn't one-to-one: a department can have several DBAs and a DBA can cover several departments, so a review can list several DBA emails. I stored them as a delimited list, let any listed DBA resolve, and filtered by status first so the SharePoint query stays delegable before the email match runs." },
      { title: "Automation with Power Automate", text: "Five flows run behind the app. Submit and Resolve each go through a flow that re-checks who is calling and whether the review is complete before saving. A notifications flow emails the manager or the DBA depending on the status. A weekly flow reminds whoever's turn it is, and skips anyone notified in the last 6 days. A monthly flow refreshes the cost center and employee data. Next: rollout to managers, then Central Office screens." }
    ],
    limitations: "The app is in active development in a DEV environment and has not yet been rolled out to all managers, so there are no adoption metrics yet. All screenshots use test records (TEST- cost centers, a test department, and a test DBA); no real financial data is shown.",
    evidencePrivacyNotice: "These screenshots come from the development build of the app and show test data only. The cost centers, department, comments, and DBA are test records, not real university data.",
    tech: ["Power Apps", "Power Fx", "SharePoint", "Power Automate", "Power BI", "PeopleSoft", "JSON"],
    evidence: [
      { type: "image", src: "/project-evidence/cost-center-verification/home.png", label: "Role-based home", caption: "The home screen shows each person what they need to do this month: Cost Center Managers see reviews to answer and DBAs see items to fix. The reporting month and due date are shown up front, with the monthly reconciliation policy below. Shown with test data." },
      { type: "image", src: "/project-evidence/cost-center-verification/my-reviews.png", label: "Manager's reviews", caption: "A manager's pending and completed monthly verifications, with progress, status badges, due dates, and completed reviews grouped by fiscal year. Shown with test data." },
      { type: "image", src: "/project-evidence/cost-center-verification/manager-review.png", label: "Monthly cost center review", caption: "The manager answers Yes or No for every active cost center (a comment is required for No). Submit stays disabled until every cost center is answered, and all-Yes reviews complete immediately. Shown with test data." },
      { type: "image", src: "/project-evidence/cost-center-verification/manager-complete.png", label: "Completed review", caption: "A finished review is read-only and shows the DBA's resolution next to each cost center the manager flagged. Shown with test data." },
      { type: "image", src: "/project-evidence/cost-center-verification/dba-resolved-list.png", label: "DBA resolved reviews", caption: "The DBA's list of reviews they have fixed and sent back to managers, with how many flagged cost centers were resolved. Shown with test data." },
      { type: "image", src: "/project-evidence/cost-center-verification/dba-resolve.png", label: "DBA resolution", caption: "The DBA sees only the cost centers marked No, records what they did to fix each one, and sends the review back. It then locks as complete. Shown with test data." },
      { type: "image", src: "/project-evidence/financial-reconciliation/power-automate-submit-review.png", label: "Power Automate — Submit flow", caption: "The CCV-SubmitReview flow, called from the app. It checks the caller is the review's manager, rejects unanswered or invalid cost centers, sets the status, saves, and notifies the DBA." },
      { type: "image", src: "/project-evidence/financial-reconciliation/power-automate-dba-resolve.png", label: "Power Automate — Resolve flow", caption: "The CCV-DBAResolve flow. It checks the caller, saves the DBA's fix notes, replies to the app, and emails the manager." },
      { type: "image", src: "/project-evidence/financial-reconciliation/power-automate-notifications.png", label: "Power Automate — Status notifications", caption: "Runs whenever a review is created or changed, and routes by status: Pending CCM Review, Pending DBA Review, or Verify/Certify Complete. Each email links to the app and to Power BI." },
      { type: "image", src: "/project-evidence/financial-reconciliation/power-automate-weekly-reminders.png", label: "Power Automate — Weekly reminders", caption: "A scheduled flow that finds open reviews and reminds whoever's turn it is, skipping anyone notified in the last 6 days." },
      { type: "image", src: "/project-evidence/financial-reconciliation/power-automate-monthly-refresh.png", label: "Power Automate — Monthly data refresh", caption: "Each month, picks up the latest cost center (CC) and employee (EMP) files, runs an Excel refresh script on each, and writes the rows to SharePoint in batches." }
    ],
    links: [{ label: "Read as a book", href: "/book/cost-center-verification" }]
  },
  {
    slug: "healthcare-eligibility-pipeline",
    category: "HEALTHCARE DATA · APIs · UI VALIDATION",
    title: "Healthcare Eligibility Data Integration & Benefit Summary Pipeline",
    problem: "How can eligibility data from many healthcare sources be collected, checked, and mapped into one consistent Benefit Summary when every payer can return information differently?",
    summary: "Built and validated a healthcare eligibility data pipeline across DentalXchange, CareStack, SQL/analytics sources, and payer-specific mappings, then compared the old and new UI to find data-quality and business-rule gaps.",
    headlineMetric: "15–20",
    headlineLabel: "data sources integrated",
    approach: [
      "Collected patient, insurance, benefits, plan coverage, eligibility rules, appointments, treatment history, notes, provider lookup, and procedure lookup data.",
      "Added retry/error diagnostics and consolidated the responses into one patient-level prompt-ready JSON bundle.",
      "Created payer-specific source-priority and mapping rules instead of assuming all payers return the same fields in the same way.",
      "Compared the classic and new Benefit Summary UI field by field and traced mismatches back to raw JSON or source data."
    ],
    evaluation: ["15–20 integrated source inputs", "7 production deployments validated", "~2 hours of manual lookup reduced per case", "validated data accuracy improved from 20% to 80%", "classic-view vs new-UI mapping checks"],
    outcomes: [
      { value: "15–20", label: "source inputs" },
      { value: "20→80%", label: "validated accuracy" },
      { value: "~2 hrs", label: "manual lookup saved / case" },
      { value: "7", label: "deployments validated" }
    ],
    caseStudySections: [
      { title: "The challenge", text: "Dental eligibility was not coming from one clean database. Patient details, insurance, plan benefits, coverage rules, appointments, treatment history, and payer responses lived in different APIs and files. On top of that, the same business rule could be represented differently by different payers." },
      { title: "What I built", text: "I worked on a Python bundle-fetching and normalization workflow that collects the required CareStack and DentalXchange information, records failures and empty responses, links related records, and produces one merged patient-level JSON structure for the Benefit Summary workflow." },
      { title: "How I improved the new UI", text: "I compared the old eligibility UI with the new Benefit Summary instead of assuming a visually cleaner screen meant the data was correct. I checked deductibles, maximums, coverage percentages, procedure codes, frequency limits, service history, and eligibility labels. When values did not match, I traced them back to the source JSON and documented exactly what needed to change." },
      { title: "Examples of problems I found", text: "Some procedure groups were being given one general frequency even though individual codes had different limits. Service history could come from a different source than the classic view. A green 'Eligible' label could also be misleading if age, prior usage, or frequency had not yet been applied. Those findings became concrete mapping and validation rules." },
      { title: "The result", text: "The workflow integrated roughly 15–20 source inputs, supported validation across seven production deployments, reduced manual lookup by about two hours per case, and improved validated data accuracy from about 20% to 80% in the work I reported. The screenshots show both the data-fetching code and the old-versus-new UI comparison." }
    ],
    limitations: "The public repository uses synthetic examples and excludes production credentials and real patient datasets. The portfolio uses cropped UI screenshots where possible to avoid exposing patient identifiers.",
    tech: ["Python", "REST APIs", "JSON", "DentalXchange", "CareStack", "Postman", "SQL", "BigQuery", "Healthcare Eligibility", "LLM Data Preparation"],
    evidence: [
      { type: "image", src: "/project-evidence/healthcare-eligibility/bundle-fetcher-start.png", label: "Multi-source bundle fetcher", caption: "The Python workflow loads shared CareStack lookups and begins collecting the patient, insurance, benefit, plan, and rule files needed for one eligibility bundle." },
      { type: "image", src: "/project-evidence/healthcare-eligibility/old-benefit-summary.png", label: "Old Benefit Summary", caption: "The classic view was used as a comparison point for deductible, maximum, and coverage values." },
      { type: "image", src: "/project-evidence/healthcare-eligibility/new-benefit-summary.png", label: "New Benefit Summary", caption: "The redesigned view presents the same core benefit concepts more clearly, but each value still had to be validated against the source data." },
      { type: "image", src: "/project-evidence/healthcare-eligibility/old-procedure-view.png", label: "Old procedure detail", caption: "The old view exposes code-level percentages and limitation notes used during mapping validation." },
      { type: "image", src: "/project-evidence/healthcare-eligibility/new-procedure-view.png", label: "New procedure mapping", caption: "The new UI groups procedures into readable categories with plan percentage, frequency/usage, and status." },
      { type: "image", src: "/project-evidence/healthcare-eligibility/bundle-fetcher-finish.png", label: "Prompt-ready merged output", caption: "The fetch run completes by writing one prompt-ready merged patient file while also recording empty or failed endpoint responses for debugging." }
    ],
    links: [{ label: "GitHub", href: "https://github.com/sakina-saifuddin/Healthcare-Eligibility-Data-Pipeline" }]
  },
  {
    slug: "oracle-financial-etl",
    category: "DATA ENGINEERING · PYTHON · AUTOMATION",
    title: "Automated Financial Data Pipeline — Oracle to Power BI",
    problem: "How can large Oracle/PeopleSoft monthly exports be converted, merged into the right fiscal-year workbook, validated, and handed to reporting without repeating a fragile manual process every month?",
    summary: "Built a two-stage Python ETL workflow that converts legacy Oracle XML Spreadsheet exports to XLSX, applies worksheet-specific fiscal-year merge rules, validates the result, and feeds SharePoint, Power Automate, and Power BI.",
    headlineMetric: "2-stage",
    headlineLabel: "conversion + monthly fiscal-year merge",
    approach: [
      "Built a streaming Oracle XML Spreadsheet converter using lxml and XlsxWriter constant-memory mode.",
      "Created separate merge rules for transactional sheets, commitment snapshots, cost-center reference data, and verification data.",
      "Added schema checks, fiscal-year and period detection, SAFE TEST mode, output validation, and controlled live replacement.",
      "Connected the validated annual workbook to the OneDrive / SharePoint location used by Power Automate and Power BI."
    ],
    evaluation: ["170,469 Asset Liab Fund Equity rows converted in the run shown", "99,667 Revenue Expense rows", "8,204 Budget Journal rows", "FY2026 periods 9 and 10 automatically detected", "SAFE TEST validates output before live replacement"],
    outcomes: [
      { value: "170K+", label: "largest sheet shown" },
      { value: "7", label: "worksheet rules" },
      { value: "9 & 10", label: "FY periods detected" },
      { value: "SAFE TEST", label: "before live update" }
    ],
    caseStudySections: [
      { title: "The challenge", text: "The files downloaded from Oracle looked like .xls files, but they were actually XML Spreadsheet files. Some were extremely large, so normal Excel conversion approaches were unreliable. After conversion, the monthly workbook still could not simply be appended to the annual file because each worksheet represented a different kind of financial data." },
      { title: "How I solved the conversion problem", text: "I wrote a Python converter that streams the XML instead of loading the whole export into memory. It validates the file type, handles legacy encoding, preserves basic cell types, respects Excel row/column limits, and writes a real .xlsx workbook using constant-memory output." },
      { title: "How I solved the monthly merge problem", text: "I built a second Python workflow that detects the incoming fiscal year and periods, finds the matching annual workbook, and applies the correct rule by sheet. Transaction tables replace matching incoming periods and append the new rows, Open and Soft Commitments are treated as current snapshots, and Cost Center List is updated using a composite business key." },
      { title: "How I made it safer", text: "The workflow runs in SAFE TEST mode by default. It checks schemas, writes a test output, validates the generated workbook, and only uses live replacement when explicitly requested. Power Automate then runs the command and can branch on the exit code so a failed update is not treated as successful." },
      { title: "The result", text: "In the conversion run shown, the pipeline processed 170,469 Asset Liab Fund Equity rows, 99,667 Revenue Expense rows, and 8,204 Budget Journal rows. In the monthly merge test, FY2026 periods 9 and 10 were detected automatically and the output was validated before replacement. The result is a repeatable Oracle-to-Power-BI data path instead of a manual monthly merge." }
    ],
    limitations: "The public repository is sanitized. Production financial records, internal SharePoint paths, credentials, usernames, and real annual workbooks are not included.",
    tech: ["Python", "lxml", "XlsxWriter", "OpenPyXL", "Oracle / PeopleSoft", "Excel", "OneDrive", "SharePoint", "Power Automate", "Power BI"],
    evidence: [
      { type: "image", src: "/project-evidence/oracle-etl/conversion.png", label: "Oracle XML → XLSX conversion", caption: "Converter output showing the financial worksheets and the row counts successfully written to a standard Excel workbook." },
      { type: "image", src: "/project-evidence/oracle-etl/merge.png", label: "Monthly fiscal-year merge", caption: "SAFE TEST run showing automatic FY2026 period detection, matching base workbook selection, worksheet-specific output, and validation." },
      { type: "image", src: "/project-evidence/oracle-etl/power-automate.png", label: "Power Automate desktop workflow", caption: "The automation runs the merge command and uses the process exit code to display a clear success or failure path." }
    ],
    links: [{ label: "GitHub", href: "https://github.com/sakina-saifuddin/oracle-financial-etl-pipeline" }]
  },
  {
    slug: "pneumonia-dcgan",
    category: "GENERATIVE AI · COMPUTER VISION · MEDICAL IMAGING",
    title: "GAN-Based Chest X-ray Augmentation for Pneumonia Detection",
    problem: "Can synthetic chest X-rays help a classifier recognize the underrepresented NORMAL class more fairly without making the model worse?",
    summary: "Ran two DCGAN augmentation experiments, learned from a failed first attempt, changed the augmentation strategy, and improved the second experiment from 73.56% baseline accuracy to 82.21% with much stronger NORMAL recall.",
    headlineMetric: "73.56→82.21%",
    headlineLabel: "Experiment 2 test accuracy",
    approach: [
      "Measured the original class imbalance and baseline CNN behavior.",
      "Ran a first GAN experiment, inspected generated images, and measured why the augmentation hurt performance.",
      "Changed the second experiment by training the GAN longer, generating 2,000 NORMAL images, adding class weights and dropout, and lowering the CNN learning rate.",
      "Compared accuracy, recall, F1, confusion matrices, loss curves, and synthetic-image quality across both experiments."
    ],
    evaluation: ["3,876 pneumonia vs 1,342 normal training images", "Experiment 1 augmentation: 82.85% → 75.00% accuracy", "Experiment 2 baseline: 73.56%", "Experiment 2 augmented: 82.21%", "NORMAL recall: 0.32 → 0.76", "Macro F1: 0.65 → 0.82"],
    outcomes: [
      { value: "+8.65 pts", label: "Exp 2 accuracy gain" },
      { value: "2,000", label: "synthetic NORMAL X-rays" },
      { value: "0.32→0.76", label: "NORMAL recall" },
      { value: "0.82", label: "final Macro F1" }
    ],
    caseStudySections: [
      { title: "The challenge", text: "The dataset had far more pneumonia images than normal images: 3,876 versus 1,342 in training. The classifier therefore learned to recognize pneumonia very well but missed many normal cases. The goal was not just to raise overall accuracy; it was to make the model more balanced." },
      { title: "My first attempt failed", text: "In Experiment 1, I trained the GAN for 20 epochs and generated 500 synthetic images, but I added them to the already larger pneumonia class. The images were also noisy. Test accuracy fell from 82.85% to 75%, and normal recall fell from 0.57 to 0.34. That result showed me that simply adding synthetic data can make a model worse if the data quality or class strategy is wrong." },
      { title: "What I changed", text: "For Experiment 2, I trained the GAN for 50 epochs, generated 2,000 images for the underrepresented NORMAL class, used a smaller GAN batch size, added dropout, weighted the NORMAL class more heavily, and reduced the CNN learning rate. The 50-epoch synthetic X-rays also had visibly clearer chest structure than the 20-epoch images." },
      { title: "The result", text: "The Experiment 2 baseline was 73.56% accurate with only 0.32 NORMAL recall. After the improved augmentation strategy, accuracy reached 82.21%, NORMAL recall increased to 0.76, and Macro F1 improved from 0.65 to 0.82. The final model was much better at identifying normal cases instead of defaulting toward pneumonia." },
      { title: "What I learned", text: "The most important part of this project was the failed experiment. I did not hide it; I used it to change the class-balancing strategy, training settings, and regularization. The full slide deck below shows the complete path from the first result to the improved second experiment." }
    ],
    limitations: "Research/academic project only. Synthetic medical images and model metrics require much stronger external validation before any clinical use. One total-training-image count in the presentation is internally inconsistent, so the website avoids repeating that total as a headline result.",
    tech: ["PyTorch", "Torchvision", "DCGAN", "CNN", "Computer Vision", "Medical Imaging"],
    evidence: [
      { type: "image", src: "/project-evidence/gan-deck/architecture.png", label: "End-to-end architecture", caption: "The generator creates synthetic 64×64 chest X-rays, the discriminator learns real versus fake, and the augmented dataset is used by a CNN classifier." },
      { type: "image", src: "/project-evidence/gan-deck/slide-15.png", label: "20 vs 50 GAN epochs", caption: "The second experiment produced much clearer chest structure after training the GAN for 50 epochs." },
      { type: "image", src: "/project-evidence/gan-deck/slide-18.png", label: "Full experiment comparison", caption: "The final comparison shows how the improved Experiment 2 recovered accuracy and greatly improved NORMAL recall and Macro F1." }
    ],
    documentGallery: {
      title: "Follow the complete experiment deck",
      description: "The entire presentation is included. Scroll left or right to see the dataset, architecture, failed first experiment, changes, second experiment, generated images, metrics, and conclusion.",
      items: ganSlides,
      downloadHref: "/project-evidence/gan-deck/Deep-Convolutional-GAN-Chest-XRay-Classification.pptx",
      downloadLabel: "Open full presentation"
    },
    links: [{ label: "View my notebook", href: "https://github.com/sakina-saifuddin/Generative-AI-for-Medical-Imaging-GAN-Based-Chest-X-ray-Augmentation/blob/main/Deep%20Convolutional%20GAN%20for%20Chest%20X-Ray%20Classification/Deep%20Convolutional%20GAN%20for%20Chest%20X-Ray%20Classification(report).ipynb" }]
  },
  {
    slug: "seizure-detection",
    category: "DEEP LEARNING · EEG · HEALTHCARE",
    title: "Harmful Brain Activity Classification — EEG Seizure Detection",
    problem: "Can a model distinguish seizure from non-seizure brain activity while still performing consistently across different EEG channels and evaluation folds?",
    summary: "Built an EEG classification workflow with signal/statistical analysis, model training, fold-level validation, and final seizure versus non-seizure evaluation.",
    headlineMetric: "94%",
    headlineLabel: "mean classification accuracy",
    approach: [
      "Explored EEG channel behavior and statistical properties before judging the model only by one final score.",
      "Prepared the signal data for classification and tracked training and validation behavior across epochs.",
      "Used fold-level evaluation to check whether performance held up on unseen samples.",
      "Measured accuracy, sensitivity, specificity, precision, recall, and F1 for both seizure and non-seizure classes."
    ],
    evaluation: ["94% mean accuracy", "93% sensitivity", "95% specificity", "0.94 macro F1", "5,508 evaluated samples", "Fold 5 test accuracy shown: 0.9319"],
    outcomes: [
      { value: "94%", label: "mean accuracy" },
      { value: "93%", label: "sensitivity" },
      { value: "95%", label: "specificity" },
      { value: "5,508", label: "evaluated samples" }
    ],
    caseStudySections: [
      { title: "The challenge", text: "EEG data is noisy and different channels can behave very differently. A high overall accuracy would not be enough if the model missed seizure cases or only worked well on one split of the data." },
      { title: "What I looked at first", text: "I analyzed channel variance and basic statistical properties such as mean, standard deviation, skewness, and kurtosis. This helped me understand how the signal changed across channels before focusing on the classifier result." },
      { title: "How I checked the model", text: "I tracked training and validation loss and accuracy across epochs and used fold-level testing rather than relying on the same training data. I also compared seizure and non-seizure precision, recall, and F1 so the result was not hidden behind one average number." },
      { title: "The result", text: "The final evaluation shown in the notebook reached 94% mean accuracy, 93% sensitivity, and 95% specificity across 5,508 samples. Non-seizure recall was 0.95 and seizure recall was 0.93, with about 0.94 F1 for both classes." },
      { title: "What this means in plain English", text: "The model was able to separate seizure and non-seizure activity with similar performance on both classes. That balance matters more than a model that looks accurate only because it predicts the more common class." }
    ],
    limitations: "Academic machine-learning work only. It is not a clinical diagnostic system and would require clinical validation, broader datasets, and medical review before any healthcare use.",
    tech: ["Python", "Deep Learning", "EEG", "Signal Analysis", "Cross-Validation", "Classification"],
    evidence: [
      { type: "image", src: "/project-evidence/seizure/classification-report.png", label: "Final classification report", caption: "The model reached 94% mean accuracy, 93% sensitivity, and 95% specificity with similar F1 scores for seizure and non-seizure samples." },
      { type: "image", src: "/project-evidence/seizure/training-curves.png", label: "Training & validation behavior", caption: "Loss decreases while validation accuracy improves; the screenshot also shows the Fold 5 test accuracy of 0.9319." },
      { type: "image", src: "/project-evidence/seizure/channel-variance.png", label: "EEG channel variance", caption: "Channel-by-channel variance shows that the EEG inputs do not all behave the same way." },
      { type: "image", src: "/project-evidence/seizure/statistical-properties.png", label: "Signal statistics", caption: "Mean, standard deviation, skewness, and kurtosis were inspected across channels to understand the input signal distribution." }
    ],
    links: [{ label: "View my notebook", href: "https://github.com/sakina-saifuddin/Data-Science-Projects/tree/main/Harmful%20Brain%20Activity%20Classification" }]
  },
  {
    slug: "vertebral-column-classification",
    category: "NEURAL NETWORKS · HEALTH DATA · CLASSIFICATION",
    title: "Vertebral Column Disease Classification",
    problem: "Can six biomechanical measurements be used to classify a vertebral sample as normal or abnormal?",
    summary: "Built and tested a multilayer neural network on 310 samples and compared learning rates, momentum, and hidden-layer sizes before evaluating it on a held-out test set.",
    headlineMetric: "85.48%",
    headlineLabel: "testing accuracy",
    approach: [
      "Combined six biomechanical features from the vertebral-column dataset.",
      "Used a stratified 80/20 split and normalization.",
      "Tested different learning rates, momentum values, and hidden-neuron configurations.",
      "Evaluated the final network with accuracy, F1 score, confusion matrices, and MSE."
    ],
    evaluation: ["95.56% training accuracy", "85.48% testing accuracy", "310 samples", "6 input features"],
    outcomes: [
      { value: "85.48%", label: "testing accuracy" },
      { value: "310", label: "samples" },
      { value: "6", label: "input features" }
    ],
    limitations: "The dataset is small, and the difference between training and testing performance indicates overfitting risk. This is not a medical diagnostic system.",
    tech: ["Python", "TensorFlow", "Keras", "Scikit-learn", "Neural Networks"],
    evidence: [
      { type: "image", src: "/project-evidence/vertebral/confusion-matrices.png", label: "Train vs test confusion matrices", caption: "Classification behavior on training and held-out testing data." },
      { type: "image", src: "/project-evidence/vertebral/f1-scores.png", label: "F1 score comparison", caption: "Training and testing F1 scores for the normal and abnormal classes." },
      { type: "image", src: "/project-evidence/vertebral/learning-rate.png", label: "Learning-rate experiment", caption: "How different learning rates affected training accuracy and loss." }
    ],
    links: []
  },
  {
    slug: "fitness-video-optimization",
    category: "SOFTWARE ENGINEERING · REACT NATIVE · AWS",
    title: "Fitness Application — Video Loading Optimization",
    problem: "How can a React Native fitness app with more than 50 workout videos stop making users wait minutes for a video to load?",
    summary: "Diagnosed a major media-loading bottleneck in a React Native / Node.js fitness app and moved video delivery to AWS S3, reducing load time from about five minutes to roughly three seconds per video.",
    headlineMetric: "5 min → ~3 sec",
    headlineLabel: "video loading time",
    approach: [
      "Investigated why workout videos were taking minutes to become usable.",
      "Identified the original caching/media-delivery approach as the bottleneck.",
      "Moved more than 50 video assets to AWS S3 and changed how the mobile app requested them.",
      "Tested the real application experience after the change."
    ],
    evaluation: ["50+ workout videos", "React Native mobile frontend", "Node.js backend", "Before: up to ~5 minutes", "After: ~3 seconds per video", "Working application demo"],
    outcomes: [
      { value: "50+", label: "workout videos" },
      { value: "~5 min", label: "before" },
      { value: "~3 sec", label: "after" },
      { value: "AWS S3", label: "media delivery" }
    ],
    caseStudySections: [
      { title: "The challenge", text: "The fitness app contained more than 50 workout videos, but a video could take around five minutes to load. That made the product feel broken even though the rest of the app worked." },
      { title: "How I found the problem", text: "I investigated the media path and found that the way the application was relying on its original cached video-loading setup was creating the delay. The problem was not the workout screen itself; it was how the media was being stored and delivered." },
      { title: "What I changed", text: "I uploaded the workout videos to AWS S3 and updated the React Native / Node.js application flow so the videos were requested from cloud storage instead of relying on the old delivery approach." },
      { title: "The result", text: "Video loading dropped from roughly five minutes to about three seconds per video across a library of more than 50 workout videos. That change dramatically improved how quickly users could start a workout." },
      { title: "Why I mention when it was built", text: "This work was done before the current generative-AI / GPT development wave. The improvement came from traditional debugging, software engineering, backend/media-delivery decisions, and AWS infrastructure rather than an AI-generated feature." }
    ],
    limitations: "The before/after times are the project measurements provided for this portfolio. Performance can still vary by network speed, device, and video size.",
    tech: ["React Native", "Node.js", "AWS S3", "REST APIs", "Mobile Performance"],
    evidence: [{ type: "image", src: "/project-evidence/fitness/demo-poster.jpg", label: "Working fitness application", caption: "A frame from the real application demo. The full video is embedded below." }],
    localVideo: "/project-evidence/fitness/demo.mp4",
    links: [{ label: "YouTube demo", href: "https://youtu.be/YAShaqJhUos?si=5r4kltxsKFXG43Ce" }]
  }
];

export const moreProjectsUrl = "https://github.com/sakina-saifuddin/Data-Science-Projects";


export const technologyGroups = [
  {
    title: "AI & ML",
    items: [
      { name: "PyTorch", icon: "https://cdn.simpleicons.org/pytorch", blurb: "Used to train deep learning models for computer vision and sequence tasks." },
      { name: "TensorFlow", icon: "https://cdn.simpleicons.org/tensorflow", blurb: "Used with Keras for classification, forecasting, and generative models." },
      { name: "Scikit-learn", icon: "https://cdn.simpleicons.org/scikitlearn", blurb: "Used for classical ML models like Random Forest and Linear Regression." },
      { name: "OpenCV", icon: "https://cdn.simpleicons.org/opencv", blurb: "Used for image preprocessing and computer vision pipelines." },
      { name: "Hugging Face", icon: "https://cdn.simpleicons.org/huggingface", blurb: "Used for transformer models and NLP experimentation." },
      { name: "OpenAI / LLM APIs", icon: "https://cdn.simpleicons.org/openai", blurb: "Used to integrate LLMs into production chatbots and data workflows." },
    ],
  },
  {
    title: "Data & BI",
    items: [
      { name: "SQL", icon: "https://cdn.simpleicons.org/postgresql", blurb: "Used to query and structure data across healthcare and BI projects." },
      { name: "Pandas", icon: "https://cdn.simpleicons.org/pandas", blurb: "Used for data cleaning, transformation, and analysis in Python." },
      { name: "Power BI", icon: "/tech/power-bi.svg", blurb: "Used to build dashboards for grant, financial, and performance reporting." },
      { name: "Tableau", icon: "/tech/tableau.svg", blurb: "Used to build dashboards over 500K+ records for client reporting." },
      { name: "BigQuery", icon: "https://cdn.simpleicons.org/googlebigquery", blurb: "Used for large-scale data warehousing and analysis." },
      { name: "DAX / Power Query", icon: "", blurb: "Used for data modeling and calculated measures inside Power BI." },
    ],
  },
  {
    title: "Software",
    items: [
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript", blurb: "Used to build interactive interfaces and application logic." },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript", blurb: "Used for type-safe application and API development." },
      { name: "React", icon: "https://cdn.simpleicons.org/react", blurb: "Used to build production user interfaces across her projects." },
      { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs", blurb: "Used to build full-stack web applications, including this portfolio." },
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs", blurb: "Used for backend services and API development." },
      { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb", blurb: "Used as a database layer for full-stack applications." },
      { name: "Git", icon: "https://cdn.simpleicons.org/git", blurb: "Used for version control across all software projects." },
    ],
  },
  {
    title: "Cloud & Automation",
    items: [
      { name: "AWS", icon: "/tech/aws.svg", blurb: "Used for cloud infrastructure and deployment." },
      { name: "Docker", icon: "https://cdn.simpleicons.org/docker", blurb: "Used to containerize applications for consistent deployment." },
      { name: "Power Automate", icon: "/tech/power-automate.svg", blurb: "Used to automate recurring reporting and data workflows." },
      { name: "SharePoint", icon: "/tech/sharepoint.svg", blurb: "Used to feed automated reporting into shared team workflows." },
      { name: "REST APIs", icon: "", blurb: "Used to integrate services and exchange data across systems." },
    ],
  },
];

export const qaItems = [
  {
    question: "Tell me about Sakina.",
    answer: "Sakina is a Software Engineer and M.S. Data Science & AI student at the University of Houston. She has 3.5+ years of experience across software engineering, data analytics, business intelligence, automation, healthcare data, performance analytics, and applied machine learning.",
    facts: ["Houston, Texas", "M.S. Data Science & AI", "3.5+ years"],
    links: [{ label: "Open resume", href: "/resume" }],
  },
  {
    question: "What has she built?",
    answer: "She has shipped 5+ full-stack applications, built healthcare pipelines across 15–20 data sources, automated 1,074 recurring financial reports, built 10+ BI dashboards, created an Oracle-to-Power-BI ETL workflow, and trained machine-learning models for forecasting, EEG classification, computer vision, and generative AI.",
    facts: ["5+ apps", "15–20 sources", "1,074 reports"],
    links: [{ label: "See projects", href: "/books" }, { label: "See experience", href: "/#chapter-four" }],
  },
  {
    question: "What machine-learning models has she trained?",
    answer: "Her project work includes Linear Regression, Random Forest, LightGBM, SVMs, CNNs, bidirectional LSTMs, multilayer neural networks, DCGANs, and a Deep Q-Network decision layer. She has worked with both TensorFlow/Keras and PyTorch.",
    facts: ["CNN / Bi-LSTM", "DCGAN", "LightGBM / DQN"],
    links: [{ label: "ML projects", href: "/books" }],
  },
  {
    question: "Has she worked with LLMs and RAG?",
    answer: "She has production experience with OpenAI API and LLM integrations, including a chatbot used by 1,000+ users and LLM-assisted data workflows. She is also expanding into retrieval-based AI work; the portfolio does not claim production RAG experience that is not yet supported by project evidence.",
    facts: ["1,000+ chatbot users", "LLM integration", "RAG: expanding"],
    links: [{ label: "Experience", href: "/#chapter-four" }],
  },
  {
    question: "What is her Power BI and analytics experience?",
    answer: "At TMAC / NIST-MEP, she automated 1,074 recurring reports and built 10+ Power BI / PowerApps dashboards for grant and financial review. At BluTech Consulting, she built Power BI and Tableau dashboards over 500K+ records for UBL and reduced reporting turnaround by 25%.",
    facts: ["10+ dashboards", "500K+ records", "25% faster reporting"],
    links: [{ label: "Power BI project book", href: "/book/financial-reconciliation" }],
  },
  {
    question: "What healthcare work has she done?",
    answer: "At Dental-X AI, she works on dental insurance and eligibility automation. Her work combines DentalXchange, CareStack, SQL, JSON, APIs, and payer-specific mapping rules into a consistent patient-level structure and includes validation of the classic and new Benefit Summary UI.",
    facts: ["15–20 sources", "7 deployments", "UI mapping"],
    links: [{ label: "Healthcare project", href: "/book/healthcare-eligibility-pipeline" }],
  },
  {
    question: "What automation work has she done?",
    answer: "She built an Oracle/PeopleSoft ETL workflow that converts legacy XML-based .xls exports to .xlsx, merges monthly data into fiscal-year workbooks using worksheet-specific rules, validates the output, and feeds SharePoint, Power Automate, and Power BI reporting.",
    facts: ["Oracle → XLSX", "SAFE TEST", "Power Automate"],
    links: [{ label: "Oracle ETL project", href: "/book/oracle-financial-etl" }],
  },
  {
    question: "What are her strongest project results?",
    answer: "Her current project evidence includes 94% mean accuracy for EEG seizure detection, a DCGAN project that improved chest X-ray classifier accuracy from 73.56% to 82.21%, 1,074 automated financial reports, and a retail forecasting workflow over 3M+ sales records.",
    facts: ["94% EEG accuracy", "82.21% X-ray accuracy", "1,074 reports"],
    links: [{ label: "Project archive", href: "/books" }],
  },
  {
    question: "When will she graduate and where is she based?",
    answer: "Sakina is based in Houston, Texas. She is pursuing an M.S. in Engineering Data Science & AI at the University of Houston and expects to graduate in 2027.",
    facts: ["Houston, Texas", "University of Houston", "Expected 2027"],
    links: [{ label: "Resume", href: "/resume" }],
  },
  {
    question: "What roles is she looking for?",
    answer: "She is interested in Machine Learning Engineer, Software Engineer, Data / BI Analyst, AI & Automation, and Systems / Performance Analyst roles where she can work across data, software, analytics, and machine learning.",
    facts: ["ML", "Software", "Data / BI"],
    links: [{ label: "Resume", href: "/resume" }],
  },
  {
    question: "Why should we interview Sakina?",
    answer: "Her work covers both engineering and analysis. She has shipped production applications, built dashboards, automated manual workflows, integrated healthcare data, worked with clients and campaign performance, and trained machine-learning models. The portfolio links those claims to screenshots, metrics, code, and case studies.",
    facts: ["Production software", "Analytics", "Machine learning"],
    links: [{ label: "Review the work", href: "/books" }],
  },
  {
    question: "What's a mistake she's made, and what did she learn from it?",
    answer: "On her DCGAN chest X-ray project, her first experiment made things worse: she added 500 synthetic images straight into the already-larger pneumonia class without controlling for image quality or class balance, and test accuracy actually fell from 82.85% to 75%, with normal-case recall dropping from 0.57 to 0.34. Instead of dropping that result, she kept it in the write-up, used it to diagnose the real problem, and rebuilt the class-balancing strategy, training settings, and regularization for a second experiment — which reached 82.21% accuracy with far stronger recall. She applies the same habit elsewhere in the portfolio: flagging, rather than smoothing over, places where her own evidence doesn't fully support a bigger claim.",
    facts: ["Experiment 1 got worse", "Diagnosed & rebuilt approach", "82.21% on retry"],
    links: [{ label: "See the project book", href: "/book/pneumonia-dcgan" }],
  },
  {
    question: "What tools and technologies has she worked with?",
    answer: "Across AI & ML, Data & BI, Software, and Cloud & Automation she has worked with PyTorch, TensorFlow, Scikit-learn, OpenCV, Hugging Face, and OpenAI / LLM APIs; SQL, Pandas, Power BI, Tableau, BigQuery, and DAX / Power Query; JavaScript, TypeScript, React, Next.js, Node.js, MongoDB, and Git; and AWS, Docker, Power Automate, SharePoint, and REST APIs.",
    facts: ["24 tools", "4 categories", "AI to cloud"],
    links: [],
  },
];
