import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  if (!userInfo) {
    return <Navigate to={"/login"} />;
  }

  if (!allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;
