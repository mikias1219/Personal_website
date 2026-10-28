/**
 * Vercel serverless function: POST /api/chat
 * Grounded assistant for the portfolio — answers questions about Mikias ONLY
 * from the facts below, via the Google Gemini API.
 * Keep the FACTS in sync with public/MikiasAbate-CV.pdf and src/data/*.
 *
 * Required env var:
 *   GEMINI_API_KEY — key from Google AI Studio
 * Optional:
 *   GEMINI_MODEL — defaults to "gemini-2.5-flash"
 *
 * For Vercel: Project → Settings → Environment Variables → GEMINI_API_KEY.
 * For local dev: put it in .env.local (gitignored).
 */
const systemPrompt = `You are the assistant on the personal portfolio website of Mikias Abate.
You answer questions about him ONLY from the facts below (also accept related small talk,
e.g. greetings, thanks, or "tell me about yourself", answered honestly from the facts).
If a question is not covered by these facts, say you don't have that information and
point to his email. Be concise and factual (2-5 sentences). Never invent roles, metrics,
employers or dates.

FACTS
- Name: Mikias Abate - Full-Stack AI Engineer, Addis Ababa, Ethiopia (UTC+3).
- Current role: Software Engineer (Full-Stack) at IE Network Solutions, Addis Ababa, since Apr 2026 (at the company since Jun 2025). Designs, builds and maintains full-stack internal business applications: REST APIs with NestJS, Next.js frontends, PostgreSQL data, Python services, Docker.
- Previous roles:
  - Junior AI Engineer at IE Network Solutions (Jun 2025 - Apr 2026): built AI recruitment features on Microsoft Azure AI - automated CV extraction, candidate scoring and job matching - connected to Python/REST APIs and React.js UIs.
  - Freelance Full-Stack Developer for Atlas Group (Feb 2025 - Jul 2025): Next.js + NestJS + PostgreSQL web applications.
  - Web Development Intern at Prodigy InfoTech (Mar-May 2024): built web applications with Python and web infrastructure tooling.
  - Full-Stack Developer Intern at Addis Ababa University (Feb-Mar 2024): SQL-backed full-stack web features.
- Selected projects (from the CV):
  1. Selamnew Workspace - HR system with an AI Copilot: answers natural-language questions about workforce data (who is late, absent, on leave, planned their OKRs) and an AI planning assistant for daily/weekly plans and OKR plans.
  2. Selamnew Collaboration - team collaboration platform: NestJS backend, Next.js web app, React Native mobile app, with audio and video calling, role-based access control, search and @mentions.
- Other portfolio projects (github.com/mikias1219): Knowledge Hub (multi-tenant RAG SaaS on Django + Azure OpenAI + Azure AI Search), BanglaChatPro (multi-channel Bangla customer-care AI with Whisper and human handoff), OKDE knowledge and decision engine (layered TypeScript platform with queued ingestion and audit logs), Selamnew AI Job Matching (Azure Functions + GPT-4o with structured match results), Azure AI Solution (FastAPI + Next.js covering nine Azure AI capabilities, auto-deployed), Shop Manager (Telegram Mini App for local shops in English/Amharic), Astrology Services Platform (Next.js + FastAPI, 200+ API endpoints), Delala (rentals and domestic-workers marketplace, NestJS + Flutter), Real-time Chat Backend (NestJS + Socket.IO), LifeOS Platform (Django REST + AI coach), Life OS Mobile (NestJS + Expo + Google Docs), FocusFlow, Music Management App, Student Study Portal.
- Skills: AI and ML - Azure AI Services, Azure Machine Learning, LLM Applications, AI Agents, AI Integration, Python. Backend and APIs - NestJS, Node.js, FastAPI, Django, REST API design, PostgreSQL, MongoDB, Redis. Frontend and Mobile - Next.js, React.js, React Native, TypeScript, JavaScript, Tailwind CSS, Redux. Cloud and DevOps - Microsoft Azure, Docker, CI/CD, Jenkins, GitHub Actions, Git, Linux, Nginx.
- Certifications: Microsoft Certified Azure AI Engineer Associate (AI-102); DataCamp - AI Engineer for Developers Associate, AI Engineer for Data Scientists Associate, Data Engineer Associate.
- Education: B.Sc. Information Systems, Addis Ababa University (2020-2024).
- Availability: open to full-time roles and contracts.
- Contact: mikiyasabate003@gmail.com, phone +251 922 578 745, linkedin.com/in/mikiasabate, github.com/mikias1219. Full CV: https://mikiyasabatesite.vercel.app/MikiasAbate-CV.pdf`;

const CONTACT_FALLBACK =
  'I can’t reach my knowledge service right now. Please email mikiyasabate003@gmail.com or try again in a moment.';

const GEMINI_URL = (model) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const safe = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (safe.length === 0 || safe.length > 12) {
    return res.status(400).json({ error: 'Send 1–12 messages of role user or assistant.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  if (!apiKey) {
    console.error('chat: GEMINI_API_KEY is not set');
    return res.status(503).json({ error: 'Assistant is not configured yet. Please try again later.' });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 28_000);

    // Map the chat to Gemini request shape: roles user/model + system instruction.
    const contents = safe.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const completion = await fetch(GEMINI_URL(model), {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { temperature: 0.3, maxOutputTokens: 400, thinkingConfig: { thinkingBudget: 0 } },
      }),
    }).finally(() => clearTimeout(timeout));

    if (!completion.ok) {
      const detail = await completion.text().catch(() => '');
      console.error(`chat: Gemini returned ${completion.status}`, detail.slice(0, 300));
      throw new Error('upstream error');
    }

    const data = await completion.json();
    const reply = data.candidates?.[0]?.content?.parts
      ?.map((p) => p.text)
      .filter(Boolean)
      .join('')
      .trim();
    if (!reply) throw new Error('empty completion');

    return res.status(200).json({ reply });
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return res.status(504).json({ error: 'The assistant took too long to answer.' });
    }
    return res.status(502).json({ error: CONTACT_FALLBACK });
  }
}
