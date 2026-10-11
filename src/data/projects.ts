// Project and case-study content, written from each repository's README.
// No metrics, clients or numbers are invented here. Anything that still needs
// your input is marked with a TODO comment.
//
// Roles for IE Network Solutions work come from the CV.
// TODO: confirm `role` for the remaining projects (solo vs. team); they default to
// "Design & development".

export type Category = 'AI & Data' | 'Full-stack' | 'Mobile' | 'DevOps';

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
  /** One line: what it achieves (used on flagship cards) */
  outcome: string;
  year: string;
  role: string;
  category: Category;
  tags: string[];
  githubLink: string;
  demoLink?: string;
  flagship?: boolean;
  caseStudy: CaseStudy;
}

const gh = (repo: string) => `https://github.com/mikias1219/${repo}`;
const DEFAULT_ROLE = 'Design & development';

export const projects: Project[] = [
  {
    slug: 'knowledge-hub-rag',
    title: 'Knowledge Hub',
    summary: 'Multi-tenant RAG platform: upload an organisation’s documents, then chat with answers grounded in them.',
    outcome: 'Grounded answers from each organisation’s own documents, isolated per tenant and workspace.',
    year: '2026',
    role: DEFAULT_ROLE,
    category: 'AI & Data',
    tags: ['Django', 'Azure OpenAI', 'Azure AI Search', 'RAG'],
    githubLink: gh('RAG--APP'),
    flagship: true,
    caseStudy: {
      problem:
        'Teams keep their knowledge in scattered PDFs, Word files and notes. A generic chatbot cannot answer from those documents, and when several organisations share one platform, each one’s documents must stay strictly separate.',
      approach:
        'A server-rendered Django application where users belong to organisations and upload files into workspaces. Documents are chunked, embedded with Azure OpenAI and indexed in Azure AI Search with tenant-aware fields (organisation, collection and document IDs). At question time a hybrid keyword + vector query, filtered to the user’s tenant and chosen workspace, retrieves the passages that ground the chat model’s answer.',
      flow: [
        { label: 'Upload', detail: 'PDF, DOCX, Markdown or text into a workspace' },
        { label: 'Chunk & embed', detail: 'Azure OpenAI text-embedding model' },
        { label: 'Index', detail: 'Azure AI Search with tenant-aware fields' },
        { label: 'Retrieve', detail: 'Hybrid keyword + vector, scoped by tenant' },
        { label: 'Answer', detail: 'Chat model responds grounded in sources' },
      ],
      features: [
        'Registration and login; every new user starts with a General workspace',
        'Organisation tenants with role-based access control',
        'Chat across all workspaces or scoped to a single one',
        'Management commands to create the search index and bulk-index documents from the CLI',
        'Health-check endpoint for load balancers',
        'Documented deployment to an Azure Linux VM behind Nginx',
      ],
      stack: ['Python', 'Django', 'Azure OpenAI', 'Azure AI Search', 'Nginx', 'Azure VM'],
      result:
        'A working multi-tenant knowledge assistant whose answers come from each organisation’s own documents, packaged so it can be deployed on a single Azure VM.',
      // TODO: add real usage or evaluation results if you have them (documents indexed, users, answer quality).
      learnings: [
        'Tenant isolation belongs in the search index schema, not only in application code.',
        'Hybrid retrieval helps with exact names and codes that embeddings alone can miss.',
        'Index schema changes need a re-index step that is part of the upgrade path.',
      ],
    },
  },
  {
    slug: 'techmarket-et',
    title: 'TechMarket ET',
    summary: 'A used-tech marketplace for Ethiopia that runs inside Telegram as a Mini App.',
    outcome: 'Live marketplace with a full seller → Telebirr payment → admin approval loop inside Telegram.',
    year: '2026',
    role: DEFAULT_ROLE,
    category: 'Full-stack',
    tags: ['React', 'TypeScript', 'Supabase', 'Telegram'],
    githubLink: gh('Buyer-App'),
    demoLink: 'https://buyer-app-phi.vercel.app',
    flagship: true,
    caseStudy: {
      problem:
        'Buying and selling used electronics in Ethiopia often happens in busy Telegram groups: listings are hard to search, sellers are unverified and there is no structured way to charge for or approve listings.',
      approach:
        'A Telegram Mini App built with React and TypeScript on Supabase. Telegram provides identity, and a phone number is required before selling. Sellers pay a fixed listing fee through Telebirr and submit the payment reference; an admin confirms it and the listing goes live. Platform settings such as the fee, admin IDs and payment details live in the database rather than in code.',
      flow: [
        { label: 'Telegram login', detail: 'Identity from Telegram, phone onboarding' },
        { label: 'Create listing', detail: 'Category, condition, brand, city, price' },
        { label: 'Pay listing fee', detail: 'Telebirr reference submitted by seller' },
        { label: 'Admin review', detail: 'Payment confirmed in the admin dashboard' },
        { label: 'Live', detail: 'Searchable and filterable by buyers' },
      ],
      features: [
        'Browse with search plus category, condition, brand, city and price filters',
        '“My listings” view with status chips for each stage',
        'Admin dashboard for users, products, payments, finance (income and refunds) and settings',
        'Configurable listing fee and admin list stored in platform settings',
        'Mock-data fallback so the UI runs without a configured backend',
      ],
      stack: ['TypeScript', 'React', 'Vite', 'Supabase (PostgreSQL)', 'Telegram Mini Apps', 'Telebirr', 'Vercel'],
      result:
        'Deployed on Vercel and usable inside Telegram, with the complete path from a seller’s first login to a paid, approved, searchable listing and an admin view of revenue.',
      // TODO: add launch date, number of listings or users if you can share them.
      learnings: [
        'Meeting users in the app they already use (Telegram) removes sign-up friction.',
        'Manual payment confirmation is a pragmatic first step before integrating a payment API.',
        'Keeping business rules in configuration makes pricing changes a data update, not a deploy.',
      ],
    },
  },
  {
    slug: 'ai-job-matching',
    title: 'Selamnew AI Job Matching',
    summary: 'Serverless API that matches candidates to jobs with GPT-4o and explains every match.',
    outcome: 'Explainable candidate shortlists — score, strengths, concerns and recommendations per match.',
    year: '2025',
    role: 'AI & Data Scientist · IE Network Solutions',
    category: 'AI & Data',
    tags: ['Python', 'Azure Functions', 'Azure OpenAI', 'Blob Storage'],
    githubLink: gh('selamnew-ai'),
    flagship: true,
    caseStudy: {
      problem:
        'Recruiters comparing many candidates against many openings need consistent, explainable shortlists. Keyword filters miss good candidates and give no reasoning a hiring manager can review.',
      approach:
        'An Azure Function App in Python that plugs into an existing recruitment backend through a small REST surface. For each job–candidate pair, GPT-4o on Azure OpenAI produces a structured analysis with a match score, strengths, concerns and recommendations. Results are stored in Azure Blob Storage so summaries and details can be fetched later without re-running the model. Every request is validated with a bearer token and tenant ID.',
      flow: [
        { label: 'Recruitment backend', detail: 'Sends jobs and candidates' },
        { label: 'Azure Function', detail: 'Bearer token + tenant validation' },
        { label: 'GPT-4o analysis', detail: 'Score, strengths, concerns, advice' },
        { label: 'Blob Storage', detail: 'Match results persisted per job' },
        { label: 'Read endpoints', detail: 'Job summaries and candidate detail' },
      ],
      features: [
        'Batch matching of multiple candidates against multiple jobs',
        'Trigger matching for a single job',
        'Job-level match summaries and per-job candidate lists',
        'Detailed analysis endpoint for any single job–candidate pair',
        'Results persisted to Azure Blob Storage',
      ],
      stack: ['Python', 'Azure Functions', 'Azure OpenAI (GPT-4o)', 'Azure Blob Storage'],
      result:
        'An AI matching service that a recruitment platform can call through well-defined endpoints, returning reasoning that recruiters can read rather than an opaque score.',
      // TODO: add any evaluation of match quality or usage you can share.
      learnings: [
        'Structured output (score + reasons) is far more useful to recruiters than a single number.',
        'Persisting results decouples slow model calls from fast dashboard reads.',
        'Multi-tenant auth needs to be enforced at the function boundary.',
      ],
    },
  },
  {
    slug: 'okde-knowledge-engine',
    title: 'OKDE — Knowledge & Decision Engine',
    summary: 'Multi-tenant B2B SaaS combining RAG, workflow automation and AI agents.',
    outcome: 'A layered, containerised SaaS foundation with CI/CD and Terraform-managed Azure infrastructure.',
    year: '2026',
    role: DEFAULT_ROLE,
    category: 'AI & Data',
    tags: ['Node.js', 'Next.js', 'Prisma', 'Terraform', 'Azure'],
    githubLink: gh('RAG'),
    caseStudy: {
      problem:
        'Operational knowledge and the decisions built on it are spread across tools. Organisations need one platform that can retrieve that knowledge, automate workflows around it and run AI agents — with each tenant’s data kept apart.',
      approach:
        'A monorepo with a TypeScript Express API organised in layers (API, application, domain, infrastructure), Prisma for data access, and a Next.js App Router front end. Docker Compose runs the stack locally, GitHub Actions handle tests, builds and deploys, and Terraform describes the Azure infrastructure.',
      flow: [
        { label: 'Next.js app', detail: 'App Router UI and API client' },
        { label: 'Express API', detail: 'Controllers → services → domain' },
        { label: 'Data layer', detail: 'Prisma schema and migrations' },
        { label: 'Azure services', detail: 'RAG, cache and queue integrations' },
        { label: 'Delivery', detail: 'GitHub Actions + Terraform' },
      ],
      features: [
        'Multi-tenant B2B architecture',
        'Retrieval-augmented generation, workflow automation and AI agents',
        'Clean layered backend with integration and unit tests',
        'Dockerfiles for both apps and a local Compose environment',
        'Infrastructure as code for Azure',
      ],
      stack: ['TypeScript', 'Node.js', 'Express', 'Prisma', 'Next.js', 'Docker', 'GitHub Actions', 'Terraform', 'Azure'],
      // TODO: state the current status (prototype, pilot, production) and any results.
      result: 'A production-oriented foundation for a multi-tenant AI platform, with delivery automation in place from the start.',
      learnings: [
        'A layered backend keeps AI integrations replaceable behind domain interfaces.',
        'Setting up CI/CD and IaC early makes every later feature cheaper to ship.',
      ],
    },
  },
  {
    slug: 'banglachatpro',
    title: 'BanglaChatPro',
    summary: 'Bangla-language AI customer care across chat, voice and messaging channels.',
    outcome: 'Natural Bangla support for e-commerce, with human handoff when the AI is not enough.',
    year: '2025',
    role: DEFAULT_ROLE,
    category: 'AI & Data',
    tags: ['Python', 'Whisper', 'BanglaBERT', 'NLP'],
    githubLink: gh('bangla-ai-customer-care'),
    caseStudy: {
      problem:
        'Most customer-care automation is built for English. Bangla-speaking customers — especially on e-commerce platforms — need natural answers about orders, products and payments in their own language, by text or voice.',
      approach:
        'A pipeline that accepts messages from several channels, transcribes voice with Whisper, classifies intent and extracts entities with BanglaBERT / IndicBERT, tracks dialogue state and slots, and looks up real order and product data before replying in text or synthesised Bangla speech. After two unsuccessful responses the conversation is escalated to a human.',
      flow: [
        { label: 'Channels', detail: 'Web chat, voice IVR, WhatsApp, Messenger, Instagram' },
        { label: 'Speech to text', detail: 'Whisper tuned for Bangla' },
        { label: 'Understand', detail: 'Intent + entities with BanglaBERT' },
        { label: 'Dialogue', detail: 'State tracking, slot filling, backend lookups' },
        { label: 'Respond', detail: 'Bangla text or TTS; human handoff if needed' },
      ],
      features: [
        'Order status, product inquiry and payment-issue flows',
        'Automatic human handoff after two failed responses',
        'Admin dashboard for conversations, intents and analytics',
        'Customer satisfaction ratings',
        'PII masking and role-based access',
      ],
      stack: ['Python', 'Whisper', 'BanglaBERT / IndicBERT', 'Text-to-speech', 'WhatsApp Business API'],
      result: 'A multi-channel Bangla customer-care platform designed around real e-commerce support queries.',
      learnings: [
        'Low-resource languages need dedicated models for understanding, not just translation.',
        'A clear escalation rule keeps automation from frustrating customers.',
      ],
    },
  },
  {
    slug: 'delala',
    title: 'Delala',
    summary: 'Rentals and domestic-workers platform for Addis Ababa: NestJS API plus Flutter mobile app.',
    outcome: 'A monorepo with one-command local setup and CI for both the API and the mobile app.',
    year: '2026',
    role: DEFAULT_ROLE,
    category: 'Mobile',
    tags: ['NestJS', 'Flutter', 'PostgreSQL', 'Redis'],
    githubLink: gh('Delala-app'),
    caseStudy: {
      problem:
        'Finding rentals and trusted domestic workers in Addis Ababa relies largely on word of mouth and brokers. A mobile-first product needs a backend and app that can grow feature by feature without becoming tangled.',
      approach:
        'A monorepo with a NestJS API organised as one module per domain and a Flutter app organised as one folder per feature, sharing a single HTTP client. PostgreSQL and Redis run in Docker, and scripts start the infrastructure, API, seed data, tests and the app on a USB-connected phone.',
      flow: [
        { label: 'Flutter app', detail: 'Feature folders, shared HTTP client' },
        { label: 'NestJS API', detail: 'One module per domain' },
        { label: 'PostgreSQL', detail: 'Primary data store' },
        { label: 'Redis', detail: 'Caching and sessions' },
      ],
      features: [
        'Phone-number login with OTP',
        'Documented conventions for adding backend modules and mobile features',
        'One-command dev environment, including seeding and tests',
        'Debug and release APK builds via scripts',
        'GitHub Actions: API build + e2e tests, Flutter analyze and format checks',
      ],
      stack: ['NestJS', 'TypeScript', 'Flutter', 'Dart', 'PostgreSQL', 'Redis', 'Docker', 'GitHub Actions'],
      result: 'A well-structured base for a local marketplace app, ready for features to be added consistently on both sides.',
      learnings: ['Written conventions in the README keep a two-language monorepo consistent.'],
    },
  },
  {
    slug: 'azure-ai-solution',
    title: 'Azure AI Solution',
    summary: 'Full-stack app covering Azure AI services, provisioned and deployed automatically on every push.',
    outcome: 'One GitHub secret; the pipeline creates missing Azure resources and deploys the app.',
    year: '2026',
    role: DEFAULT_ROLE,
    category: 'AI & Data',
    tags: ['Azure AI Services', 'Docker', 'GitHub Actions'],
    githubLink: gh('azure-docker'),
    caseStudy: {
      problem:
        'Working across many Azure AI services usually means creating each resource by hand and copying keys around. That is slow, error-prone and hard to reproduce.',
      approach:
        'A single containerised web app with a page per capability. A GitHub Actions workflow creates any missing Azure resources, fetches their endpoints and keys, builds the image into Azure Container Registry and deploys it to Azure Container Instances, with an Azure File Share for persistence.',
      flow: [
        { label: 'git push main', detail: 'Triggers the workflow' },
        { label: 'Provision', detail: 'Create missing Azure AI resources' },
        { label: 'Build', detail: 'Docker image pushed to ACR' },
        { label: 'Deploy', detail: 'Azure Container Instances + File Share' },
        { label: 'Use', detail: 'Document, Vision, Language, Speech, Search, OpenAI' },
      ],
      features: [
        'Document Intelligence for invoices and business cards',
        'Image analysis and OCR with Azure AI Vision',
        'Sentiment, entities, key phrases, question answering and CLU',
        'Speech-to-text and text-to-speech',
        'Knowledge mining with Azure AI Search and RAG with Azure OpenAI',
        'Credentials fetched at deploy time instead of copied by hand',
      ],
      stack: ['Python', 'Azure AI Services', 'Azure OpenAI', 'Docker', 'Azure Container Registry', 'Azure Container Instances', 'GitHub Actions'],
      result: 'A reproducible, automatically deployed reference app spanning the Azure AI Engineer (AI-102) skill areas.',
      learnings: ['Letting the pipeline fetch secrets removes a whole class of configuration mistakes.'],
    },
  },
  {
    slug: 'realtime-chat-backend',
    title: 'Real-time Chat Backend',
    summary: 'Chat service with channels, direct messages, read receipts and attachments over REST and Socket.IO.',
    outcome: 'A chat-only service that trusts an external auth system and plugs into a Next.js front end.',
    year: '2026',
    role: 'Software Developer · IE Network Solutions',
    category: 'Full-stack',
    tags: ['NestJS', 'Socket.IO', 'Prisma', 'PostgreSQL'],
    githubLink: gh('backend-chat'),
    caseStudy: {
      problem:
        'A collaboration product needed real-time messaging without duplicating its existing login system, and with a clear split between group channels and private conversations.',
      approach:
        'A NestJS service exposing REST routes and a Socket.IO gateway that share the same room, message and upload services. Identity comes from the existing auth backend via bearer tokens; users are mirrored from token claims. Data is modelled in Prisma on PostgreSQL.',
      flow: [
        { label: 'Next.js front end', detail: 'REST + Socket.IO clients' },
        { label: 'Auth', detail: 'Bearer token from external auth backend' },
        { label: 'NestJS', detail: 'REST controllers and WebSocket gateway' },
        { label: 'Services', detail: 'Rooms, messages, uploads' },
        { label: 'PostgreSQL', detail: 'Via Prisma' },
      ],
      features: [
        'Group channels with owner/member roles and membership management',
        'One-to-one direct conversations',
        'Replies, delivery and read receipts',
        'File and image attachments',
        'Swagger docs with separate channel and direct-message routes',
      ],
      stack: ['NestJS', 'TypeScript', 'Socket.IO', 'Prisma', 'PostgreSQL', 'Swagger'],
      result: 'A focused chat backend that integrates with an existing product’s auth instead of re-implementing it.',
      learnings: ['Keeping legacy routes working but hidden from docs allows a clean API without breaking clients.'],
    },
  },
  {
    slug: 'cicd-devops-lab',
    title: 'CI/CD DevOps Lab',
    summary: 'Production-parity lab where Jenkins builds and deploys Next.js, NestJS and notification services.',
    outcome: 'The same pipeline stages as production, running on a single VM with Compose.',
    year: '2026',
    // TODO: confirm this repo is fine to show publicly (it documents an internal lab setup).
    role: 'Software Developer · IE Network Solutions',
    category: 'DevOps',
    tags: ['Jenkins', 'Docker', 'Nginx', 'Vault'],
    githubLink: gh('DevOps'),
    caseStudy: {
      problem:
        'Testing changes to deployment pipelines directly against production is risky. The team needed a lab that behaves like production without its cost or blast radius.',
      approach:
        'A separate control-plane repository. Jenkins mirrors the stage names of the production Jenkinsfiles but pushes images to a local registry and deploys with Docker Compose on one VM. Nginx routes the front end, API and notification service; secrets are managed in Vault; GitHub webhooks trigger builds.',
      flow: [
        { label: 'GitHub webhook', detail: 'Push triggers Jenkins' },
        { label: 'Jenkins', detail: 'Same stages as production pipelines' },
        { label: 'Local registry', detail: 'Images built and tagged' },
        { label: 'Compose deploy', detail: 'Front end, API, notification service' },
        { label: 'Nginx', detail: 'Single entry point; secrets from Vault' },
      ],
      features: [
        'Pipeline parity with production stage names',
        'App repositories are never edited by the DevOps tooling',
        'Nginx path routing for every service',
        'Vault-managed environment secrets applied by a Jenkins job',
        'Portainer for container management; verification scripts for the lab',
      ],
      stack: ['Jenkins', 'Docker', 'Docker Compose', 'Nginx', 'HashiCorp Vault', 'Portainer', 'Linux'],
      result: 'A safe place to change and verify deployment pipelines before they reach production.',
      learnings: ['Matching production stage names makes lab results directly transferable.'],
    },
  },
  {
    slug: 'life-os',
    title: 'Life OS',
    summary: 'Personal productivity system to plan the year, run the day and keep what you learn.',
    outcome: 'A mobile app and API with Google Docs integration that never exposes refresh tokens.',
    year: '2026',
    role: DEFAULT_ROLE,
    category: 'Mobile',
    tags: ['NestJS', 'MongoDB', 'React Native', 'JWT'],
    githubLink: gh('plan-management'),
    caseStudy: {
      problem: 'Planning, daily execution and notes usually live in separate apps, so long-term goals drift away from what happens each day.',
      approach:
        'A NestJS API on MongoDB with JWT auth and an Expo / React Native mobile client. Google Docs is connected through server-side OAuth so refresh tokens never leave the API.',
      flow: [
        { label: 'Expo app', detail: 'Plan, day view, knowledge' },
        { label: 'NestJS API', detail: 'JWT authentication' },
        { label: 'MongoDB', detail: 'Plans, tasks, notes' },
        { label: 'Google Docs', detail: 'Server-side OAuth only' },
      ],
      features: ['Yearly planning and daily views', 'Knowledge capture', 'Google Docs integration with server-held tokens'],
      stack: ['NestJS', 'MongoDB', 'JWT', 'Expo', 'React Native', 'Google OAuth', 'Docker'],
      result: 'A personal system tying yearly plans to daily work, with secure third-party integration.',
      learnings: ['Keeping OAuth tokens server-side simplifies mobile security.'],
    },
  },
  {
    slug: 'focusflow',
    title: 'FocusFlow',
    summary: 'Full-stack productivity app with a NestJS API, PostgreSQL via Prisma and a Next.js interface.',
    outcome: 'A single-repo setup where one environment file configures both API and front end.',
    year: '2026',
    role: DEFAULT_ROLE,
    category: 'Full-stack',
    tags: ['NestJS', 'Next.js', 'Prisma'],
    githubLink: gh('Focus-app'),
    caseStudy: {
      problem: 'Staying focused needs a tool that is quick to open and keeps tasks and sessions in one place.',
      approach: 'A NestJS API with Prisma on PostgreSQL and a Next.js UI, installed from the repository root and configured with a single shared environment file.',
      flow: [
        { label: 'Next.js UI', detail: 'Uses public env vars' },
        { label: 'NestJS API', detail: 'Business logic' },
        { label: 'PostgreSQL', detail: 'Via Prisma' },
      ],
      features: ['Shared root configuration for both apps', 'Prisma schema and migrations', 'Typed end to end'],
      stack: ['NestJS', 'Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      result: 'A compact full-stack TypeScript app with a simple setup story.',
      learnings: ['One env file for a monorepo reduces setup mistakes.'],
    },
  },
  {
    slug: 'auth-rbac',
    title: 'Auth & Role-Based Access Control',
    summary: 'User, role and permission management with Laravel Sanctum and a Vue 3 interface.',
    outcome: 'Granular permissions that refresh automatically in the UI.',
    year: '2025',
    role: DEFAULT_ROLE,
    category: 'Full-stack',
    tags: ['Vue', 'Laravel', 'Tailwind'],
    githubLink: gh('AuthenticationwithCrudandAssigningRoleandPermission'),
    caseStudy: {
      problem: 'Admin tools need more than login: different people must be allowed to do different things, and those rules change.',
      approach: 'A Laravel API secured with Sanctum, a role and permission model, and a Vue 3 + Tailwind front end that refreshes permissions automatically.',
      flow: [
        { label: 'Vue 3 UI', detail: 'Tailwind CSS' },
        { label: 'Laravel API', detail: 'Sanctum authentication' },
        { label: 'RBAC', detail: 'Users ↔ roles ↔ permissions' },
      ],
      features: ['Secure login and logout', 'CRUD for users, roles and permissions', 'Real-time permission refresh'],
      stack: ['Laravel', 'PHP', 'Sanctum', 'Vue 3', 'Tailwind CSS'],
      result: 'A reusable starting point for admin panels that need fine-grained access control.',
      learnings: ['Modelling permissions separately from roles keeps access rules flexible.'],
    },
  },
  {
    slug: 'music-management-app',
    title: 'Music Management App',
    summary: 'Full-stack app for managing songs and viewing statistics, built as a technical assessment.',
    outcome: 'Song management with search and statistics, deployed on Vercel.',
    year: '2024',
    role: DEFAULT_ROLE,
    category: 'Full-stack',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    githubLink: gh('MusicApp'),
    demoLink: 'https://music-app-sepia-nine.vercel.app',
    caseStudy: {
      problem: 'A technical assessment for Addis Software: build a full-stack app to manage songs and show statistics about the collection.',
      approach: 'A MERN-stack application in TypeScript with a React front end, an Express API and MongoDB, focused on clean structure and responsive UI.',
      flow: [
        { label: 'React UI', detail: 'Song list, forms, statistics' },
        { label: 'Express API', detail: 'CRUD and aggregation' },
        { label: 'MongoDB', detail: 'Songs collection' },
      ],
      features: ['Create, update and delete songs', 'Statistics and data visualisation', 'Search', 'Responsive design'],
      stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Vercel'],
      result: 'A complete, deployed MERN application delivered for a hiring process.',
      learnings: ['Type safety across the stack pays off even in small projects.'],
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

export const flagshipProjects = projects.filter((p) => p.flagship);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const categories: Category[] = ['AI & Data', 'Full-stack', 'Mobile', 'DevOps'];
