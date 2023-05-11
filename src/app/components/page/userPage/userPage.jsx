import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    console.log("user", user);
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        history.push("/users");
    };
    const handleClickEdit = () => {
        history.push(`/users/${userId}/edit`);
    };
    if (user) {
        return (
            <div>
                <h1> {`Имя: ${user.name}`}</h1>
                <h2>{`Почта: ${user.email}`}</h2>
                <h2>Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>{`Пол: ${user.sex}`}</h2>
                <h2>Rate: {user.rate}</h2>
                <button onClick={handleClick}> Все Пользователи</button>
                <button onClick={handleClickEdit}>Изменить</button>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
