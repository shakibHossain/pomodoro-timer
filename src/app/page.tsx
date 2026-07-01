"use client";

import ConfirmModal from "@/components/ConfirmModal";
import ModeSelector from "@/components/ModeSelector";
import SessionDots from "@/components/SessionDots";
import SettingsModal from "@/components/SettingsModal";
import TimerControls from "@/components/TimerControls";
import TimerDisplay from "@/components/TimerDisplay";
import { useSettings } from "@/context/SettingsContext";
import { useTimer } from "@/hooks/useTimer";
import { useEffect, useState } from "react";

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const { settings, isLoaded } = useSettings();
  const { state, dispatch } = useTimer({
    workDuration: settings.workDuration,
    shortBreakDuration: settings.shortBreak,
    longBreakDuration: settings.longBreak,
  });

  useEffect(() => {
    const minutes = Math.floor(state.totalSecondsRemaining / 60);
    const seconds = state.totalSecondsRemaining % 60;

    document.title = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")} - ${
      state.mode.charAt(0).toUpperCase() + state.mode.slice(1)
    }`;
  }, [state.totalSecondsRemaining, state.mode]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      if (e.code === "Space") {
        e.preventDefault();
        if (state.status === "running") dispatch({ type: "PAUSE" });
        else if (state.status === "paused") dispatch({ type: "RESUME" });
        else dispatch({ type: "START" });
      }
      if (e.key === "r" || e.key === "R") dispatch({ type: "RESET" });
      if (e.key === "1")
        dispatch({
          type: "SWITCH_MODE",
          payload: {
            mode: "work",
            totalSecondsInSession: settings.workDuration,
          },
        });
      if (e.key === "2")
        dispatch({
          type: "SWITCH_MODE",
          payload: {
            mode: "short-break",
            totalSecondsInSession: settings.shortBreak,
          },
        });
      if (e.key === "3")
        dispatch({
          type: "SWITCH_MODE",
          payload: {
            mode: "long-break",
            totalSecondsInSession: settings.longBreak,
          },
        });
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [state.status, settings, dispatch]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[#4a4035]">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center flex-1 gap-4">
      <ModeSelector
        mode={state.mode}
        dispatch={dispatch}
        workDuration={settings.workDuration}
        shortBreakDuration={settings.shortBreak}
        longBreakDuration={settings.longBreak}
      />
      <div className="flex flex-col items-center gap-1">
        <SessionDots
          sessionCount={state.sessionCount}
          cycleLength={settings.breakAfterSessionCount}
        />
        <p className="text-xs text-[#4a4035]">until long break</p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2 text-sm text-[#4a4035]">
          <span>
            {state.sessionCount > 0 || state.totalPomodorosCompleted > 0
              ? `${state.totalPomodorosCompleted} / ${settings.dailyGoal} Pomodoros`
              : `0 / ${settings.dailyGoal} Pomodoros`}
          </span>
          <button
            onClick={() => setConfirmingReset(true)}
            className="text-xs px-2 py-1 rounded-full border border-[#c9bb95] text-p[#6b6354] hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-colors"
          >
            Reset
          </button>
        </div>
        <p className="text-xs text-[#4a4035]">today's total</p>
      </div>

      <TimerDisplay
        totalSecondsRemaining={state.totalSecondsRemaining}
        totalSecondsInSession={state.totalSecondsInSession}
        mode={state.mode}
      />
      <div className="flex gap-2">
        <TimerControls status={state.status} dispatch={dispatch} />
      </div>
      <button
        className="px-6 py-3 rounded-full font-medium transition-colors bg-[#ddd0ac] hover:bg-[#d3c399] text-[#1a1a1a] border border-[#c9bb95]"
        onClick={() => setIsSettingsOpen(true)}
      >
        Settings
      </button>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <ConfirmModal
        isOpen={confirmingReset}
        title="Reset count?"
        message="This will reset your Pomodoro count to 0."
        confirmLabel="Reset"
        onConfirm={() => {
          dispatch({ type: "RESET_POMODORO_COUNT" });
          setConfirmingReset(false);
        }}
        onClose={() => setConfirmingReset(false)}
      />
    </main>
  );
}
