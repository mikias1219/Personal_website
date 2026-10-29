import { z } from "zod";
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters.")
    .max(100),
  email: z.email("Please enter a valid email address.").max(254),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(5000),
  company: z.string().max(200).optional().default(""),
});
export const chatSchema = z
  .object({
    messages: z.array(z.discriminatedUnion("role", [
      z.object({role: z.literal("user"), content: z.string().trim().min(1).max(2000)}),
      z.object({role: z.literal("assistant"), content: z.string().trim().min(1).max(24000)}),
    ])).min(1).max(20),
  })
  .refine(v => v.messages[0]?.role === "user" && v.messages.at(-1)?.role === "user", { message: "Start and end with a user question." })
  .refine(v => v.messages.every((m,i) => i === 0 || m.role !== v.messages[i-1].role), { message: "Conversation turns must alternate." })
  .refine(v => v.messages.reduce((n,m) => n+m.content.length,0) <= 60000, {message: "Conversation context is too long."});
