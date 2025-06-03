import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";


interface AdminPrivateRouteProps {
  children: ReactNode;
}

const AdminPrivateRoute: React.FC<AdminPrivateRouteProps> = ({ children }) => {
  const adminInfo = useSelector((state: RootState) => state.admin.adminInfo);
  if (!adminInfo?.accessToken) {
    return <Navigate to="/admin/login" replace />;
  }

  if (adminInfo.role !== "admin") {
    return <Navigate to="/error" replace />;
  }

  return children
};

export default AdminPrivateRoute;