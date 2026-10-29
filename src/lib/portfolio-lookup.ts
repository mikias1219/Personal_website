import { site, skills } from "@/data/profile";
import {
  experience,
  earlierExperience,
  education,
  certifications,
} from "@/data/experience";
import { projects } from "@/data/projects";
import type { PortfolioSource } from "./portfolio-context";
export interface PortfolioReply {
  text: string;
  sources: PortfolioSource[];
}
/** Honest, deterministic fallback over the same public records as the AI prompt. */
export function portfolioLookup(question: string): PortfolioReply {
  const q = question.toLowerCase();
  const section = (
    text: string,
    label: string,
    id: string,
  ): PortfolioReply => ({ text, sources: [{ label, href: `/#${id}` }] });
  if (/\bgtp\b/.test(q)) {
    const role = experience.find((r) => r.title === "AI GTP")!;
    return section(
      `${role.title}, ${role.org} (${role.period}, ${role.location}). The title expansion and role description are awaiting confirmation.`,
      "Experience",
      "experience",
    );
  }
  if (/atlas/.test(q)) {
    const role = experience.find((r) => r.org === "Atlas Group")!;
    return section(
      `${role.title}, ${role.org} (${role.period}). ${role.points.join(" ")} Engagement details are awaiting confirmation.`,
      "Experience",
      "experience",
    );
  }
  if (/self.employ|freelanc.*2022/.test(q))
    return section(
      `${earlierExperience.title}, ${earlierExperience.org}, ${earlierExperience.type} (${earlierExperience.period}). Details are awaiting confirmation.`,
      "Experience",
      "experience",
    );
  const clean = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const match = projects.find(
    (p) =>
      clean(q).includes(clean(p.title.split(" — ")[0])) || q.includes(p.slug),
  );
  if (match)
    return {
      text: `${match.title}: ${match.summary}${match.stack?.length ? ` Stack: ${match.stack.join(", ")}.` : ""}`,
      sources: [
        {
          label: match.title,
          href: match.caseStudy
            ? `/work/${match.slug}`
            : match.githubLink || "/#work",
        },
      ],
    };
  if (/current|job|role|company|where.*work/.test(q)) {
    const role = experience[0];
    return section(
      `Mikias is a ${role.title} at ${role.org} (${role.period}). ${role.points[0]}`,
      "Experience",
      "experience",
    );
  }
  if (/experience|career|background/.test(q))
    return section(
      experience
        .slice(0, 2)
        .map((r) => `${r.title}, ${r.org} (${r.period}). ${r.points[0]}`)
        .join(" "),
      "Full experience",
      "experience",
    );
  if (/education|degree|university|studied|study/.test(q))
    return section(
      `${education.degree}, ${education.school} (${education.period}).`,
      "Education",
      "credentials",
    );
  if (/dp.?100/.test(q))
    return section(
      certifications
        .filter((c) => c.code === "DP-100")
        .map(
          (c) =>
            `${c.name}: ${c.status}. Issued ${c.issued}; valid to ${c.validTo}.`,
        )
        .join(" "),
      "Credentials",
      "credentials",
    );
  if (/certif|credential|ai.?102|datacamp/.test(q))
    return section(
      certifications
        .filter((c) => !c.confirmation)
        .map(
          (c) =>
            `${c.name} (${c.issuer}${c.issued ? `, issued ${c.issued}` : ""}${c.validTo ? `, valid to ${c.validTo}` : ""}).`,
        )
        .join(" "),
      "Credentials",
      "credentials",
    );
  if (/skills|stack|technolog|tools|programming/.test(q))
    return section(
      skills.map((s) => `${s.title}: ${s.items.join(", ")}.`).join(" "),
      "Technical skills",
      "skills",
    );
  if (/azure|\bai\b|rag|copilot/.test(q)) {
    const selected = projects.filter((p) =>
      ["knowledge-hub", "selamnew-workspace"].includes(p.slug),
    );
    return {
      text: selected.map((p) => `${p.title}: ${p.summary}`).join(" "),
      sources: selected.map((p) => ({
        label: p.title,
        href: `/work/${p.slug}`,
      })),
    };
  }
  if (
    /available|availability|contact|email|hire|time.?zone|location|based/.test(
      q,
    )
  )
    return section(
      `${site.availability}. Based in ${site.location} (${site.utcOffset}). Email: ${site.email}.`,
      "Contact",
      "contact",
    );
  if (/^(hi|hello|hey|thanks|thank you)[\s!.?]*$/.test(q))
    return section(
      `Hello! I can help you explore ${site.name}'s projects, experience, credentials and skills.`,
      "Explore the work",
      "work",
    );
  return section(
    `I don't have that information. You can contact Mikias at ${site.email} or use the contact section.`,
    "Contact Mikias",
    "contact",
  );
}
