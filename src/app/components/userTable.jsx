import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const UserTable = ({ users, onSort, ...rest }) => {
    console.log("users1", users);
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => onSort("name")} scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th onClick={() => onSort("profession.name")} scope="col">Провфессия</th>
                    <th onClick={() => onSort("completedMeetings")} scope="col">Встретился, раз</th>
                    <th onClick={() => onSort("rate")} scope="col">Оценка</th>
                    <th onClick={() => onSort("bookmark")} scope="col">Избранное</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <User {...rest} {...user} key={user._id} />
                ))}
            </tbody>
        </table>
    );
};
UserTable.propTypes = {
    users: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    onSort: PropTypes.func.isRequired
};
export default UserTable;
