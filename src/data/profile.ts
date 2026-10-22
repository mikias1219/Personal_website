import type { IconType } from 'react-icons';
import {
  FiCode, FiCloud, FiCpu, FiDatabase, FiGitBranch, FiGithub, FiLayout, FiLinkedin, FiMail, FiServer, FiTool,
} from 'react-icons/fi';

export const site = {
  name: 'Mikias Abate',
  role: 'Software Developer & AI Engineer',
  url: 'https://mikiasabatesite.vercel.app',
  location: 'Addis Ababa, Ethiopia',
  timeZone: 'Africa/Addis_Ababa',
  utcOffset: 'UTC+3',
  email: 'mikiyasabate003@gmail.com',
  availability: 'Open to full-time roles and contracts',
  description:
    'Mikias Abate is a software developer and AI engineer building full-stack products and AI-powered systems — RAG on Azure OpenAI, LLM-driven matching, and APIs with Python, Django, FastAPI, NestJS and Next.js. Azure AI-102 and DP-100 certified.',
  statement:
    'Software developer and AI engineer building full-stack products and practical AI systems with Python, TypeScript and Microsoft Azure.',
};

export interface Social {
  label: string;
  handle: string;
  href: string;
  icon: IconType;
}

export const socials: Social[] = [
  { label: 'GitHub', handle: 'mikias1219', href: 'https://github.com/mikias1219', icon: FiGithub },
  { label: 'LinkedIn', handle: 'mikiasabate', href: 'https://www.linkedin.com/in/mikiasabate', icon: FiLinkedin },
  { label: 'Email', handle: site.email, href: `mailto:${site.email}`, icon: FiMail },
];

export const getSocial = (label: Social['label']) => socials.find((s) => s.label === label)!;

/* --------------------------------------------------------------------------
   Positioning
   Tailor the site to an application by sending a link with ?for=<key>,
   e.g. https://mikiasabatesite.vercel.app/?for=backend
   Each variant changes the hero headline, intro, which featured group comes
   first and the order of the skill groups. Everything else stays the same.
   The featured projects themselves are set in `featuredProjects` in projects.ts.
   -------------------------------------------------------------------------- */

export interface Positioning {
  /** Short label for the hero eyebrow */
  focus: string;
  /** Rendered as the H1; the part inside [brackets] is highlighted */
  headline: string;
  lead: string;
  /** Which featured group comes first in the Projects section */
  projectsFirst: 'software' | 'ai';
  /** Skill group ids from `skills` below, in display order */
  skillOrder: string[];
}

export const positioning: Record<'default' | 'ai' | 'backend' | 'fullstack', Positioning> = {
  default: {
    focus: 'Software Developer & AI Engineer',
    headline: 'I build software that puts [AI to work.]',
    lead:
      'I design and ship the APIs, data models and interfaces that turn AI capabilities into products people use — from a multi-tenant RAG platform on Azure OpenAI to a live Telegram shop app whose database enforces who can see money. 2+ years building with Python, TypeScript and Microsoft Azure.',
    projectsFirst: 'software',
    skillOrder: ['ai', 'backend', 'languages', 'frontend', 'data', 'cloud', 'devops', 'practices'],
  },
  ai: {
    focus: 'AI Engineer · LLM Applications',
    headline: 'I engineer [LLM applications] that hold up in production.',
    lead:
      'Retrieval-augmented generation, structured GPT-4o analysis, multi-channel conversational AI and Azure AI services — built into real backends with tenant isolation, usage quotas and repeatable deployment. Microsoft Certified Azure AI Engineer (AI-102) and Data Scientist (DP-100).',
    projectsFirst: 'ai',
    skillOrder: ['ai', 'cloud', 'backend', 'data', 'languages', 'devops', 'frontend', 'practices'],
  },
  backend: {
    focus: 'Backend Engineer · APIs & Systems',
    headline: 'I build [backend systems] that are clear, typed and deployable.',
    lead:
      'REST and real-time APIs with NestJS, Django and FastAPI; PostgreSQL data models with Prisma and database-level rules; Docker, CI/CD and Azure Bicep so every change ships the same way — with AI services integrated where they add value.',
    projectsFirst: 'software',
    skillOrder: ['backend', 'data', 'devops', 'cloud', 'languages', 'ai', 'frontend', 'practices'],
  },
  fullstack: {
    focus: 'Full-Stack Developer',
    headline: 'I ship [full-stack products,] from data model to interface.',
    lead:
      'Next.js and React front ends, NestJS, Django and FastAPI APIs, PostgreSQL underneath, and mobile clients in Flutter and React Native — including a live Telegram Mini App and a content-managed platform with 200+ API endpoints.',
    projectsFirst: 'software',
    skillOrder: ['frontend', 'backend', 'languages', 'data', 'devops', 'ai', 'cloud', 'practices'],
  },
};

export type PositioningKey = keyof typeof positioning;

/* --------------------------------------------------------------------------
   About
   -------------------------------------------------------------------------- */

export const about = {
  paragraphs: [
    'I’m a software developer and AI engineer at IE Network Solutions in Addis Ababa. I build full-stack applications and the AI features inside them — the retrieval pipelines, model calls and APIs, and the interfaces that make them useful to the people who rely on them.',
    'I joined IE Network Solutions as an AI & data scientist, building CV extraction, candidate scoring and job-matching features on Microsoft Azure AI services. Since January 2026 I’ve worked as a software developer on internal business applications with NestJS, Next.js, Python, PostgreSQL and Docker. Before that I built full-stack web applications for Atlas Group as a freelancer, and full-stack apps and backend services for a private company.',
    'My approach is to treat AI as one component of a system, not the whole product. Model output gets structure before people are asked to trust it; retrieval respects tenant boundaries in the index itself; and deployment is scripted so it can be repeated. I hold a degree in Information Systems from Addis Ababa University, which shaped how I think about software as part of how an organisation works.',
  ],
  facts: [
    { label: 'Currently', value: 'Software Developer, IE Network Solutions' },
    { label: 'Based in', value: 'Addis Ababa, Ethiopia (UTC+3)' },
    { label: 'Focus', value: 'AI-powered applications, backend APIs, full-stack products' },
    { label: 'Open to', value: 'Full-time roles and contracts' },
  ],
  strengths: [
    {
      title: 'AI built into the product',
      text: 'RAG, structured LLM output and Azure AI services wired into real APIs, auth and data stores — not left as notebooks.',
    },
    {
      title: 'Backend and API design',
      text: 'Layered NestJS, Django and FastAPI services with clear data models, rules enforced in the database and documented endpoints.',
    },
    {
      title: 'End-to-end delivery',
      text: 'From database schema to Next.js, Flutter or React Native client, shipped with Docker and CI/CD pipelines.',
    },
  ],
};

/** Only facts that can be checked against the CV, certificates or public repositories. */
export const highlights = [
  'Earned two Microsoft certifications: Azure AI Engineer Associate (AI-102) and Azure Data Scientist Associate (DP-100).',
  'Built AI recruitment features at IE Network Solutions — CV extraction, candidate scoring and GPT-4o job matching.',
  'Built BanglaChatPro, a multi-channel Bangla customer-care platform with speech, PII masking and human handoff, in two iterations.',
  'Designed a multi-tenant RAG platform on Azure OpenAI and Azure AI Search with tenant isolation in the index schema.',
  'Shipped Shop Manager, a live Telegram Mini App with a database-enforced stock ledger and CI that runs unit, database and end-to-end tests.',
  'Built a Next.js + FastAPI platform for an astrology practice with 200+ API endpoints, bookings and an SEO-managed CMS.',
  'Developed 5 full-stack applications and 3 backend services with Python and modern web technologies in a previous role.',
];

/* --------------------------------------------------------------------------
   Applied AI — each capability links to the projects that demonstrate it
   -------------------------------------------------------------------------- */

export interface AiCapability {
  title: string;
  text: string;
  /** Project slugs that show this capability */
  evidence: string[];
}

export const aiCapabilities: AiCapability[] = [
  {
    title: 'Retrieval-augmented generation',
    text: 'Token-aware chunking, Azure OpenAI embeddings and hybrid keyword + vector search on Azure AI Search behind a tenant filter; asynchronous ingestion with Document Intelligence.',
    evidence: ['knowledge-hub-rag', 'okde-knowledge-engine'],
  },
  {
    title: 'Structured LLM analysis',
    text: 'GPT-4o returning strict JSON — scores, reasons, strengths, concerns and recommendations — persisted so dashboards read results without re-running the model.',
    evidence: ['ai-job-matching'],
  },
  {
    title: 'Conversational AI & speech',
    text: 'Whisper speech-to-text, GPT-4o-mini intent and entity extraction with a keyword fallback, dialogue state, text-to-speech and a two-strike human-handoff rule across five channels.',
    evidence: ['banglachatpro'],
  },
  {
    title: 'Multi-tenant AI SaaS',
    text: 'Tenant-scoped retrieval and storage, role-based access, per-plan daily quotas and a usage ledger around every model call; configurable AI agents per organisation.',
    evidence: ['knowledge-hub-rag', 'banglachatpro', 'okde-knowledge-engine'],
  },
  {
    title: 'Azure AI services, deployed reproducibly',
    text: 'Vision, Document Intelligence, Language, CLU, Speech and Azure OpenAI in one app whose pipeline provisions resources, fetches keys and ships the container.',
    evidence: ['azure-ai-solution'],
  },
  {
    title: 'Machine learning workflows',
    text: 'Feature engineering, XGBoost regression with RMSE / MAE / R² evaluation and KMeans segmentation, served through a Streamlit dashboard.',
    evidence: ['employee-performance'],
  },
];

/** The RAG pipeline drawn in the Applied AI section and hero (from Knowledge Hub). */
export const ragPipeline = [
  { label: 'Ingest', detail: 'PDF, DOCX, Markdown' },
  { label: 'Embed', detail: 'Azure OpenAI' },
  { label: 'Index', detail: 'AI Search, tenant fields' },
  { label: 'Retrieve', detail: 'Hybrid, tenant-scoped' },
  { label: 'Answer', detail: 'Grounded in sources' },
];

/* --------------------------------------------------------------------------
   Skills — confirmed by the CV and by the repositories behind each project
   -------------------------------------------------------------------------- */

export interface SkillGroup {
  id: string;
  title: string;
  icon: IconType;
  items: string[];
}

/** Shown first in the Skills section: what I reach for day to day. */
export const coreStack = ['Python', 'TypeScript', 'FastAPI', 'Django', 'NestJS', 'React', 'Next.js', 'PostgreSQL', 'Azure OpenAI', 'Docker'];

export const skills: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    icon: FiCode,
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Dart'],
  },
  {
    id: 'frontend',
    title: 'Frontend & Mobile',
    icon: FiLayout,
    items: ['React', 'Next.js', 'TanStack Query', 'Redux Toolkit', 'Zustand', 'Tailwind CSS', 'Flutter', 'React Native / Expo', 'Telegram Mini Apps'],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    icon: FiServer,
    items: ['FastAPI', 'Django REST Framework', 'NestJS', 'Node.js / Express', 'REST APIs', 'Socket.IO', 'Celery', 'Azure Functions', 'Supabase Edge Functions', 'Swagger / OpenAPI'],
  },
  {
    id: 'ai',
    title: 'AI, ML & LLM Applications',
    icon: FiCpu,
    items: [
      'Azure OpenAI (GPT-4o)', 'RAG', 'Embeddings & hybrid search', 'Structured LLM output', 'AI agents',
      'Whisper speech-to-text', 'Azure Machine Learning', 'scikit-learn', 'XGBoost', 'pandas', 'Streamlit',
    ],
  },
  {
    id: 'data',
    title: 'Data & Databases',
    icon: FiDatabase,
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase', 'Prisma', 'SQLAlchemy', 'TypeORM', 'Azure AI Search', 'Azure Blob Storage'],
  },
  {
    id: 'cloud',
    title: 'Cloud & AI Platforms',
    icon: FiCloud,
    items: [
      'Microsoft Azure', 'Azure AI Services', 'Azure AI Document Intelligence', 'Azure AI Vision & Speech',
      'Azure Container Apps / Instances / Registry', 'Azure App Service', 'Azure Key Vault', 'Vercel',
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Deployment',
    icon: FiGitBranch,
    items: ['Docker & Compose', 'GitHub Actions', 'Jenkins', 'CI/CD', 'Azure Bicep', 'Nginx', 'HashiCorp Vault', 'Linux'],
  },
  {
    id: 'practices',
    title: 'Tools & Practices',
    icon: FiTool,
    items: ['Git & GitHub', 'Layered / ports-and-adapters architecture', 'Multi-tenant design', 'JWT, OAuth, RBAC & RLS', 'pytest, Jest, Vitest, Playwright, pgTAP', 'API documentation'],
  },
];
