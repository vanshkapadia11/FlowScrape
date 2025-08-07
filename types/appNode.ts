import { Node } from "@xyflow/react";
import { TaskParam, TaskType } from "./task";

export type AppNodeData = {
  type: TaskType;
  input: Record<string, unknown>;
  inputs: Record<string, unknown>;
};
export interface ParamProps {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
  disabled?: boolean;
}

export type AppNode = Node<AppNodeData>;
