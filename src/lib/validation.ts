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
    messages: z
      .array(
        z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string().trim().min(1).max(2000),
        }),
      )
      .min(1)
      .max(12),
  })
  .refine((v) => v.messages.at(-1)?.role === "user", {
    message: "The last message must be a user question.",
  });
