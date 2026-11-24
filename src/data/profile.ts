// User-confirmed facts override the outdated downloadable PDF.
import { SITE_URL } from "@/lib/config";

export const site = {
  name: "Mikias Abate",
  role: "Tech / Product Engineer",
  url: SITE_URL,
  location: "Addis Ababa, Ethiopia",
  timeZone: "Africa/Addis_Ababa",
  utcOffset: "UTC+3",
  email: "mikiyasabate003@gmail.com",
  availability: "Open to full-time remote or hybrid roles worldwide",
  headline: "I build full-stack products and the AI inside them.",
  statement:
    "NestJS APIs, Next.js web, React Native mobile, and Azure AI wired into tools teams already use.",
  linkedin: "https://www.linkedin.com/in/mikiasabate/",
  github: "https://github.com/mikias1219",
} as const;

export const socials = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Email", href: `mailto:${site.email}` },
];

export const about = [
  "I’m a tech / product engineer based in Addis Ababa. At IE Network Solutions I own feature scope, delivery and release readiness across internal products.",
  "I ship NestJS APIs, Next.js web and React Native mobile end to end, and integrate Azure AI — copilots, document intelligence and explainable matching — into tools teams already use.",
  "I studied Information Systems at Addis Ababa University. I’m open to full-time remote or hybrid roles worldwide.",
];

export const capabilities = [
  {
    title: "AI systems",
    number: "01",
    description:
      "Document retrieval, grounded chat, copilots and AI workflows.",
    projects: ["okde", "azure-ai-solution"],
  },
  {
    title: "Full-stack products",
    number: "02",
    description: "APIs, interfaces and data models that work together.",
    projects: ["selamnew-collaboration", "workforce-intelligence", "shop-manager"],
  },
  {
    title: "Cloud & DevOps",
    number: "03",
    description:
      "Containers, infrastructure as code and automated deployments.",
    projects: ["azure-ai-solution", "workforce-intelligence"],
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
