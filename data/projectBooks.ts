import type { Project } from "@/data/portfolio";

/*
 * Project books. Written to be scanned, not read: short headings, big numbers and short bullet
 * points that each make sense on their own. The front cover carries only a plain, descriptive title.
 */

/** The headings every project book walks through, in order. */
export const BOOK_STAGES = ["Task", "My work", "Results", "Outcome"] as const;
export type BookStage = (typeof BOOK_STAGES)[number];

/** One spread of a project book: a picture on the left page, one stage of the story on the right. */
export type BookSpread = {
  image: string;
  /** A short line under the picture saying what it shows. */
  imageCaption: string;
  stage: BookStage;
  /** A short heading for the page. */
  title: string;
  /** Optional single short line under the heading. */
  lead?: string;
  points?: string[];
  /** One big number for this step… */
  stat?: { value: string; label: string };
  /** …or a grid of big numbers. */
  stats?: { value: string; label: string }[];
  /** Tool names, shown as "Tools: A · B · C". */
  tools?: string[];
};

/**
 * Cover design:
 * - `title`: the only text on the front, saying plainly what the project is ("|" marks line breaks)
 * - `short`: the plain project name (back-cover heading and spine)
 * - colours picked from the project's own screenshots
 */
export type BookStyle = { cover: string; tint: string; short: string; title: string };

export type ProjectBookContent = {
  style: BookStyle;
  /** Back cover: a few bullet points and big numbers. */
  back: { points: string[]; stats: { value: string; label: string }[] };
  spreads: BookSpread[];
  /** Closing page: what I personally did, and what each technology was used for. */
  contribution: string[];
  stack: { name: string; use: string }[];
  /** Optional small print, e.g. what the screenshots do or don't show. */
  note?: string;
  /** Optional links shown on the closing page: live site, demo video, source. */
  links?: { label: string; href: string }[];
};

const CCV = "/project-evidence/cost-center-verification";
const PA = "/project-evidence/financial-reconciliation";
const FIN = "/project-evidence/financial-reconciliation";
const RET = "/project-evidence/retail-report";
const HC = "/project-evidence/healthcare-eligibility";
const ORA = "/project-evidence/oracle-etl";
const GAN = "/project-evidence/gan-deck";
const EEG = "/project-evidence/seizure";
const VER = "/project-evidence/vertebral";
const JOB = "/projects/job-os-placeholder.png";
const FIT = "/project-evidence/fitness/demo-poster.jpg";
const PG = "/project-evidence/powerguard360";

const books: Record<string, ProjectBookContent> = {
  "power-guard-360": {
    style: { short: "Power Guard 360", cover: "#0f2a5c", tint: "#7fa8f0", title: "Predicting Power|Plant Failures|with Machine Learning" },
    back: {
      points: [
        "2nd of 70+ teams at CodeRED Orion and a $500 Best Pitch prize.",
        "Machine learning flags failing turbines and explains why.",
        "Real sensors, a 3D plant, and a phone app for the engineer.",
      ],
      stats: [
        { value: "2nd", label: "of 70+ teams" },
        { value: "96%", label: "precision on unseen data" },
      ],
    },
    spreads: [
      {
        image: `${PG}/hw-7-physical-model.jpg`, imageCaption: "Our model of the plant and the AI data center it feeds.", stage: "Task",
        title: "Keep the AI data center powered",
        points: [
          "Gas turbines power an AI data center directly.",
          "If a turbine fails without warning, the computers go dark.",
          "The plant needs to catch failures early and fix them fast.",
        ],
        stat: { value: "24 hrs", label: "to build it at CodeRED Orion" },
      },
      {
        image: `${PG}/live-03-maintenance.png`, imageCaption: "The model flags GT-03 and lists the readings behind it.", stage: "My work",
        title: "Two models that explain themselves",
        points: [
          "Model 1 gives each turbine a calibrated failure risk.",
          "Model 2 names the failure type: heat, power, overstrain or tool wear.",
          "SHAP lists the three readings that drove each alert.",
        ],
        tools: ["Python", "scikit-learn", "SHAP", "FastAPI"],
      },
      {
        image: `${PG}/hw-1-sensor-board-setup.jpg`, imageCaption: "The live sensor board next to the plant view.", stage: "My work",
        title: "Real sensors drive one turbine",
        points: [
          "A spinning motor, a barometer and an air quality sensor feed turbine GT-08.",
          "The board posts readings twice a second.",
          "Low air quality at gas metering raises a gas leak alert.",
        ],
        tools: ["Arduino UNO R4 WiFi", "Node.js", "WebSockets"],
      },
      {
        image: `${PG}/live-01-plant-3d-twin.png`, imageCaption: "The 3D digital twin with live readings for every turbine.", stage: "My work",
        title: "The whole plant in 3D",
        points: [
          "Built the 3D plant model with a Blender script.",
          "Click any turbine to see its readings and the model's diagnosis.",
          "Designed the version 2 interface, logo and phone layout.",
        ],
        tools: ["Blender", "React", "three.js", "TypeScript"],
      },
      {
        image: `${PG}/hw-6-engineer-phone-app.jpg`, imageCaption: "The engineer's phone gets the job.", stage: "My work",
        title: "From alert to engineer",
        points: [
          "The manager approves a repair and picks an engineer.",
          "The engineer's phone buzzes with the job.",
          "The control room watches them walk to the turbine on the 3D map.",
        ],
        tools: ["Expo", "React Native"],
      },
      {
        image: `${PG}/gas-leak.png`, imageCaption: "A possible gas leak raised from the live air quality sensor.", stage: "Results",
        title: "Accurate on data it never saw",
        lead: "Tested on 2,000 readings held back from training.",
        stats: [
          { value: "96%", label: "precision" },
          { value: "78%", label: "recall" },
          { value: "0.90", label: "PR-AUC (XGBoost 0.88)" },
          { value: "0.93", label: "macro F1 for failure type" },
        ],
      },
      {
        image: `${PG}/award-500-best-pitch.jpg`, imageCaption: "Our team on stage with the $500 Best Pitch/Demo check.", stage: "Outcome",
        title: "2nd place out of 70+ teams",
        points: [
          "Led a team of undergraduates to 2nd place at CodeRED Orion.",
          "Won $500 for Best Pitch/Demo.",
          "Still live at powerguard360.us.",
        ],
        stats: [
          { value: "2nd", label: "of 70+ teams" },
          { value: "$500", label: "cash prize" },
        ],
      },
    ],
    contribution: [
      "Led a team of undergraduates and split the work by each person's strengths.",
      "Built both machine learning models, the SHAP explanations and the model service.",
      "Built the 3D plant model and the version 2 interface.",
      "Added the public view with admin sign-in and deployed the plant server.",
    ],
    stack: [
      { name: "scikit-learn + SHAP", use: "Predicts failures and explains them." },
      { name: "FastAPI", use: "Serves the models to the plant server." },
      { name: "Node.js + WebSockets", use: "Runs the plant and pushes live data." },
      { name: "React + three.js", use: "The 3D plant and the dashboard." },
      { name: "Expo", use: "The engineer's phone app." },
      { name: "Arduino", use: "Live turbine and gas leak sensors." },
    ],
    note: "Seven of the eight turbines replay the public AI4I 2020 dataset; the sensor board drives the eighth.",
    links: [
      { label: "Live website", href: "https://powerguard360.us/" },
      { label: "YouTube demo", href: "https://www.youtube.com/watch?v=1z6rV0uYjOI" },
      { label: "Devpost", href: "https://devpost.com/software/power-guard-360" },
      { label: "The achievement", href: "/achievements" },
    ],
  },

  "sakina-job-os": {
    style: { short: "Job OS", cover: "#8b3a68", tint: "#e3a2c6", title: "AI Job Search|Automation" },
    back: {
      points: [
        "Finds jobs and checks each one is a real, official posting.",
        "Uses Claude to keep only the jobs that truly fit.",
        "Writes resumes, cover letters and outreach, then waits for my approval.",
      ],
      stats: [
        { value: "12", label: "automated stages" },
        { value: "0", label: "messages sent without my approval" },
      ],
    },
    spreads: [
      {
        image: JOB, imageCaption: "The full 12-stage n8n workflow.", stage: "Task",
        title: "Automate the job search, keep control",
        points: [
          "A job search repeats the same steps again and again.",
          "Doing it all by hand does not scale.",
          "Fully automatic outreach without a human check is risky.",
        ],
      },
      {
        image: JOB, imageCaption: "Early stages: rules, discovery and verification.", stage: "My work",
        title: "Only real, matching jobs get through",
        points: [
          "Shared rules and resume data load from Google Drive.",
          "Every posting is checked against the official employer page.",
          "Claude decides if a job is a strong fit before anything is written.",
        ],
        tools: ["n8n", "Claude API", "Google Drive"],
      },
      {
        image: JOB, imageCaption: "Later stages: materials, connections and review.", stage: "My work",
        title: "Warm intros and a human check",
        points: [
          "Finds my first-degree LinkedIn connections at each company.",
          "Drafts personalized outreach and follow-ups.",
          "Logs everything in Airtable and waits for my approval.",
        ],
        tools: ["LinkedIn data", "Airtable"],
      },
      {
        image: JOB, imageCaption: "Every branch ends at human review.", stage: "Results",
        title: "One tracked pipeline",
        stats: [
          { value: "12", label: "automated stages" },
          { value: "1", label: "place to track every job (Airtable)" },
          { value: "0", label: "messages sent without approval" },
        ],
      },
      {
        image: JOB, imageCaption: "Each job moves through the graph.", stage: "Outcome",
        title: "More time for the best roles",
        points: [
          "The repetitive work runs on its own.",
          "I make the final call on everything that is sent.",
          "Personal project: the evidence is the workflow itself.",
        ],
      },
    ],
    contribution: [
      "Designed the 12-stage workflow and its shared rules.",
      "Built the verification, AI fit-check and writing stages.",
      "Set up Airtable tracking and the approval step.",
    ],
    stack: [
      { name: "n8n", use: "Runs the whole pipeline." },
      { name: "Claude API", use: "Judges fit and writes drafts." },
      { name: "Google Drive", use: "Holds rules and resume data." },
      { name: "Airtable", use: "Tracks every job and message." },
    ],
  },

  "retail-demand-forecasting": {
    style: { short: "Retail Forecasting", cover: "#1f4e6b", tint: "#86b9d8", title: "Retail Sales|Forecasting with|Machine Learning" },
    back: {
      points: [
        "Forecasts store-level sales to support inventory planning.",
        "Built on more than 3 million sales records.",
        "LightGBM beat two other models on unseen data.",
      ],
      stats: [
        { value: "3M+", label: "sales records" },
        { value: "0.4516", label: "best test error (RMSE)" },
      ],
    },
    spreads: [
      {
        image: `${RET}/page-06.png`, imageCaption: "Sales spike, trend and change with the seasons.", stage: "Task",
        title: "Forecast demand for every store",
        points: [
          "Sales change by store, product, promotions and holidays.",
          "About 31% of records had zero sales.",
          "A simple straight-line model would not be accurate.",
        ],
        stat: { value: "31%", label: "of records had zero sales" },
      },
      {
        image: `${RET}/page-09.png`, imageCaption: "Cleaning missing values and building features.", stage: "My work",
        title: "Clean data, time-aware features",
        points: [
          "Merged sales with stores, oil prices, promotions and holidays.",
          "Filled each missing value based on what the field meant.",
          "Built sales lags and rolling averages without peeking at future days.",
        ],
        stat: { value: "104", label: "features fed to the model" },
        tools: ["Python", "Pandas"],
      },
      {
        image: `${RET}/page-14.png`, imageCaption: "Five time-ordered validation folds.", stage: "My work",
        title: "A fair, time-ordered model test",
        points: [
          "Trained on earlier dates, tested on later dates.",
          "Compared Linear Regression, Random Forest and LightGBM.",
          "Final test on rows the models had never seen.",
        ],
        stat: { value: "602,316", label: "unseen rows in the final test" },
        tools: ["Scikit-learn", "LightGBM"],
      },
      {
        image: `${RET}/page-16.png`, imageCaption: "LightGBM had the lowest error.", stage: "Results",
        title: "LightGBM was the most accurate",
        lead: "Lower error is better.",
        stats: [
          { value: "0.4516", label: "LightGBM error (best)" },
          { value: "0.4845", label: "Random Forest error" },
          { value: "1.3541", label: "Linear Regression error" },
          { value: "3M+", label: "sales records used" },
        ],
      },
      {
        image: `${RET}/page-18.png`, imageCaption: "Predictions turned back into real sales values.", stage: "Outcome",
        title: "A forecast for inventory planning",
        points: [
          "Tree models handled promotions and seasons far better.",
          "Predictions read as real sales numbers.",
          "Next: stockout metrics and prediction ranges.",
        ],
      },
    ],
    contribution: [
      "Merged and cleaned 3 million+ sales records.",
      "Built the lag, rolling and calendar features.",
      "Ran the time-ordered model comparison.",
    ],
    stack: [
      { name: "Python & Pandas", use: "Data preparation." },
      { name: "Scikit-learn", use: "Baselines and validation." },
      { name: "LightGBM", use: "The best forecasting model." },
    ],
  },

  "financial-reconciliation": {
    style: { short: "Grant Dashboards", cover: "#7a2840", tint: "#e095ab", title: "Power BI Grant|Finance|Dashboards" },
    back: {
      points: [
        "Replaced 1,074 recurring reports with one Power BI system.",
        "Databricks now prepares the data automatically.",
        "Reviewers go from the grant overview down to single transactions.",
      ],
      stats: [
        { value: "1,074", label: "reports replaced" },
        { value: "2 days → auto", label: "data preparation" },
      ],
    },
    spreads: [
      {
        image: `${FIN}/grants-overview-dummy.png`, imageCaption: "Grant overview (sample data).", stage: "Task",
        title: "One place to review grant finances",
        points: [
          "Managers read hundreds of separate recurring reports.",
          "Budget, expenses, commitments and payroll lived in different places.",
          "Preparing the data by hand took about two days.",
        ],
        stat: { value: "1,074", label: "separate recurring reports" },
      },
      {
        image: `${FIN}/grants-overview1-dummy.png`, imageCaption: "Budget vs. expenses by status (sample data).", stage: "My work",
        title: "Automated data processing with Databricks",
        points: [
          "Added a Databricks layer that prepares all the financial data.",
          "It replaced a manual process that took two days.",
          "The dashboards always receive clean, consistent data.",
        ],
        stat: { value: "2 days → auto", label: "data preparation time" },
        tools: ["Databricks", "Python", "SQL"],
      },
      {
        image: `${FIN}/current-month-dummy.png`, imageCaption: "Monthly review for one cost center (sample data).", stage: "My work",
        title: "One model, summary to transaction",
        points: [
          "Lined up budget, commitments, payroll and fiscal periods.",
          "Wrote DAX measures and Power Query steps for every total.",
          "Built overview, monthly review and payroll drilldown screens.",
        ],
        tools: ["Power BI", "DAX", "Power Query"],
      },
      {
        image: `${FIN}/payroll-dummy.png`, imageCaption: "Payroll drilldown (sample data).", stage: "Results",
        title: "Reporting automated across the college",
        stats: [
          { value: "1,074", label: "reports replaced" },
          { value: "50%", label: "less manual review work" },
          { value: "11+", label: "departments supported" },
          { value: "50+", label: "grants and datasets" },
        ],
      },
      {
        image: `${FIN}/grants-overview-dummy.png`, imageCaption: "All figures are sample data.", stage: "Outcome",
        title: "No more jumping between files",
        points: [
          "Data arrives prepared, with no two-day manual step.",
          "Reviewers drill from overview to exact transactions.",
          "The dashboards also feed the Cost Center Verification app.",
        ],
      },
    ],
    contribution: [
      "Built the Databricks data-processing layer.",
      "Designed the single Power BI reporting model.",
      "Wrote the DAX measures and built every dashboard screen.",
    ],
    stack: [
      { name: "Databricks", use: "Prepares the data automatically." },
      { name: "Power BI", use: "All the dashboards." },
      { name: "DAX & Power Query", use: "Measures and data shaping." },
      { name: "PeopleSoft", use: "Source of the financial data." },
    ],
    note: "Screenshots use sample data; real financial records are private.",
  },

  "cost-center-verification": {
    style: { short: "Cost Center Verification", cover: "#9b1b30", tint: "#ec98a5", title: "Monthly Cost|Center Sign-off|App" },
    back: {
      points: [
        "Managers answer Yes or No for every cost center each month.",
        "Every No goes to the department's business administrator to fix.",
        "Five Power Automate flows send the emails and reminders.",
      ],
      stats: [
        { value: "2", label: "roles in one app" },
        { value: "5", label: "automated flows" },
      ],
    },
    spreads: [
      {
        image: `${CCV}/home.png`, imageCaption: "Home: what is waiting for each person.", stage: "Task",
        title: "Monthly sign-off without email chains",
        points: [
          "UH policy: every active cost center is verified every month.",
          "The DBA checks it; the manager approves it.",
          "It ran on reports, emails and follow-ups.",
        ],
        stat: { value: "Every month", label: "every cost center must be signed off" },
      },
      {
        image: `${CCV}/manager-review.png`, imageCaption: "Manager answers Yes or No per cost center.", stage: "My work",
        title: "The manager review",
        points: [
          "One review per manager, per month.",
          "A No needs a comment.",
          "Submit stays locked until every cost center is answered.",
        ],
        stat: { value: "100%", label: "answered before Submit unlocks" },
        tools: ["Power Apps", "Power Fx", "SharePoint"],
      },
      {
        image: `${CCV}/dba-resolve.png`, imageCaption: "DBA writes a fix for each flagged item.", stage: "My work",
        title: "Issues go to the right DBA",
        points: [
          "A department can have several DBAs.",
          "The DBA sees only the flagged cost centers.",
          "Resolve stays locked until each one has a fix note.",
        ],
        stat: { value: "2 / 2", label: "flagged items fixed (test data)" },
      },
      {
        image: `${CCV}/manager-complete.png`, imageCaption: "Finished reviews are read-only.", stage: "My work",
        title: "Rules built into the app",
        points: [
          "All Yes? The review completes right away.",
          "After Submit or Resolve, the review is locked.",
          "Every screen has a guided tour.",
        ],
        stat: { value: "4", label: "statuses, Initiated to Complete" },
      },
      {
        image: `${PA}/power-automate-submit-review.png`, imageCaption: "The CCV-SubmitReview flow.", stage: "My work",
        title: "Submit is checked by a flow",
        points: [
          "Confirms the caller is the review's manager.",
          "Rejects unanswered or invalid cost centers.",
          "Saves the review and alerts the DBA if needed.",
        ],
        stat: { value: "20", label: "checks on every submit" },
        tools: ["Power Automate"],
      },
      {
        image: `${PA}/power-automate-notifications.png`, imageCaption: "Emails chosen by review status.", stage: "My work",
        title: "The right email at each step",
        points: [
          "Manager: when the review opens.",
          "DBA: when issues are flagged.",
          "Manager: when the review is complete.",
        ],
        stat: { value: "3", label: "email paths" },
        tools: ["Power Automate", "Outlook"],
      },
      {
        image: `${PA}/power-automate-weekly-reminders.png`, imageCaption: "Weekly reminders run on a schedule.", stage: "My work",
        title: "Reminders and fresh data",
        points: [
          "Weekly reminders go to whoever's turn it is.",
          "Nobody is reminded twice within 6 days.",
          "Cost center and employee data refresh every month.",
        ],
        stat: { value: "6 days", label: "minimum gap between reminders" },
        tools: ["Power Automate", "Excel scripts"],
      },
      {
        image: `${CCV}/dba-resolved-list.png`, imageCaption: "Reviews fixed and sent back.", stage: "Results",
        title: "The full cycle works end to end",
        stats: [
          { value: "2", label: "roles: manager and DBA" },
          { value: "4", label: "review statuses" },
          { value: "5", label: "Power Automate flows" },
          { value: "30", label: "days to finish a review" },
        ],
      },
      {
        image: `${CCV}/my-reviews.png`, imageCaption: "Pending and completed months.", stage: "Outcome",
        title: "One place for the monthly sign-off",
        points: [
          "Everyone sees who finished and what was fixed.",
          "Finished reviews are locked as an audit record.",
          "Next step: rollout to managers.",
        ],
      },
    ],
    contribution: [
      "Turned the confirmed business rules into app logic.",
      "Designed the SharePoint data model and 4-status workflow.",
      "Built every screen, the guided tours and 5 Power Automate flows.",
    ],
    stack: [
      { name: "Power Apps", use: "The app and every screen." },
      { name: "Power Automate", use: "Checks, emails, reminders, refresh." },
      { name: "SharePoint", use: "One review row per manager per month." },
      { name: "Power BI", use: "Active cost centers and details." },
    ],
    note: "Screenshots use test records only.",
  },

  "healthcare-eligibility-pipeline": {
    style: { short: "Healthcare Eligibility", cover: "#155e63", tint: "#86cbcc", title: "Healthcare|Eligibility Data|Pipeline" },
    back: {
      points: [
        "Collects eligibility data from many healthcare sources.",
        "Merges it into one patient-level summary.",
        "Validated field by field against the raw data.",
      ],
      stats: [
        { value: "20% → 80%", label: "validated data accuracy" },
        { value: "~2 hrs", label: "saved per case" },
      ],
    },
    spreads: [
      {
        image: `${HC}/old-benefit-summary.png`, imageCaption: "The classic Benefit Summary.", stage: "Task",
        title: "Many sources, one reliable summary",
        points: [
          "Patient, insurance and benefit data lived in different systems.",
          "Each payer could describe the same rule differently.",
          "Staff needed one summary they could trust.",
        ],
        stat: { value: "15–20", label: "data sources" },
      },
      {
        image: `${HC}/bundle-fetcher-start.png`, imageCaption: "The Python fetch workflow starting.", stage: "My work",
        title: "Every source in one bundle",
        points: [
          "Collects patient, insurance, benefit and plan data.",
          "Logs failed and empty responses for debugging.",
          "Merges everything into one patient-level file.",
        ],
        tools: ["Python", "REST APIs", "JSON"],
      },
      {
        image: `${HC}/new-procedure-view.png`, imageCaption: "The new procedure view.", stage: "My work",
        title: "New screen checked against raw data",
        points: [
          "Compared deductibles, maximums and coverage percentages.",
          "Checked procedure codes and frequency limits.",
          "Traced every mismatch back to the source.",
        ],
        tools: ["Postman", "SQL", "BigQuery"],
      },
      {
        image: `${HC}/new-benefit-summary.png`, imageCaption: "The redesigned Benefit Summary.", stage: "Results",
        title: "Far more accurate, much faster",
        stats: [
          { value: "20% → 80%", label: "validated data accuracy" },
          { value: "~2 hrs", label: "less manual lookup per case" },
          { value: "15–20", label: "sources integrated" },
          { value: "7", label: "deployments validated" },
        ],
      },
      {
        image: `${HC}/bundle-fetcher-finish.png`, imageCaption: "One merged patient file per run.", stage: "Outcome",
        title: "A summary staff can trust",
        points: [
          "Problems became clear mapping rules.",
          "Manual lookups dropped sharply.",
          "Public repo uses synthetic data only.",
        ],
      },
    ],
    contribution: [
      "Built the Python fetch-and-merge workflow.",
      "Wrote payer-specific mapping rules.",
      "Validated the new screen field by field.",
    ],
    stack: [
      { name: "Python", use: "Fetching and merging." },
      { name: "REST APIs", use: "DentalXchange and CareStack data." },
      { name: "SQL & BigQuery", use: "Checking source data." },
    ],
  },

  "oracle-financial-etl": {
    style: { short: "Oracle Financial ETL", cover: "#233a63", tint: "#98add8", title: "Oracle to|Power BI Data|Pipeline" },
    back: {
      points: [
        "Converts large monthly Oracle exports into Excel.",
        "Merges each month into the right fiscal-year workbook.",
        "Checks itself before replacing any live file.",
      ],
      stats: [
        { value: "170K+", label: "rows in the largest sheet" },
        { value: "7", label: "merge rules" },
      ],
    },
    spreads: [
      {
        image: `${ORA}/conversion.png`, imageCaption: "Converter output with row counts.", stage: "Task",
        title: "Make a fragile monthly job repeatable",
        points: [
          "Oracle files looked like .xls but were really XML.",
          "Some were too large for normal conversion.",
          "Each worksheet needed a different merge rule.",
        ],
      },
      {
        image: `${ORA}/conversion.png`, imageCaption: "Every worksheet converted.", stage: "My work",
        title: "A streaming converter",
        points: [
          "Reads the XML as a stream, not all at once.",
          "Handles old encodings and Excel's size limits.",
          "Writes a real .xlsx workbook.",
        ],
        tools: ["Python", "lxml", "XlsxWriter"],
      },
      {
        image: `${ORA}/merge.png`, imageCaption: "SAFE TEST run for FY2026.", stage: "My work",
        title: "A merge rule for every sheet",
        points: [
          "Detects the fiscal year and periods automatically.",
          "Replaces matching periods and adds new rows.",
          "Runs in SAFE TEST mode before any live update.",
        ],
        stat: { value: "9 & 10", label: "FY2026 periods detected automatically" },
        tools: ["OpenPyXL"],
      },
      {
        image: `${ORA}/power-automate.png`, imageCaption: "Power Automate runs the merge.", stage: "Results",
        title: "Every sheet processed and checked",
        stats: [
          { value: "170,469", label: "rows in the largest sheet" },
          { value: "99,667", label: "revenue and expense rows" },
          { value: "8,204", label: "budget journal rows" },
          { value: "7", label: "worksheet merge rules" },
        ],
      },
      {
        image: `${ORA}/merge.png`, imageCaption: "Output validated before replacement.", stage: "Outcome",
        title: "No more manual monthly merge",
        points: [
          "Oracle data now flows to Power BI on a repeatable path.",
          "A failed update is never treated as a success.",
          "The public repo is fully sanitized.",
        ],
      },
    ],
    contribution: [
      "Wrote the streaming XML converter.",
      "Designed the fiscal-year merge rules.",
      "Added SAFE TEST mode and the Power Automate hand-off.",
    ],
    stack: [
      { name: "Python", use: "Both pipeline stages." },
      { name: "Power Automate", use: "Runs the monthly merge." },
      { name: "Power BI", use: "Receives the validated data." },
    ],
  },

  "pneumonia-dcgan": {
    style: { short: "Pneumonia X-ray GAN", cover: "#2f5d46", tint: "#a2d0b3", title: "AI-Generated|X-rays for|Pneumonia|Detection" },
    back: {
      points: [
        "The model kept missing normal chest X-rays.",
        "My first fix with synthetic images failed, and I learned why.",
        "The second try made the model accurate and fair.",
      ],
      stats: [
        { value: "73.6% → 82.2%", label: "accuracy" },
        { value: "0.32 → 0.76", label: "normal-case recall" },
      ],
    },
    spreads: [
      {
        image: `${GAN}/slide-02.png`, imageCaption: "Far more pneumonia than normal images.", stage: "Task",
        title: "Recognize normal X-rays fairly",
        points: [
          "Pneumonia images outnumbered normal ones about 3 to 1.",
          "The model missed many normal cases.",
          "Goal: a balanced model, not just higher accuracy.",
        ],
        stats: [
          { value: "3,876", label: "pneumonia images" },
          { value: "1,342", label: "normal images" },
        ],
      },
      {
        image: `${GAN}/slide-09.png`, imageCaption: "Experiment 1 lowered accuracy.", stage: "My work",
        title: "Experiment 1 failed",
        points: [
          "The GAN trained for only 20 epochs.",
          "Images were noisy and went to the wrong class.",
          "Lesson: bad synthetic data hurts a model.",
        ],
        stat: { value: "82.9% → 75%", label: "accuracy dropped" },
        tools: ["PyTorch", "DCGAN"],
      },
      {
        image: `${GAN}/slide-15.png`, imageCaption: "50 epochs gives clearer chest structure.", stage: "My work",
        title: "Experiment 2: a better strategy",
        points: [
          "Trained the GAN for 50 epochs, not 20.",
          "Generated images for the smaller normal class.",
          "Added dropout and class weights.",
        ],
        stat: { value: "2,000", label: "synthetic normal X-rays" },
        tools: ["PyTorch", "Torchvision"],
      },
      {
        image: `${GAN}/slide-17.png`, imageCaption: "Final classification report.", stage: "Results",
        title: "Accurate and fair",
        stats: [
          { value: "82.21%", label: "accuracy (from 73.56%)" },
          { value: "0.76", label: "normal recall (from 0.32)" },
          { value: "0.82", label: "macro F1 (from 0.65)" },
          { value: "+8.65", label: "accuracy points gained" },
        ],
      },
      {
        image: `${GAN}/slide-18.png`, imageCaption: "Both experiments compared.", stage: "Outcome",
        title: "No more defaulting to pneumonia",
        points: [
          "The model now finds normal cases much better.",
          "The failed experiment made the success possible.",
          "Research only, not a clinical tool.",
        ],
      },
    ],
    contribution: [
      "Measured the class imbalance and baseline.",
      "Ran both GAN experiments and diagnosed the failure.",
      "Compared every metric across both experiments.",
    ],
    stack: [
      { name: "PyTorch", use: "GAN and classifier." },
      { name: "DCGAN", use: "Generates synthetic X-rays." },
      { name: "CNN", use: "Classifies pneumonia vs. normal." },
    ],
  },

  "seizure-detection": {
    style: { short: "EEG Seizure Detection", cover: "#4f2c5f", tint: "#c7a2d6", title: "EEG Seizure|Detection with|Deep Learning" },
    back: {
      points: [
        "Classifies brain activity as seizure or non-seizure.",
        "Studied the EEG signal before training.",
        "Tested fold by fold on unseen data.",
      ],
      stats: [
        { value: "94%", label: "mean accuracy" },
        { value: "5,508", label: "samples evaluated" },
      ],
    },
    spreads: [
      {
        image: `${EEG}/channel-variance.png`, imageCaption: "EEG channels behave differently.", stage: "Task",
        title: "Tell seizures apart from normal activity",
        points: [
          "EEG data is noisy.",
          "Channels can behave very differently.",
          "The model must catch seizures, not just score well.",
        ],
      },
      {
        image: `${EEG}/statistical-properties.png`, imageCaption: "Statistics for every channel.", stage: "My work",
        title: "Signal first, model second",
        points: [
          "Measured variance for every channel.",
          "Checked mean, spread, skew and kurtosis.",
          "Understood the signal before training.",
        ],
        tools: ["Python"],
      },
      {
        image: `${EEG}/training-curves.png`, imageCaption: "Loss falls, accuracy rises.", stage: "My work",
        title: "Tested on unseen folds",
        points: [
          "Tracked training and validation every epoch.",
          "Tested on held-out folds, not training data.",
          "Compared results for each class separately.",
        ],
        stat: { value: "0.9319", label: "fold 5 test accuracy" },
        tools: ["Deep learning", "Cross-validation"],
      },
      {
        image: `${EEG}/classification-report.png`, imageCaption: "Final classification report.", stage: "Results",
        title: "Strong on both classes",
        stats: [
          { value: "94%", label: "mean accuracy" },
          { value: "93%", label: "seizures caught" },
          { value: "95%", label: "non-seizures cleared" },
          { value: "5,508", label: "samples evaluated" },
        ],
      },
      {
        image: `${EEG}/training-curves.png`, imageCaption: "Stable training.", stage: "Outcome",
        title: "Balanced, not just accurate",
        points: [
          "Similar results for seizure and non-seizure.",
          "F1 of about 0.94 for both classes.",
          "Academic work, not a clinical system.",
        ],
      },
    ],
    contribution: [
      "Analyzed the EEG channels and statistics.",
      "Trained the classifier.",
      "Ran the fold-level evaluation.",
    ],
    stack: [
      { name: "Python", use: "Analysis and modelling." },
      { name: "Deep learning", use: "Classifies the EEG signal." },
      { name: "Cross-validation", use: "Tests on unseen data." },
    ],
  },

  "vertebral-column-classification": {
    style: { short: "Vertebral Classification", cover: "#3f3474", tint: "#b0a4e6", title: "Spine Disease|Classification with|Neural Networks" },
    back: {
      points: [
        "Classifies spine samples as normal or abnormal.",
        "Uses six biomechanical measurements.",
        "Tuned and tested on unseen samples.",
      ],
      stats: [
        { value: "85.48%", label: "test accuracy" },
        { value: "310", label: "samples" },
      ],
    },
    spreads: [
      {
        image: `${VER}/confusion-matrices.png`, imageCaption: "Train and test confusion matrices.", stage: "Task",
        title: "Normal or abnormal spine?",
        points: [
          "310 samples, six measurements each.",
          "Can a neural network classify them reliably?",
        ],
        stat: { value: "6", label: "measurements per sample" },
      },
      {
        image: `${VER}/learning-rate.png`, imageCaption: "Learning-rate experiment.", stage: "My work",
        title: "A carefully tuned network",
        points: [
          "Stratified 80/20 split with normalization.",
          "Tested learning rates, momentum and layer sizes.",
          "Measured accuracy, F1 and errors.",
        ],
        tools: ["Python", "TensorFlow", "Keras"],
      },
      {
        image: `${VER}/f1-scores.png`, imageCaption: "F1 scores for each class.", stage: "Results",
        title: "Most unseen samples classified correctly",
        stats: [
          { value: "85.48%", label: "test accuracy" },
          { value: "95.56%", label: "training accuracy" },
          { value: "310", label: "samples" },
          { value: "6", label: "measurements" },
        ],
      },
      {
        image: `${VER}/confusion-matrices.png`, imageCaption: "Where mistakes remain.", stage: "Outcome",
        title: "Six measurements go a long way",
        points: [
          "The network separates most samples well.",
          "The train/test gap shows a small-data limit.",
          "Not a medical diagnostic tool.",
        ],
      },
    ],
    contribution: [
      "Prepared the data and the split.",
      "Ran the tuning experiments.",
      "Evaluated on held-out data.",
    ],
    stack: [
      { name: "Python", use: "All experiments." },
      { name: "TensorFlow & Keras", use: "The neural network." },
      { name: "Scikit-learn", use: "Split, scaling and metrics." },
    ],
  },

  "fitness-video-optimization": {
    style: { short: "Fitness Video", cover: "#a4405c", tint: "#f4b3c4", title: "Fitness App|Video Loading|Fix" },
    back: {
      points: [
        "Workout videos took about 5 minutes to load.",
        "I found the bottleneck and moved the videos to AWS S3.",
        "Videos now start in about 3 seconds.",
      ],
      stats: [
        { value: "5 min → 3 sec", label: "loading time" },
        { value: "50+", label: "workout videos" },
      ],
    },
    spreads: [
      {
        image: FIT, imageCaption: "A frame from the real app.", stage: "Task",
        title: "Videos took minutes to start",
        points: [
          "The app has 50+ workout videos.",
          "Each one took about 5 minutes to load.",
          "The app felt broken.",
        ],
        stat: { value: "~5 min", label: "to load one video" },
      },
      {
        image: FIT, imageCaption: "The delay came from video delivery.", stage: "My work",
        title: "Found the bottleneck, fixed delivery",
        points: [
          "Traced the delay to the old video-loading setup.",
          "Moved every video to AWS S3.",
          "Updated the app to load videos from S3.",
        ],
        tools: ["React Native", "Node.js", "AWS S3"],
      },
      {
        image: FIT, imageCaption: "Videos now start in seconds.", stage: "Results",
        title: "Videos start almost instantly",
        stats: [
          { value: "~5 min", label: "before" },
          { value: "~3 sec", label: "after" },
          { value: "50+", label: "videos sped up" },
        ],
      },
      {
        image: FIT, imageCaption: "Workouts start right away.", stage: "Outcome",
        title: "The app finally feels fast",
        points: [
          "Users start a workout right away.",
          "Solved with debugging and cloud storage.",
          "Times can vary by network and device.",
        ],
      },
    ],
    contribution: [
      "Diagnosed the loading bottleneck.",
      "Moved the video library to AWS S3.",
      "Updated the app and backend.",
    ],
    stack: [
      { name: "React Native", use: "The mobile app." },
      { name: "Node.js", use: "The backend." },
      { name: "AWS S3", use: "Stores and delivers the videos." },
    ],
  },
};

/** Book content for a project: hand-written for every portfolio project, with a fallback for new ones. */
export function getBookContent(project: Project): ProjectBookContent {
  const custom = books[project.slug];
  if (custom) return custom;

  const short = project.title.split(/ — | – /)[0];
  const images = project.evidence.filter((e): e is typeof e & { src: string } => e.type === "image" && !!e.src);
  const pic = (i: number) => {
    const e = images[i % Math.max(images.length, 1)];
    return { image: e?.src ?? "", imageCaption: e?.label ?? "" };
  };
  return {
    style: { short, cover: "#171310", tint: "#c9beac", title: short.replace(/ /g, "|") },
    back: { points: project.approach.slice(0, 3), stats: project.outcomes.slice(0, 2) },
    spreads: [
      { ...pic(0), stage: "Task", title: "The task", lead: project.problem },
      { ...pic(1), stage: "My work", title: "What I built", points: project.approach },
      { ...pic(2), stage: "Results", title: "Results", stats: project.outcomes.slice(0, 4) },
    ],
    contribution: [],
    stack: project.tech.map((name) => ({ name, use: "" })),
    note: project.limitations,
  };
}

export function getBookStyle(project: Project): BookStyle {
  return getBookContent(project).style;
}
