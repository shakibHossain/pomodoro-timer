import { useReducer, useEffect } from "react";
import { timerReducer } from "@/lib/timerReducer";
import { TimerState } from "@/types";
import { useNotification } from "./useNotification";

interface TimerOptions {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  breakAfterSessionCount: number;
}

export function useTimer({
  workDuration,
  shortBreakDuration,
  longBreakDuration,
  breakAfterSessionCount,
}: TimerOptions) {
  const { notify } = useNotification();

  const initialState: TimerState = {
    totalSecondsRemaining: workDuration,
    totalSecondsInSession: workDuration,
    mode: "work",
    status: "idle",
    sessionCount: 0,
    totalPomodorosCompleted: 0,
  };

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
          workDuration,
          shortBreakDuration,
          longBreakDuration,
          breakAfterSessionCount,
        },
      });
      notify(
        "Session complete!",
        `Time for a ${state.mode === "work" ? "break" : "work session"}`
      );
    }
  }, [state.totalSecondsRemaining, state.status]);

  useEffect(() => {
    dispatch({
      type: "SWITCH_MODE",
      payload: {
        mode: "work",
        totalSecondsInSession: workDuration,
      },
    });
  }, [workDuration, shortBreakDuration, longBreakDuration]);

  return { state, dispatch };
}
