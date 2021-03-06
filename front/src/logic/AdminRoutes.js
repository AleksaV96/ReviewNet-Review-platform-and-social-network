import React from 'react';
import { Navigate, Outlet } from "react-router";

import parseJwt from './JWTutil';

function AdminRoutes() {

    const useAuth = () => {

        const token = localStorage.getItem('Bearer')

        if(token !== null) {
            const role = parseJwt(token).role[0].authority;
            if(role === 'ROLE_ADMIN') {
                return true
            }
        }
        return false;
    }

    const isAuth = useAuth()

    return isAuth ? <Outlet /> : <Navigate to="/login"/> ;



}

export default AdminRoutes;