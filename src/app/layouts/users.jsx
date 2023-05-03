import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersList from "../components/page/UserList";
const Users = () => {
    const params = useParams();
    const { userId } = params;
    console.log("userId", userId);
    return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>;
};
export default Users;
