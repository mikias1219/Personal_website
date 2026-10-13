import type { IconType } from 'react-icons';
import { FiCloud, FiCpu, FiGithub, FiLayers, FiLinkedin, FiMail } from 'react-icons/fi';
import { projects } from './projects';

export const site = {
  name: 'Mikias Abate',
  role: 'Software Developer & AI Engineer',
  url: 'https://mikiasabatesite.vercel.app',
  location: 'Addis Ababa, Ethiopia',
  timeZone: 'Africa/Addis_Ababa',
  email: 'mikiyasabate003@gmail.com',
  description:
    'Mikias Abate is an AI engineer in Addis Ababa building production RAG systems on Azure OpenAI and full-stack products with NestJS, Next.js, Django and Flutter.',
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

/** Short, verifiable facts shown under the hero. `figure` is the headline number. */
export const proof = [
  { figure: '2+', label: 'Years of experience', value: 'Shipping full-stack and AI software' },
  { figure: '2', label: 'Microsoft certifications', value: 'Azure AI Engineer (AI-102) & Data Scientist (DP-100)' },
  { figure: String(projects.length), label: 'Case studies', value: 'From multi-tenant RAG on Azure to mobile apps and pipelines' },
  { figure: '60+', label: 'Public repositories', value: 'Open source work on GitHub' },
];

export const practices = [
  {
    icon: FiCpu,
    title: 'AI & RAG',
    text: 'LLM features grounded in an organisation’s own documents, with retrieval scoped to the right tenant and workspace.',
    points: [
      'Chunking, embeddings and hybrid search on Azure AI Search',
      'Grounded chat and structured GPT-4o analysis',
      'Azure AI services: Document Intelligence, Speech, Vision',
    ],
  },
  {
    icon: FiLayers,
    title: 'Full-stack products',
    text: 'Typed APIs, clear data models and interfaces that hold up when real users, payments and permissions arrive.',
    points: [
      'NestJS, Django and FastAPI services with Prisma or ORM models',
      'Next.js, React and Vue front ends',
      'Flutter and React Native mobile apps',
    ],
  },
  {
    icon: FiCloud,
    title: 'Cloud & DevOps',
    text: 'Reproducible environments and pipelines, so every change takes the same path from commit to running service.',
    points: [
      'Docker and Compose for local and lab environments',
      'Jenkins and GitHub Actions pipelines',
      'Azure provisioning with scripts and Terraform',
    ],
  },
];

export const stack = [
  {
    group: 'AI & Data',
    items: ['Azure OpenAI', 'Azure AI Search', 'Azure ML', 'Azure AI Services', 'LLM apps & agents', 'Machine learning', 'Python', 'Whisper'],
  },
  {
    group: 'Backend',
    items: ['NestJS', 'Node.js / Express', 'Django', 'FastAPI', 'REST APIs', 'Laravel', 'Prisma', 'Socket.IO'],
  },
  {
    group: 'Data stores',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'MySQL'],
  },
  {
    group: 'Frontend',
    items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Redux', 'Vue 3', 'Tailwind CSS'],
  },
  {
    group: 'Mobile',
    items: ['Flutter', 'React Native / Expo', 'Telegram Mini Apps'],
  },
  {
    group: 'Cloud & DevOps',
    items: ['Azure', 'Docker', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Git', 'Terraform', 'Nginx', 'Vault', 'Linux'],
  },
];
