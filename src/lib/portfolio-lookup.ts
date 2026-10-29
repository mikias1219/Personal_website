import { site, skills, about } from "@/data/profile";
import { experience, earlierExperience, education, certifications, cv } from "@/data/experience";
import { projects, type Project } from "@/data/projects";
import { contextualQuestion, type ChatTurn } from "./chat-history";
import { mentionsTopic, projectMatches, relatedSources, type PortfolioSource } from "./portfolio-context";
export interface PortfolioReply { text: string; sources: PortfolioSource[]; }
const roleText = (r: typeof experience[number]) => `### ${r.title} — ${r.org}\n${r.period}${r.location ? ` · ${r.location}` : ""}\n\n${r.points.map(p=>`- ${p}`).join("\n")}${r.confirmation ? `\n\nDetails awaiting confirmation: ${r.confirmation}` : ""}`;
const credentialText = (c: typeof certifications[number]) => `### ${c.name}\n- **Issuer:** ${c.issuer}\n- **Issued:** ${c.issued}\n- **Valid until:** ${c.validTo}\n- **Credential ID:** ${c.credentialId}${c.certificationNumber ? `\n- **Certification number:** ${c.certificationNumber}` : ""}\n- **Recorded status:** ${c.status}\n\n${c.summary}\n\n**Areas covered:** ${c.skills.join(", ")}.\n\n[Verify with ${c.issuer}](${c.verifyUrl})${c.pdfUrl ? ` · [Download certificate PDF](${c.pdfUrl})` : ""}`;
function projectText(p: Project, architecture: boolean) {
  return `### ${p.title}\n${p.summary}${p.role ? `\n\n**Recorded role:** ${p.role}` : ""}${p.stack?.length ? `\n\n**Technologies:** ${p.stack.join(", ")}.` : ""}${p.outcome && p.outcome !== p.summary ? `\n\n**Documented outcome:** ${p.outcome}` : ""}${architecture ? `\n\n**Architecture information:** ${p.diagram?.length ? `${p.diagram.join(" → ")}. This is a conceptual overview of recorded capabilities. Verified deployment topology, detailed design decisions and infrastructure measurements are not documented.` : "A verified architecture diagram and detailed implementation decisions have not been supplied."}` : ""}\n\n${[p.caseStudy && `[Project details](/work/${p.slug})`,p.githubLink && `[GitHub repository](${p.githubLink})`,p.demoLink && `[Live demo](${p.demoLink})`].filter(Boolean).join(" · ") || "A public repository or demo has not been supplied. The project is listed in the [complete archive](/#all-projects)."}`;
}
/** Structured, deterministic answers over saved facts. Never presented as model-generated. */
export function portfolioLookup(question: string, history: ChatTurn[] = []): PortfolioReply {
  const current = question.toLowerCase();
  const context = contextualQuestion(question, history);
  const q = context.toLowerCase();
  const sections: string[] = [];
  const all = /\b(everything|full profile|complete profile|all your data)\b|tell me about (yourself|you|mikias)|who (are you|is mikias)/.test(current) || mentionsTopic(current,["everything","yourself","background","biography","overview"]);
  if (/^(hi|hello|hey|thanks|thank you)[\s!.?]*$/.test(current)) return { text:`Hello! I can help you explore ${site.name}'s projects, experience, technical skills, education and certifications. Ask a specific question, request a detailed overview, or follow up on an earlier answer.`,sources:relatedSources("work experience") };
  let matched = projectMatches(context).map(m=>m.project);
  const direct = projectMatches(question).map(m=>m.project);
  if (direct.length) matched = direct;
  const ordinal = current.match(/\b(first|second|third)\b/);
  if (ordinal && history.length) {
    const previous = history.filter(m=>m.role === "assistant").at(-1)?.content || "";
    const ordered = projectMatches(previous).sort((a,b)=>a.index-b.index).map(m=>m.project);
    const index = ["first","second","third"].indexOf(ordinal[1]);
    if (ordered[index]) matched = [ordered[index]];
  }
  const relevant = context !== question && !direct.length ? q : current;
  const wantsProjects = all || !!matched.length || /\b(projects?|built|applications?|products?|rag|copilot|azure|mobile|devops)\b/.test(current) || mentionsTopic(current,["projects","built","applications","products","made","developed","created"]);
  const wantsRoles = all || /experience|career|\broles?\b|current|currently|\bjobs?\b|company|where.*work|work at|junior|intern|atlas|\bgtp\b|self.employ|prodigy/.test(matched.length ? current : relevant) || mentionsTopic(relevant,["experience","career","jobs","companies","employment","internship","worked","position"]);
  const wantsCredentials = all || /certif|credential|ai.?102|dp.?100|datacamp/.test(matched.length ? current : relevant) || mentionsTopic(relevant,["certifications","certificates","credentials","certified"]);
  const wantsEducation = all || /education|degree|university|studied|graduate/.test(current) || mentionsTopic(current,["education","degree","university","studied","school","college","graduated"]);
  const wantsSkills = all || (!matched.length && (/skills|stack|technolog|tools|languages|frameworks|programming/.test(relevant) || mentionsTopic(relevant,["skills","technologies","tools","stack","languages","frameworks","programming"])));
  const wantsContact = /contact|email|reach|hire|availability|available|location|based|time.?zone|linkedin|github|resume|download.*cv|\byour cv\b/.test(current) || mentionsTopic(current,["contact","email","reach","hire","hiring","availability","timezone","linkedin","github","resume"]);
  if (all || /background|biography|about mikias/.test(current)) sections.push(`## About ${site.name}\n${about.join("\n\n")}`);
  if (wantsRoles) {
    let roles = experience;
    if (/\bgtp\b/.test(current)) roles = experience.filter(r=>r.title === "AI GTP");
    else if (/atlas/.test(current)) roles = experience.filter(r=>r.org === "Atlas Group");
    else if (/prodigy/.test(current)) roles = experience.filter(r=>r.org === "Prodigy InfoTech");
    else if (/junior/.test(current)) roles = experience.filter(r=>r.title === "Junior AI Engineer");
    else if (/current|currently/.test(current) && !/all|career|history|previous/.test(current)) roles = experience.filter(r=>r.current);
    sections.push(`## Experience\n${roles.map(roleText).join("\n\n")}${roles.length === experience.length || /self.employ|2022/.test(current) ? `\n\n**Earlier experience:** ${earlierExperience.title} · ${earlierExperience.org} · ${earlierExperience.type} · ${earlierExperience.period}. Details awaiting confirmation. ` : ""}`);
  }
  if (wantsProjects) {
    let chosen = matched;
    if (!chosen.length || all || /all.*projects|every.*project|complete.*project/.test(current)) {
      chosen = projects;
      if (!all && !/all.*projects|every.*project|complete.*project/.test(current)) {
        if (/azure/.test(current)) chosen = projects.filter(p=>p.stack?.some(s=>/azure/i.test(s)));
        else if (/\bai\b|rag|copilot/.test(current)) chosen = projects.filter(p=>p.categories.includes("AI & LLM"));
        else if (/mobile/.test(current)) chosen = projects.filter(p=>p.categories.includes("Mobile"));
        else if (/devops/.test(current)) chosen = projects.filter(p=>p.categories.includes("DevOps"));
      }
    }
    sections.push(`## ${chosen.length === 1 ? "Project details" : `Projects (${chosen.length})`}\n${chosen.map(p=>projectText(p,/architect|design|implement|how.*work/.test(current))).join("\n\n")}`);
  }
  if (wantsSkills) sections.push(`## Technical skills\n${skills.map(s=>`### ${s.title}\n${s.items.join(", ")}.`).join("\n\n")}`);
  if (wantsEducation) sections.push(`## Education\n**${education.degree}**\n${education.school} · ${education.period}`);
  if (wantsCredentials) {
    let selected = certifications;
    if (/dp.?100|azure data scientist/.test(current) && !/all|every|both/.test(current)) selected = certifications.filter(c=>c.code === "DP-100");
    else if (/ai.?102/.test(current) && !/all|every|both/.test(current)) selected = certifications.filter(c=>c.code === "AI-102");
    else if (/datacamp/.test(current) && !/all|every|microsoft/.test(current)) selected = certifications.filter(c=>c.issuer === "DataCamp");
    else if (/microsoft/.test(current) && !/all|every|datacamp/.test(current)) selected = certifications.filter(c=>c.issuer === "Microsoft");
    sections.push(`## Certifications\n${selected.map(credentialText).join("\n\n")}`);
  }
  if (wantsContact || all) sections.push(`## Contact & CV\n${site.availability}. Based in ${site.location} (${site.utcOffset}).\n\n[Email Mikias](mailto:${site.email}) · [LinkedIn](${site.linkedin}) · [GitHub](${site.github}) · [Download CV](${cv.url})`);
  if (!sections.length) return {text:`I don't have that information in Mikias's portfolio. I can answer questions about his documented projects, experience, skills, education and certifications. If you mean a project from our conversation, tell me which one or ask a follow-up with its name. For other details, [contact Mikias](/#contact).`,sources:[{label:"Contact Mikias",href:"/#contact"}]};
  return {text:sections.join("\n\n"),sources:relatedSources(context)};
}
