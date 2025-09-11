import { FC, useState } from "react";
import navItems from "@/utils/Navbar/admin/AdminSidebarNav";
import ConfirmDialog from "../user/Landing/ConfirmDialog";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutAdmin } from "@/redux/Slice/admin/adminSlice";
import { toast } from "react-toastify";
import CustomToastContainer from "@/reusable-components/messages/ToastContainer";
import { clearAllAssets } from "@/redux/Slice/admin/assetManagementSlice";
import { clearAllHosts } from "@/redux/Slice/admin/hostManagementSlice";
import { clearAllUsers } from "@/redux/Slice/admin/userManagementSlice";
import { MdArrowCircleRight, MdArrowCircleLeft } from "react-icons/md";
import { clearAdminDashboard } from "@/redux/Slice/admin/adminDashboardSlice";
import { adminLogout } from "@/api/admin/adminAuthService";

const AdminSidebar: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleLogout = async () => {
    await adminLogout();
    dispatch(clearAllAssets());
    dispatch(clearAllUsers());
    dispatch(clearAllHosts());
    dispatch(clearAdminDashboard());
    dispatch(logoutAdmin());
    setTimeout(() => {
      toast.success("Logout Successful!");
    }, 1000);
    navigate("/admin/admin-login");
  };

  return (
    <aside
      className={`h-screen transition-all duration-300
    ${isExpanded ? "w-48" : "w-16"} 
    bg-white flex-col justify-between 
    sm:flex hidden
  `}
    >
      <div className="flex justify-end px-3 pt-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-600 hover:text-black"
        >
          {isExpanded ? (
            <MdArrowCircleLeft className="h-8 w-8" />
          ) : (
            <MdArrowCircleRight className="h-8 w-8" />
          )}
        </button>
      </div>
      <nav className="flex flex-col space-y-2 px-2 ">
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.link;
          return (
            <div
              key={i}
              onClick={() => {
                if (item.isLogout) {
                  setConfirmLogout(true);
                } else if (item.link) {
                  navigate(item.link);
                }
              }}
              className={`flex items-center rounded-md cursor-pointer  px-3 py-2 transition-all duration-200
                ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
            >
              <item.icon
                className={`${
                  item.label === "Signout" ? "text-red-600" : ""
                } text-[28px]`}
              />
              {isExpanded && (
                <span
                  className={`ml-3 text-sm font-medium ${
                    item.label === "Signout" ? "text-red-600" : ""
                  }`}
                >
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      <CustomToastContainer />
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
    </aside>
  );
};

export default AdminSidebar;
