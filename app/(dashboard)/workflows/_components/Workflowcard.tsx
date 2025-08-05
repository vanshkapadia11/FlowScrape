"use client";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { WorkflowStatus } from "@/types/workflow";
import { Workflow } from "@prisma/client";
import { FileTextIcon, PlayIcon, Shuffle, ShuffleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const statusColors = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};

function Workflowcard({ workflow }: { workflow: Workflow }) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (
    <>
      <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
        <CardContent className="p-4 flex items-center justify-between h-[100px]">
          <div className="flex items-center justify-end space-x-3">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                statusColors[workflow.status as WorkflowStatus]
              )}
            >
              {isDraft ? (
                <FileTextIcon className="h-5 w-5" />
              ) : (
                <PlayIcon className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-muted-foreground flex items-center">
                <Link
                  href={`/workflow/editor/${workflow.id}`}
                  className="flex items-center hover:underline uppercase text-sm font-semibold"
                >
                  {workflow.name}
                </Link>
                {isDraft && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full uppercase">
                    Draft
                  </span>
                )}
              </h3>
            </div>
          </div>
          <div className="">
            <Link
              href={`/workflow/editor/${workflow.id}`}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "sm",
                }),
                "flex items-center gap-2"
              )}
            >
              <ShuffleIcon size={16} />
              Edit!!
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default Workflowcard;
