// Single source of truth for who Mikias is, matching the v7 CV exactly.
// Keep every fact here checkable against public/MikiasAbate-CV.pdf.

export const site = {
  name: 'Mikias Abate',
  role: 'Full-Stack AI Engineer',
  url: 'https://mikiasabatesite.vercel.app',
  location: 'Addis Ababa, Ethiopia',
  timeZone: 'Africa/Addis_Ababa',
  utcOffset: 'UTC+3',
  email: 'mikiyasabate003@gmail.com',
  phone: '+251 922 578 745',
  availability: 'Open to full-time roles and contracts',
  statement:
    'Full-stack AI engineer who ships both the application and the AI behind it — REST APIs, web and mobile apps with NestJS, Next.js, React Native and PostgreSQL, with Microsoft Azure AI services integrated into live business workflows.',
};

export interface Social {
  label: string;
  handle: string;
  href: string;
}

export const socials: Social[] = [
  { label: 'GitHub', handle: 'mikias1219', href: 'https://github.com/mikias1219' },
  { label: 'LinkedIn', handle: 'mikiasabate', href: 'https://linkedin.com/in/mikiasabate' },
  { label: 'Email', handle: site.email, href: `mailto:${site.email}` },
];

/** Short facts lifted from the CV — shown in the hero "at a glance" strip. */
export const quickFacts = [
  { value: 'AI-102', detail: 'Microsoft Certified: Azure AI Engineer Associate' },
  { value: 'Full-time', detail: 'Full-stack engineer at IE Network Solutions since Jun 2025' },
  { value: 'B.Sc. IS', detail: 'Information Systems, Addis Ababa University' },
];

/** Condensed highlights for the About section, drawn from the CV bullets. */
export const highlights = [
  'Built an AI Copilot for HR at IE Network Solutions — natural-language answers over workforce data (late, absent, leave, OKRs).',
  'Built an AI planning assistant that helps employees and HR create and track daily, weekly and OKR plans.',
  'Automated CV extraction, candidate scoring and job matching on Microsoft Azure AI for recruitment workflows.',
  'Shipped a collaboration platform with NestJS, Next.js and React Native clients, including audio and video calling.',
  'Delivered freelance full-stack web applications with Next.js, NestJS and PostgreSQL for Atlas Group.',
];

/* -------------------------------------------------------------------------- */
/* Skills — exactly the four CORE SKILLS groups on the CV                      */
/* -------------------------------------------------------------------------- */

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    items: ['Azure AI Services', 'Azure Machine Learning', 'LLM Applications', 'AI Agents', 'AI Integration', 'Python'],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    items: ['NestJS', 'Node.js', 'FastAPI', 'Django', 'REST API Design', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    id: 'frontend',
    title: 'Frontend & Mobile',
    items: ['Next.js', 'React.js', 'React Native', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Redux'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    items: ['Microsoft Azure', 'Docker', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Git', 'Linux', 'Nginx'],
  },
];
