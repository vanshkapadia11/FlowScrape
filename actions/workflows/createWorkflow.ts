// app/actions/workflows/createWorkflow.ts
"use server";

import { prisma } from "@/lib/prisma";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import {
  createWorkflowShema,
  createWorkflowShemaType,
} from "@/schema/workflows";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";

export async function CreateWorkflow(form: createWorkflowShemaType) {
  const { success, data } = createWorkflowShema.safeParse(form);
  if (!success) throw new Error("Invalid Form Data");

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthenticated");

  const initialFlow = {
    nodes: [CreateFlowNode(TaskType.LAUNCH_BROWSER)],
    edges: [],
  };

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
    },
  });

  if (!result) throw new Error("Failed to create Workflow in DB");

  return result.id; // must return ID, no redirect
}
