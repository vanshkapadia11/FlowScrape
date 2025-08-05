"use server";

import { prisma } from "@/lib/prisma";
import {
  createWorkflowShema,
  createWorkflowShemaType,
} from "@/schema/workflows";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form: createWorkflowShemaType) {
  const { success, data } = createWorkflowShema.safeParse(form);
  if (!success) throw new Error("Invalid Form Data");

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthenticated");

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: "TODO",
      ...data,
    },
  });

  if (!result) throw new Error("Failed to create Workflow in DB");
  redirect(`/workflows/${result.id}`);

  // Return ID instead of redirect
  return result.id;
}
