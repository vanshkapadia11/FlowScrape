import { TaskParamType, TaskType } from "@/types/task";
import { workflowTask } from "@/types/workflow";
import { GlobeIcon, LucideProps } from "lucide-react";

export const launchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: true,
  credits: 5,
  inputs: [
    {
      name: "Website Url",
      type: TaskParamType.STRING,
      helperText: "eg: https://google.com/",
      required: true,
      hideHandle: true,
    },
  ],
  outputs: [{ name: "Web Page", type: TaskParamType.BROWSER_INSTANCE }],
} satisfies workflowTask;
