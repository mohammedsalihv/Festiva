import LogoText from "@/components/LogoText";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import HostLogin from "@/pages/host/Auth/HostLogin";
import { useState } from "react";
import { Button } from "@/components/Button";


const HostLandingHeader = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-white shadow border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <LogoText />
        <div className="flex-shrink-0">
          <ul className="flex gap-3">
            <li>
              {userInfo ? (
                <a
                  href="/user/home"
                  className="text-sm px-3 py-1 font-JosephicSans font-semibold text-black hover:text-red-500 whitespace-nowrap"
                >
                  Switch to user
                </a>
              ) : (
                <a
                  href="/login"
                  className="text-sm px-3 py-1 font-JosephicSans font-semibold text-black hover:text-red-500 whitespace-nowrap"
                >
                  Switch to user
                </a>
              )}
            </li>
            <li>
              <a
                href="/host/dashboard"
                className="text-sm px-3 py-1 font-JosephicSans font-semibold text-black hover:text-red-500"
              >
                Dashboard
              </a>
            </li>
            <li>
              <Button
                onClick={() => setShowLoginModal(true)}
                className="text-sm px-3 py-1 font-JosephicSans font-semibold text-black hover:text-white border rounded-md hover:bg-red-500"
              >
                Login
              </Button>
            </li>
          </ul>
        </div>
      </div>
      {showLoginModal && <HostLogin onClose={() => setShowLoginModal(false)} />}
    </nav>
  );
};

export default HostLandingHeader;
