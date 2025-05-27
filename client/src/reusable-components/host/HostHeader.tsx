import React, { useState } from "react";
import {
  Search,
  Calendar,
  Users,
  MessageCircle,
  LogOut,
  MessageSquareDiff,
  Menu,
  X,
} from "lucide-react";
import { Images } from "@/assets";
import ConfirmDialog from "../user/Landing/ConfirmDialog";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutHost } from "@/redux/Slice/host/hostSlice";
import TooltipIcon from "@/components/TooltipIcon";
import { toast } from "react-toastify";
import CustomToastContainer from "../Messages/ToastContainer";

const HostHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutHost());
    setTimeout(() => {
      toast.success("Logout successful");
    }, 500);
    navigate("/host/login");
  };

  return (
    <header className="border-b border-gray-200 bg-white px-4 py-2 md:px-6 sticky top-0 z-50">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-4 w-full md:w-auto justify-between">
          <h1 className="text-lg font-semibold text-gray-800">
            Host Dashboard
          </h1>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row gap-4 mt-4 md:mt-0 text-sm text-gray-600 w-full md:w-auto`}
        >
          <a href="/host/dashboard" className="hover:text-black transition">
            Dashboard
          </a>
          <a href="#" className="hover:text-black transition">
            About
          </a>
          <a href="#" className="hover:text-black transition">
            Landing
          </a>
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex flex-wrap items-center gap-4 md:w-auto justify-end">
          <div className="relative w-64 flex-shrink-0">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>

          <TooltipIcon
            icon={
              <MessageSquareDiff
                className="h-9 w-9 text-black hover:text-white cursor-pointer"
                onClick={() => navigate("/host/kind-of-service")}
              />
            }
            label="Upload new business"
          />
          <TooltipIcon
            icon={
              <Calendar
                className="h-9 w-9 text-black hover:text-white cursor-pointer"
                onClick={() => navigate("/host/calendar")}
              />
            }
            label="Calendar"
          />
          <TooltipIcon
            icon={
              <Users
                className="h-9 w-9 text-black hover:text-white cursor-pointer"
                onClick={() => navigate("/host/team")}
              />
            }
            label="Team"
          />
          <TooltipIcon
            icon={
              <MessageCircle
                className="h-9 w-9 text-black hover:text-white cursor-pointer"
                onClick={() => navigate("/host/chat")}
              />
            }
            label="Chat"
          />
          <TooltipIcon
            icon={
              <LogOut
                className="h-9 w-9 text-red-600 hover:text-white cursor-pointer"
                onClick={() => setConfirmLogout(true)}
              />
            }
            label="Logout"
          />

          <img
            src={Images.default_profile}
            alt="avatar"
            className="h-8 w-8 rounded-full object-cover cursor-pointer"
          />
        </div>
        <div className="flex md:hidden flex-wrap items-center gap-4 text-gray-600 justify-end text-sm">
          <a
            href="/host/kind-of-service"
            className="hover:text-black transition cursor-pointer"
          >
            Upload new business
          </a>
          <a href="/host/calendar" className="hover:text-black transition">
            Calendar
          </a>
          <a href="/host/team" className="hover:text-black transition">
            Team
          </a>
          <a href="/host/chat" className="hover:text-black transition">
            Chat
          </a>
          <button
            onClick={() => setConfirmLogout(true)}
            className="hover:text-red-600 transition cursor-pointer"
          >
            Logout
          </button>
          <img
            src={Images.default_profile}
            alt="avatar"
            className="h-8 w-8 rounded-full object-cover cursor-pointer"
          />
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmLogout}
        title="Confirm Logout"
        description="Are you sure you want to logout?"
        confirmText="Yes, Logout"
        cancelText="Cancel"
        onConfirm={() => {
          handleLogout();
          setConfirmLogout(false);
        }}
        onCancel={() => setConfirmLogout(false)}
      />
      <CustomToastContainer />
    </header>
  );
};

export default HostHeader;
