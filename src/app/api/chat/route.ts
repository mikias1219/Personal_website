import { streamText } from "ai";
import { portfolioModel } from "@/lib/ai-provider";
import { buildSystemPrompt, relatedSources } from "@/lib/portfolio-context";
import { chatSchema } from "@/lib/validation";
import { rateLimit, RateLimitUnavailable } from "@/lib/rate-limit";
import { allowedOrigin, corsHeaders, readJson, BodyError } from "@/lib/request";
export const maxDuration = 30;
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
    const parsed = chatSchema.safeParse(await readJson(req, 28000));
    if (!parsed.success)
      return Response.json(
        {
          error:
            "Send 1–12 messages, each at most 2,000 characters. End with a user question.",
        },
        { status: 400, headers },
      );
    const model = portfolioModel();
    if (!model)
      return Response.json(
        {
          error:
            "The assistant is not configured yet. Please contact Mikias directly.",
        },
        { status: 503, headers },
      );
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
        try {
          const result = streamText({
            model,
            system: buildSystemPrompt(),
            messages,
            maxOutputTokens: 600,
            abortSignal: AbortSignal.any([
              req.signal,
              abort.signal,
              AbortSignal.timeout(25000),
            ]),
            maxRetries: 0,
            onError: () => {
              /* Do not log messages or provider bodies. */
            },
          });
          for await (const text of result.textStream)
            send({ type: "text", text });
          send({
            type: "sources",
            sources: relatedSources(messages.at(-1)!.content),
          });
          send({ type: "done" });
        } catch {
          send({
            type: "error",
            error:
              "The assistant is unavailable right now. Please try again or use the contact page.",
          });
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
