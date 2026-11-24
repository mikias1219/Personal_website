import { site, skills, about, capabilities } from "@/data/profile";
import {
  experience,
  earlierExperience,
  education,
  certifications,
  cv,
} from "@/data/experience";
import { projects } from "@/data/projects";
import { personalFacts } from "@/data/about-me";
import { absoluteUrl } from "./config";

export interface PortfolioSource {
  label: string;
  href: string;
}

export const portfolioKnowledge = {
  profile: site,
  biography: about,
  additionalFacts: personalFacts,
  skills,
  capabilities,
  experience,
  earlierExperience,
  education,
  credentials: certifications,
  projects: projects.map((p) => ({
    ...p,
    portfolioUrl: absoluteUrl(`/work/${p.slug}`),
    ...(p.private
      ? { note: "Company code in a private repository; no public source link." }
      : {}),
    diagramStatus: p.diagram
      ? "Conceptual overview; not verified production architecture"
      : undefined,
  })),
  documents: {
    cv: {
      url: absoluteUrl(cv.url),
      filename: cv.filename,
      status: cv.outdated ? "Awaiting update" : "Current PDF",
      note: "Website facts below take precedence over any differences in the CV. Never disclose phone numbers. When a visitor asks for the CV, give them the download link immediately.",
    },
    certificationPDFs: certifications.map((c) => ({
      name: c.name,
      url: c.pdfUrl && absoluteUrl(c.pdfUrl),
      provenance: c.pdfKind,
      detailsSource: c.detailsSource,
    })),
  },
  navigation: {
    work: absoluteUrl("/#work"),
    about: absoluteUrl("/#about"),
    skills: absoluteUrl("/#skills"),
    experience: absoluteUrl("/#experience"),
    printExperience: absoluteUrl("/experience"),
    certifications: absoluteUrl("/certifications"),
    contact: absoluteUrl("/#contact"),
    cv: absoluteUrl(cv.url),
  },
};

export function buildSystemPrompt() {
  return `You are Mikias Abate's hiring agent on ${site.url}.
You help recruiters and hiring managers quickly evaluate Mikias. You are not Mikias.

MISSION
- Answer from trusted records only. Never invent facts, metrics, titles, employers, or phone numbers.
- Act like a helpful agent: give the next useful step (CV download, project link, contact, or one clarifying question).
- Keep answers short. Default: 1–3 sentences, or up to 3 short bullets. No long essays.
- First sentence = the answer. No preamble (“Sure!”, “Great question”).
- Third person (“Mikias is…”, “He built…”).
- If asked for the CV / resume: reply with the download link ${absoluteUrl(cv.url)} in the first sentence.
- If a hiring brief is vague, ask one focused clarifying question (role, stack, remote/hybrid, seniority).
- Pending “confirmation” fields stay pending. Keep the exact title “AI GTP”.
- If unknown: one sentence + offer Contact or CV. Never guess.

FORMAT
- Prefer plain sentences and short bullets.
- Include at most 2 links unless asked for more.
- No tables, no giant code blocks, no dumping every project unless asked.

TRUSTED RECORDS:
${JSON.stringify(portfolioKnowledge)}`;
}

const GENERIC_WORDS = new Set([
  "ai",
  "azure",
  "app",
  "apps",
  "management",
  "services",
  "service",
  "platform",
  "solution",
  "system",
  "project",
  "workspace",
  "hub",
  "backend",
  "mobile",
  "engine",
  "developer",
  "builder",
]);

export function questionTokens(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function nearWord(word: string, keyword: string) {
  const w = word.toLowerCase();
  const k = keyword.toLowerCase();
  if (w === k) return true;
  if (w.length < 4 || k.length < 4) return false;
  const max = k.length >= 7 ? 2 : 1;
  if (Math.abs(w.length - k.length) > max) return false;
  const prev = Array.from({ length: k.length + 1 }, (_, i) => i);
  const next = new Array<number>(k.length + 1);
  for (let i = 1; i <= w.length; i++) {
    next[0] = i;
    let best = i;
    for (let j = 1; j <= k.length; j++) {
      next[j] = Math.min(
        prev[j] + 1,
        next[j - 1] + 1,
        prev[j - 1] + (w[i - 1] === k[j - 1] ? 0 : 1),
      );
      if (next[j] < best) best = next[j];
    }
    if (best > max) return false;
    for (let j = 0; j <= k.length; j++) prev[j] = next[j];
  }
  return prev[k.length] <= max;
}

const STOP_TOKENS = new Set([
  "what",
  "when",
  "where",
  "which",
  "while",
  "that",
  "they",
  "them",
  "have",
  "your",
  "yours",
  "about",
  "with",
  "this",
  "there",
  "their",
  "from",
  "tell",
  "more",
  "does",
  "done",
  "like",
  "want",
  "know",
  "give",
  "show",
  "also",
  "some",
]);

export function mentionsTopic(question: string, phrases: string[]) {
  const tokens = questionTokens(question).filter((t) => !STOP_TOKENS.has(t));
  const keywords = phrases.flatMap(questionTokens);
  return tokens.some((t) => keywords.some((k) => nearWord(t, k)));
}

function titleKeys(p: (typeof projects)[number]) {
  const name = p.title.split(" — ")[0];
  const words = name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((v) => v.toLowerCase());
  return [...words, words.join("")];
}

export function projectMatches(question: string) {
  const clean = (v: string) => v.toLowerCase().replace(/[^a-z0-9]/g, "");
  const q = clean(question);
  const tokens = questionTokens(question);
  return projects
    .map((p) => {
      const name = clean(p.title.split(" — ")[0]);
      const slug = clean(p.slug);
      const index = q.indexOf(name);
      if (index >= 0) return { project: p, index, score: 100 + name.length };
      if (q.includes(slug)) return { project: p, index, score: 100 + slug.length };
      const keys = titleKeys(p);
      let hits = 0;
      let strong = false;
      for (const key of keys) {
        if (key.length < 5) continue;
        for (const t of tokens) {
          if (STOP_TOKENS.has(t) || t.length < 4) continue;
          if (!nearWord(t, key)) continue;
          hits++;
          if (!GENERIC_WORDS.has(key)) strong = true;
        }
      }
      return {
        project: p,
        index,
        score: strong || hits >= 2 ? 60 + hits * 5 : 0,
      };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function relatedSources(question: string): PortfolioSource[] {
  const q = question.toLowerCase();
  const matched: PortfolioSource[] = projectMatches(question)
    .slice(0, 2)
    .map(({ project: p }) => ({
      label: p.title,
      href: `/work/${p.slug}`,
    }));
  if (matched.length)
    matched.push({ label: "All selected work", href: "/#work" });
  if (
    /certif|credential|ai.?102|dp.?100|datacamp/.test(q) ||
    mentionsTopic(question, [
      "certifications",
      "certificates",
      "credentials",
      "certified",
    ])
  )
    matched.push({ label: "Certifications & PDFs", href: "/certifications" });
  if (
    /experience|career|role|job|company|intern/.test(q) ||
    mentionsTopic(question, [
      "experience",
      "career",
      "jobs",
      "companies",
      "employment",
      "intern",
    ])
  )
    matched.push({ label: "Experience", href: "/#experience" });
  if (
    /education|degree|university/.test(q) ||
    mentionsTopic(question, [
      "education",
      "degree",
      "university",
      "studied",
      "school",
      "college",
    ])
  )
    matched.push({ label: "Education", href: "/#credentials" });
  if (
    /skills|technolog|tools|stack/.test(q) ||
    mentionsTopic(question, [
      "skills",
      "technologies",
      "tools",
      "stack",
      "languages",
      "programming",
      "libraries",
    ])
  )
    matched.push({ label: "Technical skills", href: "/#skills" });
  if (
    /contact|email|available|availability|hire|linkedin|github|reach|open to work|opportunit/.test(
      q,
    ) ||
    mentionsTopic(question, [
      "contact",
      "email",
      "availability",
      "linkedin",
      "github",
      "resume",
      "hiring",
    ])
  )
    matched.push({ label: "Contact & profiles", href: "/#contact" });
  if (/resume|\bcv\b|curriculum/.test(q) && !/extraction|extract|recruit/.test(q))
    matched.push({ label: "Download CV", href: cv.url });
  if (!matched.length)
    matched.push(
      { label: "Selected work", href: "/#work" },
      { label: "Download CV", href: cv.url },
    );
  return matched
    .filter((s, i, a) => a.findIndex((x) => x.href === s.href) === i)
    .slice(0, 4);
}
