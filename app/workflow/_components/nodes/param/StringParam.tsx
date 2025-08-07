"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/appNode";
import { TaskParam } from "@/types/task";
import React, { useEffect, useId, useState } from "react";

function StringParam({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: ParamProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(value);
  useEffect(() => {
    setInternalValue(value);
  }, [value]);
  let Component: any = Input;
  if (param.variant === "textarea") {
    Component = Textarea;
  }
  return (
    <>
      {console.log(param.name)}
      <div className="space-y-1 p-1 w-full">
        <Label htmlFor={id} className="text-xs flex">
          {param.name}
          {param.required && (
            <>
              <p className="text-red-400 text-lg">*</p>
            </>
          )}
        </Label>
        <Component
          id={id}
          disabled={disabled}
          value={internalValue}
          placeholder="Enter Value Here!"
          className=" normal-case text-xs"
          onChange={(e: any) => {
            setInternalValue(e.target.value);
            updateNodeParamValue(e.target.value); // immediate update
          }}
          onBlur={(e: any) => updateNodeParamValue(internalValue)}
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
