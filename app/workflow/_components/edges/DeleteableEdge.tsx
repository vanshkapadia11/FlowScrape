"use client";

import { Button } from "@/components/ui/button";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
  getSmoothStepPath,
  useEdges,
  useReactFlow,
} from "@xyflow/react";
import { CircleX, X } from "lucide-react";

export default function DeleteableEdge(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getSimpleBezierPath(props);
  const { setEdges } = useReactFlow();
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <Button
            variant={"outline"}
            size={"icon"}
            className="w-8 flex items-center justify-center text-center h-8 text-xs cursor-pointer rounded-full leading-none hover:shadow-lg"
            onClick={() => {
              setEdges((edges) => edges.filter((edge) => edge.id !== props.id));
            }}
          >
            <X size={12} />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
