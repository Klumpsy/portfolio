import React from "react";

export const TimelineEntry = ({
  action,
  state,
  index,
  currentIndex,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-2 border-l-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${
        index === currentIndex
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
          : "border-slate-300 dark:border-slate-700"
      }`}
    >
      <div className="flex items-center mb-1">
        <div
          className={`w-2 h-2 rounded-full mr-2 ${
            index === currentIndex
              ? "bg-blue-500"
              : "bg-slate-400 dark:bg-slate-600"
          }`}
        ></div>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {action.type}
        </span>
      </div>
      {action.payload !== undefined && (
        <div className="text-xs text-slate-500 dark:text-slate-400 ml-4">
          Payload: {JSON.stringify(action.payload)}
        </div>
      )}
      <div className="text-xs text-slate-500 dark:text-slate-400 ml-4">
        Counter: {state.counter.value}
      </div>
    </div>
  );
};
