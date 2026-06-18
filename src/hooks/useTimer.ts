import { useReducer, useEffect } from "react";
import { timerReducer } from "@/lib/timerReducer";
import { TimerState } from "@/types";

interface TimerOptions {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}

export function useTimer({
  workDuration,
  shortBreakDuration,
  longBreakDuration,
}: TimerOptions) {
  const initialState: TimerState = {
    totalSecondsRemaining: workDuration,
    totalSecondsInSession: workDuration,
    mode: "work",
    status: "idle",
    sessionCount: 0,
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
        },
      });
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
