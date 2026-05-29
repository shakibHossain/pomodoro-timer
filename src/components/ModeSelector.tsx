import { TimerAction, TimerMode } from "@/types";

interface ModeSelectorProps {
  mode: TimerMode;
  dispatch: React.Dispatch<TimerAction>;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}

const ModeSelector = ({
  mode,
  dispatch,
  workDuration,
  shortBreakDuration,
  longBreakDuration,
}: ModeSelectorProps) => {
  return (
    <div className="flex gap-1 bg-gray-200 p-1 rounded-full">
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          mode === "work"
            ? "bg-white text-gray-900"
            : "text-gray-500 hover:text-gray-900"
        }`}
        onClick={() =>
          dispatch({
            type: "SWITCH_MODE",
            payload: { mode: "work", totalSecondsInSession: workDuration },
          })
        }
      >
        Work
      </button>
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          mode === "short-break"
            ? "bg-white text-gray-900"
            : "text-gray-500 hover:text-gray-900"
        }`}
        onClick={() =>
          dispatch({
            type: "SWITCH_MODE",
            payload: {
              mode: "short-break",
              totalSecondsInSession: shortBreakDuration,
            },
          })
        }
      >
        Short Break
      </button>
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          mode === "long-break"
            ? "bg-white text-gray-900"
            : "text-gray-500 hover:text-gray-900"
        }`}
        onClick={() =>
          dispatch({
            type: "SWITCH_MODE",
            payload: {
              mode: "long-break",
              totalSecondsInSession: longBreakDuration,
            },
          })
        }
      >
        Long Break
      </button>
    </div>
  );
};

export default ModeSelector;
