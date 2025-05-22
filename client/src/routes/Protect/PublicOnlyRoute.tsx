// src/routes/Protect/PublicOnlyRoute.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store";

interface Props {
  children: React.ReactNode;
}

const PublicOnlyRoute: React.FC<Props> = ({ children }) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const hostInfo = useSelector((state: RootState) => state.host.hostInfo);

  const isAuthenticated = userInfo?.accessToken || hostInfo?.accessToken;

  if (isAuthenticated) {
    return <Navigate to="/user/home" replace />;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;
