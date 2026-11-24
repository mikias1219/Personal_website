import type { LanguageModel, streamText } from "ai";
import { createAzure } from "@ai-sdk/azure";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";

type ProviderOptions = NonNullable<
  Parameters<typeof streamText>[0]["providerOptions"]
>;

export interface ModelCandidate {
  id: string;
  model: LanguageModel;
  providerOptions: ProviderOptions;
}

/**
 * Default Gemini model. `gemini-3.8-flash` is quota-limited on many keys and
 * returns 429/503 under load, which silently pushed visitors onto the
 * keyword fallback. 2.5 Flash is stable, fast and cheap for this use case.
 */
export const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

/** Tried in order after GEMINI_MODEL when a call fails before any text streams. */
const GEMINI_BACKUPS = [
  "gemini-2.5-flash",
  "gemini-flash-latest",
  "gemini-2.5-flash-lite",
];

function geminiOptions(modelId: string): ProviderOptions {
  if (modelId.startsWith("gemini-3") && modelId.includes("flash"))
    return { google: { thinkingConfig: { thinkingLevel: "minimal" as const } } };
  if (modelId.startsWith("gemini-2.5") && modelId.includes("flash"))
    return { google: { thinkingConfig: { thinkingBudget: 0 } } };
  return {};
}

/**
 * Ordered model candidates. Provider order mirrors the AI Agent project:
 * Azure OpenAI → Gemini (with backups) → OpenAI-compatible (Groq / OpenRouter /
 * Ollama /v1; OPENAI_COMPAT_* or HERMES_*). The route moves to the next
 * candidate if one fails, so a single outage no longer degrades answers.
 */
export function portfolioModels(): ModelCandidate[] {
  const {
    AZURE_OPENAI_API_KEY,
    AZURE_OPENAI_RESOURCE_NAME,
    AZURE_OPENAI_DEPLOYMENT,
    GEMINI_API_KEY,
    GEMINI_MODEL,
    OPENAI_COMPAT_API_KEY,
    OPENAI_COMPAT_BASE_URL,
    OPENAI_COMPAT_MODEL,
    HERMES_API_KEY,
    HERMES_BASE_URL,
    HERMES_MODEL,
  } = process.env;
  const candidates: ModelCandidate[] = [];

  if (
    AZURE_OPENAI_API_KEY &&
    AZURE_OPENAI_RESOURCE_NAME &&
    AZURE_OPENAI_DEPLOYMENT
  )
    candidates.push({
      id: `azure:${AZURE_OPENAI_DEPLOYMENT}`,
      model: createAzure({
        apiKey: AZURE_OPENAI_API_KEY,
        resourceName: AZURE_OPENAI_RESOURCE_NAME,
      }).chat(AZURE_OPENAI_DEPLOYMENT),
      providerOptions: {},
    });

  if (GEMINI_API_KEY) {
    const google = createGoogleGenerativeAI({ apiKey: GEMINI_API_KEY });
    const ids = [GEMINI_MODEL || DEFAULT_GEMINI_MODEL, ...GEMINI_BACKUPS].filter(
      (id, i, all) => all.indexOf(id) === i,
    );
    for (const id of ids)
      candidates.push({
        id: `gemini:${id}`,
        model: google(id),
        providerOptions: geminiOptions(id),
      });
  }

  const baseURL = (OPENAI_COMPAT_BASE_URL || HERMES_BASE_URL || "").replace(
    /\/$/,
    "",
  );
  if (baseURL)
    candidates.push({
      id: "openai-compat",
      model: createOpenAI({
        apiKey: OPENAI_COMPAT_API_KEY || HERMES_API_KEY || "local",
        baseURL,
        name: "openai-compat",
      }).chat(OPENAI_COMPAT_MODEL || HERMES_MODEL || "llama-3.1-8b-instant"),
      providerOptions: {},
    });

  return candidates;
}

/** Room for a clear, complete answer (about 250 words) without essays. */
export const CHAT_MAX_OUTPUT_TOKENS = 700;
