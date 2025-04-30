import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface HostPrivateRouteProps {
  children: ReactNode;
}

const AdminPrivateRoute: React.FC<HostPrivateRouteProps> = ({ children }) => {
  const adminInfo = useSelector((state: RootState) => state.admin.adminInfo);
  const location = useLocation();

  if (!adminInfo?.accessToken) {
    return <Navigate to="/admin/login-admin" state={{ from: location }} replace />;
  }

  if (adminInfo.role !== "admin") {
    return <Navigate to="*" replace />;
  }

  return children
};

export default AdminPrivateRoute;