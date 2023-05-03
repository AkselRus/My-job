import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SearchStatus from "../../ui/searchStatus";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import _ from "lodash";
import GroupList from "../../common/groupList";
import api from "../../../api";
import UserTable from "../../ui/userTable";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [professions, setProfessions] = useState();
    const [input, setInput] = useState();
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
        setInput();
        setSelectedProf(items);
    };
    const handleSort = (item) => {
        console.log("item", item);
        setSortBy(item);
    };
    const handleInputChange = (event) => {
        setSelectedProf();
        setInput(event.target.value);
    };
    const searchUser = (input, users) => {
        if (input) {
            const isInput = input.toLowerCase();
            const filterUsers = users.filter((user) =>
                user.name.toLowerCase().includes(isInput)
            );
            if (filterUsers.length === 0) {
                return users;
            }
            return filterUsers;
        } else return users;
    };
    const people = searchUser(input, users);
    console.log("people", people);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : people;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path, "name"],
            [sortBy.order]
        );
        const clearFilter = () => {
            setInput("");
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
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Search..."
                        />{" "}
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onToggleBookMark={handleToggleBookMark}
                            onDelete={handleDelete}
                        />
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
    }
    return "Загрузка...";
};
UsersList.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default UsersList;
