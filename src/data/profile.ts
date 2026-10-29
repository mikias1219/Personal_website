// User-confirmed facts override the outdated downloadable PDF.
import { SITE_URL } from "@/lib/config";

export const site = {
  name: "Mikias Abate",
  role: "Software Developer & AI Engineer",
  url: SITE_URL,
  location: "Addis Ababa, Ethiopia",
  timeZone: "Africa/Addis_Ababa",
  utcOffset: "UTC+3",
  email: "mikiyasabate003@gmail.com",
  availability: "Open to full-time roles and contracts",
  statement:
    "I build full-stack products and the AI inside them. From APIs and interfaces to grounded answers over your data.",
  linkedin: "https://www.linkedin.com/in/mikiasabate/",
  github: "https://github.com/mikias1219",
} as const;

export const socials = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Email", href: `mailto:${site.email}` },
];

export const about = [
  "I’m a software developer and AI engineer based in Addis Ababa. At IE Network Solutions, I work on internal business applications and AI features that connect directly to everyday workflows.",
  "My work spans NestJS APIs, Next.js interfaces, PostgreSQL data, Python services and Azure AI. I’ve built recruitment features for CV extraction and candidate matching, HR copilots, and web and mobile collaboration tools.",
  "I studied Information Systems at Addis Ababa University. I like working across the whole product: understanding the question, shaping the data and building an interface that makes the answer useful.",
];

export const capabilities = [
  {
    title: "AI systems",
    number: "01",
    description:
      "Document retrieval, grounded chat, copilots and AI workflows.",
    projects: ["knowledge-hub", "selamnew-workspace", "banglachatpro"],
  },
  {
    title: "Full-stack products",
    number: "02",
    description: "APIs, interfaces and data models that work together.",
    projects: ["okde", "shop-manager", "delala"],
  },
  {
    title: "Cloud & DevOps",
    number: "03",
    description:
      "Containers, infrastructure as code and automated deployments.",
    projects: ["knowledge-hub", "azure-ai-solution", "cicd-devops-lab"],
  },
];

export const skills = [
  {
    title: "AI & Machine Learning",
    items: [
      "Azure AI Services",
      "Azure Machine Learning",
      "LLM Applications",
      "AI Agents",
      "AI Integration",
      "Python",
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      "NestJS",
      "Node.js",
      "FastAPI",
      "Django",
      "REST API Design",
      "PostgreSQL",
      "MongoDB",
      "Redis",
    ],
  },
  {
    title: "Frontend & Mobile",
    items: [
      "Next.js",
      "React.js",
      "React Native",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Redux",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "Microsoft Azure",
      "Docker",
      "CI/CD",
      "Jenkins",
      "GitHub Actions",
      "Git",
      "Linux",
      "Nginx",
    ],
  },
];
