"use client";
import { Workflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
import TopBar from "./topbar/TopBar";

function Editor({ workflow }: { workflow: Workflow }) {
  return (
    <>
      <ReactFlowProvider>
        <div className="flex w-full h-full flex-col overflow-hidden">
          <TopBar
            title="WorkFlow Editor!!"
            subTitle={workflow.name}
            workflowId={workflow.id}
          />
          <section className="flex h-full overflow-auto">
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </>
  );
}

export default Editor;
