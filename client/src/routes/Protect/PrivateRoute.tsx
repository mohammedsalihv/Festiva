import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "@/redux/store"; 
import { useSelector } from "react-redux";

interface PrivateRouteProps {
    children: ReactElement;
  }

const PrivateRoute : React.FC<PrivateRouteProps> = ({children}) => {
    
    const userInfo =  useSelector((state:RootState) => state.user.userInfo)
    const location = useLocation();
    const isAuthenticated = !!userInfo?.accessToken

    if(!isAuthenticated){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
  return children
}

export default PrivateRoute
