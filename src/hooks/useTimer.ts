import { useReducer, useEffect } from "react";
import { timerReducer } from "@/lib/timerReducer";
import { TimerState } from "@/types";

const initialState: TimerState = {
  totalSecondsRemaining: 1500,
  totalSecondsInSession: 1500,
  mode: "work",
  status: "idle",
  sessionCount: 0,
};

export function useTimer() {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  // run the interval when running
  useEffect(() => {
    if (state.status !== "running") return;

    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.status]);

  // check if the timer hit zero
  useEffect(() => {
    if (state.status === "running" && state.totalSecondsRemaining <= 0) {
      dispatch({
        type: "COMPLETE",
        payload: {
          workDuration: 1500,
          shortBreakDuration: 300,
          longBreakDuration: 600,
        },
      });
    }
  }, [state.totalSecondsRemaining, state.status]);

  return { state, dispatch };
}
