import { useNotification } from "@/hooks/useNotification";
import { TimerAction, TimerStatus } from "@/types";
import { styles } from "@/lib/styles";

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
          className={styles.btnPrimary}
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
          className={styles.btnSecondary}
          onClick={() => dispatch({ type: "PAUSE" })}
        >
          Pause
        </button>
      )}
      {status === "paused" && (
        <button
          className={styles.btnPrimary}
          onClick={() => dispatch({ type: "RESUME" })}
        >
          Resume
        </button>
      )}
      {(status === "paused" || status === "complete") && (
        <button
          className={styles.btnSecondary}
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default TimerControls;
