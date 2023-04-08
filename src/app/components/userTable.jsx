import React from "react";
import PropTypes from "prop-types";
import Table from "./table";
// import TableHeader from "./tableHeader";
// import TableBody from "./tableBody";
import BookMark from "./bookmark";
import QualityList from "./qualityList";

const UserTable = ({ users, onSort, selectedSort, onToggleBookMark, onDelete }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества", component: (user) => (<QualityList qualities={user.qualities}/>) },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (<BookMark
                status={user.bookmark}
                onClick={() => onToggleBookMark(user._id)}
            />)
        },
        delete: {
            component: (user) => (<button
                onClick={() => onDelete(user._id)}
                className="btn btn-danger"
            >
            delete
            </button>)
        }

    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
        // {/* <Table>
        //     <TableHeader {...{ onSort, selectedSort, columns }}/>
        //     <TableBody {...{ columns, data: users }}/>
        // </Table> */}
    );
};
UserTable.propTypes = {
    users: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
export default UserTable;
