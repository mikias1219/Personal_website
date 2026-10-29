// Project facts retained from the original portfolio. No inferred metrics or responsibilities.

export type Category = "AI & LLM" | "Full-stack" | "Mobile" | "DevOps";
export interface Project {
  slug: string;
  categories: Category[];
  featured?: boolean;
  archive?: boolean;
  caseStudy?: boolean;
  diagram?: string[];
  outcome?: string;
  role?: string;
  title: string;
  summary: string;
  kind?: string;
  year?: string;
  stack?: string[];
  githubLink?: string;
  demoLink?: string;
}

const gh = (repo: string) => `https://github.com/mikias1219/${repo}`;

export const projects: Project[] = [
  {
    title: "Selamnew Workspace",
    slug: "selamnew-workspace",
    role: "Built the HR AI Copilot and AI planning assistant.",
    categories: ["AI & LLM", "Full-stack"],
    archive: true,
    featured: true,
    caseStudy: true,
    diagram: ["Next.js interface", "NestJS API", "Azure AI + PostgreSQL"],
    outcome:
      "Natural-language answers over workforce data and help with daily, weekly and OKR plans.",

    kind: "AI Project",
    summary:
      "HR system with an AI Copilot that answers natural-language questions about workforce data — late, absent, leave and OKR status — plus an AI planning assistant for daily, weekly and OKR plans.",
    stack: ["NestJS", "Azure AI", "Next.js", "PostgreSQL"],
  },
  {
    title: "Selamnew Collaboration",
    slug: "selamnew-collaboration",
    categories: ["Full-stack", "Mobile"],
    archive: false,
    featured: false,
    caseStudy: false,

    kind: "Software Project",
    summary:
      "Team collaboration platform: NestJS backend, Next.js web app and React Native mobile app, with audio and video calling, role-based access control, search and @mentions.",
    stack: ["NestJS", "Next.js", "React Native", "PostgreSQL"],
  },
  {
    title: "Knowledge Hub",
    slug: "knowledge-hub",
    categories: ["AI & LLM", "DevOps"],
    archive: true,
    featured: true,
    caseStudy: true,
    diagram: [
      "Documents",
      "Azure AI Search",
      "Azure OpenAI",
      "Grounded answers",
    ],
    outcome: "Document-grounded chat with tenant isolation and usage quotas.",

    year: "2026",
    summary:
      "Multi-tenant RAG SaaS: organisations upload documents and chat with answers grounded in them — tenant isolation in the search index, usage quotas and an automated Azure deployment path.",
    stack: ["Django", "Azure OpenAI", "Azure AI Search", "Bicep"],
    githubLink: gh("RAG--APP"),
  },
  {
    title: "BanglaChatPro",
    slug: "banglachatpro",
    categories: ["AI & LLM"],
    archive: true,
    featured: true,
    caseStudy: true,
    diagram: [
      "Chat + social + voice",
      "FastAPI + OpenAI",
      "Order lookup",
      "Human handoff",
    ],
    outcome: "Bangla customer care across chat, social channels and voice.",

    year: "2025",
    summary:
      "Multi-tenant AI customer care for Bangla-speaking e-commerce across web chat, WhatsApp, Messenger, Instagram and voice — with order lookups, PII masking and human handoff.",
    stack: ["FastAPI", "OpenAI", "Whisper", "React"],
    githubLink: gh("bangla-ai-customer-care"),
  },
  {
    title: "OKDE — Knowledge & Decision Engine",
    slug: "okde",
    categories: ["AI & LLM", "Full-stack"],
    archive: true,
    featured: true,
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
    title: "Selamnew AI Job Matching",
    slug: "selamnew-ai-job-matching",
    categories: ["AI & LLM"],
    archive: false,
    featured: false,
    caseStudy: false,

    year: "2025",
    summary:
      "Serverless API that scores candidates against jobs with GPT-4o and explains every match — score, reasons, strengths, concerns and recommendations — persisted per tenant.",
    stack: ["Python", "Azure Functions", "Azure OpenAI"],
    githubLink: gh("selamnew-ai"),
  },
  {
    title: "Azure AI Solution",
    slug: "azure-ai-solution",
    categories: ["AI & LLM", "DevOps"],
    archive: true,
    featured: false,
    caseStudy: false,
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
    categories: ["Full-stack"],
    archive: true,
    featured: false,
    caseStudy: false,
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
  {
    title: "Astrology Services Platform",
    slug: "astrology-services-platform",
    categories: ["Full-stack"],
    archive: false,
    featured: false,
    caseStudy: false,

    year: "2025",
    summary:
      "Full-stack platform for an astrology practice: bookings, calculators, reports, blog and an SEO-managed CMS — 200+ API endpoints the practice can run itself.",
    stack: ["Next.js", "FastAPI", "SQLAlchemy", "MySQL"],
    githubLink: gh("astro-site"),
  },
  {
    title: "Delala",
    slug: "delala",
    categories: ["Full-stack", "Mobile"],
    archive: true,
    featured: false,
    caseStudy: false,
    diagram: ["Flutter app", "NestJS API", "PostgreSQL + Redis"],
    outcome: "Rentals and domestic-worker listings in English and Amharic.",

    year: "2026",
    summary:
      "Rentals and domestic-workers marketplace for Addis Ababa: NestJS API and Flutter app in English and Amharic, with trust scoring and gated contact details.",
    stack: ["NestJS", "Flutter", "PostgreSQL", "Redis"],
    githubLink: gh("Delala-app"),
  },
  {
    title: "Real-time Chat Backend",
    slug: "real-time-chat-backend",
    categories: ["Full-stack"],
    archive: false,
    featured: false,
    caseStudy: false,

    year: "2026",
    summary:
      "Chat service with channels, direct messages, receipts and attachments over REST and Socket.IO, plugging into an existing product’s auth system.",
    stack: ["NestJS", "Socket.IO", "Prisma", "PostgreSQL"],
    githubLink: gh("backend-chat"),
  },
  {
    title: "LifeOS Platform",
    slug: "lifeos-platform",
    categories: ["Full-stack"],
    archive: false,
    featured: false,
    caseStudy: false,

    year: "2026",
    summary:
      "Django REST platform for tasks, habits, finances and automations, with an AI coach — deployed to Azure App Service from CI with Bicep infrastructure.",
    stack: ["Django", "DRF", "Celery", "Azure", "Bicep"],
    githubLink: gh("activityhandler"),
  },
  {
    title: "CI/CD DevOps Lab",
    slug: "cicd-devops-lab",
    categories: ["DevOps"],
    archive: true,
    featured: false,
    caseStudy: false,
    diagram: ["Jenkins as code", "Vault secrets", "Docker + Nginx"],
    outcome: "A single-VM lab using the same pipeline stages as production.",

    year: "2026",
    summary:
      "Production-parity lab: Jenkins as code, Vault-managed secrets and the same pipeline stages as production on a single VM.",
    stack: ["Jenkins", "Docker", "Nginx", "Vault"],
    githubLink: gh("DevOps"),
  },
  {
    title: "Life OS Mobile",
    slug: "life-os-mobile",
    categories: ["Full-stack", "Mobile"],
    archive: false,
    featured: false,
    caseStudy: false,

    year: "2026",
    summary:
      "Personal planning app — yearly goals, daily execution, journal and knowledge — with a NestJS API, Expo client and secure Google Docs integration.",
    stack: ["NestJS", "MongoDB", "React Native", "Expo"],
    githubLink: gh("plan-management"),
  },
  {
    title: "FocusFlow",
    slug: "focusflow",
    categories: ["Full-stack"],
    archive: false,
    featured: false,
    caseStudy: false,

    year: "2026",
    summary:
      "Productivity app with focus sessions, tasks, history and analytics: NestJS API and Next.js front end deployed to Azure Container Apps.",
    stack: ["NestJS", "Next.js", "Prisma", "Azure"],
    githubLink: gh("Focus-app"),
  },
  {
    title: "Music Management App",
    slug: "music-management-app",
    categories: ["Full-stack"],
    archive: false,
    featured: false,
    caseStudy: false,

    year: "2024",
    summary:
      "Song management with statistics by genre, artist and album — a full-stack MERN assessment with Redux Saga state and a deployed live demo.",
    stack: ["React", "TypeScript", "Redux Saga", "MongoDB"],
    githubLink: gh("MusicApp"),
    demoLink: "https://music-app-sepia-nine.vercel.app",
  },
  {
    title: "Student Study Portal",
    slug: "student-study-portal",
    categories: ["Full-stack"],
    archive: false,
    featured: false,
    caseStudy: false,

    year: "2024",
    summary:
      "Django portal giving students notes, homework, to-dos and dictionary / Wikipedia / YouTube lookups in one dashboard.",
    stack: ["Python", "Django"],
    githubLink: gh("KM"),
  },
];

export const archiveProjects = projects.filter((p) => p.archive);
export const featuredProjects = [
  "selamnew-workspace",
  "knowledge-hub",
  "okde",
  "banglachatpro",
].map((slug) => projects.find((p) => p.slug === slug)!);
export const earlierProjects = projects.filter((p) => !p.archive);
export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
