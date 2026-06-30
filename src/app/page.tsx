"use client";

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

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[#6b6354]">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <ModeSelector
        mode={state.mode}
        dispatch={dispatch}
        workDuration={settings.workDuration}
        shortBreakDuration={settings.shortBreak}
        longBreakDuration={settings.longBreak}
      />
      <SessionDots
        sessionCount={state.sessionCount}
        cycleLength={settings.breakAfterSessionCount}
      />
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
    </div>
  );
}
