import React from "react";
import Quality from "../components/quality";
import PropTypes from "prop-types";

const AccountUser = ({ user, handle }) => {
    return (
        <>
            <h1>{user.name}</h1>
            <h5>{`Профессия: ${user.profession.name}`}</h5>
            <h5>
                {user.qualities.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </h5>
            <h5>{`Встретился, раз: ${user.completedMeetings}`}</h5>
            <h5>{`Рэйтинг: ${user.rate}`}</h5>
            <button className="btn btn-primary" onClick={handle}>
                Все пользователи
            </button>
        </>
    );
};
AccountUser.propTypes = {
    user: PropTypes.object.isRequired,
    handle: PropTypes.func

};

export default AccountUser;
