export type Category = 'AI & Data' | 'Full-stack' | 'Mobile' | 'DevOps';

export interface Project {
  title: string;
  description: string;
  githubLink: string;
  demoLink?: string;
  category: Category;
  tags: string[];
  /** Shown as a large spotlight card with highlights and a visual */
  featured?: {
    visual: 'chat' | 'market' | 'match';
    highlights: string[];
  };
}

const gh = (repo: string) => `https://github.com/mikias1219/${repo}`;

export const projects: Project[] = [
  {
    title: 'Knowledge Hub — Multi-tenant RAG',
    description:
      'Django RAG platform with organization tenants, RBAC and workspaces. Upload PDFs and docs, then chat with grounded answers from hybrid vector search.',
    githubLink: gh('RAG--APP'),
    category: 'AI & Data',
    tags: ['Django', 'Azure OpenAI', 'Azure AI Search', 'RAG'],
    featured: {
      visual: 'chat',
      highlights: [
        'Tenant- and workspace-scoped retrieval with hybrid keyword + vector search',
        'Ingests PDF, DOCX, Markdown and text into Azure AI Search',
        'Login, organizations and role-based access control built in',
      ],
    },
  },
  {
    title: 'OKDE — Knowledge & Decision Engine',
    description:
      'Multi-tenant B2B SaaS combining RAG, workflow automation and AI agents, with CI/CD and Terraform-managed Azure infrastructure.',
    githubLink: gh('RAG'),
    category: 'AI & Data',
    tags: ['Node.js', 'Next.js', 'Prisma', 'Terraform', 'Azure'],
  },
  {
    title: 'TechMarket ET — Telegram Mini App',
    description:
      'Used-tech marketplace for Ethiopia: Telegram login, search and filters, Telebirr listing fees and an in-app admin dashboard for payments and finance.',
    githubLink: gh('Buyer-App'),
    demoLink: 'https://buyer-app-phi.vercel.app',
    category: 'Full-stack',
    tags: ['TypeScript', 'React', 'Supabase', 'Telegram'],
    featured: {
      visual: 'market',
      highlights: [
        'Runs inside Telegram with identity and phone onboarding',
        'Listing-fee flow with Telebirr payments and admin approval',
        'Admin dashboard for users, products, payments and finance',
      ],
    },
  },
  {
    title: 'Selamnew AI Job Matching',
    description:
      'Serverless API that matches candidates to jobs with GPT-4o, producing match scores, strengths, concerns and recommendations.',
    githubLink: gh('selamnew-ai'),
    category: 'AI & Data',
    tags: ['Python', 'Azure Functions', 'Azure OpenAI', 'Blob Storage'],
    featured: {
      visual: 'match',
      highlights: [
        'Batch and per-job matching endpoints for a recruitment backend',
        'GPT-4o analysis with scores, strengths, concerns and recommendations',
        'Results persisted to Azure Blob Storage, secured with bearer tokens',
      ],
    },
  },
  {
    title: 'BanglaChatPro — AI Customer Care',
    description:
      'Bangla-language customer care platform with NLU, Whisper speech recognition, TTS, human handoff and WhatsApp / Messenger channels.',
    githubLink: gh('bangla-ai-customer-care'),
    category: 'AI & Data',
    tags: ['Python', 'Whisper', 'BanglaBERT', 'NLP'],
  },
  {
    title: 'Delala',
    description:
      'Monorepo for a rentals and domestic-workers platform in Addis Ababa: a NestJS API and a Flutter mobile app, with CI on GitHub Actions.',
    githubLink: gh('Delala-app'),
    category: 'Mobile',
    tags: ['NestJS', 'Flutter', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'Azure AI Solution (AI-102)',
    description:
      'Full-stack app covering Document Intelligence, Vision, Language, Speech and RAG — auto-provisioned and deployed to Azure on every push.',
    githubLink: gh('azure-docker'),
    category: 'AI & Data',
    tags: ['Azure AI Services', 'Docker', 'GitHub Actions'],
  },
  {
    title: 'Real-time Chat Backend',
    description:
      'Chat service with channels, direct messages, read receipts and attachments over REST and Socket.IO, using external token-based auth.',
    githubLink: gh('backend-chat'),
    category: 'Full-stack',
    tags: ['NestJS', 'Socket.IO', 'Prisma', 'PostgreSQL'],
  },
  {
    title: 'CI/CD DevOps Lab',
    description:
      'Production-parity lab: Jenkins pipelines build images to a local registry and deploy Next.js and NestJS services with Compose behind Nginx, with secrets in Vault.',
    githubLink: gh('DevOps'),
    category: 'DevOps',
    tags: ['Jenkins', 'Docker', 'Nginx', 'Vault'],
  },
  {
    title: 'Life OS',
    description:
      'Personal productivity system to plan the year and track the day, with a NestJS API, Expo mobile app and Google Docs integration.',
    githubLink: gh('plan-management'),
    category: 'Mobile',
    tags: ['NestJS', 'MongoDB', 'React Native', 'JWT'],
  },
  {
    title: 'FocusFlow',
    description: 'Full-stack productivity app with a NestJS API, PostgreSQL via Prisma and a Next.js interface.',
    githubLink: gh('Focus-app'),
    category: 'Full-stack',
    tags: ['NestJS', 'Next.js', 'Prisma'],
  },
  {
    title: 'Auth & Role-Based Access Control',
    description: 'User, role and permission management with Laravel Sanctum authentication and a Vue 3 interface.',
    githubLink: gh('AuthenticationwithCrudandAssigningRoleandPermission'),
    category: 'Full-stack',
    tags: ['Vue', 'Laravel', 'Tailwind'],
  },
  {
    title: 'Music Management App',
    description: 'Full-stack app for managing songs and viewing statistics, built as a technical assessment for Addis Software.',
    githubLink: gh('MusicApp'),
    demoLink: 'https://music-app-sepia-nine.vercel.app',
    category: 'Full-stack',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Student Study Portal',
    description: 'Django portal giving students notes, homework deadlines, to-dos, dictionary, Wikipedia and YouTube search in one dashboard.',
    githubLink: gh('KM'),
    category: 'Full-stack',
    tags: ['Python', 'Django'],
  },
];
