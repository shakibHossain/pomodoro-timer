export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4 text-[#1a1a1a]">About</h1>
      <p className="mb-8 text-[#4a4035]">A clean, focused Pomodoro timer</p>

      <h2 className="text-xl font-medium mb-3 text-[#1a1a1a]">Tech Stack</h2>
      <ul className="space-y-2 mb-8 text-[#4a4035]">
        <li>Next.js</li>
        <li>React - useReducer, custom hooks, Context</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
      </ul>

      <h2 className="text-xl font-medium mb-3 text-[#1a1a1a]">How it works</h2>
      <p className="mb-8 text-[#4a4035]">
        Each session automatically transitions to the next mode. Work sessions
        alternate with short breaks, and every 4th session triggers a long
        break.
      </p>
    </main>
  );
}
