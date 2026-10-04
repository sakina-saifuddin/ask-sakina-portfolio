import type { Project } from "@/data/portfolio";

/*
 * Project books. Everything here is written in complete sentences, so a reader who opens a book
 * understands what the project was, what I did, and what it achieved without needing the case study.
 */

/** The headings every project book walks through, in order. */
export const BOOK_STAGES = ["Task", "My work", "Results", "Outcome"] as const;
export type BookStage = (typeof BOOK_STAGES)[number];

/** One spread of a project book: a picture on the left page, one stage of the story on the right. */
export type BookSpread = {
  image: string;
  /** A sentence under the picture saying what it shows. */
  imageCaption: string;
  stage: BookStage;
  /** A one-sentence heading for the page. */
  title: string;
  text?: string;
  points?: string[];
  /** A single headline number for this step, with a sentence explaining it… */
  stat?: { value: string; label: string };
  /** …or a grid of numbers, each with a sentence. */
  stats?: { value: string; label: string }[];
  /** Tool names; shown as the sentence "I used A, B and C." */
  tools?: string[];
};

/**
 * Cover design, laid out like a paperback:
 * - `title`: the big sentence on the front ("|" marks line breaks)
 * - `subtitle`: the white sentence under it, saying what I built and what it achieved
 * - `short`: the plain project name (back-cover heading and spine)
 * - colours picked from the project's own screenshots
 */
export type BookStyle = { cover: string; tint: string; short: string; title: string; subtitle: string };

export type ProjectBookContent = {
  style: BookStyle;
  /** Back cover: blurb paragraphs, one bold sentence, and a closing sentence. */
  back: { blurb: string[]; line: string; closing: string };
  spreads: BookSpread[];
  /** Closing page: what I personally did, and what each technology was used for. */
  contribution: string[];
  stack: { name: string; use: string }[];
  /** Optional small print, e.g. what the screenshots do or don't show. */
  note?: string;
};

/** "A, B and C" */
export function listSentence(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const CCV = "/project-evidence/cost-center-verification";
const PA = "/project-evidence/financial-reconciliation";
const FIN = "/project-evidence/financial-reconciliation";
const RET = "/project-evidence/retail-report";
const HC = "/project-evidence/healthcare-eligibility";
const ORA = "/project-evidence/oracle-etl";
const GAN = "/project-evidence/gan-deck";
const EEG = "/project-evidence/seizure";
const VER = "/project-evidence/vertebral";

const books: Record<string, ProjectBookContent> = {
  "sakina-job-os": {
    style: {
      short: "Job OS", cover: "#8b3a68", tint: "#e3a2c6",
      title: "My Job|Search Runs|Itself.",
      subtitle: "I built a 12-stage n8n pipeline that finds jobs, checks the fit with Claude and drafts outreach for my approval.",
    },
    back: {
      blurb: [
        "A real job search repeats the same steps again and again: find postings, check that they are real, decide whether they fit, write tailored materials, find a warm introduction and follow up.",
        "I turned those steps into one automated n8n pipeline. It verifies every posting against the official listing, uses Claude to decide which jobs are worth pursuing, and then writes tailored resumes, cover letters and outreach drafts.",
      ],
      line: "Twelve automated stages run from discovery to human review.",
      closing: "Nothing is sent until I approve it, and every job and message is tracked in Airtable.",
    },
    spreads: [
      {
        image: "/projects/job-os-placeholder.png",
        imageCaption: "This is the full n8n workflow, from the shared rules on the left to human review on the right.",
        stage: "Task",
        title: "I wanted to automate a job search without losing control of it.",
        text: "Doing every step of a job search by hand does not scale, but sending automated outreach without a human check is risky. My task was to run discovery, fit-checking, application materials and warm outreach as one pipeline that still waits for my approval.",
      },
      {
        image: "/projects/job-os-placeholder.png",
        imageCaption: "The early stages load the shared rules, find postings and verify them before any AI reasoning runs.",
        stage: "My work",
        title: "I built a pipeline that only spends effort on real, matching jobs.",
        points: [
          "The workflow pulls my source-of-truth rules and resume data from Google Drive into one shared object that every stage uses.",
          "It finds and de-duplicates postings, then checks each one against the official employer page.",
          "A Claude-based gate decides whether a job is a strong fit before any resume or cover letter is written.",
        ],
        tools: ["n8n", "Google Drive", "the Claude API"],
      },
      {
        image: "/projects/job-os-placeholder.png",
        imageCaption: "The later stages build materials, match connections and send everything to review.",
        stage: "My work",
        title: "I added warm introductions and a human review step.",
        points: [
          "The pipeline matches my first-degree LinkedIn connections at each company so outreach can start with a warm introduction.",
          "It drafts personalized outreach messages and follow-ups.",
          "Every job, document and message is logged in Airtable, and nothing is sent until I approve it.",
        ],
        tools: ["LinkedIn data", "Airtable"],
      },
      {
        image: "/projects/job-os-placeholder.png",
        imageCaption: "Every branch of the workflow ends at the same human review stage.",
        stage: "Results",
        title: "The whole search now runs as one tracked pipeline.",
        stats: [
          { value: "12", label: "The pipeline has twelve stages, from discovery to human review." },
          { value: "1", label: "Airtable is the single place where every job and message is tracked." },
          { value: "0", label: "No message is sent automatically without my approval." },
        ],
      },
      {
        image: "/projects/job-os-placeholder.png",
        imageCaption: "The graph shows how each job moves through the pipeline.",
        stage: "Outcome",
        title: "I spend my time on the best roles instead of on repetitive steps.",
        text: "The repetitive work is automated, and I make the final decision on what gets sent. Because this is a personal project, the evidence is the workflow itself rather than outreach metrics.",
      },
    ],
    contribution: [
      "I designed the twelve-stage workflow and the shared rules object that drives it.",
      "I built the verification, Claude fit-gating and document-generation stages.",
      "I set up Airtable tracking and the human approval step.",
    ],
    stack: [
      { name: "n8n", use: "I built the whole automation pipeline in n8n." },
      { name: "Claude API", use: "Claude decides whether a job fits and writes the drafts." },
      { name: "Google Drive", use: "Drive holds the rules and resume data the pipeline reads." },
      { name: "Airtable", use: "Airtable tracks every job, document and message." },
      { name: "LinkedIn data", use: "Connection data finds warm introductions." },
    ],
    note: "This is a personal automation project, so the book shows the workflow itself rather than live outreach numbers.",
  },

  "retail-demand-forecasting": {
    style: {
      short: "Retail Forecasting", cover: "#1f4e6b", tint: "#86b9d8",
      title: "I Predicted|What Stores|Will Sell.",
      subtitle: "I trained LightGBM on over 3 million sales records, and it beat two other models on unseen data.",
    },
    back: {
      blurb: [
        "Retail demand changes with the store, the product family, promotions, holidays and recent sales, and about 31% of the records had zero sales.",
        "I merged the raw files into one dataset of more than 3 million rows, built time-aware features, and compared three models without letting future dates leak into training.",
      ],
      line: "LightGBM reached the lowest test error, with an RMSE of 0.4516.",
      closing: "The forecast turns millions of past sales into numbers that can support inventory planning.",
    },
    spreads: [
      {
        image: `${RET}/page-06.png`,
        imageCaption: "Daily and monthly sales show spikes, trends and seasonality that the model had to learn.",
        stage: "Task",
        title: "I needed to forecast store-level demand accurately.",
        text: "A retailer needs good demand forecasts to stock the right products. Sales here changed by date, store, product family, promotions, holidays and recent demand, so a simple model would not work.",
      },
      {
        image: `${RET}/page-09.png`,
        imageCaption: "This page shows how I cleaned missing values and created the calendar and lag features.",
        stage: "My work",
        title: "I cleaned the data and built time-aware features.",
        points: [
          "I merged sales with store details, oil prices, transactions, promotions and holidays.",
          "I filled each missing value according to what that field meant.",
          "I created calendar features, 1- to 28-day sales lags and rolling averages, shifted so the model never sees the day it predicts.",
        ],
        tools: ["Python", "Pandas"],
      },
      {
        image: `${RET}/page-14.png`,
        imageCaption: "Five time-ordered folds compare the three models without leaking future dates.",
        stage: "My work",
        title: "I compared three models in a fair, time-ordered way.",
        text: "Instead of shuffling dates, I trained on earlier periods and validated on later ones across five folds. I compared Linear Regression, Random Forest and LightGBM, and then tested all three on 602,316 unseen rows.",
        tools: ["Scikit-learn", "LightGBM", "TimeSeriesSplit"],
      },
      {
        image: `${RET}/page-16.png`,
        imageCaption: "On the unseen holdout set, LightGBM had the lowest error of the three models.",
        stage: "Results",
        title: "LightGBM was the most accurate model on unseen data.",
        stats: [
          { value: "0.4516", label: "LightGBM reached the lowest test RMSE." },
          { value: "0.4845", label: "Random Forest came second." },
          { value: "1.3541", label: "Linear Regression was much less accurate." },
          { value: "104", label: "The final model used 104 predictors." },
        ],
      },
      {
        image: `${RET}/page-18.png`,
        imageCaption: "The predictions were converted back to real sales values so they can be read directly.",
        stage: "Outcome",
        title: "The forecast can now support inventory decisions.",
        text: "Tree-based models handled the mix of promotions, store behavior, seasonality and recent sales much better than a straight-line model. The report covers the forecasting work in full; it does not include the planned inventory-optimization layer, so this book does not claim results for it.",
      },
    ],
    contribution: [
      "I merged and cleaned more than 3 million sales records.",
      "I engineered the lag, rolling and calendar features without future-data leakage.",
      "I ran the time-series cross-validation and the final model comparison.",
    ],
    stack: [
      { name: "Python & Pandas", use: "I prepared and merged the data with Pandas." },
      { name: "Scikit-learn", use: "I used it for the baseline models and validation." },
      { name: "LightGBM", use: "LightGBM produced the best forecasts." },
      { name: "TimeSeriesSplit", use: "It kept every validation fold in time order." },
    ],
    note: "Future work listed in the report includes stockout and overstock metrics, prediction intervals and wider tuning.",
  },

  "financial-reconciliation": {
    style: {
      short: "Grant Dashboards", cover: "#7a2840", tint: "#e095ab",
      title: "1,074 Reports|Became One|Dashboard.",
      subtitle: "I built a Power BI reporting system that cut manual financial review work by about half.",
    },
    back: {
      blurb: [
        "Grant and cost center managers had to read hundreds of separate recurring reports to check budget, expenses, commitments, payroll and monthly activity.",
        "I built one Power BI data model, with DAX measures and Power Query transformations, behind a grant overview, a current-month review screen and payroll drilldowns.",
      ],
      line: "The system replaced 1,074 recurring reports.",
      closing: "Reviewers now start at the grant overview and drill down to the exact transactions behind a balance.",
    },
    spreads: [
      {
        image: `${FIN}/grants-overview-dummy.png`,
        imageCaption: "The grant overview shows budget, expenses, commitments and balance, using sample data for privacy.",
        stage: "Task",
        title: "Managers needed one place to review their grant finances.",
        text: "Financial review was spread across recurring reports and different kinds of financial data. Before confirming that a cost center looked right, a reviewer had to piece together budget, expenses, commitments, payroll, project dates and the current month.",
      },
      {
        image: `${FIN}/grants-overview1-dummy.png`,
        imageCaption: "This view breaks budget against expenses down by status, using sample figures.",
        stage: "My work",
        title: "I combined every financial source into one model.",
        text: "The source tables did not share the same level of detail, so the totals could not be trusted at first. I built lookup logic, Power Query transformations and DAX measures so that budget, commitments, projects, payroll and fiscal periods lined up and every page gave consistent results.",
        tools: ["Power BI", "Power Query", "DAX"],
      },
      {
        image: `${FIN}/current-month-dummy.png`,
        imageCaption: "The monthly review screen lets a reviewer pick a cost center and check its activity.",
        stage: "My work",
        title: "I built screens that go from summary to transactions.",
        points: [
          "The grant overview gives the high-level picture.",
          "The current-month screen checks budget, payroll, non-payroll and fiscal-period activity.",
          "The payroll and non-payroll drilldowns show the exact records behind a balance.",
        ],
        tools: ["Power BI", "SQL", "Python"],
      },
      {
        image: `${FIN}/payroll-dummy.png`,
        imageCaption: "The payroll drilldown filters by award, project, fiscal year and period, using sample data.",
        stage: "Results",
        title: "The system automated reporting across the college.",
        stats: [
          { value: "1,074", label: "The system replaced 1,074 recurring reports." },
          { value: "50%", label: "Manual review work dropped by about half." },
          { value: "11+", label: "It supports more than eleven departments." },
          { value: "50+", label: "It covers more than fifty grants and financial datasets." },
        ],
      },
      {
        image: `${FIN}/grants-overview-dummy.png`,
        imageCaption: "Every figure, name and ID in these screenshots has been replaced with sample data.",
        stage: "Outcome",
        title: "Reviewers no longer jump between separate files.",
        text: "Reviewers start at the grant overview and drill into current-month, payroll and non-payroll detail in one place. These dashboards also became the evidence layer for the monthly Cost Center Verification app.",
      },
    ],
    contribution: [
      "I designed the single reporting model behind every dashboard.",
      "I wrote the Power Query transformations and DAX measures.",
      "I built the overview, monthly review and payroll drilldown screens.",
    ],
    stack: [
      { name: "Power BI", use: "I built all the dashboards in Power BI." },
      { name: "DAX", use: "DAX measures calculate budget, commitments and balances." },
      { name: "Power Query", use: "Power Query shapes and joins the source data." },
      { name: "SQL & Python", use: "I used them to prepare and check the data." },
      { name: "PeopleSoft", use: "PeopleSoft is the source of the financial data." },
    ],
    note: "The screenshots use fabricated sample data; real grant, financial and employee records are private.",
  },

  "cost-center-verification": {
    style: {
      short: "Cost Center Verification", cover: "#9b1b30", tint: "#ec98a5",
      title: "Monthly Sign-off|No Longer Needs|Email Chains.",
      subtitle: "I built a Power Apps and Power Automate app that runs the monthly cost center sign-off.",
    },
    back: {
      blurb: [
        "University policy requires every active cost center to be verified every month: a business administrator checks it and the manager approves it. That process ran on reports, emails and follow-ups.",
        "I designed and built one Power Apps app for the Cullen College of Engineering. Each manager answers Yes or No for every cost center, and anything marked No goes to the department's business administrator, who records how it was fixed.",
      ],
      line: "Each review moves from the manager to the business administrator to complete.",
      closing: "Five Power Automate flows handle the checks, emails, reminders and monthly data refresh.",
    },
    spreads: [
      {
        image: `${CCV}/home.png`,
        imageCaption: "The home screen shows each person what is waiting for them this month.",
        stage: "Task",
        title: "The monthly cost center sign-off needed to leave the email chains behind.",
        text: "UH policy MAPP 05.04.02 requires every active cost center to be verified every month. A business administrator (DBA) checks it and the manager approves it. That ran on reports and emails, so my task was to design and build one Power Apps app that runs the whole cycle.",
        points: [
          "Each manager should get one review per month.",
          "Every cost center marked No should go to the department's DBA.",
          "Finished reviews should be locked as an audit record.",
        ],
      },
      {
        image: `${CCV}/manager-review.png`,
        imageCaption: "On the manager review, the manager answers Yes or No for every cost center.",
        stage: "My work",
        title: "I built the manager review and its data model.",
        text: "Each review is one SharePoint row per manager per month, and every cost center's answer is stored as JSON. A No needs a comment, and Submit stays locked until every cost center has an answer.",
        tools: ["Power Apps", "Power Fx", "SharePoint", "JSON"],
        stat: { value: "100%", label: "Every cost center must be answered before Submit unlocks." },
      },
      {
        image: `${CCV}/dba-resolve.png`,
        imageCaption: "The DBA sees only the flagged cost centers and writes a fix note for each one.",
        stage: "My work",
        title: "I routed every issue to the right DBA.",
        text: "A department can have several DBAs, and a DBA can cover several departments, so any listed DBA can resolve a review. The DBA sees only the flagged items, and Resolve stays locked until each one has a fix note.",
        tools: ["a department-to-DBA table", "delegable SharePoint filters"],
        stat: { value: "2 / 2", label: "Both flagged items in this test review were fixed before Resolve unlocked." },
      },
      {
        image: `${CCV}/manager-complete.png`,
        imageCaption: "A completed review is read-only and shows the DBA's fix next to each flagged item.",
        stage: "My work",
        title: "I built the business rules into the app.",
        text: "If every answer is Yes, the review skips the DBA and completes immediately. After Submit or Resolve, the review becomes read-only. Status badges always show words, and each screen has a guided tour.",
        tools: ["a status workflow", "role-based access", "Power BI links"],
        stat: { value: "4", label: "Each review moves through four statuses, from Initiated to Verify/Certify Complete." },
      },
      {
        image: `${PA}/power-automate-submit-review.png`,
        imageCaption: "This is the CCV-SubmitReview flow in Power Automate.",
        stage: "My work",
        title: "A flow re-checks every submitted review.",
        text: "When a manager submits, a flow called from the app checks everything again. The caller must be the review's manager, every cost center must be answered, and every ID must be valid. The flow then sets the status, saves the review and notifies the DBA if anything was marked No.",
        tools: ["Power Automate", "the Power Apps trigger", "SharePoint"],
        stat: { value: "20", label: "The flow runs twenty steps for every submitted review." },
      },
      {
        image: `${PA}/power-automate-dba-resolve.png`,
        imageCaption: "This is the CCV-DBAResolve flow in Power Automate.",
        stage: "My work",
        title: "A second flow saves the DBA's fixes.",
        text: "When the DBA resolves a review, its own flow confirms who is calling, saves the fix notes, replies to the app and emails the manager that the review is complete.",
        tools: ["Power Automate", "SharePoint", "Outlook"],
        stat: { value: "10", label: "The flow takes ten steps from Resolve to the manager's email." },
      },
      {
        image: `${PA}/power-automate-notifications.png`,
        imageCaption: "The notifications flow picks the right email based on the review's status.",
        stage: "My work",
        title: "Each status sends the right email.",
        text: "Whenever a review is created or changed, this flow chooses the email by status. It emails the manager when a review opens, the DBA when issues are flagged, and the manager when the review is complete. Each email links to the app and to Power BI.",
        tools: ["Power Automate", "a SharePoint trigger", "Outlook"],
        stat: { value: "3", label: "There are three email paths: one for the manager, one for the DBA and one on completion." },
      },
      {
        image: `${PA}/power-automate-weekly-reminders.png`,
        imageCaption: "The weekly reminders flow runs on a schedule.",
        stage: "My work",
        title: "Weekly reminders chase open reviews.",
        text: "A scheduled flow finds every review that is still open and reminds whoever's turn it is. It skips anyone who was already reminded in the last six days, so nobody is spammed.",
        tools: ["Power Automate", "a recurrence trigger", "SharePoint"],
        stat: { value: "6 days", label: "Nobody is reminded more than once every six days." },
      },
      {
        image: `${PA}/power-automate-monthly-refresh.png`,
        imageCaption: "The monthly refresh flow updates the cost center and employee data.",
        stage: "My work",
        title: "The data refreshes itself every month.",
        text: "Each month, a scheduled flow picks up the latest cost center and employee files, runs an Excel refresh script on each, and writes the rows to SharePoint in batches. That way, reviews are always generated from current data.",
        tools: ["Power Automate", "Excel scripts", "SharePoint batch updates"],
        stat: { value: "2", label: "Two datasets are refreshed every month: cost centers and employees." },
      },
      {
        image: `${CCV}/dba-resolved-list.png`,
        imageCaption: "The DBA's list shows the reviews they fixed and sent back to managers.",
        stage: "Results",
        title: "The full cycle works from start to finish.",
        text: "A review moves from the manager to the DBA to complete in the development app, using test data, and the emails, reminders and monthly refresh are automated.",
        stats: [
          { value: "2", label: "One app serves two roles: the manager and the DBA." },
          { value: "4", label: "Each review moves through four statuses." },
          { value: "5", label: "Five Power Automate flows run behind the app." },
          { value: "30", label: "Managers and DBAs have thirty days to finish each review." },
        ],
      },
      {
        image: `${CCV}/my-reviews.png`,
        imageCaption: "The My Reviews screen lists pending and completed months.",
        stage: "Outcome",
        title: "The monthly sign-off now happens in one place.",
        text: "Managers, DBAs and the college can see who has finished, what was flagged and how it was fixed, without chasing emails. Every finished review is locked as an audit record, and rollout to managers is the next step.",
        stat: { value: "Audit-ready", label: "Every finished review is locked and kept as a record." },
      },
    ],
    contribution: [
      "I turned the project manager's confirmed business rules into app logic.",
      "I designed the SharePoint data model and the four-status workflow.",
      "I built the home, review list, manager and DBA screens, plus the guided tours.",
      "I built five Power Automate flows for submit, resolve, notifications, weekly reminders and the monthly refresh.",
    ],
    stack: [
      { name: "Power Apps", use: "I built the app and every screen in Power Apps." },
      { name: "Power Fx", use: "Power Fx handles the validation, routing and locking rules." },
      { name: "SharePoint", use: "SharePoint stores one review row per manager per month." },
      { name: "Power Automate", use: "Five flows run the checks, emails, reminders and refresh." },
      { name: "Power BI", use: "Power BI supplies the active cost centers and the View details link." },
      { name: "PeopleSoft (1074)", use: "The monthly 1074 upload is the source data." },
    ],
    note: "All screenshots come from the development app and use test records only.",
  },

  "healthcare-eligibility-pipeline": {
    style: {
      short: "Healthcare Eligibility", cover: "#155e63", tint: "#86cbcc",
      title: "Up to 20 Sources|Now Feed One|Benefit Summary.",
      subtitle: "I built and validated a healthcare eligibility pipeline that raised validated data accuracy from 20% to 80%.",
    },
    back: {
      blurb: [
        "Dental eligibility data did not come from one clean database. Patient details, insurance, benefits, coverage rules, appointments and payer responses lived in different APIs and files, and each payer could describe the same rule differently.",
        "I worked on a Python workflow that collects and normalizes this data into one patient-level JSON bundle, and I validated the new Benefit Summary screen field by field against the source data.",
      ],
      line: "Validated data accuracy rose from about 20% to about 80%.",
      closing: "The work also saved about two hours of manual lookup on each case.",
    },
    spreads: [
      {
        image: `${HC}/old-benefit-summary.png`,
        imageCaption: "The classic Benefit Summary was the comparison point for deductibles, maximums and coverage.",
        stage: "Task",
        title: "Eligibility data from many sources had to become one reliable summary.",
        text: "Every payer can return eligibility information differently. My task was to help collect, check and map that data into one consistent Benefit Summary that staff could trust.",
      },
      {
        image: `${HC}/bundle-fetcher-start.png`,
        imageCaption: "The Python workflow starts by loading shared lookups and collecting each patient's files.",
        stage: "My work",
        title: "I built a workflow that gathers every source into one bundle.",
        points: [
          "It collects patient, insurance, benefit, plan, rule, appointment, treatment and provider data.",
          "It records failed and empty responses so problems can be debugged.",
          "It merges everything into one patient-level JSON bundle that is ready for the Benefit Summary.",
        ],
        tools: ["Python", "REST APIs", "DentalXchange", "CareStack"],
      },
      {
        image: `${HC}/new-procedure-view.png`,
        imageCaption: "The new screen groups procedures into categories with plan percentage, frequency and status.",
        stage: "My work",
        title: "I checked the new screen against the raw data.",
        text: "I did not assume that a cleaner screen meant correct data. I compared deductibles, maximums, coverage percentages, procedure codes, frequency limits and service history between the old and new views, and traced every mismatch back to the source JSON.",
        tools: ["Postman", "SQL", "BigQuery"],
      },
      {
        image: `${HC}/old-procedure-view.png`,
        imageCaption: "The old view shows code-level percentages and limitation notes that I used during validation.",
        stage: "My work",
        title: "I turned the problems I found into mapping rules.",
        points: [
          "Some procedure groups were given one general frequency even though individual codes had different limits.",
          "Service history could come from a different source than the classic view.",
          "A green Eligible label could mislead if age, prior usage or frequency had not been applied yet.",
        ],
      },
      {
        image: `${HC}/new-benefit-summary.png`,
        imageCaption: "The redesigned Benefit Summary presents the same benefits more clearly.",
        stage: "Results",
        title: "The data became far more accurate and faster to use.",
        stats: [
          { value: "15–20", label: "The workflow integrates between fifteen and twenty source inputs." },
          { value: "20→80%", label: "Validated data accuracy rose from about 20% to about 80%." },
          { value: "~2 hrs", label: "Each case needs about two fewer hours of manual lookup." },
          { value: "7", label: "The work was validated across seven production deployments." },
        ],
      },
      {
        image: `${HC}/bundle-fetcher-finish.png`,
        imageCaption: "Each run finishes by writing one merged patient file and logging any failed endpoints.",
        stage: "Outcome",
        title: "Staff can now trust the Benefit Summary.",
        text: "The concrete mapping and validation rules I documented made the new Benefit Summary reliable enough to replace manual lookups. The public repository uses synthetic examples, so no real patient data is shown.",
      },
    ],
    contribution: [
      "I worked on the Python bundle-fetching and normalization workflow.",
      "I wrote payer-specific source-priority and mapping rules.",
      "I validated the new Benefit Summary field by field and documented every fix.",
    ],
    stack: [
      { name: "Python", use: "I wrote the fetching and normalization workflow in Python." },
      { name: "REST APIs", use: "The workflow calls the DentalXchange and CareStack APIs." },
      { name: "JSON", use: "Each patient's data is merged into one JSON bundle." },
      { name: "SQL & BigQuery", use: "I used them to check the source data." },
      { name: "Postman", use: "I used Postman to test the API responses." },
    ],
    note: "The repository uses synthetic examples and excludes production credentials and real patient data.",
  },

  "oracle-financial-etl": {
    style: {
      short: "Oracle Financial ETL", cover: "#233a63", tint: "#98add8",
      title: "Oracle Data|Now Reaches|Power BI|on Its Own.",
      subtitle: "I wrote a Python pipeline that converts and merges monthly Oracle exports without manual work.",
    },
    back: {
      blurb: [
        "Every month, large Oracle exports had to be converted, merged into the right fiscal-year workbook and checked before reporting. The files looked like .xls files but were really XML, and some were too large for normal conversion.",
        "I built a two-stage Python workflow. The first stage streams the XML into a real Excel workbook, and the second applies the right merge rule to each worksheet and validates the result before anything is replaced.",
      ],
      line: "The pipeline converted more than 170,000 rows in the largest sheet shown.",
      closing: "Power Automate runs the merge and treats a failed update as a failure, not a success.",
    },
    spreads: [
      {
        image: `${ORA}/conversion.png`,
        imageCaption: "The converter output lists each financial worksheet and how many rows it wrote.",
        stage: "Task",
        title: "A fragile monthly process needed to become repeatable.",
        text: "The Oracle files were XML spreadsheets disguised as .xls files, and some were very large. Even after conversion, the monthly workbook could not simply be added to the annual file, because each worksheet held a different kind of financial data.",
      },
      {
        image: `${ORA}/conversion.png`,
        imageCaption: "The converted workbook keeps every worksheet and its row count.",
        stage: "My work",
        title: "I wrote a converter that streams the XML.",
        text: "The converter reads the XML as a stream instead of loading the whole file into memory. It validates the file type, handles old encodings, keeps basic cell types, respects Excel's row and column limits, and writes a real .xlsx workbook.",
        tools: ["Python", "lxml", "XlsxWriter"],
      },
      {
        image: `${ORA}/merge.png`,
        imageCaption: "A SAFE TEST run detects FY2026 periods 9 and 10 and validates the output.",
        stage: "My work",
        title: "I gave each worksheet its own merge rule.",
        points: [
          "The workflow detects the incoming fiscal year and periods and finds the matching annual workbook.",
          "Transaction sheets replace the matching periods and add the new rows.",
          "Commitment sheets are treated as current snapshots, and the cost center list is updated with a composite key.",
        ],
        tools: ["OpenPyXL", "Excel"],
      },
      {
        image: `${ORA}/power-automate.png`,
        imageCaption: "Power Automate runs the merge and branches on success or failure.",
        stage: "Results",
        title: "The pipeline processed every sheet and checked itself.",
        stats: [
          { value: "170,469", label: "The largest sheet shown had 170,469 rows converted." },
          { value: "99,667", label: "The revenue and expense sheet had 99,667 rows." },
          { value: "9 & 10", label: "Fiscal-year 2026 periods 9 and 10 were detected automatically." },
          { value: "7", label: "Seven worksheet-specific rules control the merge." },
        ],
      },
      {
        image: `${ORA}/merge.png`,
        imageCaption: "The output is validated before the live workbook is replaced.",
        stage: "Outcome",
        title: "Monthly reporting no longer depends on a manual merge.",
        text: "The workflow runs in SAFE TEST mode by default and only replaces the live workbook when asked. The validated annual workbook feeds SharePoint, Power Automate and Power BI, so the data path from Oracle to reporting is now repeatable.",
      },
    ],
    contribution: [
      "I wrote the streaming Oracle XML to Excel converter.",
      "I designed the worksheet-specific fiscal-year merge rules.",
      "I added the schema checks, SAFE TEST mode and the Power Automate hand-off.",
    ],
    stack: [
      { name: "Python", use: "I wrote both stages of the pipeline in Python." },
      { name: "lxml & XlsxWriter", use: "They stream the XML and write the workbook." },
      { name: "OpenPyXL", use: "OpenPyXL reads and merges the annual workbook." },
      { name: "Power Automate", use: "Power Automate runs the merge each month." },
      { name: "SharePoint & Power BI", use: "They receive the validated workbook for reporting." },
    ],
    note: "The public repository is sanitized and excludes production financial records and internal paths.",
  },

  "pneumonia-dcgan": {
    style: {
      short: "Pneumonia X-ray GAN", cover: "#2f5d46", tint: "#a2d0b3",
      title: "Synthetic|X-rays Made|the Model Fairer.",
      subtitle: "I used a DCGAN to create 2,000 normal chest X-rays, and accuracy rose from 73.6% to 82.2%.",
    },
    back: {
      blurb: [
        "The training data had far more pneumonia X-rays than normal ones, so the classifier kept missing normal cases.",
        "My first attempt to fix this with synthetic images made the model worse. I studied why, changed the strategy, and generated 2,000 clearer images for the normal class in a second experiment.",
      ],
      line: "Recall for normal X-rays rose from 0.32 to 0.76.",
      closing: "The failed first experiment is the reason the second one worked.",
    },
    spreads: [
      {
        image: `${GAN}/slide-02.png`,
        imageCaption: "The training set had 3,876 pneumonia images and only 1,342 normal images.",
        stage: "Task",
        title: "I wanted the classifier to recognize normal X-rays fairly.",
        text: "Because pneumonia images outnumbered normal ones almost three to one, the model learned pneumonia well but missed many normal cases. The goal was a more balanced model, not just a higher overall accuracy.",
      },
      {
        image: `${GAN}/slide-09.png`,
        imageCaption: "In the first experiment, adding synthetic images lowered test accuracy to 75%.",
        stage: "My work",
        title: "My first experiment failed, and I learned from it.",
        text: "I trained the GAN for only 20 epochs, the images were noisy, and I added them to the class that was already larger. Accuracy fell from 82.85% to 75%, which showed me that synthetic data can hurt a model when the quality or the class strategy is wrong.",
        tools: ["PyTorch", "a DCGAN"],
      },
      {
        image: `${GAN}/slide-15.png`,
        imageCaption: "After 50 epochs, the synthetic X-rays show much clearer chest structure than after 20.",
        stage: "My work",
        title: "I changed the strategy for the second experiment.",
        points: [
          "I trained the GAN for 50 epochs instead of 20.",
          "I generated 2,000 images for the smaller normal class.",
          "I added dropout and class weights, and I lowered the classifier's learning rate.",
        ],
        tools: ["PyTorch", "Torchvision", "a CNN classifier"],
      },
      {
        image: `${GAN}/slide-17.png`,
        imageCaption: "The final classification report shows a much better balance between the two classes.",
        stage: "Results",
        title: "The second experiment made the model accurate and fair.",
        stats: [
          { value: "82.21%", label: "Accuracy rose from 73.56% to 82.21%." },
          { value: "0.76", label: "Recall for normal X-rays rose from 0.32 to 0.76." },
          { value: "0.82", label: "Macro F1 improved from 0.65 to 0.82." },
          { value: "2,000", label: "I generated 2,000 synthetic normal X-rays." },
        ],
      },
      {
        image: `${GAN}/slide-18.png`,
        imageCaption: "This comparison covers every model across both experiments.",
        stage: "Outcome",
        title: "The model stopped defaulting to pneumonia.",
        text: "The final model is much better at identifying normal cases. This is an academic project, and synthetic medical images would need strong external validation before any clinical use.",
      },
    ],
    contribution: [
      "I measured the class imbalance and the baseline classifier's behavior.",
      "I ran both GAN experiments and diagnosed why the first one failed.",
      "I compared accuracy, recall, F1, confusion matrices and image quality across both experiments.",
    ],
    stack: [
      { name: "PyTorch", use: "I built and trained the GAN and the classifier in PyTorch." },
      { name: "Torchvision", use: "Torchvision loads and transforms the X-ray images." },
      { name: "DCGAN", use: "The DCGAN generates the synthetic chest X-rays." },
      { name: "CNN", use: "A convolutional network classifies pneumonia versus normal." },
    ],
    note: "This is a research project only; it is not a clinical tool.",
  },

  "seizure-detection": {
    style: {
      short: "EEG Seizure Detection", cover: "#4f2c5f", tint: "#c7a2d6",
      title: "My Model|Reads Brainwaves|for Seizures.",
      subtitle: "I built an EEG classifier that reached 94% mean accuracy on 5,508 samples.",
    },
    back: {
      blurb: [
        "EEG data is noisy, and different channels can behave very differently. A high overall accuracy would not be enough if the model missed seizures or only worked on one split of the data.",
        "I studied the signal first, then trained a classifier and tested it fold by fold, comparing seizure and non-seizure results side by side.",
      ],
      line: "The model reached 93% sensitivity and 95% specificity.",
      closing: "It performs almost equally well on seizure and non-seizure activity.",
    },
    spreads: [
      {
        image: `${EEG}/channel-variance.png`,
        imageCaption: "The variance of each EEG channel shows that the inputs do not all behave the same way.",
        stage: "Task",
        title: "I needed to tell seizure activity apart from normal activity.",
        text: "The model had to separate seizure from non-seizure brain activity and stay consistent across EEG channels and test folds, not just score well on average.",
      },
      {
        image: `${EEG}/statistical-properties.png`,
        imageCaption: "I inspected the mean, standard deviation, skewness and kurtosis of every channel.",
        stage: "My work",
        title: "I studied the signal before training any model.",
        text: "I analyzed channel variance and basic statistics such as mean, standard deviation, skewness and kurtosis. This showed me how the signal changed across channels before I focused on the classifier.",
        tools: ["Python", "signal analysis"],
      },
      {
        image: `${EEG}/training-curves.png`,
        imageCaption: "Loss falls and validation accuracy rises, and fold 5 reached 0.9319 test accuracy.",
        stage: "My work",
        title: "I tested the model on unseen folds.",
        text: "I tracked training and validation loss and accuracy across epochs, and I tested on held-out folds instead of the training data. I also compared precision, recall and F1 for each class, so the result was not hidden behind one average.",
        tools: ["deep learning", "cross-validation"],
      },
      {
        image: `${EEG}/classification-report.png`,
        imageCaption: "The final report shows similar F1 scores for seizure and non-seizure samples.",
        stage: "Results",
        title: "The model performed well on both classes.",
        stats: [
          { value: "94%", label: "The model reached 94% mean accuracy." },
          { value: "93%", label: "It caught 93% of seizures (sensitivity)." },
          { value: "95%", label: "It correctly cleared 95% of non-seizure samples (specificity)." },
          { value: "5,508", label: "The evaluation covered 5,508 samples." },
        ],
      },
      {
        image: `${EEG}/training-curves.png`,
        imageCaption: "Training stayed stable across epochs.",
        stage: "Outcome",
        title: "The model is balanced, not just accurate.",
        text: "Seizure recall was 0.93 and non-seizure recall was 0.95, with an F1 of about 0.94 for both. That balance matters more than a model that only looks accurate because it predicts the more common class. This is academic work and not a clinical system.",
      },
    ],
    contribution: [
      "I analyzed the EEG channels and their statistical properties.",
      "I prepared the signal data and trained the classifier.",
      "I ran the fold-level evaluation and compared results for each class.",
    ],
    stack: [
      { name: "Python", use: "I did the analysis and modelling in Python." },
      { name: "Deep learning", use: "A neural network classifies the EEG signals." },
      { name: "Signal analysis", use: "I studied the channels before training." },
      { name: "Cross-validation", use: "Fold-level testing checked the model on unseen data." },
    ],
    note: "This is academic machine-learning work; it is not a clinical diagnostic system.",
  },

  "vertebral-column-classification": {
    style: {
      short: "Vertebral Classification", cover: "#3f3474", tint: "#b0a4e6",
      title: "A Neural Net|Spots Spine|Disease.",
      subtitle: "I trained a neural network on 310 samples, and it reached 85.5% accuracy on unseen data.",
    },
    back: {
      blurb: [
        "The question was whether six biomechanical measurements of the spine are enough to tell a normal sample from an abnormal one.",
        "I built a multilayer neural network, tuned its learning rate, momentum and hidden layer size, and then tested it on samples it had never seen.",
      ],
      line: "The network reached 85.48% accuracy on the held-out test set.",
      closing: "The gap between training and testing accuracy shows the limits of a small dataset.",
    },
    spreads: [
      {
        image: `${VER}/confusion-matrices.png`,
        imageCaption: "The confusion matrices show how the network classified training and test samples.",
        stage: "Task",
        title: "I wanted to classify spine samples as normal or abnormal.",
        text: "The dataset has 310 samples, each described by six biomechanical measurements. My task was to find out whether a neural network could classify them reliably.",
      },
      {
        image: `${VER}/learning-rate.png`,
        imageCaption: "This experiment shows how different learning rates changed accuracy and loss.",
        stage: "My work",
        title: "I tuned the network carefully.",
        points: [
          "I combined the six features and used a stratified 80/20 split with normalization.",
          "I tested different learning rates, momentum values and hidden-layer sizes.",
          "I evaluated the final network with accuracy, F1 score, confusion matrices and mean squared error.",
        ],
        tools: ["Python", "TensorFlow", "Keras", "Scikit-learn"],
      },
      {
        image: `${VER}/f1-scores.png`,
        imageCaption: "The F1 scores compare training and testing for the normal and abnormal classes.",
        stage: "Results",
        title: "The network classified most unseen samples correctly.",
        stats: [
          { value: "85.48%", label: "The network reached 85.48% accuracy on the test set." },
          { value: "95.56%", label: "It reached 95.56% accuracy on the training set." },
          { value: "310", label: "The dataset has 310 samples." },
          { value: "6", label: "Each sample is described by six measurements." },
        ],
      },
      {
        image: `${VER}/confusion-matrices.png`,
        imageCaption: "The test matrix shows where the network still makes mistakes.",
        stage: "Outcome",
        title: "Six measurements can classify most spine samples.",
        text: "The network separates normal and abnormal samples well, but the difference between training and test accuracy shows a risk of overfitting on such a small dataset. This is not a medical diagnostic system.",
      },
    ],
    contribution: [
      "I prepared the data with a stratified split and normalization.",
      "I ran the learning-rate, momentum and hidden-layer experiments.",
      "I evaluated the final network on held-out data.",
    ],
    stack: [
      { name: "Python", use: "I wrote the experiments in Python." },
      { name: "TensorFlow & Keras", use: "I built and trained the network with Keras." },
      { name: "Scikit-learn", use: "I used it for the split, scaling and metrics." },
    ],
    note: "The dataset is small, and this is not a medical diagnostic system.",
  },

  "fitness-video-optimization": {
    style: {
      short: "Fitness Video", cover: "#a4405c", tint: "#f4b3c4",
      title: "Videos Load|in 3 Seconds,|Not 5 Minutes.",
      subtitle: "I moved a fitness app's 50+ workout videos to AWS S3 and cut loading time from five minutes to three seconds.",
    },
    back: {
      blurb: [
        "A React Native fitness app had more than 50 workout videos, but a single video could take around five minutes to load, which made the whole app feel broken.",
        "I traced the delay to the way the app stored and delivered its videos, moved them to AWS S3, and changed how the app requested them.",
      ],
      line: "Video loading dropped from about five minutes to about three seconds.",
      closing: "I solved this with traditional debugging and cloud infrastructure, before today's generative-AI tools.",
    },
    spreads: [
      {
        image: "/project-evidence/fitness/demo-poster.jpg",
        imageCaption: "This frame comes from a demo of the real fitness application.",
        stage: "Task",
        title: "Users were waiting minutes for a workout video to start.",
        text: "The app had more than 50 workout videos, and each one could take about five minutes to load. My task was to find out why and make the videos start quickly.",
      },
      {
        image: "/project-evidence/fitness/demo-poster.jpg",
        imageCaption: "The workout screens worked; the delay came from how the videos were delivered.",
        stage: "My work",
        title: "I found the bottleneck and moved the videos to the cloud.",
        points: [
          "I investigated the media path and found that the original cached video-loading setup caused the delay.",
          "I uploaded all of the workout videos to AWS S3.",
          "I updated the React Native and Node.js code so the app requested videos from S3.",
        ],
        tools: ["React Native", "Node.js", "AWS S3"],
      },
      {
        image: "/project-evidence/fitness/demo-poster.jpg",
        imageCaption: "After the change, videos start within a few seconds.",
        stage: "Results",
        title: "Videos now start almost immediately.",
        stats: [
          { value: "~5 min", label: "A video used to take about five minutes to load." },
          { value: "~3 sec", label: "A video now loads in about three seconds." },
          { value: "50+", label: "The change covers more than fifty workout videos." },
        ],
      },
      {
        image: "/project-evidence/fitness/demo-poster.jpg",
        imageCaption: "Users can start a workout right away.",
        stage: "Outcome",
        title: "The app finally feels fast.",
        text: "Users can start a workout almost immediately instead of waiting minutes. Loading times can still vary with network speed, device and video size.",
      },
    ],
    contribution: [
      "I diagnosed the media-loading bottleneck.",
      "I moved the video library to AWS S3.",
      "I updated the mobile app and backend to use the new video source.",
    ],
    stack: [
      { name: "React Native", use: "The mobile app is built with React Native." },
      { name: "Node.js", use: "The backend serves the app's data." },
      { name: "AWS S3", use: "S3 now stores and delivers the workout videos." },
    ],
    note: "The before and after times are the project measurements; real times vary by network and device.",
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
    return { image: e?.src ?? "", imageCaption: e?.caption ?? e?.label ?? "" };
  };
  return {
    style: { short, cover: "#171310", tint: "#c9beac", title: short.replace(/ /g, "|"), subtitle: project.problem },
    back: { blurb: [project.problem], line: `${project.headlineMetric} ${project.headlineLabel}.`, closing: project.limitations },
    spreads: [
      { ...pic(0), stage: "Task", title: "This is the problem the project set out to solve.", text: project.problem },
      { ...pic(1), stage: "My work", title: "This is what I built.", points: project.approach },
      { ...pic(2), stage: "Outcome", title: "This is what the project achieved.", text: project.caseStudySections?.at(-1)?.text ?? "" },
    ],
    contribution: [],
    stack: project.tech.map((name) => ({ name, use: "" })),
    note: project.limitations,
  };
}

export function getBookStyle(project: Project): BookStyle {
  return getBookContent(project).style;
}
