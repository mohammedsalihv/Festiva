import { USER_ROUTE } from "@/utils/constants/routes/user.routes";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store";

interface Props {
  children: React.ReactNode;
}

const PublicOnlyRoute: React.FC<Props> = ({ children }) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const isAuthenticated = userInfo?.accessToken;

  if (isAuthenticated) {
    return <Navigate to={USER_ROUTE.userRedirectLinks.toUserHome} replace />;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;
