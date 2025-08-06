"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/types/appNode";
import { TaskParam } from "@/types/task";
import React, { useId, useState } from "react";

function StringParam({ param, value, updateNodeParamValue }: ParamProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(value);
  return (
    <>
      <div className="space-y-1 p-1 w-full">
        <Label htmlFor={id} className="text-xs flex">
          {param.name}
          {param.required && (
            <>
              <p className="text-red-400 text-lg">*</p>
            </>
          )}
        </Label>
        <Input
          id={id}
          value={internalValue}
          placeholder="Enter The Link Of The Website Here!!"
          className=" normal-case text-xs"
          onChange={(e) => setInternalValue(e.target.value)}
          onBlur={(e) => updateNodeParamValue(internalValue)}
        />
        {param.helperText && (
          <>
            <p className="text-muted-foreground px-2">{param.helperText}</p>
          </>
        )}
      </div>
    </>
  );
}

export default StringParam;
