// Five hand-picked projects: two from IE Network Solutions (private repos, so no
// source links) and three personal builds. Facts here were checked against the
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
    summary:
      "Workforce intelligence suite: a React admin workspace, a Tauri desktop tracker for Windows and Linux, a browser extension and a Go API, built and released through Jenkins pipelines and Docker.",
    stack: ["React", "TypeScript", "Tauri", "Go", "Jenkins", "Docker"],
  },
  {
    title: "OKDE — Knowledge & Decision Engine",
    slug: "okde",
    origin: "personal",
    categories: ["AI & LLM", "Full-stack"],
    caseStudy: true,
    diagram: [
      "Queued ingestion",
      "RAG chat",
      "Workflows + agents",
      "Audit logs",
    ],
    outcome:
      "Document ingestion, RAG chat and workflows in one multi-tenant platform.",
    year: "2026",
    summary:
      "Multi-tenant B2B platform with queued document ingestion, RAG chat, workflows, role-based AI agents and audit logs, on a layered TypeScript architecture deployed to Azure Container Apps.",
    stack: ["TypeScript", "Express", "Next.js", "Prisma", "Azure"],
    githubLink: gh("RAG"),
  },
  {
    title: "Azure AI Solution",
    slug: "azure-ai-solution",
    origin: "personal",
    categories: ["AI & LLM", "DevOps"],
    caseStudy: true,
    diagram: ["GitHub Actions", "Docker", "FastAPI + Next.js"],
    outcome:
      "Azure AI capabilities with automated provisioning and deployments.",
    year: "2026",
    summary:
      "FastAPI + Next.js app covering nine Azure AI capabilities — Vision, Document Intelligence, Language, Speech, Search, OpenAI — provisioned, keyed and deployed automatically on every push.",
    stack: ["FastAPI", "Next.js", "Docker", "GitHub Actions"],
    githubLink: gh("azure-docker"),
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
      "Shop operations in English and Amharic, with staff access controls.",
    year: "2026",
    summary:
      "Telegram Mini App that runs a local shop in English and Amharic — products, stock, sales, expenses and profit, with a database-enforced stock ledger that keeps cost data away from staff.",
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    githubLink: gh("Buyer-App"),
    demoLink: "https://buyer-app-phi.vercel.app",
  },
];

export const featuredProjects = projects;
export const companyProjects = projects.filter((p) => p.origin === "company");
export const personalProjects = projects.filter((p) => p.origin === "personal");
export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
