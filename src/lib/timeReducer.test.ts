import { describe, it, expect } from "vitest";
import { timerReducer } from "./timerReducer";
import { TimerState } from "@/types";

const initialState: TimerState = {
  totalSecondsRemaining: 1500,
  totalSecondsInSession: 1500,
  mode: "work",
  status: "idle",
  sessionCount: 0,
};
const stateBeforeLongBreak: TimerState = { ...initialState, sessionCount: 3 };

describe("timerReducer", () => {
  it("START changes status to running", () => {
    const newState = timerReducer(initialState, { type: "START" });
    expect(newState.status).toBe("running");
  });
  it("PAUSE changes status to paused", () => {
    const newState = timerReducer(initialState, { type: "PAUSE" });
    expect(newState.status).toBe("paused");
  });
  it("RESUME changes status to running", () => {
    const newState = timerReducer(initialState, { type: "RESUME" });
    expect(newState.status).toBe("running");
  });
  it("RESET changes status to idle", () => {
    const newState = timerReducer(initialState, { type: "RESET" });
    expect(newState.status).toBe("idle");
    expect(newState.totalSecondsRemaining).toEqual(
      newState.totalSecondsInSession
    );
  });
  it("TICK decrements totalSecondsRemaining by 1", () => {
    const newState = timerReducer(initialState, { type: "TICK" });
    expect(newState.totalSecondsRemaining).toEqual(
      initialState.totalSecondsInSession - 1
    );
  });
  it("COMPLETE increments the sessionCount by 1, updates mode and resets seconds", () => {
    const newState = timerReducer(initialState, {
      type: "COMPLETE",
      payload: {
        workDuration: 1500,
        shortBreakDuration: 300,
        longBreakDuration: 600,
      },
    });
    expect(newState.sessionCount).toEqual(initialState.sessionCount + 1);
    expect(newState.mode).toBe("short-break");
    expect(newState.totalSecondsRemaining).toEqual(300);
  });
  it("SWITCH_MODE updates mode and resets seconds", () => {
    const newState = timerReducer(initialState, {
      type: "SWITCH_MODE",
      payload: { mode: "short-break", totalSecondsInSession: 300 },
    });
    expect(newState.mode).toBe("short-break");
    expect(newState.status).toBe("idle");
    expect(newState.totalSecondsRemaining).toEqual(
      newState.totalSecondsInSession
    );
  });
  it("COMPLETE switches to long-break after every 4th work session", () => {
    const newState = timerReducer(stateBeforeLongBreak, {
      type: "COMPLETE",
      payload: {
        workDuration: 1500,
        shortBreakDuration: 300,
        longBreakDuration: 600,
      },
    });
    expect(newState.mode).toBe("long-break");
    expect(newState.status).toBe("idle");
    expect(newState.totalSecondsRemaining).toBe(600);
  });
});
