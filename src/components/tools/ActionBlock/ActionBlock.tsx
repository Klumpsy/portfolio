import React from "react";
import { ActionBlockProps } from "./types";

const ActionBlock: React.FunctionComponent<ActionBlockProps> = ({
  isActive,
  currentAction,
}) => {
  return (
    <div
      className={`rounded-lg p-4 border-2 transition-all duration-300 shadow-md ${
        isActive
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-blue-300/20 dark:shadow-blue-900/20"
          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
      }`}
    >
      <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">
        Action
      </h3>
      <pre className="bg-slate-100 dark:bg-slate-900 p-3 rounded text-sm overflow-auto max-h-32 text-slate-800 dark:text-slate-300">
        {currentAction
          ? JSON.stringify(currentAction, null, 2)
          : "No action dispatched yet"}
      </pre>
    </div>
  );
};

export default ActionBlock;
