import { z } from "zod";

export const feedbackSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  comment: z
    .string()
    .min(30, { message: "Comment must be at least 30 characters" })
    .max(300, { message: "Comment must be at most 300 characters" }),
});

export type FeedbackSchema = z.infer<typeof feedbackSchema>;
