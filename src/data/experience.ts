// Source of truth: public/MikiasAbate-CV.pdf (the downloadable CV).
// Keep this file in sync whenever the CV changes. Bullets are rephrased from
// the CV; no responsibilities, metrics or employers are added here.

export interface Role {
  period: string;
  title: string;
  org: string;
  location: string;
  /** e.g. "Full-time", "Freelance" */
  type?: string;
  summary?: string;
  points: string[];
  tech?: string[];
  /** Project slugs from data/projects.ts built in this role */
  projects?: string[];
  current?: boolean;
}

export const experience: Role[] = [
  {
    period: 'Jan 2026 — Present',
    title: 'Software Developer',
    org: 'IE Network Solutions',
    location: 'Addis Ababa',
    current: true,
    summary: 'Full-stack development of internal business applications.',
    points: [
      'Develop and maintain full-stack applications that support internal business operations.',
      'Build backend APIs and the front-end features that consume them, using NestJS, Next.js and Python.',
      'Model and query data in PostgreSQL, containerise services with Docker and integrate applications with existing systems.',
    ],
    tech: ['NestJS', 'Next.js', 'Python', 'PostgreSQL', 'Docker'],
    projects: ['realtime-chat-backend', 'cicd-devops-lab'],
  },
  {
    period: 'Jun 2025 — Jan 2026',
    title: 'AI & Data Scientist',
    org: 'IE Network Solutions',
    location: 'Addis Ababa',
    summary: 'AI features for recruitment workflows on Microsoft Azure.',
    points: [
      'Developed AI-powered features with Microsoft Azure AI services.',
      'Built CV extraction, candidate scoring and job-matching capabilities for recruitment workflows.',
      'Integrated AI services with application APIs and business workflows.',
    ],
    tech: ['Python', 'Azure AI Services', 'Azure OpenAI', 'React', 'REST APIs'],
    projects: ['ai-job-matching'],
  },
  {
    period: 'Feb 2025 — Jul 2025',
    title: 'Full-Stack Web Developer',
    org: 'Atlas Group',
    location: 'Remote',
    type: 'Freelance',
    points: [
      'Developed full-stack web applications with Next.js, NestJS and PostgreSQL.',
      'Integrated backend APIs with responsive user interfaces.',
    ],
    tech: ['Next.js', 'NestJS', 'PostgreSQL'],
  },
  {
    period: 'Mar 2024 — May 2025',
    title: 'Software Developer',
    org: 'Private company',
    location: 'Remote',
    points: [
      'Developed 5 full-stack applications and 3 backend services using Python and modern web technologies.',
      'Integrated backend services and web infrastructure, improving application performance and user engagement by 40%.',
    ],
    tech: ['Python', 'REST APIs'],
  },
];

export const education = {
  degree: 'Bachelor’s Degree in Information Systems',
  school: 'Addis Ababa University',
  period: '2021 — 2024',
  location: 'Addis Ababa, Ethiopia',
};

export interface Certification {
  name: string;
  issuer: string;
  code?: string;
  /** One line on what the certification covers */
  scope?: string;
  /** Credential verification link (Microsoft Learn transcript or credential page) */
  url?: string;
}

export const certifications: Certification[] = [
  // TODO: add each credential's Microsoft Learn verification URL to `url`; a "Verify" link then appears.
  {
    name: 'Azure AI Engineer Associate',
    issuer: 'Microsoft Certified',
    code: 'AI-102',
    scope: 'Designing and implementing Azure AI solutions: Azure OpenAI, AI Search, Document Intelligence, Vision, Language and Speech.',
  },
  {
    name: 'Azure Data Scientist Associate',
    issuer: 'Microsoft Certified',
    code: 'DP-100',
    scope: 'Designing and running machine learning workloads on Azure Machine Learning: data, training, evaluation and deployment.',
  },
];

/** Training listed on the CV that is not a Microsoft certification. */
export const training: Certification[] = [
  // TODO: add the provider for this course (listed on the CV without one).
  { name: 'AI Engineer for Data Scientists Associate', issuer: 'Professional training' },
];

export const cvUrl = '/MikiasAbate-CV.pdf';
export const cvFileName = 'Mikias-Abate-CV.pdf';
