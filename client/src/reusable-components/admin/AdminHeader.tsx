import { useEffect, useState } from "react";
import { LuBell } from "react-icons/lu";
import { LuMessageSquareText } from "react-icons/lu";
import { Images } from "@/assets";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import clsx from "clsx";
import AdminResponsiveSidebar from "@/utils/Navbar/admin/AdminResponsiveSidebar";
import { RiCloseFill } from "react-icons/ri";

const AdminHeader = () => {
  const [dateTime, setDateTime] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [greeting, setGreeting] = useState<string>("");
  const admin = useSelector((state: RootState) => state.admin.adminInfo);

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

      const hour = now.getHours()
      if(hour < 12){
        setGreeting("Good Morning 🌅");
      }else if (hour < 18) {
        setGreeting("Good Afternoon ☀️");
      }else {
        setGreeting("Good Evening 🌙");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white shadow-sm rounded-md w-full">
        <div className="text-sm sm:text-base">
          <p className="font-medium">{greeting}</p>
          <p className="text-blue-500 font-semibold">{dateTime}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex gap-4 items-center">
            <LuMessageSquareText className="w-9 h-9 p-1 bg-white rounded-3xl cursor-pointer hover:text-black" />
            <LuBell className="w-9 h-9 p-1 bg-white rounded-3xl cursor-pointer hover:text-black" />
          </div>
          <div className="flex items-center gap-2">
            <div
              className="block sm:hidden cursor-pointer"
              onClick={() => setShowSidebar(true)}
            >
              <img
                src={Images.casual_user}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <img
                src={
                  admin?.profilePic ? admin.profilePic : Images.default_profile
                }
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-right text-sm">
                <p className="font-medium uppercase">
                  {admin?.firstname} {admin?.lastname}
                </p>
                <p className="text-gray-500">{admin?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 transition-transform duration-300 z-50",
          {
            "translate-x-full": !showSidebar,
            "translate-x-0": showSidebar,
          }
        )}
      >
        <RiCloseFill
          className="mb-7 w-6 h-6 cursor-pointer"
          onClick={() => setShowSidebar(false)}
        />
        <AdminResponsiveSidebar />
      </div>
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </>
  );
};

export default AdminHeader;
