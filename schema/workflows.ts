import { z } from "zod";
export const createWorkflowShema = z.object({
  name: z.string().max(50),
  description: z.string().max(80).optional(),
});

export type createWorkflowShemaType = z.infer<typeof createWorkflowShema>;
