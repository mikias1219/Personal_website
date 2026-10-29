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
  issuer: "Microsoft" | "DataCamp";
  code?: string;
  issued?: string;
  validTo?: string;
  credentialId?: string;
  certificationNumber?: string;
  level: "Associate" | "Career certification";
  category: "AI engineering" | "Machine learning" | "Data engineering";
  summary: string;
  skills: string[];
  status: "Active" | "Expired" | "Pending";
  verifyUrl: string;
  recordUrl?: string;
  pdfUrl?: string;
  previewUrl?: string;
  pdfKind?: "issuer-record-print" | "issuer-original";
  detailsSource: string;
  confirmation?: string;
}
// Microsoft records checked 29 Oct 2026. DataCamp dates/IDs match Mikias's
// public LinkedIn profile; DataCamp blocks automated certificate access.
export const certifications: Credential[] = [
  {
    id: "ai-102",
    name: "Microsoft Certified: Azure AI Engineer Associate",
    issuer: "Microsoft",
    code: "AI-102",
    issued: "Apr 8, 2026",
    validTo: "Apr 9, 2027",
    credentialId: "9CBA5A4FC0E8DBE8",
    certificationNumber: "04AAEK-B04657",
    level: "Associate",
    category: "AI engineering",
    status: "Active",
    summary:
      "Azure AI solutions across generative AI, agents, computer vision, natural language processing and knowledge mining.",
    skills: [
      "Plan and manage Azure AI solutions",
      "Generative AI",
      "Agentic solutions",
      "Computer vision",
      "Natural language processing",
      "Knowledge mining and information extraction",
    ],
    verifyUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/mikiasabate-1946/9CBA5A4FC0E8DBE8?sharingId=ED5C9A47B84A3590",
    recordUrl:
      "https://learn.microsoft.com/en-us/users/mikiasabate-1946/credentials/9CBA5A4FC0E8DBE8",
    pdfUrl: "/certificates/microsoft-azure-ai-engineer-associate.pdf",
    previewUrl: "/certificates/microsoft-azure-ai-engineer-associate.webp",
    pdfKind: "issuer-record-print",
    detailsSource: "Microsoft Learn public credential record",
  },
  {
    id: "dp-100",
    name: "Microsoft Certified: Azure Data Scientist Associate",
    issuer: "Microsoft",
    code: "DP-100",
    issued: "Jun 2, 2025",
    validTo: "Jun 3, 2027",
    credentialId: "E13F0127DECF94B4",
    certificationNumber: "AE5516-EBF6EL",
    level: "Associate",
    category: "Machine learning",
    status: "Active",
    summary:
      "Designing machine-learning solutions, running experiments, training and deploying models, and optimizing language models on Azure.",
    skills: [
      "Design and prepare machine-learning solutions",
      "Data exploration and experiments",
      "Model training and deployment",
      "Language-model optimization",
    ],
    verifyUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/mikiasabate-1946/E13F0127DECF94B4?sharingId=ED5C9A47B84A3590",
    recordUrl:
      "https://learn.microsoft.com/en-us/users/mikiasabate-1946/credentials/E13F0127DECF94B4",
    pdfUrl: "/certificates/microsoft-azure-data-scientist-associate.pdf",
    previewUrl: "/certificates/microsoft-azure-data-scientist-associate.webp",
    pdfKind: "issuer-record-print",
    detailsSource: "Microsoft Learn public credential record",
  },
  {
    id: "datacamp-data-engineer",
    name: "Data Engineer",
    issuer: "DataCamp",
    credentialId: "DE0012274611368",
    issued: "Sep 2025",
    validTo: "Sep 2027",
    level: "Career certification",
    category: "Data engineering",
    status: "Active",
    summary:
      "Making data usable through data management, analysis and programming for engineering.",
    skills: [
      "Data management",
      "Exploratory analysis",
      "Programming for engineering",
    ],
    verifyUrl: "https://www.datacamp.com/certificate/DE0012274611368",
    detailsSource: "User-provided credential link and public LinkedIn record",
    // TODO: attach the original DataCamp PDF; automated downloads are blocked.
  },
  {
    id: "datacamp-data-engineer-associate",
    name: "Data Engineer Associate",
    issuer: "DataCamp",
    credentialId: "DEA0012533890898",
    issued: "Aug 2025",
    validTo: "Aug 2027",
    level: "Associate",
    category: "Data engineering",
    status: "Active",
    summary:
      "Associate-level data-engineering certification focused on data management and engineering foundations.",
    skills: ["Data management", "Data-engineering foundations"],
    verifyUrl: "https://www.datacamp.com/certificate/DEA0012533890898",
    detailsSource: "User-provided credential link and public LinkedIn record",
    // TODO: attach the original DataCamp PDF; automated downloads are blocked.
  },
  {
    id: "datacamp-developers",
    name: "AI Engineer for Developers Associate",
    issuer: "DataCamp",
    credentialId: "AIEDA0015379738598",
    issued: "Aug 2025",
    validTo: "Aug 2027",
    level: "Associate",
    category: "AI engineering",
    status: "Active",
    summary:
      "Building AI-powered applications with programming, model development and responsible AI practices.",
    skills: [
      "Programming for AI",
      "Model development",
      "Data governance for AI",
    ],
    verifyUrl: "https://www.datacamp.com/certificate/AIEDA0015379738598",
    detailsSource: "User-provided credential link and public LinkedIn record",
    // TODO: attach the original DataCamp PDF; automated downloads are blocked.
  },
  {
    id: "datacamp-data-scientists",
    name: "AI Engineer for Data Scientists Associate",
    issuer: "DataCamp",
    credentialId: "AEDS0019404147147",
    issued: "Aug 2025",
    validTo: "Aug 2027",
    level: "Associate",
    category: "AI engineering",
    status: "Active",
    summary:
      "AI data-science foundations across data management, exploratory analysis, model development and governance.",
    skills: [
      "Data management",
      "Exploratory analysis",
      "Model development for AI",
      "Data governance for AI",
    ],
    verifyUrl: "https://www.datacamp.com/certificate/AEDS0019404147147",
    detailsSource: "User-provided credential link and public LinkedIn record",
    // TODO: attach the original DataCamp PDF; automated downloads are blocked.
  },
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
