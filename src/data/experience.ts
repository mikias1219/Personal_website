// Source of truth: public/MikiasAbate-CV.pdf (the downloadable CV).
// Keep this file in sync whenever the CV changes.

export interface Role {
  period: string;
  title: string;
  org: string;
  location: string;
  points: string[];
  tech?: string[];
  current?: boolean;
}

export const experience: Role[] = [
  {
    period: 'Jan 2026 — Present',
    title: 'Software Developer',
    org: 'IE Network Solutions',
    location: 'Addis Ababa',
    current: true,
    points: [
      'Develop and maintain full-stack applications for internal business operations.',
      'Build backend APIs and frontend features using modern software technologies.',
      'Work with databases, Docker and application integrations.',
    ],
    tech: ['NestJS', 'Next.js', 'Python', 'PostgreSQL', 'Docker'],
  },
  {
    period: 'Jun 2025 — Jan 2026',
    title: 'AI & Data Scientist',
    org: 'IE Network Solutions',
    location: 'Addis Ababa',
    points: [
      'Developed AI-powered features using Microsoft Azure AI services.',
      'Worked on CV extraction, candidate scoring and job-matching features.',
      'Integrated AI services with application APIs and business workflows.',
    ],
    tech: ['Python', 'Azure AI', 'React', 'REST APIs'],
  },
  {
    period: 'Feb 2025 — Jul 2025',
    title: 'Full-Stack Web Developer (Freelance)',
    org: 'Atlas Group',
    location: 'Remote',
    points: [
      'Developed full-stack web applications with Next.js, NestJS and PostgreSQL, integrating backend APIs with responsive user interfaces.',
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
      'Integrated backend services and web infrastructure to improve application performance and user engagement by 40%.',
    ],
    tech: ['Python'],
  },
];

export const education = {
  degree: 'Bachelor’s Degree, Information Systems',
  school: 'Addis Ababa University',
  period: '2021 — 2024',
  location: 'Addis Ababa, Ethiopia',
};

export interface Certification {
  name: string;
  issuer: string;
  code?: string;
  url?: string;
}

export const certifications: Certification[] = [
  // TODO: add each credential's Microsoft Learn verification URL to `url`.
  { name: 'Azure AI Engineer Associate', issuer: 'Microsoft Certified', code: 'AI-102' },
  { name: 'Azure Data Scientist Associate', issuer: 'Microsoft Certified', code: 'DP-100' },
  // TODO: add the issuer for this course (listed on the CV without one).
  { name: 'AI Engineer for Data Scientists Associate', issuer: 'Course' },
];

export const cvUrl = '/MikiasAbate-CV.pdf';
export const cvFileName = 'Mikias-Abate-CV.pdf';
