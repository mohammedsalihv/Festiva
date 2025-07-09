import React, { ReactNode } from "react";
import { USER_ROUTE } from "@/utils/constants/routes/user.routes";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const hostInfo = useSelector((state: RootState) => state.host.hostInfo);
  const location = useLocation();

  const accessToken = userInfo?.accessToken || hostInfo?.accessToken;
  const role = userInfo?.role || hostInfo?.role;
  const isAuthenticated = !!accessToken;

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to landing...");
    return (
      <Navigate
        to={USER_ROUTE.Authentication.userLanding}
        state={{ from: location }}
        replace
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(role!)) {
    console.log(
      `User does not have access to this route. Role: ${role}, Required: ${allowedRoles}`
    );
    return <Navigate to={USER_ROUTE.Authentication.userLanding} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
