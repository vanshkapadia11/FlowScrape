"use client";
import TolltipWrapper from "@/components/TolltipWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { WorkflowStatus } from "@/types/workflow";
import { Workflow } from "@prisma/client";
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  Shuffle,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import DeleteWorkflowDialog from "./DeleteWorkflowDialog";

const statusColors = {
  [WorkflowStatus.DRAFT]:
    "ring-2 ring-inset ring-[#e8e8e8] shadow-sm text-yellow-600",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};

function Workflowcard({ workflow }: { workflow: Workflow }) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (
    <>
      <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
        <CardContent className="p-4 flex items-start flex-col justify-between space-y-4 h-[150px]">
          <div className="flex items-start justify-end flex-col space-x-3">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center mb-4",
                statusColors[workflow.status as WorkflowStatus]
              )}
            >
              {isDraft ? (
                <FileTextIcon className="h-6 w-6" />
              ) : (
                <PlayIcon className="h-6 w-6 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-muted-foreground flex items-center">
                <Link
                  href={`/workflow/editor/${workflow.id}`}
                  className="flex items-center uppercase text-base font-semibold"
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
          <div className="flex space-x-4">
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
            <WorkflowActions workflowName={workflow.name} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function WorkflowActions({ workflowName }: { workflowName: String }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      <DeleteWorkflowDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowName={workflowName}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <TolltipWrapper content={"More Actions!!"}>
              <div className="flex items-center justify-center w-full h-full">
                <MoreVerticalIcon size={18} />
              </div>
            </TolltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive flex items-center gap-2"
            onSelect={() => setShowDeleteDialog((prev) => !prev)}
          >
            <TrashIcon size={16} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default Workflowcard;
