const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6  py-4">
      <span className="font-medium text-lg">Pomodoro</span>
      <a
        href="https://github.com"
        className="text-sm text-gray-500  hover:text-white transition-colors"
        target="_blank"
      >
        Github
      </a>
    </nav>
  );
};

export default Navbar;
