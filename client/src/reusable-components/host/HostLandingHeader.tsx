import { useState } from "react";
import { useSelector } from "react-redux";
import { RiMenuFold4Line } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
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
      <nav className="fixed top-0 left-0 w-full z-30 bg-white font-poppins">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <LogoText />
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="/user/login"
              className="text-sm font-semibold text-black hover:text-red-500"
            >
              Switch to Renter
            </a>
            <p
              onClick={() => {
              setIsLoginMode(true);
              setShowAuthModal(true);
            }}
              className="text-sm font-semibold text-black hover:text-red-500 cursor-pointer"
            >
              List Your Space
            </p>
            <RiMenuFold4Line  
            className="cursor-pointer text-2xl text-black hover:text-red-500"
            onClick={() => setShowDrawer(true)}
            />
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
        <div className="flex justify-end p-2">
          <GrFormClose
            onClick={() => setShowDrawer(false)}
            className="text-2xl cursor-pointer text-right"
          />
        </div>

        <div className="p-2 space-y-2">
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white rounded-none font-poppins"
            onClick={() => {
              setIsLoginMode(true);
              setShowAuthModal(true);
              setShowDrawer(false);
            }}
          >
            Login
          </Button>
          <Button
            className="w-full border border-red-500 text-red-500 rounded-none font-poppins"
            onClick={() => {
              setIsLoginMode(false);
              setShowAuthModal(true);
              setShowDrawer(false);
            }}
          >
            Signup
          </Button>

         <div className="font-poppins px-1 py-1">
            <ul className="divide-y divide-gray-200">
              <li className="py-3 flex items-center gap-3 text-sm hover:text-red-500 cursor-pointer">
                <FiHelpCircle className="text-lg text-gray-500" />
                Help
              </li>
              <li className="py-3 flex items-center gap-3 text-sm hover:text-red-500 cursor-pointer">
                <FiBookOpen className="text-lg text-gray-500" />
                Hosting Guide
              </li>
              <li className="py-3 flex items-center gap-3 text-sm hover:text-red-500 cursor-pointer">
                <FiUsers className="text-lg text-gray-500" />
                Community
              </li>
              <li className="py-3 flex items-center gap-3 text-sm hover:text-red-500 cursor-pointer">
                <FiHeadphones className="text-lg text-gray-500" />
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
