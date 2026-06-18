export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-white text-3xl font-bold mb-4">About</h1>
      <p className="text-gray-300 mb-8">A clean, focused Pomodoro timer</p>

      <h2 className="text-white text-xl font-medium mb-3">Tech Stack</h2>
      <ul className="space-y-2 text-gray-300 mb-8">
        <li>Next.js</li>
        <li>React - useReducer, custom hooks, Context</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
      </ul>

      <h2 className="text-white text-xl font-medium mb-3">How it works</h2>
      <p className="text-gray-300 mb-8">
        Each session automatically transitions to the next mode. Work sessions
        alternate with short breaks, and every 4th session triggers a long
        break.
      </p>
    </main>
  );
}
