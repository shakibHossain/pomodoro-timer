import { TimerAction, TimerStatus } from "@/types";

interface TimerControlProps {
  status: TimerStatus;
  dispatch: React.Dispatch<TimerAction>;
}
const TimerControls = ({ status, dispatch }: TimerControlProps) => {
  return (
    <div className="flex gap-3">
      {(status === "idle" || status === "complete") && (
        <button
          className="px-6 py-3 rounded-full font-medium transition-colors bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => dispatch({ type: "START" })}
        >
          Start
        </button>
      )}
      {status === "running" && (
        <button
          className="px-6 py-3 rounded-full font-medium transition-colors bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => dispatch({ type: "PAUSE" })}
        >
          Pause
        </button>
      )}
      {status === "paused" && (
        <button
          className="px-6 py-3 rounded-full font-medium transition-colors bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => dispatch({ type: "RESUME" })}
        >
          Resume
        </button>
      )}
      {(status === "paused" || status === "complete") && (
        <button
          className="px-6 py-3 rounded-full font-medium transition-colors bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default TimerControls;
