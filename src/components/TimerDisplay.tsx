import { TimerMode } from "@/types";
import { useMemo } from "react";

interface TimerDisplayProps {
  totalSecondsRemaining: number;
  totalSecondsInSession: number;
  mode: TimerMode;
}

export default function TimerDisplay({
  totalSecondsRemaining,
  totalSecondsInSession,
  mode,
}: TimerDisplayProps) {
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(totalSecondsRemaining / 60);
    const seconds = totalSecondsRemaining % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }, [totalSecondsRemaining]);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = totalSecondsRemaining / totalSecondsInSession;
  const strokeDashoffset = circumference * (1 - progress);
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <svg width={280} height={280} className="-rotate-90">
          {/* background circle */}
          <circle
            cx={140}
            cy={140}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={8}
          />
          {/* progress circle */}
          <circle
            cx={140}
            cy={140}
            r={radius}
            fill="none"
            stroke="#ef4444"
            strokeWidth={8}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* time in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold">{formattedTime}</span>
          <span className="text-sm text-gray-500 mt-1 capitalize">{mode}</span>
        </div>
      </div>
    </div>
  );
}
