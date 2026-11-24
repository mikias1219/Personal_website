import { skills } from "@/data/profile";
import type { PortfolioSource } from "./portfolio-context";

/** Marker the chat UI puts in front of a pasted job description. */
export const FIT_PREFIX = "Here is a role I’m hiring for.";

export function isFitCheck(text: string) {
  return text.startsWith(FIT_PREFIX);
}

type Term = { label: string; pattern: RegExp };

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const term = (label: string, ...aliases: string[]): Term => ({
  label,
  pattern: new RegExp(
    `(?<![\\w])(?:${[label, ...aliases].map(esc).join("|")})(?![\\w])`,
    "i",
  ),
});

/** Terms Mikias lists in profile data (plus common spellings). */
const have: Term[] = [
  ...skills.flatMap((g) => g.items).map((i) => term(i)),
  term("Azure", "Azure OpenAI", "Microsoft Azure"),
  term("React", "React.js"),
  term("Node", "Node.js", "NodeJS"),
  term("Postgres", "PostgreSQL"),
  term("LLM", "LLMs", "RAG", "large language model"),
  term("REST", "REST API", "RESTful"),
  term("CI/CD", "CICD"),
  term("Next", "Next.js", "NextJS"),
];

/** Common stack terms that are NOT in his records, so gaps are called out honestly. */
const other: Term[] = [
  "Java", "Go", "Golang", "Kotlin", "Swift", "C#", ".NET", "PHP", "Ruby",
  "Rust", "Scala", "AWS", "GCP", "Kubernetes", "Terraform", "GraphQL",
  "Angular", "Vue", "Svelte", "Kafka", "Spark", "Snowflake", "Elasticsearch",
  "Ansible", "Flutter", "Laravel", "Spring",
].map((t) => term(t));

export function fitCheckReply(raw: string): {
  text: string;
  sources: PortfolioSource[];
} {
  const jd = raw.slice(FIT_PREFIX.length);
  const hits = new Map<string, string>();
  for (const t of have) if (t.pattern.test(jd)) hits.set(t.label.toLowerCase(), t.label);
  // Collapse aliases that are just substrings of a longer matched label.
  const matched = [...hits.values()].filter(
    (l) => ![...hits.values()].some((o) => o !== l && o.length > l.length && o.toLowerCase().startsWith(l.toLowerCase())),
  );
  const gaps = other.filter((t) => t.pattern.test(jd)).map((t) => t.label);

  const lines = ["**Quick fit check** (keyword match against Mikias’s confirmed skills)"];
  if (matched.length)
    lines.push(`**Matches in his records:** ${matched.slice(0, 14).join(", ")}.`);
  else
    lines.push("I couldn’t find direct keyword matches. Paste the key requirements as a list for a better read.");
  if (gaps.length)
    lines.push(`**Not listed in his records:** ${gaps.join(", ")}. Worth asking him directly.`);
  lines.push(
    "This is a keyword comparison only. It says nothing about seniority, salary, or availability beyond what he has published. Email him to confirm the details.",
  );
  return {
    text: lines.join("\n\n"),
    sources: [
      { label: "Contact", href: "/#contact" },
      { label: "Skills", href: "/#skills" },
      { label: "Download CV", href: "/Mikias_Abate_CV.pdf" },
    ],
  };
}
