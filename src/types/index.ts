/**
TimerMode     — a union type
TimerStatus   — a union type
TimerState    — an interface
Settings      — an interface
TimerAction   — a discriminated union
 */

export type TimerMode = "work" | "short-break" | "long-break";
export type TimerStatus = "idle" | "running" | "paused" | "complete";
export type DisplayMode = "dark" | "light";

export interface TimerState {
  totalSecondsRemaining: number;
  totalSecondsInSession: number;
  mode: TimerMode;
  status: TimerStatus;
  sessionCount: number;
  totalPomodorosCompleted: number;
}

export interface Settings {
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  breakAfterSessionCount: number;
  displayMode: DisplayMode;
  dailyGoal: number;
}

export type TimerAction =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "RESET" }
  | { type: "RESET_POMODORO_COUNT" }
  | {
      type: "SWITCH_MODE";
      payload: { mode: TimerMode; totalSecondsInSession: number };
    }
  | { type: "TICK" }
  | {
      type: "COMPLETE";
      payload: {
        workDuration: number;
        shortBreakDuration: number;
        longBreakDuration: number;
        breakAfterSessionCount: number;
      };
    };
