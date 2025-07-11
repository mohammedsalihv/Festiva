import { useState } from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import {
  FiHelpCircle,
  FiBookOpen,
  FiUsers,
  FiHeadphones,
} from "react-icons/fi";

import { RootState } from "@/redux/store";
import { Button } from "@/components/Button";
import LogoText from "@/components/LogoText";
import HostAuthModal from "@/pages/host/Auth/HostAuthModal";

const HostLandingHeader = () => {
  const host = useSelector((state: RootState) => state.host.hostInfo);
  const [showDrawer, setShowDrawer] = useState(false);;
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  if (host) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-30 bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <LogoText />
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="/browse"
              className="text-sm font-semibold text-black hover:text-red-500"
            >
              Browse Location
            </a>
            <a
              href="/host/list-space"
              className="text-sm font-semibold text-black hover:text-red-500"
            >
              List Your Space
            </a>
            <div
              onClick={() => setShowDrawer(true)}
              className="flex items-center cursor-pointer"
            >
              <FaUserCircle className="text-2xl text-gray-700 hover:text-red-500" />
              <MdKeyboardArrowDown className="text-xl text-gray-700 hover:text-red-500" />
            </div>
          </div>
          <div className="sm:hidden">
            <button
              onClick={() => setShowDrawer(true)}
              className="text-2xl text-gray-700 hover:text-red-500"
              aria-label="Mobile Profile"
            >
              <FaUserCircle />
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          showDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-base font-semibold">Welcome</h2>
          <GrFormClose
            onClick={() => setShowDrawer(false)}
            className="text-xl cursor-pointer"
          />
        </div>

        <div className="p-4 space-y-4">
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white rounded-none"
            onClick={() => {
              setIsLoginMode(true);
              setShowAuthModal(true);
              setShowDrawer(false);
            }}
          >
            Login
          </Button>
          <Button
            className="w-full border border-red-500 text-red-500 rounded-none"
            onClick={() => {
              setIsLoginMode(false);
              setShowAuthModal(true);
              setShowDrawer(false);
            }}
          >
            Signup
          </Button>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">
              Explore
            </h3>
            <ul className="divide-y divide-gray-200">
              <li className="py-2 flex items-center gap-3 text-sm hover:text-red-500 cursor-pointer">
                <FiHelpCircle className="text-lg" />
                Help
              </li>
              <li className="py-2 flex items-center gap-3 text-sm hover:text-red-500 cursor-pointer">
                <FiBookOpen className="text-lg" />
                Hosting Guide
              </li>
              <li className="py-2 flex items-center gap-3 text-sm hover:text-red-500 cursor-pointer">
                <FiUsers className="text-lg" />
                Community
              </li>
              <li className="py-2 flex items-center gap-3 text-sm hover:text-red-500 cursor-pointer">
                <FiHeadphones className="text-lg" />
                Contact Support
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showDrawer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setShowDrawer(false)}
        />
      )}

      {showAuthModal && (
        <HostAuthModal
          isLogin={isLoginMode}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
};

export default HostLandingHeader;
