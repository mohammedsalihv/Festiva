import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Header from "@/reusable-components/user/Landing/Header";


interface UserPrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const UserPrivateRoute: React.FC<UserPrivateRouteProps> = ({ children, allowedRoles }) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const location = useLocation();

  const accessToken = userInfo?.accessToken;
  const role = userInfo?.role;
  const isAuthenticated = !!accessToken;

  if (!isAuthenticated) {
    console.log(userInfo)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role!)) {
    console.log(userInfo)
    return <Navigate to="/" replace />;
  }

  return <>
  <Header/>
  <div className="pt-16">
  {children}
  </div>

  </>;
};

export default UserPrivateRoute;
