import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoSettings } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { SiBookstack } from "react-icons/si";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaUsersRectangle } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import { toast } from "react-toastify";
import ConfirmDialog from "../../../reusable-components/user/Landing/ConfirmDialog";
import { logoutAdmin } from "@/redux/Slice/admin/adminSlice";

const AdminResponsiveSidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logoutAdmin());
    setTimeout(() => {
      toast.success("Logout Successful!");
    }, 500);
    navigate("/admin/admin-login");
  };

  return (
    <div className="flex flex-col gap-6 text-gray-700 text-lg font-prompt">
      <div
        className="flex items-center gap-2 cursor-pointer text-black"
        onClick={() => handleNavigation("/admin/dashboard")}
      >
        <RiDashboardHorizontalFill className="w-6 h-6" /> Dashboard
      </div>
      <div
        className="flex items-center gap-2 cursor-pointer text-black"
        onClick={() => handleNavigation("/admin/users")}
      >
        <HiMiniUsers className="w-6 h-6" /> Users
      </div>
      <div
        className="flex items-center gap-2 cursor-pointer text-black"
        onClick={() => handleNavigation("/admin/hosts")}
      >
        <FaUsersRectangle className="w-6 h-6" /> Hosts
      </div>
      <div
        className="flex items-center gap-2 cursor-pointer text-black"
        onClick={() => handleNavigation("/admin/booking")}
      >
        <SiBookstack className="w-6 h-6" /> Bookings
      </div>
      <div
        className="flex items-center gap-2 cursor-pointer text-black"
        onClick={() => handleNavigation("/admin/notifications")}
      >
        <FaBell className="w-6 h-6" /> Notifications
      </div>
      <div
        className="flex items-center gap-2 cursor-pointer text-black"
        onClick={() => handleNavigation("/admin/setting")}
      >
        <IoSettings className="w-6 h-6" /> Settings
      </div>
      <div
        className="flex items-center gap-2 cursor-pointer text-black"
        onClick={() => setConfirmLogout(true)}
      >
        <RiLogoutCircleRLine className="w-6 h-6" /> Logout
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
    </div>
  );
};

export default AdminResponsiveSidebar;
