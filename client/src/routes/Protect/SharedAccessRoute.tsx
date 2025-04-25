import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface SharedAccessRouteProps {
  children: ReactNode;
}

const SharedAccessRoute: React.FC<SharedAccessRouteProps> = ({ children }) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const hostInfo = useSelector((state: RootState) => state.host.hostInfo);

  // Block access only if BOTH user and host are not authenticated
  const isNeitherAuthenticated = !userInfo?.accessToken && !hostInfo?.accessToken;

  if (isNeitherAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default SharedAccessRoute;