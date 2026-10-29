import { contactSchema } from "@/lib/validation";
import { rateLimit, RateLimitUnavailable } from "@/lib/rate-limit";
import { allowedOrigin, corsHeaders, readJson, BodyError } from "@/lib/request";
import { site } from "@/data/profile";
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
    const parsed = contactSchema.safeParse(await readJson(req, 24000));
    if (!parsed.success)
      return Response.json(
        {
          error: "Please check your name, email and message.",
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 400, headers },
      );
    if (parsed.data.company)
      return Response.json({ success: true }, { headers });
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL)
      return Response.json(
        {
          error:
            "The form is not configured yet. Please email Mikias directly.",
        },
        { status: 503, headers },
      );
    const limit = await rateLimit(req, "contact");
    if (!limit.allowed)
      return Response.json(
        { error: "Too many messages. Please try again later." },
        {
          status: 429,
          headers: { ...headers, "Retry-After": String(limit.retryAfter) },
        },
      );
    const { name, email, message } = parsed.data;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [site.email],
        reply_to: email,
        subject: `Portfolio enquiry from ${name.replace(/[\r\n]/g, " ")}`,
        text: `From: ${name}\nReply to: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok)
      return Response.json(
        {
          error:
            "Could not send your message. Please try again or email Mikias directly.",
        },
        { status: 502, headers },
      );
    return Response.json({ success: true }, { headers });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof BodyError
            ? error.message
            : "Could not send your message. Please try again or email Mikias directly.",
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
