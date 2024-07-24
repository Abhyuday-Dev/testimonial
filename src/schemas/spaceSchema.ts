import { z } from 'zod';

export const spaceSchema = z.object({
  spaceName: z.string(),
  spaceTitle: z.string(),
  spaceMessage: z.string(), // Changed to camelCase to match other properties
  questions: z.array(z.string()), // Specify the schema for array elements
  isCollectingStarRating: z.boolean(), // Changed to camelCase to match other properties
  theme: z.boolean()
});