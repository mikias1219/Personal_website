// Source of truth: facts confirmed by Mikias, not public/MikiasAbate-CV.pdf.
export interface Role {
  period: string;
  title: string;
  org: string;
  location?: string;
  type?: string;
  points: string[];
  current?: boolean;
  confirmation?: string;
}
export const experience: Role[] = [
  {
    period: "Apr 2026 – present",
    title: "Software Engineer",
    org: "IE Network Solutions",
    location: "Addis Ababa",
    current: true,
    points: [
      "Design, build and maintain full-stack internal business applications with NestJS, Next.js, PostgreSQL and Python.",
      "Build REST APIs and responsive interfaces, integrate AI services and deploy with Docker.",
    ],
  },
  {
    period: "Jun 2025 – Apr 2026",
    title: "Junior AI Engineer",
    org: "IE Network Solutions",
    location: "Addis Ababa",
    points: [
      "Built AI recruitment features on Microsoft Azure AI: CV extraction, candidate scoring and job matching.",
      "Connected AI services to Python REST APIs and React interfaces.",
    ],
  },
  {
    // CONFIRM: expand the exact title "AI GTP" and supply its description. Do not infer responsibilities.
    period: "Mar 2025 – Jul 2025",
    title: "AI GTP",
    org: "IE Network Solutions",
    location: "Hybrid",
    points: [],
    confirmation: "Title expansion and role description to be confirmed.",
  },
  {
    // CONFIRM: Atlas Group freelance engagement is retained from the existing data; not on LinkedIn.
    period: "Feb 2025 – Jul 2025",
    title: "Freelance Full-Stack Developer",
    org: "Atlas Group",
    location: "Remote",
    type: "Freelance",
    points: ["Delivered web applications with Next.js, NestJS and PostgreSQL."],
    confirmation: "Engagement details to be confirmed.",
  },
  {
    period: "Mar 2024 – May 2024",
    title: "Web Development Intern",
    org: "Prodigy InfoTech",
    location: "Remote",
    points: [
      "Built web applications using Python and web infrastructure tooling.",
    ],
  },
  {
    period: "Feb 2024 – Mar 2024",
    title: "Full-Stack Developer Intern",
    org: "Addis Ababa University",
    points: ["Developed SQL-backed full-stack web features."],
  },
];
// CONFIRM: retain this earlier experience as one short line; scope/details pending.
export const earlierExperience = {
  period: "Sep 2022 – Mar 2024",
  title: "Full-stack developer",
  org: "Self-employed",
  type: "Part-time",
  confirmation: "Details to be confirmed.",
};

export interface Credential {
  id: string;
  name: string;
  issuer: string;
  code?: string;
  issued?: string;
  validTo?: string;
  verifyUrl: string | null;
  confirmation?: string;
}
export const certifications: Credential[] = [
  // TODO: add individual credential verification URLs supplied by Mikias.
  {
    id: "ai-102",
    name: "Microsoft Certified: Azure AI Engineer Associate",
    issuer: "Microsoft",
    code: "AI-102",
    issued: "Apr 2026",
    validTo: "Apr 2027",
    verifyUrl: null,
  }, // TODO URL
  {
    id: "datacamp-data-engineer",
    name: "Data Engineer",
    issuer: "DataCamp",
    issued: "Sep 2025",
    verifyUrl: null,
  }, // TODO URL
  {
    id: "datacamp-developers",
    name: "AI Engineer for Developers Associate",
    issuer: "DataCamp",
    verifyUrl: null,
  }, // TODO URL
  {
    id: "datacamp-data-scientists",
    name: "AI Engineer for Data Scientists Associate",
    issuer: "DataCamp",
    verifyUrl: null,
  }, // TODO URL
  // CONFIRM: DP-100 certification status, dates and verification URL before treating it as verified proof.
  {
    id: "dp-100",
    name: "Azure Data Scientist Associate",
    issuer: "Microsoft",
    code: "DP-100",
    verifyUrl: null,
    confirmation: "Certification status to be confirmed.",
  }, // TODO URL
];
export const education = {
  degree: "B.Sc. Information Systems",
  school: "Addis Ababa University",
  period: "Jun 2020 – Jul 2024",
};
// TODO: replace public/MikiasAbate-CV.pdf; outdated dates, LinkedIn and employment claims remain in that binary.
export const cv = {
  url: "/MikiasAbate-CV.pdf",
  filename: "MikiasAbate-CV.pdf",
  outdated: true,
};
