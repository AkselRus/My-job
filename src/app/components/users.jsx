import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SearchStatus from "./searchStatus";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import _ from "lodash";
import GroupList from "./groupList";
import api from "../api";
import UserTable from "./userTable";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [professions, setProfessions] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 8;
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.professions.fetchAll().then((data) => console.log("setProfessions", data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionSelect = (items) => {
        console.log("handleProfessionSelect", items);
        setSelectedProf(items);
    };
    const handleSort = (item) => {
        if (sortBy.iter === item) {
            setSortBy((prevState) =>
                ({ ...prevState, order: prevState.order === "asc" ? "desc" : "asc" }));
        } else {
            setSortBy({ iter: item, order: "asc" });
        }
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession._id === selectedProf._id)
        : allUsers;
    console.log("test filter", allUsers.filter((user) => user.profession === selectedProf));
    const count = filteredUsers?.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
    const clearFilter = () => {
        setSelectedProf();
    };
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    console.log("usersCrop", usersCrop);
    return (
        <div className="d-flex align-self-center">
            {professions &&
            <div className="d-flex flex-column flex-shrink-0 p-0">
                <GroupList
                    selectedItem={selectedProf}
                    item={professions}
                    onItemSelect={handleProfessionSelect}
                />
                <button
                    className="btn btn-secondary mt-2"
                    onClick={clearFilter}
                >Сброс</button>
            </div>
            }
            {count > 0 && (
                <div className="w-100 p-0 mh-100">
                    <SearchStatus length={count} />
                    <div className="d-flex justify-content-center">
                        <UserTable users={usersCrop} onSort={handleSort} {...rest}/>
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
