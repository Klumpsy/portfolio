"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { ActionBlock } from "../ActionBlock/ActionBlock";
import ReducerBlock from "@/components/tools/ReducerBlock";
import StateBlock from "@/components/tools/StateBlock";
import { decrement, increment, incrementByAmount } from "@/redux/counterSlice";
import { TimelineEntry } from "../ReduxTimeline/ReducerTimeline";
import { store } from "@/store/store";

export const ReduxVisualization = () => {
  const [activeBlocks, setActiveBlocks] = useState({
    action: false,
    reducer: false,
    store: false,
  });

  const [timeline, setTimeline] = useState([]);
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(-1);
  const [currentAction, setCurrentAction] = useState(null);
  const [amount, setAmount] = useState(5);

  const count = useSelector((state) => state.counter.value);
  const storeState = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToTimeline = (action, state) => {
    const newEntry = { action, state: JSON.parse(JSON.stringify(state)) };
    setTimeline((prev) => [...prev, newEntry]);
    setCurrentTimelineIndex(timeline.length);
  };

  const dispatchWithAnimation = (action) => {
    setCurrentAction(action);
    setActiveBlocks({ action: true, reducer: false, store: false });

    setTimeout(() => {
      setActiveBlocks({ action: true, reducer: true, store: false });

      setTimeout(() => {
        dispatch(action);
        setActiveBlocks({ action: false, reducer: false, store: true });

        setTimeout(() => {
          setActiveBlocks({ action: false, reducer: false, store: false });
        }, 1500);
      }, 1500);
    }, 1500);
  };

  useEffect(() => {
    if (currentAction) {
      addToTimeline(currentAction, storeState);
      setCurrentAction(null);
    }
  }, [count]);

  const timeTravel = (index) => {
    setCurrentTimelineIndex(index);
  };

  return (
    <div className="flex flex-col space-y-8 w-full">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex-1 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">
            Redux Building Blocks
          </h2>

          <div className="grid grid-cols-1 gap-4 mb-6">
            <ActionBlock
              isActive={activeBlocks.action}
              currentAction={currentAction}
            />
            <div className="flex justify-center my-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-500"
              >
                <path
                  d="M12 5L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M19 12L12 19L5 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <ReducerBlock isActive={activeBlocks.reducer} />
            <div className="flex justify-center my-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-500"
              >
                <path
                  d="M12 5L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M19 12L12 19L5 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <StateBlock state={storeState} isActive={activeBlocks.store} />
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-slate-800 dark:text-white">
                {count}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Current Count
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => dispatchWithAnimation(decrement())}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
              >
                Decrement
              </button>
              <button
                onClick={() => dispatchWithAnimation(increment())}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
              >
                Increment
              </button>
              <div className="flex items-center mt-2 sm:mt-0">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-16 px-2 py-2 border border-slate-300 dark:border-slate-600 rounded-lg mr-2 dark:bg-slate-700 text-slate-800 dark:text-white"
                />
                <button
                  onClick={() =>
                    dispatchWithAnimation(incrementByAmount(amount))
                  }
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
                >
                  Add Amount
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">
            Time Travel Debugger
          </h2>

          <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Action History
              </h3>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {timeline.length === 0 ? (
                <div className="p-4 text-center text-slate-500 dark:text-slate-400">
                  No actions dispatched yet. Try interacting with the counter!
                </div>
              ) : (
                timeline.map((entry, index) => (
                  <TimelineEntry
                    key={index}
                    action={entry.action}
                    state={entry.state}
                    index={index}
                    currentIndex={currentTimelineIndex}
                    onClick={() => timeTravel(index)}
                  />
                ))
              )}
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            <p>Click on any action in the timeline to highlight it.</p>
            <p className="mt-1">
              Note: In a real Redux app with time travel debugging, clicking
              would restore that state.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">
          How Redux Works
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300">
          <li>
            <span className="font-medium text-blue-600 dark:text-blue-400">
              Action:
            </span>{" "}
            An action is dispatched to signal a state change (e.g., clicking
            "Increment")
          </li>
          <li>
            <span className="font-medium text-blue-600 dark:text-blue-400">
              Reducer:
            </span>{" "}
            The reducer receives the action and current state, then returns a
            new state
          </li>
          <li>
            <span className="font-medium text-blue-600 dark:text-blue-400">
              Store:
            </span>{" "}
            The store updates with the new state returned by the reducer
          </li>
          <li>
            <span className="font-medium text-blue-600 dark:text-blue-400">
              UI:
            </span>{" "}
            Components connected to the store automatically re-render with the
            new state
          </li>
        </ol>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold mb-2 text-slate-800 dark:text-white">
            Key Redux Principles:
          </h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <span className="font-medium">Single source of truth:</span> The
              entire application state lives in one store
            </li>
            <li>
              <span className="font-medium">State is read-only:</span> The only
              way to change state is by dispatching actions
            </li>
            <li>
              <span className="font-medium">
                Changes are made with pure functions:
              </span>{" "}
              Reducers are pure functions that specify how state changes
            </li>
            <li>
              <span className="font-medium">Unidirectional data flow:</span>{" "}
              State flows down, actions flow up
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const ReduxVisualizationWithProvider = () => {
  return (
    <Provider store={store}>
      <ReduxVisualization />
    </Provider>
  );
};

export default ReduxVisualizationWithProvider;
