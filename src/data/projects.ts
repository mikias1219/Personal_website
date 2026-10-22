// Project and case-study content, written from each repository's code (not only its README).
// No metrics, clients or numbers are invented here. Anything that still needs your input is
// marked with a TODO comment.
//
// Roles for IE Network Solutions work come from the CV.
// TODO: confirm `role` for the remaining projects (solo vs. team); they default to
// "Design & development".
// `learnings` are shown as "Key decisions & lessons".

export type Category = 'AI & Data' | 'Full-stack' | 'Mobile' | 'DevOps';
/** Which featured group a project belongs to on the home page */
export type Track = 'ai' | 'software';

export interface FlowStep {
  label: string;
  detail: string;
}

export interface CaseStudy {
  problem: string;
  approach: string;
  /** Rendered as an architecture / data-flow diagram */
  flow: FlowStep[];
  features: string[];
  stack: string[];
  result: string;
  learnings: string[];
}

export interface Project {
  slug: string;
  title: string;
  /** One line: what it is */
  summary: string;
  /** One line: what it achieves (used on featured cards) */
  outcome: string;
  /** One sentence: the problem it solves (used on featured cards) */
  brief?: string;
  year: string;
  role: string;
  category: Category;
  track: Track;
  tags: string[];
  githubLink: string;
  /** Extra repositories, e.g. an earlier version */
  moreLinks?: { label: string; href: string }[];
  demoLink?: string;
  /** Marked "Featured" in the archive; the home page order comes from `featuredProjects` below */
  flagship?: boolean;
  caseStudy: CaseStudy;
}

const gh = (repo: string) => `https://github.com/mikias1219/${repo}`;
const DEFAULT_ROLE = 'Design & development';

export const projects: Project[] = [
  /* ======================================================================
     AI engineering
     ====================================================================== */
  {
    slug: 'knowledge-hub-rag',
    title: 'Knowledge Hub',
    summary: 'Multi-tenant RAG SaaS: organisations upload documents and chat with answers grounded in them.',
    outcome: 'Tenant-isolated, cited answers with roles, per-plan usage quotas and an automated Azure deployment path.',
    brief: 'Generic chatbots can’t answer from an organisation’s own files — and on a shared platform, each tenant’s documents must stay strictly separate.',
    year: '2026',
    role: DEFAULT_ROLE,
    category: 'AI & Data',
    track: 'ai',
    tags: ['Django', 'Azure OpenAI', 'Azure AI Search', 'RAG', 'Bicep'],
    githubLink: gh('RAG--APP'),
    flagship: true,
    caseStudy: {
      problem:
        'Teams keep knowledge in scattered PDFs, Word files and notes. A generic chatbot cannot answer from those documents, and when several organisations share one platform, each one’s documents must stay strictly separate — while usage still has to be controlled per customer.',
      approach:
        'A Django application where users belong to organisations with owner, admin, editor or viewer roles, and upload files into workspaces. Text is extracted from PDF, DOCX, Markdown or plain text, split into token-aware chunks with tiktoken (500 tokens, 50 overlap), embedded with Azure OpenAI and indexed in Azure AI Search with organisation and collection fields. Each question runs a hybrid keyword + vector query restricted by an OData tenant filter, falls back to keyword search if vector retrieval is unavailable, and the chat model answers only from the retrieved passages, citing document names.',
      flow: [
        { label: 'Upload', detail: 'PDF, DOCX, Markdown or text into a workspace' },
        { label: 'Chunk & embed', detail: 'tiktoken chunks, Azure OpenAI embeddings' },
        { label: 'Index', detail: 'Azure AI Search with organisation + collection fields' },
        { label: 'Retrieve', detail: 'Hybrid search behind an OData tenant filter' },
        { label: 'Answer', detail: 'Context-only system prompt, cited sources' },
      ],
      features: [
        'Organisations with owner / admin / editor / viewer roles and per-workspace scoping',
        'Free, Pro and Enterprise plans with daily question, upload and token quotas recorded in a usage ledger',
        'Re-uploading a document replaces its previous chunks in the index',
        'Azure Search calls wrapped in retries with exponential backoff; keyword fallback when vectors fail',
        'Secrets from Azure Key Vault via DefaultAzureCredential',
        'Bicep template for the VM, network and security group; GitHub Actions for CI, staging and production with post-deploy smoke tests',
        'CI runs ruff, mypy, bandit, pip-audit and Django deployment checks',
      ],
      stack: ['Python', 'Django', 'Azure OpenAI', 'Azure AI Search', 'tiktoken', 'Azure Key Vault', 'Bicep', 'GitHub Actions', 'Nginx'],
      result:
        'A complete multi-tenant knowledge assistant — retrieval, access control, quotas and a scripted path from commit to a running Azure VM.',
      // TODO: add real usage or evaluation results if you have them (documents indexed, users, answer quality).
      learnings: [
        'Tenant isolation belongs in the search query filter and index schema, not only in application code.',
        'Hybrid retrieval catches exact names and codes that embeddings alone can miss.',
        'Quotas and a usage ledger are part of an AI product from day one, because every question has a cost.',
      ],
    },
  },
  {
    slug: 'banglachatpro',
    title: 'BanglaChatPro',
    summary: 'Multi-tenant AI customer care for Bangla-speaking e-commerce across chat, voice and social channels.',
    outcome: 'Bangla, English and Banglish support on five channels, with order lookups, PII masking and human handoff.',
    brief: 'Customer-care automation is built for English, leaving Bangla-speaking e-commerce customers without natural support by text or voice.',
    year: '2025',
    role: DEFAULT_ROLE,
    category: 'AI & Data',
    track: 'ai',
    tags: ['FastAPI', 'OpenAI', 'Whisper', 'React', 'Django'],
    githubLink: gh('bangla-ai-customer-care'),
    moreLinks: [{ label: 'Django v2', href: gh('new-bangla') }],
    flagship: true,
    caseStudy: {
      problem:
        'Bangla-speaking customers on e-commerce platforms ask about orders, products and payments in Bangla, English or a mix of both, by text and by phone. Businesses need one assistant that answers in Bangla on the channels customers already use, protects personal data, and hands over to a person when it is not enough.',
      approach:
        'A FastAPI backend with multi-tenant clients. Incoming messages from web chat, WhatsApp, Facebook/Instagram and voice (Twilio and a web IVR) go through one pipeline: speech is transcribed with OpenAI Whisper, intents and entities are classified with GPT-4o-mini (with a keyword fallback that detects Bangla, English or Banglish), a dialogue manager tracks state and resolves orders, products and payments from the client’s data, and replies return as Bangla text or text-to-speech. A later Django version (v2) added configurable AI agents per organisation, social-media auto-replies, Stripe subscriptions and client onboarding.',
      flow: [
        { label: 'Channels', detail: 'Web chat, WhatsApp, Messenger, Instagram, voice' },
        { label: 'Speech to text', detail: 'OpenAI Whisper for voice input' },
        { label: 'Understand', detail: 'GPT-4o-mini intents + entities, keyword fallback' },
        { label: 'Resolve', detail: 'Dialogue state, order / product / payment lookups' },
        { label: 'Respond', detail: 'Bangla text or TTS; handoff after 2 failures' },
      ],
      features: [
        'Automatic human handoff after two unsuccessful responses',
        'PII masking for phone numbers, emails, national IDs and card numbers in logs and stored conversations',
        'Satisfaction ratings, with admin review triggered by low scores',
        'Admin dashboard, client dashboard, shared inbox, test console and a customer chat + voice interface (React)',
        'Multi-tenant clients, JWT auth, Alembic migrations and Prometheus metrics',
        'v2 (Django): per-organisation AI agents with their own model and system prompt, Facebook / Instagram / WhatsApp webhooks, Stripe billing',
        'GitHub Actions deployment to a VPS with SSL and health checks',
      ],
      stack: ['Python', 'FastAPI', 'SQLAlchemy', 'OpenAI GPT-4o-mini', 'Whisper', 'React', 'TypeScript', 'Django', 'Twilio', 'Stripe', 'Redis'],
      result: 'A working multi-channel Bangla customer-care platform built around real e-commerce support flows, in two iterations.',
      learnings: [
        'A deterministic fallback (keyword intents) keeps the assistant useful when the model call fails.',
        'A simple, explicit escalation rule stops automation from frustrating customers.',
        'Masking personal data at the logging layer is easier to guarantee than remembering it at every call site.',
      ],
    },
  },
  {
    slug: 'okde-knowledge-engine',
    title: 'OKDE — Knowledge & Decision Engine',
    summary: 'Multi-tenant B2B platform: asynchronous document ingestion, RAG chat, workflows and role-based AI agents.',
    outcome: 'A clean-architecture TypeScript platform with queued ingestion, audit logs and CI/CD to Azure Container Apps.',
    brief: 'Operational knowledge and the decisions built on it are spread across tools, with no audit trail of what the AI was asked to do.',
    year: '2026',
    role: DEFAULT_ROLE,
    category: 'AI & Data',
    track: 'ai',
    tags: ['TypeScript', 'Express', 'Next.js', 'Prisma', 'Azure'],
    githubLink: gh('RAG'),
    flagship: true,
    caseStudy: {
      problem:
        'Organisations need to ask questions of their documents, automate the workflows built on those answers and keep a record of what ran — with each company’s and workspace’s data kept apart.',
      approach:
        'A TypeScript Express API organised by layer — API controllers, application services, domain ports and infrastructure adapters — wired through a dependency container. Uploads are stored in Azure Blob Storage and queued as ingestion jobs; a worker extracts text with Azure AI Document Intelligence, chunks and indexes it in Azure AI Search, and the RAG service answers with Azure OpenAI. Workflows record each run and step, every action is written to an audit log, and a Next.js App Router front end covers chat, documents, workflows, agents, audit and settings.',
      flow: [
        { label: 'Upload', detail: 'Next.js UI → Blob Storage' },
        { label: 'Queue', detail: 'Ingestion job + background worker' },
        { label: 'Extract & index', detail: 'Document Intelligence → AI Search' },
        { label: 'Answer & act', detail: 'RAG chat, workflow runs, agents' },
        { label: 'Audit', detail: 'Every run and step recorded' },
      ],
      features: [
        'Company → workspace → member data model in Prisma on PostgreSQL',
        'Ports-and-adapters backend: AI, search, storage and queue providers are replaceable',
        'Ingestion job states tracked in the database; worker processes the queue',
        'Workflow runs with per-step records, and an audit log',
        'Role-based agent definitions (data analyst, risk analyst, operations) with tool schemas',
        'CI/CD: lint, typecheck, backend tests and frontend build, then images pushed to ACR and deployed to Azure Container Apps',
        'Azure CLI provisioning scripts for Storage, PostgreSQL, AI Search and OpenAI',
      ],
      stack: ['TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Next.js', 'Azure OpenAI', 'Azure AI Search', 'Document Intelligence', 'Docker', 'GitHub Actions'],
      // TODO: state the current status (prototype, pilot, production) and any results.
      result: 'A layered foundation for a multi-tenant AI platform, with ingestion, auditability and delivery automation in place from the start.',
      learnings: [
        'Making ingestion asynchronous keeps uploads fast and lets slow extraction retry independently.',
        'A layered backend keeps AI integrations replaceable behind domain ports.',
        'Auditing AI-driven actions is a product feature for B2B customers, not an afterthought.',
      ],
    },
  },
  {
    slug: 'ai-job-matching',
    title: 'Selamnew AI Job Matching',
    summary: 'Serverless API that scores candidates against jobs with GPT-4o and explains every match.',
    outcome: 'Structured, reviewable shortlists — score, reasons, strengths, concerns and recommendations per match.',
    brief: 'Keyword filters miss good candidates and give hiring managers no reasoning to review when comparing many applicants against many openings.',
    year: '2025',
    role: 'AI & Data Scientist · IE Network Solutions',
    category: 'AI & Data',
    track: 'ai',
    tags: ['Python', 'Azure Functions', 'Azure OpenAI', 'Blob Storage'],
    githubLink: gh('selamnew-ai'),
    caseStudy: {
      problem:
        'Recruiters comparing many candidates against many openings need consistent, explainable shortlists. Keyword filters miss good candidates and give no reasoning a hiring manager can review.',
      approach:
        'An Azure Function App in Python that plugs into an existing recruitment backend through six REST endpoints. For each job–candidate pair, GPT-4o on Azure OpenAI is instructed to return strict JSON with a match score and lists of reasons, strengths, concerns and recommendations. Results are written to Azure Blob Storage under tenant / job / candidate paths, so summaries and details are read back without re-running the model.',
      flow: [
        { label: 'Recruitment backend', detail: 'Sends jobs and candidates' },
        { label: 'Azure Function', detail: 'Batch, single-job or single-pair matching' },
        { label: 'GPT-4o analysis', detail: 'Strict JSON: score, reasons, strengths, concerns' },
        { label: 'Blob Storage', detail: 'tenant / job / candidate.json' },
        { label: 'Read endpoints', detail: 'Job summaries and candidate detail' },
      ],
      features: [
        'Batch matching of multiple candidates against multiple jobs',
        'Trigger matching for a single job, or analyse one job–candidate pair',
        'Job-level summaries, per-job candidate lists and match detail endpoints',
        'Tenant-scoped storage paths; tenant and bearer-token headers read at the function boundary',
        'Sample data fallback so the endpoints can be demonstrated before storage is populated',
      ],
      stack: ['Python', 'Azure Functions', 'Azure OpenAI (GPT-4o)', 'Azure Blob Storage'],
      result: 'A matching service a recruitment platform can call through well-defined endpoints, returning reasoning recruiters can read instead of an opaque score.',
      // TODO: add any evaluation of match quality or usage you can share.
      learnings: [
        'Structured output (score + reasons) is far more useful to recruiters than a single number.',
        'Persisting results decouples slow model calls from fast dashboard reads.',
      ],
    },
  },
  {
    slug: 'azure-ai-solution',
    title: 'Azure AI Solution',
    summary: 'FastAPI + Next.js app covering nine Azure AI capabilities, provisioned and deployed on every push.',
    outcome: 'The pipeline creates missing Azure resources, fetches their keys and ships the container — no hand-copied secrets.',
    year: '2026',
    role: DEFAULT_ROLE,
    category: 'AI & Data',
    track: 'ai',
    tags: ['FastAPI', 'Next.js', 'Azure AI Services', 'Docker', 'GitHub Actions'],
    githubLink: gh('azure-docker'),
    caseStudy: {
      problem:
        'Working across many Azure AI services usually means creating each resource by hand and copying keys around. That is slow, error-prone and hard to reproduce.',
      approach:
        'A FastAPI backend with JWT authentication and a Next.js dashboard with a page per capability. A GitHub Actions workflow logs in to Azure, creates and assesses any missing resources, ensures the Azure OpenAI model deployments exist, fetches endpoints and keys, builds the image into Azure Container Registry and deploys it to Azure Container Instances with an Azure File Share for the database and uploads, then verifies container health.',
      flow: [
        { label: 'git push main', detail: 'Triggers the workflow' },
        { label: 'Provision', detail: 'Create / assess Azure AI resources and model deployments' },
        { label: 'Build', detail: 'Docker image pushed to ACR' },
        { label: 'Deploy', detail: 'Container Instances + File Share, health check' },
        { label: 'Use', detail: 'Vision, Document, Language, Speech, Search, OpenAI' },
      ],
      features: [
        'Image analysis and OCR with Azure AI Vision; document and information extraction',
        'Text analytics, question answering and a conversational language understanding (CLU) app',
        'Speech-to-text and text-to-speech',
        'Knowledge mining with Azure AI Search and RAG with Azure OpenAI',
        'Per-service usage panel in the dashboard',
        'Setup scripts for the CLU model and the question-answering knowledge base',
      ],
      stack: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'Azure AI Services', 'Azure OpenAI', 'Docker', 'Azure Container Registry', 'Azure Container Instances', 'GitHub Actions'],
      result: 'A reproducible, automatically deployed app spanning the Azure AI Engineer (AI-102) skill areas.',
      learnings: ['Letting the pipeline fetch secrets removes a whole class of configuration mistakes.'],
    },
  },
  {
    slug: 'employee-performance',
    title: 'Employee Performance Analytics',
    summary: 'Machine-learning dashboard that predicts weekly performance scores and segments employees.',
    outcome: 'An XGBoost regressor, KMeans segments and a Streamlit dashboard with automated email reports.',
    year: '2025',
    role: DEFAULT_ROLE,
    category: 'AI & Data',
    track: 'ai',
    tags: ['Python', 'XGBoost', 'scikit-learn', 'Streamlit'],
    githubLink: gh('employee-performance'),
    caseStudy: {
      problem:
        'HR teams track manager scores, engagement, KPIs, OKRs, attendance and reprimands in separate places, which makes it hard to see who is trending up or down and which groups need attention.',
      approach:
        'A pandas preprocessing step merges the sources into one feature table. An XGBoost regressor predicts the average weekly score from 13 features (tenure, manager, engagement, KPI and OKR scores, attendance, reprimands, score trend and stability), evaluated with RMSE, MAE and R² on a held-out split. KMeans on standardised features groups employees into four segments, and a Streamlit dashboard presents profiles, insights, rankings, teams and segments, with an automation page that emails reports.',
      flow: [
        { label: 'Merge', detail: 'HR sources into one feature table' },
        { label: 'Train', detail: 'XGBoost regressor, 80/20 split' },
        { label: 'Segment', detail: 'KMeans (k = 4) on scaled features' },
        { label: 'Dashboard', detail: 'Streamlit profiles, rankings, teams' },
        { label: 'Automate', detail: 'Email reports' },
      ],
      features: [
        'Feature engineering for score trend and performance stability',
        'Model metrics (RMSE, MAE, R²) saved alongside the model',
        'Four-cluster segmentation labelled from the centroids',
        'Six dashboard views and an email automation step',
      ],
      stack: ['Python', 'pandas', 'scikit-learn', 'XGBoost', 'Streamlit'],
      result: 'An end-to-end classical ML workflow, from raw HR data to a dashboard managers can use.',
      learnings: ['Features derived from the target (like score trend) need care to avoid leaking the answer into the model.'],
    },
  },

  /* ======================================================================
     Software engineering
     ====================================================================== */
  {
    slug: 'shop-manager',
    title: 'Shop Manager',
    summary: 'Telegram Mini App that runs a local shop: products, stock, sales, expenses, profit and reports — in English and Amharic.',
    outcome: 'Live on Vercel, with a database-enforced stock ledger, role-shaped data and CI that tests the database itself.',
    brief: 'Small shops in Ethiopia track stock and sales on paper or in chat threads, so stock counts drift and owners can’t trust their profit numbers.',
    year: '2026',
    role: DEFAULT_ROLE,
    category: 'Full-stack',
    track: 'software',
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Telegram'],
    githubLink: gh('Buyer-App'),
    demoLink: 'https://buyer-app-phi.vercel.app',
    flagship: true,
    caseStudy: {
      problem:
        'Small shop owners need stock and profit numbers they can trust, a fast way for staff to record sales at the counter, and a guarantee that cashiers never see cost or margin — without installing another app.',
      approach:
        'A React 19 + TypeScript Telegram Mini App on Supabase. Stock and profit are computed from an append-only ledger of stock movements; every write goes through a SECURITY DEFINER PostgreSQL function that re-checks the caller’s role and business rules, and read functions return role-shaped data so staff never receive cost fields. Telegram identity is exchanged for a session by an Edge Function. The project began as a used-electronics marketplace and was migrated to the shop model with a scripted, tested data cutover.',
      flow: [
        { label: 'Telegram', detail: 'Mini App + bot; auth via Edge Function' },
        { label: 'React app', detail: 'TanStack Query, i18n (en / am), offline states' },
        { label: 'RPC layer', detail: 'SECURITY DEFINER functions re-check role' },
        { label: 'Ledger', detail: 'Append-only stock movements → stock & profit' },
        { label: 'Reports', detail: 'Owner dashboard, daily summary via bot' },
      ],
      features: [
        'Owner, staff and no-access roles; staff can sell and see stock but never cost or profit',
        'Sell flow with cart, void and item returns; idempotent sales via a client reference',
        'Products, restock and stock adjustments, CSV import, customers and expenses',
        'Dashboard and reports for today, yesterday, this week and this month',
        'Edge Functions for Telegram auth, the bot webhook, scheduled notifications and storage',
        'pgTAP database tests for security, stock, sales and reports, plus a marketplace-to-shop upgrade test',
        'CI: lint, typecheck, unit (Vitest), database and Playwright e2e tests, a check that no privileged secret reaches the bundle, then migrations, Edge Functions and Vercel deploy',
      ],
      stack: ['TypeScript', 'React 19', 'TanStack Query', 'i18next', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Deno Edge Functions', 'Vitest', 'Playwright', 'Vercel'],
      result: 'A deployed Telegram app where the database enforces the rules that matter — who can see money, and how stock changes — and CI proves it on every push.',
      // TODO: add the number of shops, products or sales recorded if you can share them.
      learnings: [
        'Putting authorisation in database functions means a UI bug can’t leak cost data.',
        'An append-only ledger makes stock and profit auditable instead of a number that drifts.',
        'Testing the database (pgTAP) catches the bugs that matter most in a money-handling app.',
      ],
    },
  },
  {
    slug: 'astro-platform',
    title: 'Astrology Services Platform',
    summary: 'Full-stack platform for an astrology practice: bookings, calculators, reports, blog and an SEO-managed CMS.',
    outcome: 'A Next.js + FastAPI product with 200+ API endpoints, an admin console and a scripted production deployment.',
    brief: 'An astrology practice needed one site to publish content, take consultation bookings and offer free calculators — editable without a developer.',
    year: '2025',
    role: 'Full-stack development',
    category: 'Full-stack',
    track: 'software',
    tags: ['Next.js', 'FastAPI', 'SQLAlchemy', 'MySQL'],
    githubLink: gh('astro-site'),
    flagship: true,
    caseStudy: {
      problem:
        'The practice needed a public site that ranks in search, takes consultation bookings, offers interactive calculators and reports, and lets staff edit every page, FAQ, testimonial and SEO field themselves.',
      approach:
        'A Next.js 14 App Router front end with TypeScript and Tailwind, and a FastAPI backend with SQLAlchemy organised into 19 routers. Users register with email verification and password reset; admins manage blogs (Quill rich-text editor), pages, services, FAQs, testimonials, bookings and per-page SEO metadata from an admin console. Astrological calculations (kundli, matching, numerology, panchang, ascendant) are implemented in the backend. The database moved from SQLite in development to MySQL in production with a migration script.',
      flow: [
        { label: 'Next.js site', detail: 'Public pages, calculators, booking, blog' },
        { label: 'Admin console', detail: 'Blogs, pages, FAQs, services, SEO' },
        { label: 'FastAPI', detail: '19 routers, JWT auth, email service' },
        { label: 'SQLAlchemy', detail: 'SQLite in dev, MySQL in production' },
        { label: 'Deploy', detail: 'Scripted build and release to a VPS' },
      ],
      features: [
        'Appointment booking with an admin bookings view',
        'Calculators and reports: kundli, compatibility matching, numerology, panchang, horoscopes, ascendant',
        'Blog with a Quill rich-text editor, drafts, featured images and SEO metadata',
        'SEO admin for meta titles and descriptions, Open Graph, canonical URLs, keywords and schema markup',
        'Registration with email verification and password reset',
        'API, booking, CRUD and integration test scripts; database backup script',
      ],
      stack: ['TypeScript', 'Next.js 14', 'React', 'Tailwind CSS', 'Python', 'FastAPI', 'SQLAlchemy', 'MySQL', 'pytest'],
      // TODO: confirm the site is live at astroarupshastri.com, then add it as `demoLink`.
      result: 'A content-managed product the practice can run on its own, from search traffic to booked consultation.',
      learnings: [
        'Giving the client an SEO admin avoids a developer round-trip for every content change.',
        'Writing a migration script early made the move from SQLite to MySQL a routine step.',
      ],
    },
  },
  {
    slug: 'delala',
    title: 'Delala',
    summary: 'Rentals and domestic-workers marketplace for Addis Ababa: NestJS API and Flutter app in English and Amharic.',
    outcome: 'A monorepo with trust scoring, gated contact details, e2e tests and CI for both the API and the app.',
    brief: 'Finding rentals and trusted domestic workers in Addis Ababa still runs on word of mouth and brokers, with no way to know who to trust.',
    year: '2026',
    role: DEFAULT_ROLE,
    category: 'Mobile',
    track: 'software',
    tags: ['NestJS', 'Flutter', 'PostgreSQL', 'Redis'],
    githubLink: gh('Delala-app'),
    flagship: true,
    caseStudy: {
      problem:
        'Renters and households in Addis Ababa rely on brokers and word of mouth to find homes and domestic workers, with little way to judge who is reliable or to keep contact details from being scraped.',
      approach:
        'A monorepo with a NestJS API organised as one module per domain — auth, users, properties, viewings, jobs, workers, reviews and trust — and a Flutter app organised by feature with a shared HTTP client, secure token storage and English / Amharic localisation. A trust service scores each user from 0 to 100 (identity verification among the signals), maps the score to a badge and recalculates it at most once a day; a contact-access service decides when one user may see another’s contact details.',
      flow: [
        { label: 'Flutter app', detail: 'Feature folders, en / am, role selection' },
        { label: 'NestJS API', detail: 'One module per domain' },
        { label: 'Trust service', detail: 'Score 0–100 → trusted / verified / warning badges' },
        { label: 'PostgreSQL', detail: 'Primary data store' },
        { label: 'Redis', detail: 'Caching and sessions' },
      ],
      features: [
        'Phone-number login with OTP and role selection',
        'Property listings, viewing requests, jobs and worker profiles with reviews',
        'Trust scores with badges, refreshed every 24 hours',
        'Gated access to contact details',
        'One-command dev environment with seeding; debug and release APK builds',
        'CI: API build and e2e tests, Flutter analyze and format checks',
      ],
      stack: ['NestJS', 'TypeScript', 'TypeORM', 'Flutter', 'Dart', 'PostgreSQL', 'Redis', 'Docker', 'GitHub Actions'],
      result: 'A two-language monorepo with the trust and privacy rules a local marketplace needs, ready for features to be added consistently on both sides.',
      learnings: [
        'Trust is a product feature: a visible score changes how people behave on a marketplace.',
        'Written conventions in the README keep a two-language monorepo consistent.',
      ],
    },
  },
  {
    slug: 'realtime-chat-backend',
    title: 'Real-time Chat Backend',
    summary: 'Chat service with channels, direct messages, receipts and attachments over REST and Socket.IO.',
    outcome: 'A focused NestJS service that trusts an existing auth system and plugs into a Next.js front end.',
    brief: 'A collaboration product needed real-time messaging without duplicating its existing login system.',
    year: '2026',
    role: 'Software Developer · IE Network Solutions',
    category: 'Full-stack',
    track: 'software',
    tags: ['NestJS', 'Socket.IO', 'Prisma', 'PostgreSQL'],
    githubLink: gh('backend-chat'),
    flagship: true,
    caseStudy: {
      problem:
        'A collaboration product needed real-time messaging without duplicating its existing login system, and with a clear split between group channels and private conversations.',
      approach:
        'A NestJS service exposing REST controllers and a Socket.IO gateway that share the same room, message and upload services through a chat coordinator. Identity comes from the existing auth backend via bearer tokens; users are mirrored from token claims. Rooms, members, messages, attachments and per-user receipts are modelled in Prisma on PostgreSQL.',
      flow: [
        { label: 'Next.js front end', detail: 'REST + Socket.IO clients' },
        { label: 'Auth', detail: 'Bearer token from external auth backend' },
        { label: 'NestJS', detail: 'REST controllers and WebSocket gateway' },
        { label: 'Coordinator', detail: 'Rooms, messages, uploads' },
        { label: 'PostgreSQL', detail: 'Via Prisma' },
      ],
      features: [
        'Group channels with owner / member roles and membership management',
        'One-to-one direct conversations',
        'Socket events for join, leave, send, typing, delivered and read',
        'Replies, delivery and read receipts; file and image attachments',
        'Swagger docs with separate channel and direct-message routes',
        'End-to-end API test suite',
      ],
      stack: ['NestJS', 'TypeScript', 'Socket.IO', 'Prisma', 'PostgreSQL', 'Swagger', 'Jest'],
      result: 'A chat backend that integrates with an existing product’s auth instead of re-implementing it.',
      learnings: [
        'Sharing one service layer between REST and WebSocket entry points keeps behaviour identical on both.',
        'Keeping legacy routes working but hidden from docs allows a clean API without breaking clients.',
      ],
    },
  },
  {
    slug: 'lifeos-platform',
    title: 'LifeOS Platform',
    summary: 'Django REST platform for tasks, habits, finances and automations, with an AI “what should I do now?” coach.',
    outcome: 'Tested Django apps, OpenAPI docs and Bicep infrastructure, deployed to Azure App Service from CI.',
    year: '2026',
    role: DEFAULT_ROLE,
    category: 'Full-stack',
    track: 'software',
    tags: ['Django', 'DRF', 'Celery', 'Azure', 'Bicep'],
    githubLink: gh('activityhandler'),
    caseStudy: {
      problem: 'Tasks, habits and spending live in different apps, so it is hard to decide what to do next or see how a day connects to longer-term goals.',
      approach:
        'A modular Django REST Framework project with one app per area — users, productivity, habits, finance, automation and an AI coach — plus a server-rendered UI. The coach ranks overdue tasks, today’s tasks and habits not yet checked in, and can optionally phrase suggestions with an LLM. Infrastructure is described in Bicep (App Service, PostgreSQL Flexible Server, Redis, Key Vault), and GitHub Actions run CI, push the image to ACR and deploy to Azure App Service.',
      flow: [
        { label: 'Web UI / API', detail: 'DRF, JWT, OpenAPI docs' },
        { label: 'Domain apps', detail: 'Tasks, habits, finance, automation' },
        { label: 'AI coach', detail: 'Rule-based ranking + optional LLM' },
        { label: 'Data', detail: 'PostgreSQL, Redis, Celery' },
        { label: 'Azure', detail: 'Bicep → App Service via GitHub Actions' },
      ],
      features: [
        'JWT auth with refresh and password reset by email',
        'Tasks with Eisenhower priority, habits with streaks, expenses and budgets with monthly reports',
        'Reminders and automation rules',
        'OpenAPI / Swagger docs with drf-spectacular; health endpoint',
        'pytest suites for users, productivity, habits and finance',
      ],
      stack: ['Python', 'Django', 'Django REST Framework', 'SimpleJWT', 'Celery', 'PostgreSQL', 'Redis', 'Docker', 'Azure App Service', 'Bicep', 'GitHub Actions'],
      result: 'A tested, documented API with infrastructure as code and one-push deployment to Azure.',
      learnings: ['Describing infrastructure in Bicep makes a fresh Azure environment a command, not a checklist.'],
    },
  },
  {
    slug: 'cicd-devops-lab',
    title: 'CI/CD DevOps Lab',
    summary: 'Production-parity lab where Jenkins builds and deploys a Next.js front end, NestJS API and notification service.',
    outcome: 'Jenkins configured as code, with the same pipeline stages as production on a single VM.',
    year: '2026',
    // TODO: confirm this repo is fine to show publicly (it documents an internal lab setup).
    role: 'Software Developer · IE Network Solutions',
    category: 'DevOps',
    track: 'software',
    tags: ['Jenkins', 'Docker', 'Nginx', 'Vault'],
    githubLink: gh('DevOps'),
    caseStudy: {
      problem:
        'Testing changes to deployment pipelines directly against production is risky. The team needed a lab that behaves like production without its cost or blast radius.',
      approach:
        'A separate control-plane repository. Jenkins is configured as code (init scripts, a plugin list and job sync) and runs six Jenkinsfiles that mirror the production stage names, push images to a local registry and deploy with Docker Compose. Nginx routes the front end, API and notification service; secrets live in HashiCorp Vault, with scripts that keep it unsealed and apply environment values through a Jenkins job; GitHub webhooks trigger builds.',
      flow: [
        { label: 'GitHub webhook', detail: 'Push triggers Jenkins' },
        { label: 'Jenkins', detail: 'Configured as code; production stage names' },
        { label: 'Local registry', detail: 'Images built and tagged' },
        { label: 'Compose deploy', detail: 'Front end, API, notification service' },
        { label: 'Nginx + Vault', detail: 'Single entry point; managed secrets' },
      ],
      features: [
        'Pipeline parity with production stage names',
        'App repositories are never edited by the DevOps tooling',
        'Multi-environment setup with staging-parity scripts',
        'Vault-managed environment secrets applied by a Jenkins job',
        'Portainer for container management; verification and cleanup scripts',
      ],
      stack: ['Jenkins', 'Groovy', 'Docker', 'Docker Compose', 'Nginx', 'HashiCorp Vault', 'Portainer', 'Bash', 'Linux'],
      result: 'A safe place to change and verify deployment pipelines before they reach production.',
      learnings: ['Matching production stage names makes lab results directly transferable.'],
    },
  },
  {
    slug: 'life-os',
    title: 'Life OS Mobile',
    summary: 'Personal planning app — yearly goals, daily execution, journal and knowledge — with a NestJS API and Expo client.',
    outcome: 'A 20-module API and mobile app with Google Docs integration that never exposes refresh tokens.',
    year: '2026',
    role: DEFAULT_ROLE,
    category: 'Mobile',
    track: 'software',
    tags: ['NestJS', 'MongoDB', 'React Native', 'Expo'],
    githubLink: gh('plan-management'),
    caseStudy: {
      problem: 'Planning, daily execution and notes usually live in separate apps, so long-term goals drift away from what happens each day.',
      approach:
        'A NestJS API on MongoDB with JWT auth, organised into modules for life areas, personal years, goals, plans, today, tasks, habits, journal, reviews, finance, knowledge, documents, search and sync. An Expo / React Native client covers the dashboard, plan, today and knowledge-editor screens. Google Docs is connected through server-side OAuth so refresh tokens never leave the API.',
      flow: [
        { label: 'Expo app', detail: 'Dashboard, plan, today, knowledge' },
        { label: 'NestJS API', detail: 'JWT auth, 20+ modules' },
        { label: 'MongoDB', detail: 'Goals, tasks, journal, notes' },
        { label: 'Google Docs', detail: 'Server-side OAuth only' },
      ],
      features: ['Yearly planning, goals and daily views', 'Habits, journal, reviews and finance', 'Knowledge capture with search', 'Google Docs integration with server-held tokens'],
      stack: ['NestJS', 'TypeScript', 'MongoDB', 'JWT', 'Expo', 'React Native', 'Google OAuth', 'Docker'],
      result: 'A personal system tying yearly plans to daily work, with secure third-party integration.',
      learnings: ['Keeping OAuth tokens server-side simplifies mobile security.'],
    },
  },
  {
    slug: 'focusflow',
    title: 'FocusFlow',
    summary: 'Productivity app with focus sessions, tasks, history and analytics: NestJS API and Next.js front end.',
    outcome: 'A single-repo TypeScript app with charts, a shared environment file and an Azure deployment script.',
    year: '2026',
    role: DEFAULT_ROLE,
    category: 'Full-stack',
    track: 'software',
    tags: ['NestJS', 'Next.js', 'Prisma', 'Azure'],
    githubLink: gh('Focus-app'),
    caseStudy: {
      problem: 'Staying focused needs a tool that is quick to open and keeps tasks, sessions and progress in one place.',
      approach:
        'A NestJS API with Prisma on PostgreSQL and a Next.js App Router UI with Zustand state and Recharts analytics, installed from the repository root and configured with one shared environment file. A deploy script builds images into Azure Container Registry and updates Azure Container Apps.',
      flow: [
        { label: 'Next.js UI', detail: 'Focus, tasks, history, analytics' },
        { label: 'NestJS API', detail: 'Tasks, sessions, distractions' },
        { label: 'PostgreSQL', detail: 'Via Prisma' },
        { label: 'Azure', detail: 'ACR + Container Apps script' },
      ],
      features: ['Focus sessions, distraction logging and notifications', 'Task management with history and analytics charts', 'Shared root configuration for both apps', 'Prisma schema and migrations'],
      stack: ['NestJS', 'Next.js', 'TypeScript', 'Zustand', 'Recharts', 'Prisma', 'PostgreSQL', 'Azure Container Apps'],
      result: 'A compact full-stack TypeScript app with a simple setup and deployment story.',
      learnings: ['One env file for a monorepo reduces setup mistakes.'],
    },
  },
  {
    slug: 'music-management-app',
    title: 'Music Management App',
    summary: 'Full-stack app for managing songs and viewing statistics, built as a technical assessment.',
    outcome: 'Song management with statistics, Redux Toolkit + Saga state and a typed Express API.',
    year: '2024',
    role: DEFAULT_ROLE,
    category: 'Full-stack',
    track: 'software',
    tags: ['React', 'TypeScript', 'Redux Saga', 'MongoDB'],
    githubLink: gh('MusicApp'),
    demoLink: 'https://music-app-sepia-nine.vercel.app',
    caseStudy: {
      problem: 'A technical assessment for Addis Software: build a full-stack app to manage songs and show statistics about the collection.',
      approach: 'A React + TypeScript front end with Redux Toolkit and redux-saga for side effects and Emotion for styling, an Express API in TypeScript and MongoDB, run together with Docker Compose.',
      flow: [
        { label: 'React UI', detail: 'Song list, forms, statistics' },
        { label: 'Redux Saga', detail: 'Async API side effects' },
        { label: 'Express API', detail: 'CRUD and aggregation' },
        { label: 'MongoDB', detail: 'Songs collection' },
      ],
      features: ['Create, update and delete songs', 'Statistics by genre, artist and album', 'Search', 'Responsive design'],
      stack: ['React', 'TypeScript', 'Redux Toolkit', 'redux-saga', 'Emotion', 'Node.js', 'Express', 'MongoDB', 'Docker Compose'],
      result: 'A complete, deployed MERN application delivered for a hiring process.',
      learnings: ['Moving side effects into sagas keeps components simple and testable.'],
    },
  },
  {
    slug: 'student-study-portal',
    title: 'Student Study Portal',
    summary: 'Django portal giving students notes, homework, to-dos and research tools in one dashboard.',
    outcome: 'One place for a student’s notes, deadlines and quick lookups.',
    year: '2024',
    role: DEFAULT_ROLE,
    category: 'Full-stack',
    track: 'software',
    tags: ['Python', 'Django'],
    githubLink: gh('KM'),
    caseStudy: {
      problem: 'Students juggle notes, deadlines and research across many apps and websites.',
      approach: 'A Django web app with a single dashboard bringing together personal tools and quick lookups.',
      flow: [
        { label: 'Dashboard', detail: 'Django templates' },
        { label: 'Personal tools', detail: 'Notes, homework, to-dos' },
        { label: 'Lookups', detail: 'Dictionary, Wikipedia, YouTube, books' },
      ],
      features: [
        'Notes stored until deleted',
        'Homework with deadlines, sorted by priority',
        'Daily to-do lists',
        'YouTube, Wikipedia and dictionary search; book browsing',
      ],
      stack: ['Python', 'Django', 'SQLite'],
      result: 'A practical all-in-one study dashboard built during university.',
      learnings: ['Small integrations add up to a tool students actually open every day.'],
    },
  },
];

/** Home-page featured projects, in display order. */
export const featuredProjects: Record<Track, string[]> = {
  software: ['shop-manager', 'astro-platform', 'delala', 'realtime-chat-backend'],
  ai: ['knowledge-hub-rag', 'banglachatpro', 'okde-knowledge-engine'],
};

/** Old slugs that should keep working */
const aliases: Record<string, string> = { 'techmarket-et': 'shop-manager' };

export const getProject = (slug: string) => projects.find((p) => p.slug === (aliases[slug] ?? slug));
export const categories: Category[] = ['AI & Data', 'Full-stack', 'Mobile', 'DevOps'];
