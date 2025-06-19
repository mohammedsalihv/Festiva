import React, { useState } from "react";
import {
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
    toast.success("Logout successful");
    navigate("/host/login");
  };

  return (
    <header className="border-b border-gray-200 bg-white px-4 py-2 md:px-6 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img
            src={Images.default_profile}
            alt="logo"
            className="h-8 w-8 rounded-full object-cover"
          />
          <h1 className="text-lg font-semibold text-gray-800 hidden md:block">
            Host Dashboard
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <TooltipIcon
            icon={
              <MessageSquareDiff
                className="h-6 w-6 text-black cursor-pointer"
                onClick={() => navigate("/host/kind-of-service")}
              />
            }
            label="Upload"
          />
          <TooltipIcon
            icon={
              <Calendar
                className="h-6 w-6 text-black cursor-pointer"
                onClick={() => navigate("/host/calendar")}
              />
            }
            label="Calendar"
          />
          <TooltipIcon
            icon={
              <Users
                className="h-6 w-6 text-black cursor-pointer"
                onClick={() => navigate("/host/team")}
              />
            }
            label="Team"
          />
          <TooltipIcon
            icon={
              <MessageCircle
                className="h-6 w-6 text-black cursor-pointer"
                onClick={() => navigate("/host/chat")}
              />
            }
            label="Chat"
          />
          <TooltipIcon
            icon={
              <LogOut
                className="h-6 w-6 text-red-600 cursor-pointer"
                onClick={() => setConfirmLogout(true)}
              />
            }
            label="Logout"
          />
          <img
            src={Images.default_profile}
            alt="avatar"
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-gray-600"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer from RIGHT */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-md p-5 flex flex-col gap-6 text-gray-800">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-semibold">Menu</h2>
              <X className="cursor-pointer" onClick={() => setMenuOpen(false)} />
            </div>

            <div className="flex flex-col items-center gap-6 mt-4">
              <MessageSquareDiff
                className="h-6 w-6 text-black cursor-pointer"
                onClick={() => {
                  navigate("/host/kind-of-service");
                  setMenuOpen(false);
                }}
              />
              <Calendar
                className="h-6 w-6 text-black cursor-pointer"
                onClick={() => {
                  navigate("/host/calendar");
                  setMenuOpen(false);
                }}
              />
              <Users
                className="h-6 w-6 text-black cursor-pointer"
                onClick={() => {
                  navigate("/host/team");
                  setMenuOpen(false);
                }}
              />
              <MessageCircle
                className="h-6 w-6 text-black cursor-pointer"
                onClick={() => {
                  navigate("/host/chat");
                  setMenuOpen(false);
                }}
              />
              <LogOut
                className="h-6 w-6 text-red-600 cursor-pointer"
                onClick={() => {
                  setConfirmLogout(true);
                  setMenuOpen(false);
                }}
              />
              <img
                src={Images.default_profile}
                alt="avatar"
                className="h-10 w-10 rounded-full mt-4"
              />
            </div>
          </div>
        </div>
      )}

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

