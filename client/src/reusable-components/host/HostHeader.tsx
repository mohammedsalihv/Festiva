import React, { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  MessageCircle,
  LogOut,
  MessageSquareDiff,
  X,
} from "lucide-react";
import { CiMenuFries } from "react-icons/ci";
import { Images } from "@/assets";
import ConfirmDialog from "../user/Landing/ConfirmDialog";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutHost } from "@/redux/Slice/host/common/hostSlice";
import TooltipIcon from "@/components/TooltipIcon";
import { toast } from "react-toastify";
import CustomToastContainer from "../Messages/ToastContainer";
import LogoText from "@/components/LogoText";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";
import { MoreDrawer } from "./MoreDrawer";
import { IoNotificationsOutline } from "react-icons/io5";
import NotificationPanel from "@/components/NotificationPanel";
import { INotification } from "@/utils/Types/host/pages/notification";
import { allNotification } from "@/api/host/hostAccountService";

const HostHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [fetchedNotifications, setFetchedNotifications] = useState<
    INotification[]
  >([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await allNotification();
        setFetchedNotifications(response?.data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);
  const handleLogout = () => {
    dispatch(logoutHost());
    toast.success("Logout successful");
    navigate("/host/login");
  };

  return (
    <header className="border-b border-gray-200 bg-white px-4 py-4 md:px-6 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LogoText />
          <h1 className="text-lg font-semibold text-gray-800 hidden md:block"></h1>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <TooltipIcon
            icon={
              <MessageSquareDiff
                className="h-11 w-11 text-black hover:text-white cursor-pointer"
                onClick={() => navigate("/host/kind-of-service")}
              />
            }
            label="Upload"
          />
          <TooltipIcon
            icon={
              <Calendar
                className="h-11 w-11 text-black hover:text-white cursor-pointer"
                onClick={() => navigate("/host/calendar")}
              />
            }
            label="Calendar"
          />
          <TooltipIcon
            icon={
              <Users
                className="h-11 w-11 text-black hover:text-white cursor-pointer"
                onClick={() => navigate("/host/team")}
              />
            }
            label="Team"
          />
          <TooltipIcon
            icon={
              <div
                onClick={() => {
                  setOpenNotification((prev) => !prev);
                  setMenuOpen(false);
                }}
                className="relative w-11 h-11 flex items-center justify-center"
              >
                <IoNotificationsOutline className="h-6 w-6 text-black hover:text-white cursor-pointer" />
                {fetchedNotifications.length > 0 && (
                  <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-semibold px-1.5 py-[2px] rounded-full">
                    {fetchedNotifications.length > 99
                      ? "99+"
                      : fetchedNotifications.length}
                  </span>
                )}
              </div>
            }
            label="Notifications"
          />
          <TooltipIcon
            icon={
              <MessageCircle
                className="h-11 w-11 text-black hover:text-white cursor-pointer"
                onClick={() => navigate("/host/chat")}
              />
            }
            label="Chat"
          />
          <TooltipIcon
            icon={
              <LogOut
                className="h-11 w-11 text-red-600 hover:text-white cursor-pointer"
                onClick={() => setConfirmLogout(true)}
              />
            }
            label="Logout"
          />
          <TooltipIcon
            icon={
              <CgDetailsMore
                className="h-11 w-11 text-main_host hover:text-white cursor-pointer"
                onClick={() => setDrawerOpen(true)}
              />
            }
            label="More"
          />
          <div className="flex items-baseline cursor-pointer">
            <img
              src={Images.default_profile}
              alt="avatar"
              className="h-11 w-11 object-cover cursor-pointer"
            />
            <IoMdArrowDropdown />
          </div>
        </div>
        <div className="md:hidden">
          <CiMenuFries
            onClick={() => setMenuOpen(true)}
            className="text-black cursor-pointer"
            aria-label="Open menu"
            size={24}
          />
        </div>
      </div>
      <NotificationPanel
        isOpen={openNotification}
        onClose={() => setOpenNotification(false)}
        notifications={fetchedNotifications}
      />
      <MoreDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-md p-5 flex flex-col gap-6 text-gray-800">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-semibold">Menu</h2>
              <X
                className="cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
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
              <div className="relative w-6 h-6 flex items-center justify-center">
                <IoNotificationsOutline
                  onClick={() => {
                    setOpenNotification((prev) => !prev);
                    setMenuOpen(false);
                  }}
                  className="h-6 w-6 text-black cursor-pointer"
                />
                {fetchedNotifications.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-[9px] font-semibold px-1.5 py-[1px] rounded-full leading-none">
                    {fetchedNotifications.length > 99
                      ? "99+"
                      : fetchedNotifications.length}
                  </span>
                )}
              </div>

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
              <CgDetailsMore
                className="h-6 w-6 text-main_host cursor-pointer"
                onClick={() => {
                  setMenuOpen(false);
                  setDrawerOpen(true);
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
