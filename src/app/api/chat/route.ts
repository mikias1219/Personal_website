import { streamText } from "ai";
import { contextualQuestion } from "@/lib/chat-history";
import { portfolioLookup } from "@/lib/portfolio-lookup";
import { portfolioModel, portfolioProviderOptions } from "@/lib/ai-provider";
import { buildSystemPrompt, relatedSources } from "@/lib/portfolio-context";
import { chatSchema } from "@/lib/validation";
import { rateLimit, RateLimitUnavailable } from "@/lib/rate-limit";
import { allowedOrigin, corsHeaders, readJson, BodyError } from "@/lib/request";
export const maxDuration = 60;
export function OPTIONS(req: Request) {
  return new Response(null, {
    status: allowedOrigin(req) ? 204 : 403,
    headers: corsHeaders(req),
  });
}
export async function POST(req: Request) {
  const headers = corsHeaders(req);
  if (!allowedOrigin(req))
    return Response.json(
      { error: "Origin is not allowed." },
      { status: 403, headers },
    );
  try {
    const parsed = chatSchema.safeParse(await readJson(req, 192000));
    if (!parsed.success)
      return Response.json(
        {
          error:
            "Send alternating conversation turns, with questions up to 2,000 characters. Start and end with a user question.",
        },
        { status: 400, headers },
      );
    const model = portfolioModel();
    const limit = await rateLimit(req, "chat");
    if (!limit.allowed)
      return Response.json(
        { error: "Too many questions. Please try again later." },
        {
          status: 429,
          headers: { ...headers, "Retry-After": String(limit.retryAfter) },
        },
      );
    const { messages } = parsed.data;
    const encoder = new TextEncoder();
    let cancelled = false;
    const abort = new AbortController();
    const stream = new ReadableStream({
      async start(controller) {
        const send = (event: unknown) => {
          if (!cancelled)
            controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
        };
        const fallback = () => {
          const reply = portfolioLookup(messages.at(-1)!.content, messages.slice(0, -1));
          send({ type: "fallback", text: reply.text, sources: reply.sources });
          send({ type: "done" });
        };
        try {
          if (!model) {
            fallback();
            return;
          }
          let answer = "";
          const result = streamText({
            model,
            system: buildSystemPrompt(),
            messages,
            maxOutputTokens: 4096,
            providerOptions: portfolioProviderOptions(),
            abortSignal: AbortSignal.any([
              req.signal,
              abort.signal,
              AbortSignal.timeout(55000),
            ]),
            maxRetries: 0,
            onError: () => {
              /* Do not log messages or provider bodies. */
            },
          });
          for await (const part of result.fullStream) {
            if (part.type === "error") throw part.error;
            if (part.type === "finish" && part.finishReason === "length")
              send({type: "notice", message: "This answer reached its length limit. Ask me to continue for more detail."});
            if (part.type === "text-delta") {
              answer += part.text;
              send({ type: "text", text: part.text });
            }
          }
          if (!answer.trim()) {
            fallback();
            return;
          }
          send({
            type: "sources",
            sources: relatedSources(contextualQuestion(messages.at(-1)!.content, messages.slice(0, -1))),
          });
          send({ type: "done" });
        } catch {
          if (!cancelled) fallback();
        } finally {
          if (!cancelled) controller.close();
        }
      },
      cancel() {
        cancelled = true;
        abort.abort();
      },
    });
    return new Response(stream, {
      headers: {
        ...headers,
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof BodyError
            ? error.message
            : "The assistant is unavailable right now. Please use the contact page.",
      },
      {
        status:
          error instanceof BodyError
            ? error.status
            : error instanceof RateLimitUnavailable
              ? 503
              : 500,
        headers,
      },
    );
  }
}
