import { waitFor } from "@/lib/helper/waitFor";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Editor from "../../_components/Editor";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    workflowId: string;
  };
};

export default async function Page(props: PageProps) {
  const { params } = props; // <-- Extract here
  const { userId } = await auth();

  if (!userId) return <div>Unauthenticated</div>;

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: params.workflowId,
      userId,
    },
  });

  if (!workflow) return notFound();

  return <Editor workflow={workflow} />;
}
