export interface TimelineItem {
  period: string;
  title: string;
  org: string;
  points: string[];
  current?: boolean;
}

export const timeline: TimelineItem[] = [
  {
    period: '2025 — Present',
    title: 'AI & Full-Stack Engineering',
    org: 'Product & client work',
    current: true,
    points: [
      'Building multi-tenant RAG platforms with Azure OpenAI and Azure AI Search.',
      'Shipping NestJS, Next.js and Django products — from real-time chat to marketplaces.',
      'Setting up CI/CD with Jenkins, Docker and GitHub Actions.',
    ],
  },
  {
    period: 'Certification',
    title: 'Azure Data Scientist Associate',
    org: 'Microsoft Certified',
    points: ['Designing and running machine learning solutions on Azure ML, with extensive AI-102 hands-on work.'],
  },
  {
    period: 'Mar — Apr 2024',
    title: 'Web Development Intern',
    org: 'Prodigy InfoTech',
    points: [
      'Built responsive front-end interfaces with React and integrated RESTful APIs.',
      'Shipped features that improved performance by 20%.',
    ],
  },
  {
    period: 'Sep — Dec 2023',
    title: 'Networking Intern',
    org: 'CBE',
    points: ['Configured and troubleshot network infrastructure and worked with network security practices.'],
  },
  {
    period: '2021 — 2024',
    title: 'BSc, Information Systems',
    org: 'Addis Ababa University · GPA 3.65',
    points: ['Coursework across software engineering, databases, networking and data analysis.'],
  },
];
