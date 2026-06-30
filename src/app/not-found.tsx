import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 gap-4">
      <h1 className="text-6xl font-bold text-[#1a1a1a]">404</h1>
      <p className="text-[#6b6354]">Page not found</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full text-sm bg-[#f2c94c] text-[#1a1a1a] hover:bg-[#e0b73a] transition-colors"
      >
        Go home
      </Link>
    </main>
  );
}
