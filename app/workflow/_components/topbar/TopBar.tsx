"use client";
import TolltipWrapper from "@/components/TolltipWrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import SaveBtn from "./SaveBtn";
import ExecuteBtn from "./ExecuteBtn";

interface Props {
  title: string;
  subTitle?: string;
  workflowId: string;
}

function TopBar({ title, subTitle, workflowId }: Props) {
  const router = useRouter();
  return (
    <>
      <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
        <div className="flex gap-1 flex-1">
          <TolltipWrapper content="Back">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => router.back()}
            >
              <ChevronLeftIcon size={20} />
            </Button>
          </TolltipWrapper>
          <div className="">
            <p className="font-semibold text-base text-ellipsis truncate">
              {title}
            </p>
            {subTitle && (
              <>
                <p className="text-xs text-muted-foreground truncate text-ellipsis">
                  {subTitle}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-1 justify-end">
          <ExecuteBtn workflowId={workflowId} />
          <SaveBtn workflowId={workflowId} />
        </div>
      </header>
    </>
  );
}

export default TopBar;
