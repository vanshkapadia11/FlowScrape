"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/task";
import React from "react";

function TaskMenu() {
  return (
    <>
      <aside className="w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={["extraction"]}
        >
          <AccordionItem value="extraction">
            <AccordionTrigger className="font-semibold">
              Data Extraction
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
              <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
    </>
  );
}

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistry[taskType];
  const ondragstart = (event: React.DragEvent, type: TaskType) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <Button
      className="flex items-center justify-between gap-2 border w-full"
      variant={"secondary"}
      draggable
      onDragStart={(event) => ondragstart(event, taskType)}
    >
      <div className="flex gap-2">
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  );
}

export default TaskMenu;
