import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const {isAuthenticated, token} = useSelector((state: RootState)=> state.auth)

    if(!isAuthenticated && !token){
        return <Navigate to ='/login' />
    }
      return <>{children}</>;


}

export default ProtectedRoute;
