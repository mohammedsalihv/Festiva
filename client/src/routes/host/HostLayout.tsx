import React from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import HostHeader from "@/reusable-components/host/HostHeader";

interface HostLayoutProps {
  children: React.ReactNode;
}

const HostLayout: React.FC<HostLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div>
      <HostHeader />
      <div
        onClick={() => navigate(-1)}
        className="flex items-center px-4 md:px-10 py-2"
      >
        <Button className="flex items-center  text-main_host hover:text-red-600 text-base md:text-lg">
          <IoChevronBack className="w-4 h-4 md:w-6 md:h-6" />
          <span>Back</span>
        </Button>
      </div>

      <main>{children}</main>
    </div>
  );
};

export default HostLayout;
