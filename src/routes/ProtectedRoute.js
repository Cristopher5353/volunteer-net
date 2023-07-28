import { Navigate, Outlet } from "react-router-dom";
import { decodeToken } from "../custom/decodeToken";

export const ProtectedRoute = ({roles, redirectTo="/login"}) => {
    let isAuthenticated = decodeToken() && roles.includes(decodeToken().roles);

    if(!isAuthenticated) {
        return <Navigate to={redirectTo}/>
    }

    const expiredTime = decodeToken().exp;

    if(expiredTime < (Date.now() / 1000)) {
        return <Navigate to={redirectTo}/>
    }

    return <Outlet/>;
}