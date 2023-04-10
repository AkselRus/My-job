import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SearchStatus from "./searchStatus";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import _ from "lodash";
import GroupList from "./groupList";
import api from "../api";
import UserTable from "./userTable";

const Users = () => {
    const [currentPage, setCurrentPage] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [professions, setProfessions] = useState();
    const [sortBy, setSortBy] = useState({
        iter: "name",
        order: "asc"
    });
    const pageSize = 8;

    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionSelect = (items) => {
        setSelectedProf(items);
    };
    const handleSort = (item) => {
        console.log("item", item);
        setSortBy(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path, "name"],
            [sortBy.order]
        );
        const clearFilter = () => {
            setSelectedProf();
        };
        const count = sortedUsers.length;
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        return (
            <div className="d-flex align-self-center">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-0">
                        <GroupList
                            selectedItem={selectedProf}
                            item={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Сброс
                        </button>
                    </div>
                )}
                {count > 0 && (
                    <div className="w-100 p-0 mh-100">
                        <SearchStatus length={count} />
                        <div className="d-flex justify-content-center">
                            <UserTable
                                users={usersCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onToggleBookMark={handleToggleBookMark}
                                onDelete={handleDelete}
                            />
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
    }
    return "Загрузка...";
};
Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default Users;
