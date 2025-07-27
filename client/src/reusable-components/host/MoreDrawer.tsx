import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  Calendar,
  FileText,
  FolderKanban,
  LayoutDashboard,
  DollarSign,
  Users,
  MessageCircle,
  Settings,
  HelpCircle,
  Bell,
  UserCog,
  LogOut,
} from "lucide-react";
interface MoreDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const links = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/host/dashboard" },
  { name: "Asset Status", icon: FileText, path: "/host/asset/status" },
  { name: "My Assets", icon: FolderKanban, path: "/host/assets" },
  { name: "Bookings", icon: Calendar, path: "/host/bookings" },
  { name: "Revenues", icon: DollarSign, path: "/host/revenues" },
  { name: "Team", icon: Users, path: "/host/team" },
  { name: "Messages", icon: MessageCircle, path: "/host/chat" },
  { name: "Notifications", icon: Bell, path: "/host/notifications" },
  { name: "Profile", icon: UserCog, path: "/host/profile" },
  { name: "Settings", icon: Settings, path: "/host/settings" },
  { name: "Help", icon: HelpCircle, path: "/host/help" },
  { name: "Logout", icon: LogOut, path: "/host/landing" },
];

export const MoreDrawer: React.FC<MoreDrawerProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        "fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 font-poppins",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">More Options</h3>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100%-64px)] p-4">
        <ul className="space-y-2">
          {links.map(({ name, icon: Icon, path }) => (
            <li
              key={name}
              className="flex items-center gap-3 text-gray-800 hover:bg-gray-200 p-2 rounded cursor-pointer transition"
              onClick={() => {
                if (name.toLowerCase() === "logout") {
                  onLogout();
                } else {
                  navigate(path);
                }

                onClose();
              }}
            >
              <Icon className={`w-5 h-5 ${name.toLowerCase() === 'logout' ? "text-red-600 hover:text-red-700" : "text-gray-500"}`} />
              <span className={`text-sm font-medium  ${name.toLowerCase() === 'logout' ? "text-red-600 hover:text-red-700" : "text-black"}`}>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
