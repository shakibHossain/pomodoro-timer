"use client";

import ModeSelector from "@/components/ModeSelector";
import SessionDots from "@/components/SessionDots";
import TimerControls from "@/components/TimerControls";
import TimerDisplay from "@/components/TimerDisplay";
import { useTimer } from "@/hooks/useTimer";

export default function Home() {
  const { state, dispatch } = useTimer();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <ModeSelector
        mode={state.mode}
        dispatch={dispatch}
        workDuration={1500}
        shortBreakDuration={300}
        longBreakDuration={600}
      />
      <SessionDots sessionCount={state.sessionCount} cycleLength={4} />
      <TimerDisplay
        totalSecondsRemaining={state.totalSecondsRemaining}
        totalSecondsInSession={state.totalSecondsInSession}
        mode={state.mode}
      />
      <div className="flex gap-2">
        <TimerControls status={state.status} dispatch={dispatch} />
      </div>
    </div>
  );
}
