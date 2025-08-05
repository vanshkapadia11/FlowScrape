import { GetWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { waitFor } from "@/lib/helper/waitFor";
import { AlertCircle, InboxIcon } from "lucide-react";
import React, { Suspense } from "react";
import CreateWorkflowDialog from "./_components/CreateWorkflowDialog";
import Workflowcard from "./_components/Workflowcard";

function page() {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex justify-between flex-col px-8 pt-6">
          <div className="flex flex-col mb-10 md:flex-row justify-between">
            <div className="mb-4">
              <h1 className="text-3xl font-bold uppercase">WorkFlows!!</h1>
              <p className="text-muted-foreground text-sm font-semibold uppercase">
                Manage Your WorkFlows!!
              </p>
            </div>
            <CreateWorkflowDialog />
          </div>
          <div className="h-full py-6">
            <Suspense fallback={<UserWorkflowsSkeleton />}>
              <UserWorkflows />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

function UserWorkflowsSkeleton() {
  return (
    <>
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 w-full " />
        ))}
      </div>
    </>
  );
}

async function UserWorkflows() {
  //   await waitFor(3000);
  const workflows = await GetWorkflowsForUser();
  if (!workflows) {
    return (
      <>
        <Alert variant={"destructive"}>
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Something Went Wrong. Pls Try Again Later!!
          </AlertDescription>
        </Alert>
      </>
    );
  }
  if (workflows.length === 0) {
    return (
      <>
        <div className="flex flex-col gap-4 h-full items-center justify-center">
          <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
            <InboxIcon className="stroke-primary" size={40} />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold uppercase">No Workflows Created Yet!!</p>
            <p className="text-sm text-muted-foreground uppercase font-semibold">
              Click the button below to create your new Workflow!!
            </p>
          </div>
          <CreateWorkflowDialog
            triggerText={"Create Your First Workflow Now!!"}
          />
        </div>
      </>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {workflows.map((workflow) => (
        <Workflowcard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
}

export default page;
