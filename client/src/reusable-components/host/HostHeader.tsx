import React, { useState } from "react";
import { Search, Calendar, Users, MessageCircle, LogOut, MessageSquareDiff } from "lucide-react";
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

  const handleLogout = () => {
    dispatch(logoutHost());
    setTimeout(()=>{
      toast.success('Logout sucessful')
    },500)
    navigate("/host/login");
  };
  const handleLogoutClick = () => {
    setConfirmLogout(true);
  };

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-medium text-gray-800"></h1>
        <nav className="hidden md:flex items-center gap-4 text-sm text-gray-500">
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
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <TooltipIcon
            icon={<MessageSquareDiff className="h-6 w-6 text-black hover:text-white" onClick={() => navigate('/host/kind-of-service')} />}
            label="Upload new business"
          />
          <TooltipIcon
            icon={<Calendar className="h-6 w-6 text-black hover:text-white" />}
            label="Calendar"
          />
          <TooltipIcon
            icon={<Users className="h-6 w-6 text-black hover:text-white" />}
            label="Team"
          />
          <TooltipIcon
            icon={<MessageCircle className="h-6 w-6 text-black hover:text-white" />}
            label="Chat"
          />
          
          <TooltipIcon
            icon={<LogOut className="h-6 w-6 text-red-600 hover:text-white" onClick={handleLogoutClick} />}
            label="Logout"
          />
          <img
            src={Images.default_profile}
            alt="avatar"
            className="h-8 w-8 rounded-full object-cover"
          />
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
        <CustomToastContainer/>
      </div>
      
    </header>
  );
};

export default HostHeader;

