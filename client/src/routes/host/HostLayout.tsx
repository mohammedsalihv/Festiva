import React from "react";
import HostHeader from "@/reusable-components/host/HostHeader";

interface HostLayoutProps {
  children: React.ReactNode;
}

const HostLayout: React.FC<HostLayoutProps> = ({ children }) => {
  return (
    <div>
      <HostHeader />
      <main>{children}</main>
    </div>
  );
};

export default HostLayout;
