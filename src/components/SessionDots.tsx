interface SessionDotsProps {
  sessionCount: number;
  cycleLength: number;
}

const SessionDots = ({ sessionCount, cycleLength }: SessionDotsProps) => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: cycleLength }).map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${
            i < sessionCount % cycleLength ? "bg-white" : "bg-white/30"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default SessionDots;
