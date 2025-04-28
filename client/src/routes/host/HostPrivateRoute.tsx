import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import HostLayout from "./HostLayout";

interface HostPrivateRouteProps {
  children: ReactNode;
}

const HostPrivateRoute: React.FC<HostPrivateRouteProps> = ({ children }) => {
  const hostInfo = useSelector((state: RootState) => state.host.hostInfo);
  const location = useLocation();

  if (!hostInfo?.accessToken) {
    return <Navigate to="/host/login" state={{ from: location }} replace />;
  }

  if (hostInfo.role !== "host") {
    return <Navigate to="/host/login" replace />;
  }

  return <HostLayout>{children}</HostLayout>;
};

export default HostPrivateRoute;