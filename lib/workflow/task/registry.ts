import { TaskType } from "@/types/task";
import { ExtractTextFromElement } from "./ExtractTextFromElement";
import { launchBrowserTask } from "./launchBrowser";
import { PageToHtmlTask } from "./PageToHtml";
import { WorkflowStatus, workflowTask } from "@/types/workflow";

type Registry = {
  [K in TaskType]: workflowTask & { type: K };
};

export const TaskRegistry = {
  LAUNCH_BROWSER: launchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement,
};
