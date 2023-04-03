import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SearchStatus from "./searchStatus";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import GroupList from "./groupList";
import api from "../api";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;
    // const [professionsArray, setprofessionsArray] = useState();
    // useEffect(() => {
    // }, []);
    const [professions, setProfessions] = useState(api.professions.fetchAll());
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleprofessionSelect = (items) => {
        setSelectedProf(items);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession === selectedProf)
        : allUsers;
    const count = filteredUsers?.length;
    const clearFilter = () => {
        setSelectedProf();
    };

    const usersCrop = paginate(filteredUsers, currentPage, pageSize);
    return (
        <div className="d-flex">
            {professions &&
            <div className="d-flex flex-column flex-shrink-0 p-3">
                <GroupList
                    selectedItem={selectedProf}
                    item={professions}
                    onItemSelect={handleprofessionSelect}
                />
                <button
                    className="btn btn-secondary mt-2"
                    onClick={clearFilter}
                >Сброс</button>
            </div>
            }
            {count > 0 && (
                <div>
                    <SearchStatus length={count} />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Провфессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {usersCrop.map((user) => (
                                <User {...rest} {...user} key={user._id} />
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            )}

        </div>
    );
};
Users.propTypes = {
    users: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
};

export default Users;
