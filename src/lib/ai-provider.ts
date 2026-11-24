import type { streamText } from "ai";
import { createAzure } from "@ai-sdk/azure";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";

/**
 * Provider order mirrors the AI Agent project pattern:
 * Azure OpenAI → Gemini → OpenAI-compatible (Groq / OpenRouter / Ollama /v1).
 * OPENAI_COMPAT_* is the additional cloud path used by the personal agent.
 */
export function portfolioModel() {
  const {
    AZURE_OPENAI_API_KEY,
    AZURE_OPENAI_RESOURCE_NAME,
    AZURE_OPENAI_DEPLOYMENT,
    GEMINI_API_KEY,
    OPENAI_COMPAT_API_KEY,
    OPENAI_COMPAT_BASE_URL,
    OPENAI_COMPAT_MODEL,
    HERMES_API_KEY,
    HERMES_BASE_URL,
    HERMES_MODEL,
  } = process.env;

  if (
    AZURE_OPENAI_API_KEY &&
    AZURE_OPENAI_RESOURCE_NAME &&
    AZURE_OPENAI_DEPLOYMENT
  )
    return createAzure({
      apiKey: AZURE_OPENAI_API_KEY,
      resourceName: AZURE_OPENAI_RESOURCE_NAME,
    }).chat(AZURE_OPENAI_DEPLOYMENT);

  if (GEMINI_API_KEY)
    return createGoogleGenerativeAI({ apiKey: GEMINI_API_KEY })(
      process.env.GEMINI_MODEL || "gemini-3.8-flash",
    );

  const apiKey = OPENAI_COMPAT_API_KEY || HERMES_API_KEY || "";
  const baseURL = (
    OPENAI_COMPAT_BASE_URL ||
    HERMES_BASE_URL ||
    ""
  ).replace(/\/$/, "");
  const modelId =
    OPENAI_COMPAT_MODEL || HERMES_MODEL || "llama-3.1-8b-instant";

  if (baseURL) {
    return createOpenAI({
      apiKey: apiKey || "local",
      baseURL,
      name: "openai-compat",
    }).chat(modelId);
  }

  return null;
}

export function portfolioProviderOptions(): NonNullable<
  Parameters<typeof streamText>[0]["providerOptions"]
> {
  const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
  if (model.startsWith("gemini-3") && model.includes("flash"))
    return {
      google: { thinkingConfig: { thinkingLevel: "minimal" as const } },
    };
  if (model.startsWith("gemini-2.5") && model.includes("flash"))
    return { google: { thinkingConfig: { thinkingBudget: 0 } } };
  return {};
}

/** Cap model answers so the hiring agent stays short and scannable. */
export const CHAT_MAX_OUTPUT_TOKENS = 512;
