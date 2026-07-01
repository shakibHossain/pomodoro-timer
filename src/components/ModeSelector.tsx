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
    <div className="flex gap-1 bg-[#ddd0ac] p-1 rounded-full border border-[#c9bb95]">
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          mode === "work"
            ? "bg-[#e8ddc4] text-[#1a1a1a]"
            : "text-[#4a4035] hover:text-[#1a1a1a]"
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
            ? "bg-[#e8ddc4] text-[#1a1a1a]"
            : "text-[#4a4035] hover:text-[#1a1a1a]"
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
            ? "bg-[#e8ddc4] text-[#1a1a1a]"
            : "text-[#4a4035] hover:text-[#1a1a1a]"
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
