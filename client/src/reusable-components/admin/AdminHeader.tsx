import React, { useEffect, useState } from "react";
import { Bell, MessageCircle } from "lucide-react";
import { Images } from "@/assets";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface HeaderProps {
  role: string;
}

const AdminHeader: React.FC<HeaderProps> = ({role}) => {
  const [dateTime, setDateTime] = useState<string>("");
  const admin = useSelector((state:RootState) =>  state.admin.adminInfo)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setDateTime(now.toLocaleString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-200 shadow-sm rounded-md w-full font-prompt">
      <div className="text-sm sm:text-base">
        <p className="font-medium">Welcome!</p>
        <p className="text-gray-500 font-semibold">{dateTime}</p>
      </div>

      <div className="flex items-center gap-4">
        <MessageCircle className="w-9 h-9 p-1 bg-slate-200 rounded-3xl cursor-pointer hover:text-black" />
        <Bell className="w-9 h-9 p-1 bg-slate-200 rounded-3xl cursor-pointer hover:text-black" />

        <div className="flex items-center gap-2">
          <img
            src={Images.casual_user}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-right text-sm">
            <p className="font-medium uppercase">{admin?.firstname} {admin?.lastname}</p>
            <p className="text-gray-500">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
