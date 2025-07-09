import React, { ReactNode } from "react";
import { ADMIN_ROUTES } from "@/utils/constants/routes/admin.routes";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import AdminLayout from "./AdminLayout";

interface AdminPrivateRouteProps {
  children: ReactNode;
}

const AdminPrivateRoute: React.FC<AdminPrivateRouteProps> = ({ children }) => {
  const adminInfo = useSelector((state: RootState) => state.admin.adminInfo);
  if (!adminInfo?.accessToken) {
    return <Navigate to={ADMIN_ROUTES.Authentication.adminLogin} replace />;
  }

  if (adminInfo.role !== "admin") {
    return <Navigate to={ADMIN_ROUTES.errorPage} replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export default AdminPrivateRoute;
