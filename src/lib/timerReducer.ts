import { TimerState, TimerAction } from "../types";

export function timerReducer(
  state: TimerState,
  action: TimerAction
): TimerState {
  // look at the action
  // return a new state based on it
  switch (action.type) {
    case "START":
      // return new state
      return { ...state, status: "running" };
    case "PAUSE":
      // return new state
      return { ...state, status: "paused" };
    case "RESUME":
      // return running state
      return { ...state, status: "running" };
    case "RESET":
      // return idle state
      return {
        ...state,
        status: "idle",
        totalSecondsRemaining: state.totalSecondsInSession,
      };
    case "RESET_POMODORO_COUNT":
      return { ...state, totalPomodorosCompleted: 0, sessionCount: 0 };
    case "TICK":
      // decrease time remaning by 1
      return {
        ...state,
        totalSecondsRemaining: state.totalSecondsRemaining - 1,
      };
    case "COMPLETE": {
      const isWorkSession = state.mode === "work";
      const newSessionCount = isWorkSession
        ? state.sessionCount + 1
        : state.sessionCount;
      const newTotalCompleted = isWorkSession
        ? state.totalPomodorosCompleted + 1
        : state.totalPomodorosCompleted;

      const nextMode =
        state.mode !== "work"
          ? "work" // just finished a break, back to work
          : newSessionCount % action.payload.breakAfterSessionCount === 0
          ? "long-break" // every 4th session -> long break
          : "short-break"; // otherwise -> short break
        
      const nextSessionCount = state.mode === 'long-break' ? 0 : newSessionCount

      const nextDuration =
        nextMode === "work"
          ? action.payload.workDuration
          : nextMode === "short-break"
          ? action.payload.shortBreakDuration
          : action.payload.longBreakDuration;

      return {
        ...state,
        status: "idle",
        sessionCount: nextSessionCount,
        totalPomodorosCompleted: newTotalCompleted,
        mode: nextMode,
        totalSecondsInSession: nextDuration,
        totalSecondsRemaining: nextDuration,
      };
    }
    case "SWITCH_MODE":
      return {
        ...state,
        mode: action.payload.mode,
        totalSecondsInSession: action.payload.totalSecondsInSession,
        totalSecondsRemaining: action.payload.totalSecondsInSession,
        status: "idle",
      };

    default:
      return state;
  }
}
