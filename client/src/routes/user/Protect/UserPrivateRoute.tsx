import React, { ReactNode } from "react";
import { USER_ROUTE } from "@/utils/constants/routes/user.routes";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Header from "@/reusable-components/user/Landing/Header";

interface UserPrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const UserPrivateRoute: React.FC<UserPrivateRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const location = useLocation();

  const accessToken = userInfo?.accessToken;
  const role = userInfo?.role;
  const isAuthenticated = !!accessToken;

  if (!isAuthenticated) {
    console.log("User not authenticated", accessToken, userInfo);
    return <Navigate to={USER_ROUTE.Authentication.userLogin} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role!)) {
    return <Navigate to={USER_ROUTE.Authentication.userLanding} replace />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default UserPrivateRoute;
