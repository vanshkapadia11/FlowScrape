"use client";
import { DeleteWorkflow } from "@/actions/workflows/deleteWorkflow";
import { AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
}

function DeleteWorkflowDialog({
  open,
  setOpen,
  workflowName,
  workflowId,
}: Props) {
  const [confirmText, setConfirmText] = useState("");
  const deleteMutation = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success("Deleted The Workflow Succesfully!!", { id: workflowId });
      setConfirmText("");
    },
    onError: () => {
      toast.error("Encontered An Error In Deleting The Workflow!! ", {
        id: workflowId,
      });
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are You Sure ?!!</AlertDialogTitle>
          <AlertDescription>
            If You Delete This Thing Now You Will Lose The Control Over It And
            It Will Be Deleted For Every And Cannot Be Restored Again!!
          </AlertDescription>
          <div className="flex flex-col py-4 gap-2">
            <p className="text-sm font-semibold mb-2">
              If You Are Sure Then, Enter{" "}
              <b className="normal-case p-2 ring-2 ring-inset ring-[#e8e8e8] rounded-lg">
                {workflowName}
              </b>{" "}
              To Confirm
            </p>
            <Input
              value={confirmText}
              className="normal-case"
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== workflowName || deleteMutation.isPending}
            onClick={() => {
              toast.loading("Deleting Workflow...", { id: workflowId });
              deleteMutation.mutate(workflowId);
            }}
            className="bg-destructive text-zinc-50 hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteWorkflowDialog;
