// Four hand-picked projects: two from IE Network Solutions (private repos, so no
// source links) and two personal builds (AI agent and Telegram shop app), each with decisions checked against the code. Facts here were checked against the
// repositories (commit history, dependencies, tests, CI). Do not add unverified claims.

export type Category = "AI & LLM" | "Full-stack" | "Mobile" | "DevOps";
export type Origin = "company" | "personal";

export interface Project {
  slug: string;
  origin: Origin;
  /** Employer, for company projects. */
  org?: string;
  /** Source is private (company code), so no repository link is shown. */
  private?: boolean;
  categories: Category[];
  caseStudy: boolean;
  diagram?: string[];
  outcome?: string;
  role?: string;
  title: string;
  summary: string;
  year?: string;
  stack?: string[];
  githubLink?: string;
  demoLink?: string;
  /** Engineering decisions, each verified against the repository. */
  decisions?: { title: string; body: string }[];
  /** Real screenshots shown on the case-study page. Never include personal data. */
  screenshots?: { src: string; alt: string; caption: string; width: number; height: number }[];
  /** One-line pitch shown above the summary. */
  tagline?: string;
  /** Three proof points. Numbers must be counted from the repository, not estimated. */
  highlights?: { value: string; label: string }[];
  /** How the cover image is presented. */
  frame?: "browser" | "plain";
  /** Optional real screenshot; when set, replaces the generated diagram visual. */
  image?: string;
}

const gh = (repo: string) => `https://github.com/mikias1219/${repo}`;
const ORG = "IE Network Solutions";

export const projects: Project[] = [
  {
    title: "Selamnew Collaboration",
    slug: "selamnew-collaboration",
    origin: "company",
    org: ORG,
    private: true,
    categories: ["Full-stack"],
    caseStudy: true,
    diagram: [
      "Next.js web app",
      "NestJS API + Socket.IO",
      "PostgreSQL · Redis · LiveKit",
    ],
    role: "Main contributor to the NestJS API and the Next.js web app.",
    outcome:
      "Real-time chat, calls and collaborative documents in one workspace.",
    year: "2026",
    tagline: "Chat, calls and documents in one team workspace.",
    highlights: [
      { value: "Real-time", label: "chat in spaces and channels" },
      { value: "Audio + video", label: "calls with guest join links" },
      { value: "Co-editing", label: "rich text with @mentions" },
    ],
    summary:
      "Team collaboration platform: real-time chat in spaces and channels, audio and video calls with guest join links, collaborative rich-text editing with @mentions, search and role-based access control.",
    stack: ["NestJS", "Next.js", "PostgreSQL", "Socket.IO", "LiveKit"],
  },
  {
    title: "Workforce Intelligence",
    slug: "workforce-intelligence",
    origin: "company",
    org: ORG,
    private: true,
    categories: ["Full-stack", "DevOps"],
    caseStudy: true,
    diagram: [
      "Web · desktop · extension",
      "Go API",
      "Jenkins + Docker delivery",
    ],
    role: "Main contributor to the web workspace, desktop tracker and browser extension, and a major contributor to the Go API.",
    outcome:
      "Web, desktop and browser clients on one API, with automated build and release pipelines.",
    year: "2026",
    tagline: "One API behind a web workspace, a desktop tracker and a browser extension.",
    frame: "browser",
    highlights: [
      { value: "3 clients", label: "web, desktop (Tauri), browser extension" },
      { value: "1 Go API", label: "serving all of them" },
      { value: "CI/CD", label: "Jenkins + Docker build and release" },
    ],
    summary:
      "Workforce intelligence suite: a React admin workspace, a Tauri desktop tracker for Windows and Linux, a browser extension and a Go API, built and released through Jenkins pipelines and Docker.",
    image: "/work/workforce-intelligence/cover.webp",
    screenshots: [
      { src: "/work/workforce-intelligence/dashboard.webp", alt: "Workforce Intelligence team overview dashboard with productivity trends and who is online", caption: "Team overview: time recorded, computers online and productivity trends.", width: 1440, height: 900 },
      { src: "/work/workforce-intelligence/productivity.webp", alt: "Workforce Intelligence productivity report with score, coverage and attendance tabs", caption: "Productivity report with departments, attendance and policy views.", width: 1440, height: 900 },
      { src: "/work/workforce-intelligence/settings.webp", alt: "Workforce Intelligence capture and privacy settings", caption: "Capture and privacy policy, with a privacy mode that captures only the active window.", width: 1440, height: 900 },
    ],
    stack: ["React", "TypeScript", "Tauri", "Go", "Jenkins", "Docker"],
  },
  {
    title: "Checkpoint — Approval-first AI Chief of Staff",
    slug: "checkpoint-ai-agent",
    origin: "personal",
    categories: ["AI & LLM", "Full-stack"],
    caseStudy: true,
    diagram: [
      "Next.js dashboard",
      "FastAPI + agent loop",
      "Durable approvals",
      "Gmail · Calendar · Telegram · MCP",
    ],
    outcome:
      "A working agent that plans and drafts on its own, while anything outbound waits for one-tap approval. Public demo, 38 offline eval scenarios and CI included.",
    year: "2026",
    tagline: "An AI chief of staff that plans and drafts alone, and asks before it acts.",
    frame: "browser",
    highlights: [
      { value: "38", label: "offline eval scenarios in CI" },
      { value: "67", label: "backend test files" },
      { value: "32", label: "written architecture decisions" },
    ],
    summary:
      "Personal chief-of-staff agent built around safety: risky tools pause for durable approval, external email and web content is treated as untrusted, and every run is logged with a trace. Includes goals and plans, routines, memory, Google and Telegram integrations, MCP tools, and an isolated demo workspace on its own database.",
    decisions: [
      {
        title: "Risky tools always wait for a human",
        body: "Tools are classed as read, prepare, execute or destructive. Execute and destructive tools pause the run for approval, and deletes are soft deletes so nothing is lost by mistake.",
      },
      {
        title: "Approvals survive restarts and run once",
        body: "Approvals are stored with a SHA-256 hash of their arguments and a 24-hour expiry. Approving is a compare-and-set update, so repeated or concurrent approvals run the tool exactly once. Editing an approval supersedes the old one and records both hashes in the audit log.",
      },
      {
        title: "Outside content is never an instruction",
        body: "External email, Drive and web content is labelled untrusted, and only the dashboard and private Telegram chats may decide approvals.",
      },
      {
        title: "Evals run offline in CI",
        body: "Agent scenarios are JSON files run against a scripted fake provider, so CI stays fast and needs no API key. Each run carries a trace id, with a manual workflow for live-model evals.",
      },
      {
        title: "A public demo that cannot touch real data",
        body: "The demo runs on its own database with simulated outbound actions, per-IP rate limits and a nightly reset.",
      },
    ],
    image: "/work/checkpoint-ai-agent/cover.webp",
    screenshots: [
      { src: "/work/checkpoint-ai-agent/demo.webp", alt: "Public demo workspace of the agent with a chat box, seeded tasks and memories", caption: "The public demo workspace (shown under its working name, AURA). Outbound actions are simulated and run on a separate database.", width: 1280, height: 873 },
    ],
    stack: ["Python", "FastAPI", "Next.js", "TypeScript", "PostgreSQL", "MCP"],
    githubLink: gh("AI-Agent"),
    demoLink: "https://personal-ai-agent-lyart.vercel.app/demo",
  },
  {
    title: "Shop Manager",
    slug: "shop-manager",
    origin: "personal",
    categories: ["Full-stack"],
    caseStudy: true,
    diagram: [
      "Telegram Mini App",
      "React + TypeScript",
      "PostgreSQL stock ledger",
    ],
    outcome:
      "Shop operations in English and Amharic, with staff access controls and business rules enforced in the database. SQL test suites and CI-gated deploys included.",
    year: "2026",
    tagline: "Run a whole shop from Telegram, in English and Amharic.",
    frame: "plain",
    highlights: [
      { value: "17", label: "database migrations" },
      { value: "5", label: "SQL test suites: security, stock, sales, reports, customers" },
      { value: "EN + አማ", label: "two languages, owner and staff roles" },
    ],
    summary:
      "Telegram Mini App that runs a local shop in English and Amharic: products, stock, sales, expenses and profit. A database-enforced stock ledger keeps cost data away from staff. The production app is private and opens only from the shop's Telegram bot, so the screenshots use its built-in sample-data mode.",
    decisions: [
      {
        title: "Business rules live in the database",
        body: "Tables are closed to the client. Every action goes through Postgres functions that re-check the caller's role, so a modified client cannot bypass the rules.",
      },
      {
        title: "Stock is a ledger, not a number",
        body: "Every change is a stock movement, and a test asserts that each product's cached stock equals the sum of its movements. Movements and sale lines cannot be updated or deleted.",
      },
      {
        title: "Cost and profit never reach staff",
        body: "Sale and product responses add cost and profit only when the caller is the owner. Staff also cannot sell below cost unless the owner allows it.",
      },
      {
        title: "Safe under retries and concurrency",
        body: "Each sale carries a client reference, so a retried request returns the original sale. Products are locked in id order, so two cashiers cannot sell the last unit twice and deadlocks are avoided. Prices always come from the product, never the client.",
      },
      {
        title: "Closing a permissions gap",
        body: "Platform default privileges exposed internal helper functions through the API. A migration now revokes execute on every function and re-applies the grants, and every later migration is written to follow that rule.",
      },
      {
        title: "Tested at every layer",
        body: "CI runs lint, type checks, unit tests, Edge Function checks, SQL suites for security, stock, sales and reports, and Playwright end-to-end tests. It also checks that no privileged secret reaches the browser bundle. Production deploys only after these pass.",
      },
    ],
    image: "/work/shop-manager/cover.webp",
    screenshots: [
      { src: "/work/shop-manager/dashboard.webp", alt: "Shop Manager owner dashboard with monthly sales, profit, stock worth and best sellers", caption: "Owner dashboard: money from sales, profit after expenses, stock worth and best sellers. Staff never see cost or profit.", width: 560, height: 1212 },
      { src: "/work/shop-manager/sell.webp", alt: "Shop Manager sell screen with two items in the cart", caption: "Selling screen: tap products to build a sale.", width: 560, height: 1212 },
      { src: "/work/shop-manager/sales.webp", alt: "Shop Manager sales history grouped by day with profit per sale", caption: "Sales history by day, with cashier, payment method and profit per sale.", width: 560, height: 1212 },
      { src: "/work/shop-manager/receipt.webp", alt: "Shop Manager receipt with items, total, profit, return and cancel actions", caption: "Receipt detail with share, return items and cancel sale. All screens use sample data.", width: 560, height: 1212 },
    ],
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Edge Functions"],
    githubLink: gh("Buyer-App"),
  },
];

export const featuredProjects = projects;
export const companyProjects = projects.filter((p) => p.origin === "company");
export const personalProjects = projects.filter((p) => p.origin === "personal");
export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
