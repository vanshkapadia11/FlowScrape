import { FlowToExecutionPlan } from "@/lib/workflow/FlowToExecutionPlan";
import { AppNode } from "@/types/appNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();

  const generateExecutionPlan = useCallback(() => {
    const obj = toObject?.(); // <-- Safe call
    if (!obj) return null; // or throw an error/log

    const { nodes = [], edges = [] } = obj; // <-- Safe destructuring
    const { executionPlan } = FlowToExecutionPlan(nodes as AppNode[], edges);
    return executionPlan;
  }, [toObject]);

  return generateExecutionPlan;
};

export default useExecutionPlan;
