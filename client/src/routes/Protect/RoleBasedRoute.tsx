import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
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
  
  console.log("User Info:", userInfo);  // Debugging: Check userInfo
  console.log("Allowed Roles:", allowedRoles); // Debugging: Check allowedRoles

  if (!userInfo) {
    return <Navigate to={"/login"} />;
  }

  if (!allowedRoles.includes(userInfo.role)) {
    console.log(userInfo)
    console.log("Redirecting due to role mismatch");  // Debugging: Check if the role mismatch occurs
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;
