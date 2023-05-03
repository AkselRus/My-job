import React, { useState, useEffect } from "react";
import AccountUser from "./accountUser";
import UsersComponent from "../components/page/usersList";
import { useParams, useHistory } from "react-router-dom";
import api from "../api";

const Users = () => {
    const params = useParams();
    const history = useHistory();
    const [user, setUser] = useState();
    const { usersId } = params;
    useEffect(() => {
        api.users.getById(usersId).then((data) => setUser(data));
    }, [usersId]);

    const handleAllUser = () => {
        history.push("/layouts/users");
    };
    if (usersId !== user?._id) {
        return <h1>Loaging</h1>;
    }
    return (
        <>
            {user ? (
                <AccountUser user={user} handle={handleAllUser} />
            ) : (
                <UsersComponent />
            )}
        </>
    );
};
export default Users;
