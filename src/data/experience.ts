// Source of truth: public/MikiasAbate-CV.pdf (the downloadable CV, v7).
// Keep this file in sync whenever the CV changes. Bullets are condensed from
// the CV; no responsibilities, employers or dates are added here.

export interface Role {
  period: string;
  title: string;
  org: string;
  location?: string;
  type?: string;
  summary?: string;
  points: string[];
  current?: boolean;
}

export const experience: Role[] = [
  {
    period: 'Apr 2026 — Present',
    title: 'Software Engineer (Full-Stack)',
    org: 'IE Network Solutions',
    location: 'Addis Ababa',
    current: true,
    summary: 'Full-stack internal business applications.',
    points: [
      'Design, build and maintain full-stack internal business applications using NestJS, Next.js, PostgreSQL and Python.',
      'Develop backend REST APIs and responsive frontend features; containerize and deploy services with Docker.',
      'Integrate applications with external systems and AI services to automate business workflows.',
    ],
  },
  {
    period: 'Jun 2025 — Apr 2026',
    title: 'Junior AI Engineer',
    org: 'IE Network Solutions',
    location: 'Addis Ababa',
    summary: 'AI features for recruitment workflows on Microsoft Azure.',
    points: [
      'Built AI recruitment features on Microsoft Azure AI: automated CV extraction, candidate scoring and job matching.',
      'Connected AI services to application APIs (Python, REST) and React.js interfaces within business workflows.',
      'Earned Azure AI Engineer (AI-102) and Azure Data Scientist (DP-100) certifications during this role.',
    ],
  },
  {
    period: 'Feb 2025 — Jul 2025',
    title: 'Freelance Full-Stack Developer',
    org: 'Atlas Group',
    location: 'Remote',
    type: 'Freelance',
    points: [
      'Delivered full-stack web applications with Next.js, NestJS and PostgreSQL, integrating backend APIs with responsive user interfaces.',
    ],
  },
  {
    period: 'Mar 2024 — May 2024',
    title: 'Web Development Intern',
    org: 'Prodigy InfoTech',
    location: 'Remote',
    type: 'Internship',
    points: ['Built web applications using Python and web infrastructure tooling.'],
  },
  {
    period: 'Feb 2024 — Mar 2024',
    title: 'Full-Stack Developer Intern',
    org: 'Addis Ababa University',
    type: 'Internship',
    points: ['Developed SQL-backed full-stack web features.'],
  },
];

/** Selected projects, straight from the CV. */
export interface CvProject {
  name: string;
  kind: 'AI Project' | 'Software Project';
  summary: string;
  points: string[];
}

export const cvProjects: CvProject[] = [
  {
    name: 'Selamnew Workspace',
    kind: 'AI Project',
    summary: 'HR system with an AI Copilot.',
    points: [
      'Built an AI Copilot for HR that answers natural-language questions about workforce data, such as who is late, who is absent, who is on leave and who has planned their OKRs.',
      'Built an AI planning assistant that helps employees and HR create and track daily and weekly plans and OKR plans.',
    ],
  },
  {
    name: 'Selamnew Collaboration',
    kind: 'Software Project',
    summary: 'Team collaboration platform.',
    points: [
      'Built and configured a full collaboration platform: NestJS backend, Next.js web app and React Native mobile app, with audio and video calling.',
      'Implemented role-based access control, search and @mentions for team collaboration.',
    ],
  },
];

export const certifications = [
  { name: 'Azure AI Engineer Associate', issuer: 'Microsoft', code: 'AI-102' },
  { name: 'AI Engineer for Developers Associate', issuer: 'DataCamp' },
  { name: 'AI Engineer for Data Scientists Associate', issuer: 'DataCamp' },
  { name: 'Data Engineer Associate', issuer: 'DataCamp' },
];

export const education = {
  degree: 'B.Sc. Information Systems',
  school: 'Addis Ababa University',
  period: '2020 – 2024',
};

export const cvUrl = '/MikiasAbate-CV.pdf';
export const cvFileName = 'Mikias_Abate_CV_Full-Stack_AI_Engineer_v7.pdf';
