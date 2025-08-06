"use client";
import { UpdateWorkflow } from "@/actions/workflows/updateWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckCheckIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export function SaveBtn({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success("Flow Saved Successfully!!", { id: workflowId });
    },
    onError: () => {
      toast.error("Error In Saving The Workflow!!", { id: workflowId });
    },
  });
  return (
    <>
      <Button
        disabled={saveMutation.isPending}
        variant={"outline"}
        className="flex gap-2 items-center"
        onClick={() => {
          const workflowDefinition = JSON.stringify(toObject());
          toast.loading("Saving Workflow....", { id: workflowId });
          saveMutation.mutate({
            id: workflowId,
            definition: workflowDefinition,
          });
        }}
      >
        <CheckCheckIcon size={16} className="stroke-green-400" />
        <p className="text-sm font-semibold">Save</p>
      </Button>
    </>
  );
}

export default SaveBtn;
