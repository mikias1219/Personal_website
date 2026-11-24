import test from "node:test";
import assert from "node:assert/strict";
import { portfolioLookup } from "../src/lib/portfolio-lookup";
import { site } from "../src/data/profile";
import { experience, certifications, education, cv } from "../src/data/experience";

const notDocumented = /don.t have that|not documented|isn.t documented|not been supplied|awaiting confirmation|pending confirmation/i;

function answer(q: string) {
  return portfolioLookup(q);
}

const questions: Array<{
  q: string;
  expect: RegExp | "contact-fallback";
  note?: string;
}> = [
  { q: "Who is Mikias?", expect: /Tech \/ Product Engineer|IE Network|Addis/i },
  { q: "who is mikias abate", expect: /Mikias|Tech|Addis|IE Network/i },
  { q: "What’s his current role?", expect: /Tech \/ Product Engineer/i },
  { q: "Where does he work now?", expect: /IE Network Solutions/i },
  {
    q: "Where did Mikias go to university?",
    expect: /Addis Ababa University|Information Systems/i,
  },
  { q: "Where is he based?", expect: /Addis Ababa/i },
  { q: "What timezone is he in?", expect: /UTC\+3|Addis/i },
  { q: "Is he open to work?", expect: /Open to full-time remote or hybrid/i },
  { q: "How do I contact him?", expect: /mikiyasabate003@gmail.com|#contact|Contact/i },
  { q: "Whats his email?", expect: /mikiyasabate003@gmail.com/i },
  { q: "Linkdin profile?", expect: /linkedin\.com\/in\/mikiasabate/i },
  { q: "github?", expect: /github\.com\/mikias1219/i },
  { q: "Download his CV", expect: new RegExp(cv.url.replace("/", "\\/")) },
  { q: "Tell me about Knowledge Hub", expect: /Knowledge Hub|RAG|tenant/i },
  { q: "knowlege hub stack", expect: /Django|Azure OpenAI|Azure AI Search/i },
  { q: "What did he build on Selamnew Workspace?", expect: /HR|Copilot|Selamnew/i },
  { q: "banlachat project", expect: /Bangla|customer care|WhatsApp/i },
  { q: "Tell me about OKDE", expect: /OKDE|RAG|multi-tenant/i },
  { q: "What has he built with Azure AI?", expect: /Azure|AI|project/i },
  { q: "mobile apps?", expect: /React Native|Flutter|Mobile/i },
  { q: "devops experience", expect: /Jenkins|Docker|DevOps|Bicep|GitHub Actions/i },
  { q: "What’s his tech stack?", expect: /NestJS|Next\.js|PostgreSQL|Python|Azure/i },
  { q: "skils in backend", expect: /NestJS|Node\.js|PostgreSQL|Backend/i },
  { q: "Does he have AI-102?", expect: /AI-102|Azure AI Engineer/i },
  { q: "dp100 sertificate", expect: /DP-100|Data Scientist/i },
  { q: "datacamp certifications", expect: /DataCamp/i },
  { q: "How do I verify his Microsoft certs?", expect: /Verify|learn\.microsoft\.com|certifications/i },
  { q: "education history", expect: new RegExp(education.school) },
  { q: "junior AI engineer role", expect: /Junior AI Engineer/i },
  { q: "Prodigy internship", expect: /Prodigy InfoTech/i },
  { q: "Atlas Group freelance", expect: /Atlas Group/i },
  { q: "What is AI GTP?", expect: /AI GTP/i },
  {
    q: "years of experience",
    expect: /Tech \/ Product Engineer|Software Engineer|IE Network Solutions/i,
  },
  { q: "Will he relocate to Europe?", expect: "contact-fallback" },
  { q: "What is his salary expectation?", expect: "contact-fallback" },
  { q: "Does he need visa sponsorship?", expect: "contact-fallback" },
  { q: "Notice period?", expect: "contact-fallback" },
  {
    q: "Does he prefer remote work?",
    expect: /Open to full-time remote or hybrid/i,
  },
  { q: "What languages does he speak?", expect: "contact-fallback" },
];

test("portfolioLookup answers at least 30 realistic recruiter questions", () => {
  assert.ok(questions.length >= 30);
  for (const item of questions) {
    const reply = answer(item.q);
    assert.ok(reply.text.trim().length > 0, `empty reply for: ${item.q}`);
    assert.ok(reply.sources.length > 0, `no sources for: ${item.q}`);
    if (item.expect === "contact-fallback") {
      assert.match(
        reply.text,
        notDocumented,
        `expected honest gap for: ${item.q}\n${reply.text}`,
      );
      assert.ok(
        reply.sources.some((s) => s.href.includes("contact")) ||
          /contact/i.test(reply.text),
        `expected contact path for gap: ${item.q}`,
      );
    } else {
      assert.match(
        reply.text,
        item.expect,
        `unexpected reply for: ${item.q}\n${reply.text}`,
      );
    }
  }
});

test("lookup never invents senior titles or fake metrics", () => {
  const text = answer("Tell me everything about Mikias").text;
  assert.ok(!/Senior Software/i.test(text));
  assert.ok(!/\b40%\b/.test(text));
  assert.ok(text.includes(experience[0].org));
  assert.ok(
    certifications.some(
      (c) =>
        text.includes(c.code || c.name.slice(0, 12)) ||
        text.includes("Certifications") ||
        text.includes("Work"),
    ) || /CV|Contact|Work/i.test(text),
  );
  assert.equal(site.role.includes("Senior"), false);
});

test("CV download path uses Mikias_Abate_CV.pdf", () => {
  assert.equal(cv.url, "/Mikias_Abate_CV.pdf");
  assert.equal(cv.filename, "Mikias_Abate_CV.pdf");
  const reply = answer("Download his CV");
  assert.match(reply.text, /Mikias_Abate_CV\.pdf/);
});
