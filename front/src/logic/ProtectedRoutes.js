import { Navigate, Outlet } from "react-router";

import parseJwt from './JWTutil';

function ProtectedRoutes() {

    const useAuth = () => {

        const token = localStorage.getItem('Bearer')

        if(token !== null) {
            const auth = parseJwt(token).sub
            if(auth.length === 24) {
                return true
            }
        }
        return false;
    }

    const isAuth = useAuth()

    return isAuth ? <Outlet /> : <Navigate to="/login" />

}

export default ProtectedRoutes;