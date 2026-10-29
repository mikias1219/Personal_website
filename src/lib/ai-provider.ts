import type { streamText } from "ai";
import { createAzure } from "@ai-sdk/azure";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
export function portfolioModel() {
  const {
    AZURE_OPENAI_API_KEY,
    AZURE_OPENAI_RESOURCE_NAME,
    AZURE_OPENAI_DEPLOYMENT,
    GEMINI_API_KEY,
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
