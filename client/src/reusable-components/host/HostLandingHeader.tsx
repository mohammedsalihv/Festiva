import LogoText from "@/components/LogoText";

const HostLandingHeader = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-white shadow border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <LogoText />

        <div className="flex-shrink-0">
          <ul className="flex gap-3">
            <li>
              <a
                href="/login"
                className="text-sm px-3 py-1 font-JosephicSans font-semibold text-black hover:text-main_color whitespace-nowrap"
              >
                Switch to user
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm px-3 py-1 font-JosephicSans font-semibold text-black hover:text-main_color"
              >
                Dashboard
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HostLandingHeader;
