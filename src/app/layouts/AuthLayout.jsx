import React from "react";
// Librares
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// Components
// import Card from "../components/Card";
// Pages

// Store
import { isLoggedInSelector } from "../store/authSlice";

const AuthLayout = () => {
    const isLoggedIn = useSelector(isLoggedInSelector());

    if (isLoggedIn) {
        return <Navigate to="" />;
    }

    return (
        <div className="flex grow flex-col justify-center items-center ">
            <Outlet />
        </div>
    );
};

export default AuthLayout;
