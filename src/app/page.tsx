"use client";

import ModeSelector from "@/components/ModeSelector";
import SessionDots from "@/components/SessionDots";
import SettingsModal from "@/components/SettingsModal";
import TimerControls from "@/components/TimerControls";
import TimerDisplay from "@/components/TimerDisplay";
import { useSettings } from "@/context/SettingsContext";
import { useTimer } from "@/hooks/useTimer";
import { useState } from "react";

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { settings } = useSettings();
  const { state, dispatch } = useTimer({
    workDuration: settings.workDuration,
    shortBreakDuration: settings.shortBreak,
    longBreakDuration: settings.longBreak,
  });

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
        className="px-6 py-3 rounded-full font-medium transition-colors bg-gray-500 hover:bg-blue-600 text-white"
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
