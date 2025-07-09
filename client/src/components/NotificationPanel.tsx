import React from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { notificationProps } from "@/utils/Types/host/pages/notification";
import { TbViewportTall } from "react-icons/tb";
import { Images } from "@/assets"; // make sure this is imported

const NotificationPanel: React.FC<notificationProps> = ({
  isOpen,
  onClose,
  notifications,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-4 w-[92%] sm:w-[400px] max-h-[80vh] z-[9999] overflow-y-auto bg-white border shadow-xl rounded-xl font-poppins">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <IoClose className="cursor-pointer h-6 w-6" onClick={onClose} />
        <h3 className="text-[16px] font-semibold">Your notifications</h3>
        {/* <div className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer">
          <IoCheckmarkDone />
          <span className="hover:underline">Mark all as read</span>
        </div> */}
      </div>

      <div className="flex flex-col gap-4 px-4 py-2">
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif._id}
              className="bg-white rounded-lg shadow-sm p-3 relative border"
            >
              {!notif.isRead && (
                <div className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full" />
              )}

              <div className="flex gap-3 items-start">
                <img
                  src={notif.creator?.profilePic || Images.default_profile}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 pr-6">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-500">
                      @{notif.creator?.firstname} {notif.creator?.lastname}
                    </span>
                  </p>
                  <p className="text-sm font-bold text-black mt-1">
                    {notif.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <TbViewportTall
                className="absolute bottom-3 right-3 text-black cursor-pointer"
                size={20}
                onClick={() => {
                  onClose();
                  navigate("/host/asset/status");
                }}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-sm py-4">
            No notifications found.
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
