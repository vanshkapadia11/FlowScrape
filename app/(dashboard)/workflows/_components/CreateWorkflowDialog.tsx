"use client";

import CustumDialogHeader from "@/components/CustumDialogHeader";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import {
  createWorkflowShema,
  createWorkflowShemaType,
} from "@/schema/workflows";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Layers2Icon, Loader2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateWorkflow } from "@/actions/workflows/createWorkflow";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<createWorkflowShemaType>({
    resolver: zodResolver(createWorkflowShema),
    defaultValues: {},
  });

  const queryClient = useQueryClient(); // import from @tanstack/react-query

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: (id) => {
      toast.success("Workflow Created!!", { id: "create-workflow" });
      setOpen(false); // close dialog
      router.push(`/workflows/editor/${id}`); // redirect to editor
    },
    onError: () => {
      toast.error("Failed To Create The Workflow!!", { id: "create-workflow" });
    },
  });

  const onSubmit = useCallback(
    (values: createWorkflowShemaType) => {
      toast.loading("Creating The Workflow!!", { id: "create-workflow" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create Workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustumDialogHeader
          icon={Layers2Icon}
          title={"Create Workflow"}
          subTitle={"Start Building Your Workflow Now And Today!!"}
        />
        <div className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full flex flex-col"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="text-sm font-semibold" />
                    </FormControl>
                    <FormDescription>
                      <span className="text-sm font-semibold uppercase">
                        Choose A Descriptive And Unique Name!!
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="text-sm font-semibold resize-none"
                      />
                    </FormControl>
                    <FormDescription>
                      <span className="text-sm font-semibold uppercase">
                        Pls Define A Summary Of Your Workflow — Not Required But
                        Will Help You To Manage The Workflow Properly!!
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit" disabled={isPending}>
                {!isPending && "Proceed"}
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkflowDialog;
