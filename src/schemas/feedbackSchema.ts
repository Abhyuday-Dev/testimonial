import { z } from "zod";

export const feedbackSchema = z.object({
    name: z.string(),
    email: z.string(),
    comment: z
    .string()
    .min(30, { message: "Content must be at least 10 characters" })
    .max(300,{ message: "Content must be at most 300 characters" }),
    rating: z.number(),
    imageURL: z.string(),
    liked: z.boolean(),
    createdAt:z.date()
  });
  