import { streamText } from "ai";
import { contextualQuestion } from "@/lib/chat-history";
import { portfolioLookup } from "@/lib/portfolio-lookup";
import { fitCheckReply, isFitCheck } from "@/lib/fit-check";
import {
  CHAT_MAX_OUTPUT_TOKENS,
  portfolioModels,
} from "@/lib/ai-provider";
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
    const candidates = portfolioModels();
    const limit = await rateLimit(req, "chat");
    if (!limit.allowed)
      return Response.json(
        {
          error: `You’ve asked a lot of questions in a short time. Please wait about ${Math.max(1, Math.ceil(limit.retryAfter / 60))} minute(s), or email Mikias directly.`,
        },
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
          const last = messages.at(-1)!.content;
          const reply = isFitCheck(last)
            ? fitCheckReply(last)
            : portfolioLookup(last, messages.slice(0, -1));
          send({ type: "fallback", text: reply.text, sources: reply.sources });
          send({ type: "done" });
        };
        try {
          if (!candidates.length) {
            fallback();
            return;
          }
          let answer = "";
          let truncated = false;
          for (const candidate of candidates) {
            try {
              const result = streamText({
                model: candidate.model,
                system: buildSystemPrompt(),
                messages,
                maxOutputTokens: CHAT_MAX_OUTPUT_TOKENS,
                providerOptions: candidate.providerOptions,
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
              for await (const part of result.fullStream) {
                if (part.type === "error") throw part.error;
                if (part.type === "finish" && part.finishReason === "length")
                  truncated = true;
                if (part.type === "text-delta") {
                  answer += part.text;
                  send({ type: "text", text: part.text });
                }
              }
              if (answer.trim()) break;
            } catch (error) {
              // Once text has streamed, do not splice in another model's answer.
              if (cancelled || answer.trim()) throw error;
            }
          }
          if (truncated)
            send({
              type: "notice",
              message:
                "This answer reached its length limit. Ask me to continue for more detail.",
            });
          if (!answer.trim()) {
            fallback();
            return;
          }
          send({
            type: "sources",
            sources: relatedSources(
              contextualQuestion(messages.at(-1)!.content, messages.slice(0, -1)),
              answer,
            ),
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
