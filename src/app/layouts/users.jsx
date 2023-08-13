import React from "react";
import { useParams, Navigate, Outlet } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import UsersLoader from "../components/ui/hoc/usersLoader";
const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            <UsersLoader>
                <Outlet />
                {userId ? (
                    edit ? (
                        userId === currentUserId ? (
                            <EditUserPage />
                        ) : (
                            <Navigate to={`edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UsersLoader>
        </>
    );
};

export default Users;
