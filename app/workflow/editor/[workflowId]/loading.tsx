import { Loader2 } from "lucide-react";
import React from "react";

function loading() {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin stroke-primary" />
      </div>
    </>
  );
}

export default loading;
