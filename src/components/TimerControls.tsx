import { useNotification } from "@/hooks/useNotification";
import { TimerAction, TimerStatus } from "@/types";

interface TimerControlProps {
  status: TimerStatus;
  dispatch: React.Dispatch<TimerAction>;
}
const TimerControls = ({ status, dispatch }: TimerControlProps) => {
  const { requestPermission } = useNotification();

  return (
    <div className="flex gap-3">
      {(status === "idle" || status === "complete") && (
        <button
          className="px-6 py-3 rounded-full font-medium transition-colors bg-[#f2c94c] hover:bg-[#e0b73a] text-[#1a1a1a]"
          onClick={() => {
            requestPermission();
            dispatch({ type: "START" });
          }}
        >
          Start
        </button>
      )}
      {status === "running" && (
        <button
          className="px-6 py-3 rounded-full font-medium transition-colors bg-[#ddd0ac] hover:bg-[#d3c399] text-[#1a1a1a] border border-[#c9bb95]"
          onClick={() => dispatch({ type: "PAUSE" })}
        >
          Pause
        </button>
      )}
      {status === "paused" && (
        <button
          className="px-6 py-3 rounded-full font-medium transition-colors bg-[#f2c94c] hover:bg-[#e0b73a] text-[#1a1a1a]"
          onClick={() => dispatch({ type: "RESUME" })}
        >
          Resume
        </button>
      )}
      {(status === "paused" || status === "complete") && (
        <button
          className="px-6 py-3 rounded-full font-medium transition-colors bg-[#ddd0ac] hover:bg-[#d3c399] text-[#1a1a1a] border border-[#c9bb95]"
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default TimerControls;
