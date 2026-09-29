import { z } from 'zod';
export const ideaSchema = z.object({
  idea: z.string().trim().min(20, 'Add a little more detail (at least 20 characters).').max(4000, 'Keep your idea under 4,000 characters.'),
}).strict();
