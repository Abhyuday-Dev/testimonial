import { z } from 'zod';

export const spaceSchema = z.object({
  spaceName: z.string().min(1, "Space name is required"),
  spaceTitle: z.string().min(1, "Header title is required"),
  spaceMessage: z.string().min(1, "Custom message is required"),
  questions: z.array(z.string()).max(4, "You can add up to 4 questions").default([]),
  isCollectingStarRating: z.boolean(),
  theme: z.boolean()
});
