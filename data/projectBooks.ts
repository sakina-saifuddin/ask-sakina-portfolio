import type { Project } from "@/data/portfolio";

/** The headings every project book walks through, in order. */
export const BOOK_STAGES = ["Task", "My work", "Results", "Outcome"] as const;
export type BookStage = (typeof BOOK_STAGES)[number];

/** One spread of a project book: a picture on the left page, one stage of the story on the right. */
export type BookSpread = {
  image: string;
  /** Short line under the picture saying what it shows. */
  imageCaption?: string;
  stage: BookStage;
  title: string;
  text?: string;
  points?: string[];
  /** A single headline number for this step… */
  stat?: { value: string; label: string };
  /** …or a grid of numbers. */
  stats?: { value: string; label: string }[];
  tools?: string[];
};

export type ProjectBookContent = {
  spreads: BookSpread[];
  /** Closing page: what I personally did, and what each technology was used for. */
  contribution: string[];
  stack: { name: string; use?: string }[];
  /** Optional small print at the end, e.g. what the screenshots do or don't show. */
  note?: string;
};

const CCV = "/project-evidence/cost-center-verification";
const PA = "/project-evidence/financial-reconciliation";

const books: Record<string, ProjectBookContent> = {
  "cost-center-verification": {
    spreads: [
      {
        image: `${CCV}/home.png`,
        imageCaption: "Home: each person sees what is waiting for them this month",
        stage: "Task",
        title: "Monthly cost center sign-off, without the email chains",
        text: "UH policy MAPP 05.04.02 requires every active cost center to be verified every month: a DBA checks it and the manager approves it. That ran on reports and emails. My task was to design and build one Power Apps app for the Cullen College of Engineering to run the whole cycle.",
        points: [
          "One review per manager, per month",
          "Send every \"No\" to the department's DBA",
          "Lock finished reviews for the audit record",
        ],
      },
      {
        image: `${CCV}/manager-review.png`,
        imageCaption: "Manager review: Yes or No for every cost center",
        stage: "My work",
        title: "Built the manager review and data model",
        text: "Each review is one SharePoint row per manager per month, with every cost center's answer stored as JSON. A No needs a comment, and Submit stays locked until every cost center has an answer.",
        tools: ["Power Apps", "Power Fx", "SharePoint", "JSON"],
        stat: { value: "100%", label: "answered before Submit unlocks" },
      },
      {
        image: `${CCV}/dba-resolve.png`,
        imageCaption: "DBA view: only the flagged cost centers, each with a fix note",
        stage: "My work",
        title: "Routed issues to the right DBA",
        text: "A department can have several DBAs, and a DBA can cover several departments. Any listed DBA can resolve the review. The DBA sees only the flagged items, and Resolve stays locked until each one has a fix note.",
        tools: ["Department → DBA table", "Delegable SharePoint filters"],
        stat: { value: "2 / 2", label: "flagged items fixed before Resolve unlocks (test data)" },
      },
      {
        image: `${CCV}/manager-complete.png`,
        imageCaption: "Completed review: read-only, with the DBA's fix next to each flagged item",
        stage: "My work",
        title: "Built the rules into the app",
        text: "If every answer is Yes, the review skips the DBA and completes immediately. After Submit or Resolve, the review is read-only. Status badges always show words, and each screen has a guided tour.",
        tools: ["Status workflow", "Role-based access", "Power BI links"],
        stat: { value: "4", label: "statuses, from Initiated to Verify/Certify Complete" },
      },
      {
        image: `${PA}/power-automate-submit-review.png`,
        imageCaption: "Power Automate: the CCV-SubmitReview flow",
        stage: "My work",
        title: "Submit is re-checked by a flow",
        text: "When a manager submits, a flow called from the app checks everything again: the caller must be the review's manager, every cost center must be answered, and every ID must be valid. It then sets the status, saves the review, and notifies the DBA if anything was marked No.",
        tools: ["Power Automate", "Power Apps trigger", "SharePoint"],
        stat: { value: "20", label: "steps checking every submitted review" },
      },
      {
        image: `${PA}/power-automate-dba-resolve.png`,
        imageCaption: "Power Automate: the CCV-DBAResolve flow",
        stage: "My work",
        title: "Resolve is saved by a flow too",
        text: "The DBA's Resolve goes through its own flow: it confirms who is calling, saves the fix notes to the review, replies to the app, and emails the manager that the review is complete.",
        tools: ["Power Automate", "SharePoint", "Outlook"],
        stat: { value: "10", label: "steps from Resolve to the manager's email" },
      },
      {
        image: `${PA}/power-automate-notifications.png`,
        imageCaption: "Power Automate: CCV – Notifications, routed by status",
        stage: "My work",
        title: "The right email for each status",
        text: "Whenever a review is created or changed, this flow picks the email by status: the manager when it opens, the DBA when issues are flagged, and the manager when it's complete. Each email links straight to the app and to Power BI.",
        tools: ["Power Automate", "SharePoint trigger", "Outlook"],
        stat: { value: "3", label: "email paths: manager, DBA, complete" },
      },
      {
        image: `${PA}/power-automate-weekly-reminders.png`,
        imageCaption: "Power Automate: CCV – Weekly Reminders",
        stage: "My work",
        title: "Weekly reminders for open reviews",
        text: "A scheduled flow finds every review that is still open and reminds whoever's turn it is. It skips anyone already notified in the last 6 days, so people aren't spammed.",
        tools: ["Power Automate", "Recurrence", "SharePoint"],
        stat: { value: "6 days", label: "minimum gap between reminders" },
      },
      {
        image: `${PA}/power-automate-monthly-refresh.png`,
        imageCaption: "Power Automate: CCV – Monthly Refresh",
        stage: "My work",
        title: "Monthly data refresh",
        text: "Each month a scheduled flow picks up the latest cost center and employee files, runs an Excel refresh script on each, and writes the rows to SharePoint in batches, so reviews are generated from current data.",
        tools: ["Power Automate", "Excel scripts", "SharePoint batch"],
        stat: { value: "2", label: "datasets refreshed: cost centers and employees" },
      },
      {
        image: `${CCV}/dba-resolved-list.png`,
        imageCaption: "DBA list: reviews fixed and sent back to managers",
        stage: "Results",
        title: "The full cycle works end to end",
        text: "Manager → DBA → complete runs end to end in the development app with test data, with the emails, reminders and monthly refresh automated.",
        stats: [
          { value: "2", label: "roles in one app" },
          { value: "4", label: "workflow statuses" },
          { value: "5", label: "Power Automate flows" },
          { value: "30", label: "day review window" },
        ],
      },
      {
        image: `${CCV}/my-reviews.png`,
        imageCaption: "My Reviews: pending and completed months at a glance",
        stage: "Outcome",
        title: "One place for the monthly sign-off",
        text: "Managers, DBAs and the college can see who has finished, what was flagged and how it was fixed, without chasing emails. Every finished review is locked as an audit record. Rollout to managers comes next.",
        stat: { value: "Audit-ready", label: "every finished review is locked and kept" },
      },
    ],
    contribution: [
      "Turned the project manager's confirmed business rules into app logic",
      "Designed the SharePoint data model and the four-status workflow",
      "Built the home, review list, manager and DBA screens, plus guided tours",
      "Built 5 Power Automate flows: submit, resolve, notifications, weekly reminders and the monthly refresh",
    ],
    stack: [
      { name: "Power Apps", use: "the app and every screen" },
      { name: "Power Fx", use: "validation, routing and locking rules" },
      { name: "SharePoint", use: "one review row per manager per month" },
      { name: "Power Automate", use: "5 flows: submit, resolve, emails, reminders, monthly refresh" },
      { name: "Power BI", use: "active cost centers and View details" },
      { name: "PeopleSoft · 1074", use: "the monthly source data" },
    ],
  },
};

const firstSentences = (text: string, n = 2) => (text.match(/[^.!?]+[.!?]+/g) ?? [text]).slice(0, n).join(" ").trim();

/** Book content for a project: hand-written when available, otherwise built from its case study. */
export function getBookContent(project: Project): ProjectBookContent {
  const custom = books[project.slug];
  if (custom) return custom;

  const evidence = project.evidence.filter((e): e is typeof e & { src: string } => e.type === "image" && !!e.src);
  const pic = (i: number) => {
    const e = evidence[i % Math.max(evidence.length, 1)];
    return { image: e?.src ?? "", imageCaption: e?.label };
  };
  const sections = project.caseStudySections ?? [];
  const resultSection = sections.find((s) => /result|outcome/i.test(s.title));

  // "My work": one spread per extra picture (max 3), with the approach steps shared between them.
  const workCount = Math.min(Math.max(evidence.length - 2, 1), 3);
  const perSpread = Math.ceil(project.approach.length / workCount);
  const work: BookSpread[] = Array.from({ length: workCount }, (_, i) => ({
    ...pic(i + 1),
    stage: "My work",
    title: workCount > 1 ? `What I built · ${i + 1} of ${workCount}` : "What I built",
    points: project.approach.slice(i * perSpread, (i + 1) * perSpread),
    tools: i === 0 ? project.tech.slice(0, 4) : undefined,
  }));

  return {
    spreads: [
      { ...pic(0), stage: "Task", title: "The task", text: project.problem },
      ...work,
      {
        ...pic(workCount + 1),
        stage: "Results",
        title: `${project.headlineMetric} ${project.headlineLabel}`,
        points: project.evaluation.slice(0, 4),
      },
      {
        ...pic(workCount + 2),
        stage: "Outcome",
        title: "What it achieved",
        text: firstSentences(resultSection?.text ?? project.summary),
        stats: project.outcomes.slice(0, 4),
      },
    ],
    contribution: [],
    stack: project.tech.map((name) => ({ name })),
    note: project.limitations,
  };
}
