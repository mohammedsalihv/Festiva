import React, { ReactNode } from "react";
import { HOST_ROUTES } from "@/utils/constants/routes/host.routes";
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
  console.log('----',hostInfo)

  if (!hostInfo?.accessToken) {
    return (
      <Navigate
        to={HOST_ROUTES.Authentication.hostLandingPage}
        state={{ from: location }}
        replace
      />
    );
  }

  if (hostInfo.role !== "host") {
    return <Navigate to={HOST_ROUTES.Authentication.hostLandingPage} replace />;
  }

  return <HostLayout>{children}</HostLayout>;
};

export default HostPrivateRoute;
