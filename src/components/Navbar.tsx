const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-[#c9bb95]">
      <span className="font-medium text-lg">Pomodoro Timer</span>
      <a
        href="https://github.com"
        className="text-sm text-[#6b6354]  hover:text-[#1a1a1a] transition-colors"
        target="_blank"
      >
        Github
      </a>
    </nav>
  );
};

export default Navbar;
