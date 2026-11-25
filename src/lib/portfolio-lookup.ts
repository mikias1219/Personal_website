import { site, skills, about } from "@/data/profile";
import {
  experience,
  earlierExperience,
  education,
  certifications,
  cv,
} from "@/data/experience";
import { projects, type Project, featuredProjects } from "@/data/projects";
import { personalFacts } from "@/data/about-me";
import { contextualQuestion, type ChatTurn } from "./chat-history";
import {
  mentionsTopic,
  projectMatches,
  questionTokens,
  relatedSources,
  type PortfolioSource,
} from "./portfolio-context";

export interface PortfolioReply {
  text: string;
  sources: PortfolioSource[];
}

function shortRole(r: (typeof experience)[number]) {
  const bits = [`**${r.title}** at ${r.org} (${r.period})`];
  if (r.points[0]) bits.push(r.points[0]);
  if (r.confirmation) bits.push(`Pending confirmation: ${r.confirmation}`);
  return bits.join(" — ");
}

function shortProject(p: Project) {
  const parts = [`**${p.title}** — ${p.summary}`];
  if (p.stack?.length) parts.push(`Stack: ${p.stack.slice(0, 5).join(", ")}.`);
  const links = [
    p.caseStudy && `[Case study](/work/${p.slug})`,
    p.githubLink && `[GitHub](${p.githubLink})`,
    p.demoLink && `[Demo](${p.demoLink})`,
  ].filter(Boolean);
  if (links.length) parts.push(links.join(" · "));
  return parts.join("\n");
}

function shortCredential(c: (typeof certifications)[number]) {
  return `**${c.name.replace("Microsoft Certified: ", "")}** (${c.issuer}${c.code ? `, ${c.code}` : ""}) — [Verify](${c.verifyUrl})${c.pdfUrl ? ` · [PDF](${c.pdfUrl})` : ""}`;
}

/** Structured, deterministic answers over saved facts. Never presented as model-generated. */
export function portfolioLookup(
  question: string,
  history: ChatTurn[] = [],
): PortfolioReply {
  const current = question.toLowerCase();
  const context = contextualQuestion(question, history);
  const q = context.toLowerCase();

  if (/^(hi|hello|hey|thanks|thank you)[\s!.?]*$/.test(current)) {
    return {
      text: `Hi — I can help you evaluate Mikias quickly. Ask about his role, projects, stack, certifications, or say **download CV**.`,
      sources: [
        { label: "Download CV", href: cv.url },
        { label: "Selected work", href: "/#work" },
      ],
    };
  }

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  const exactFact = personalFacts.find(
    (f) => normalize(f.question) === normalize(question),
  );
  if (exactFact) {
    return {
      text: exactFact.answer,
      sources: relatedSources(question),
    };
  }

  // Agent action: CV download
  if (
    (/resume|\bcv\b|curriculum/.test(current) &&
      !/extraction|extract|recruit/.test(current)) ||
    /download.*(cv|resume)|send.*(cv|resume)|get.*(cv|resume)/.test(current)
  ) {
    return {
      text: `Here's Mikias's CV: [Download CV](${cv.url}).\n\nWant a short fit check for a role? Paste the job title or stack.`,
      sources: [
        { label: "Download CV", href: cv.url },
        { label: "Contact", href: "/#contact" },
      ],
    };
  }

  // Agent action: fit check — ask one clarifying question
  if (
    /fit check|fits? my role|hiring brief|paste.*(job|role)|check if mikias fits/.test(
      current,
    )
  ) {
    return {
      text: `Happy to help. What's the role title and must-have stack (e.g. NestJS, Next.js, Azure AI)? Remote/hybrid preference optional.`,
      sources: [
        { label: "Download CV", href: cv.url },
        { label: "Selected work", href: "/#work" },
        { label: "Contact", href: "/#contact" },
      ],
    };
  }

  // Documented availability / remote preference from CV-backed site.availability
  if (
    /remote|hybrid|open to work|availability|available|hire|hiring/.test(
      current,
    ) &&
    !/visa|sponsor|salary|notice|relocat/.test(current)
  ) {
    return {
      text: `${site.availability}. Based in ${site.location} (${site.utcOffset}).\n\n[Email](mailto:${site.email}) · [Download CV](${cv.url}) · [Contact form](/#contact)`,
      sources: [
        { label: "Contact", href: "/#contact" },
        { label: "Download CV", href: cv.url },
      ],
    };
  }

  if (
    /relocat|visa|sponsor|salary|compensat|notice period|start date|when can (he|you) start|work authori|speak|spoken language|fluent in|mother tongue|hobbies|interests outside/.test(
      current,
    )
  ) {
    return {
      text: `That detail isn't documented here. ${site.availability}. [Contact Mikias](/#contact) or [download his CV](${cv.url}).`,
      sources: [
        { label: "Contact Mikias", href: "/#contact" },
        { label: "Download CV", href: cv.url },
      ],
    };
  }

  let matched = projectMatches(context).map((m) => m.project);
  const direct = projectMatches(question).map((m) => m.project);
  if (direct.length) matched = direct;

  const ordinal = current.match(/\b(first|second|third)\b/);
  if (ordinal && history.length) {
    const previous =
      history.filter((m) => m.role === "assistant").at(-1)?.content || "";
    const ordered = projectMatches(previous)
      .sort((a, b) => a.index - b.index)
      .map((m) => m.project);
    const index = ["first", "second", "third"].indexOf(ordinal[1]);
    if (ordered[index]) matched = [ordered[index]];
  }

  const relevant = context !== question && !direct.length ? q : current;
  const all =
    /\b(everything|full profile|complete profile|all your data)\b|tell me about (yourself|you|mikias)|who (are you|is mikias)/.test(
      current,
    ) ||
    mentionsTopic(current, [
      "everything",
      "yourself",
      "background",
      "biography",
      "overview",
    ]);

  if (all || /background|biography|about mikias/.test(current)) {
    const currentRole = experience.find((r) => r.current) ?? experience[0];
    return {
      text: `${about[0]}\n\nCurrently **${currentRole.title}** at ${currentRole.org}. Strongest work: ${featuredProjects
        .slice(0, 3)
        .map((p) => p.title)
        .join(", ")}.\n\n[Download CV](${cv.url}) · [Work](/#work) · [Contact](/#contact)`,
      sources: relatedSources("about mikias cv"),
    };
  }

  const wantsProjects =
    !!matched.length ||
    /\b(projects?|built|applications?|products?|rag|copilot|azure|mobile|devops)\b/.test(
      current,
    ) ||
    mentionsTopic(current, [
      "projects",
      "built",
      "applications",
      "products",
      "made",
      "developed",
      "created",
    ]);
  const wantsRoles =
    /experience|career|\broles?\b|current|currently|\bjobs?\b|company|where.*work|work at|junior|intern|atlas|\bgtp\b|self.employ|prodigy|product engineer/.test(
      matched.length ? current : relevant,
    ) ||
    mentionsTopic(relevant, [
      "experience",
      "career",
      "jobs",
      "companies",
      "employment",
      "internship",
      "worked",
      "position",
    ]);
  const wantsCredentials =
    /certif|credential|ai.?102|dp.?100|datacamp/.test(
      matched.length ? current : relevant,
    ) ||
    mentionsTopic(relevant, [
      "certifications",
      "certificates",
      "credentials",
      "certified",
    ]);
  const wantsEducation =
    /education|degree|university|studied|graduate/.test(current) ||
    mentionsTopic(current, [
      "education",
      "degree",
      "university",
      "studied",
      "school",
      "college",
      "graduated",
    ]);
  const wantsSkills =
    !matched.length &&
    (/skills|stack|technolog|tools|frameworks|programming/.test(relevant) ||
      mentionsTopic(relevant, [
        "skills",
        "technologies",
        "tools",
        "stack",
        "frameworks",
        "programming",
      ]));
  const wantsContact =
    /contact|email|reach|hire|location|based|time.?zone|linkedin|github/.test(
      current,
    ) ||
    mentionsTopic(current, [
      "contact",
      "email",
      "reach",
      "hire",
      "hiring",
      "timezone",
      "linkedin",
      "github",
    ]);

  const lines: string[] = [];

  if (wantsRoles) {
    let roles = experience;
    if (/\bgtp\b/.test(current))
      roles = experience.filter((r) => r.title === "AI GTP");
    else if (/atlas/.test(current))
      roles = experience.filter((r) => r.org === "Atlas Group");
    else if (/prodigy/.test(current))
      roles = experience.filter((r) => r.org === "Prodigy InfoTech");
    else if (/junior/.test(current))
      roles = experience.filter((r) => r.title === "Junior AI Engineer");
    else if (
      /current|currently/.test(current) &&
      !/all|career|history|previous/.test(current)
    )
      roles = experience.filter((r) => r.current);
    else if (!/all|career|history|previous|timeline/.test(current))
      roles = experience.slice(0, 3);
    lines.push(roles.map(shortRole).join("\n\n"));
    if (/self.employ|2022/.test(current)) {
      lines.push(
        `Earlier: ${earlierExperience.title} · ${earlierExperience.org} · ${earlierExperience.period}.`,
      );
    }
  }

  if (wantsProjects) {
    let chosen = matched;
    if (
      !chosen.length ||
      /all.*projects|every.*project|complete.*project/.test(current)
    ) {
      chosen = projects;
      if (!/all.*projects|every.*project|complete.*project/.test(current)) {
        if (/azure/.test(current))
          chosen = projects.filter((p) =>
            p.stack?.some((s) => /azure/i.test(s)),
          );
        else if (/\bai\b|rag|copilot/.test(current))
          chosen = projects.filter((p) => p.categories.includes("AI & LLM"));
        else if (/mobile/.test(current))
          chosen = projects.filter((p) => p.categories.includes("Mobile"));
        else if (/devops/.test(current))
          chosen = projects.filter((p) => p.categories.includes("DevOps"));
        else chosen = featuredProjects;
      }
    }
    if (chosen.length > 4 && !/all|every|complete/.test(current))
      chosen = chosen.slice(0, 4);
    if (!chosen.length) {
      // Curated list has no project in that category: say so, then answer from skills.
      const mobile = skills.find((s) => /mobile/i.test(s.title));
      lines.push(
        /mobile/.test(current) && mobile
          ? `None of his four featured projects is mobile-focused. His mobile skills are **${mobile.items.join(", ")}**. Ask him about mobile work directly via [Contact](/#contact).`
          : "None of his four featured projects falls in that category. See [Work](/#work) for the full selection.",
      );
    } else lines.push(chosen.map((p) => shortProject(p)).join("\n\n"));
  }

  if (wantsSkills) {
    lines.push(
      skills
        .map((s) => `**${s.title}:** ${s.items.slice(0, 6).join(", ")}`)
        .join("\n"),
    );
  }

  if (wantsEducation) {
    lines.push(
      `**${education.degree}** — ${education.school} (${education.period}).`,
    );
  }

  if (wantsCredentials) {
    let selected = certifications;
    if (/dp.?100|azure data scientist/.test(current) && !/all|every|both/.test(current))
      selected = certifications.filter((c) => c.code === "DP-100");
    else if (/ai.?102/.test(current) && !/all|every|both/.test(current))
      selected = certifications.filter((c) => c.code === "AI-102");
    else if (/datacamp/.test(current) && !/all|every|microsoft/.test(current))
      selected = certifications.filter((c) => c.issuer === "DataCamp");
    else if (/microsoft/.test(current) && !/all|every|datacamp/.test(current))
      selected = certifications.filter((c) => c.issuer === "Microsoft");
    else if (!/all|every|both/.test(current)) selected = certifications.slice(0, 3);
    lines.push(selected.map(shortCredential).join("\n"));
  }

  if (wantsContact) {
    lines.push(
      `${site.availability}. ${site.location} (${site.utcOffset}).\n[Email](mailto:${site.email}) · [LinkedIn](${site.linkedin}) · [GitHub](${site.github}) · [Download CV](${cv.url})`,
    );
  }

  const FACT_STOP = new Set([
    "what",
    "when",
    "where",
    "which",
    "does",
    "have",
    "about",
    "with",
    "from",
    "your",
    "yours",
    "tell",
    "more",
    "this",
    "that",
  ]);
  const factTokens = questionTokens(current).filter(
    (t) => t.length > 3 && !FACT_STOP.has(t),
  );
  const facts = personalFacts.filter((f) => {
    const keys = questionTokens(f.question).filter(
      (t) => t.length > 3 && !FACT_STOP.has(t),
    );
    const hits = keys.filter((k) => factTokens.includes(k)).length;
    return hits >= Math.min(2, keys.length);
  });
  // Avoid stacking the same answer twice when structured sections already replied.
  if (facts.length && !lines.length)
    lines.push(facts.map((f) => f.answer).join("\n\n"));

  if (!lines.length) {
    return {
      text: `I don't have that in Mikias's portfolio records. Try projects, experience, skills, certifications — or [download his CV](${cv.url}) / [contact him](/#contact).`,
      sources: [
        { label: "Contact Mikias", href: "/#contact" },
        { label: "Download CV", href: cv.url },
      ],
    };
  }

  return { text: lines.join("\n\n"), sources: relatedSources(context) };
}
