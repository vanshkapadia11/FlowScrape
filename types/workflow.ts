import { LucideProps } from "lucide-react";
import React from "react";
import { TaskParam, TaskType } from "./task";
import { AppNode } from "./appNode";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export type workflowTask = {
  label: string;
  icon: React.FC<LucideProps>;
  type: TaskType;
  isEntryPoint?: boolean;
  inputs: TaskParam[];
  outputs: TaskParam[];
  credits: number;
};

export type workflowExecutionPlan = {
  phase: number;
  nodes: AppNode[];
}[];

export type WorkflowExecutionPlanPhase = {
  phase: number;
  nodes: AppNode[]; // ✅ Add this line
};
