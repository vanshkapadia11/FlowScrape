"use client";
import { ParamProps } from "@/types/appNode";
import React from "react";

function BrowserInstanceParam({ param }: ParamProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-semibold">{param.name}</label>
      {/* <input
        type="text"
        value={value}
        onChange={(e) => updateNodeParamValue(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
      /> */}
      {param.required && (
        <>
          <p className="text-red-400 text-lg">*</p>
        </>
      )}
    </div>
  );
}

export default BrowserInstanceParam;
