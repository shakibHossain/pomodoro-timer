import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-gray-300">Page not found</p>
      <Link
        href="/"
        className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition-colors"
      >
        Go home
      </Link>
    </main>
  );
}
