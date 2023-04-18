import React, { useState } from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const [fill, setFill] = useState("bi bi-caret-up-fill");
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
            if (selectedSort.order === "desc") {
                setFill("bi bi-caret-up-fill");
            } else setFill("bi bi-caret-down-fill");
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        className={
                            columns[column].path &&
                            columns[column].path === selectedSort.path
                                ? fill
                                : ""
                        }
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                    </th>
                ))}
                {/* <th onClick={() => handleSort("name")} scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th onClick={() => handleSort("profession.name")} scope="col">Провфессия</th>
                <th onClick={() => handleSort("completedMeetings")} scope="col">Встретился, раз</th>
                <th onClick={() => handleSort("rate")} scope="col">Оценка</th>
                <th onClick={() => handleSort("bookmark")} scope="col">Избранное</th>
                <th /> */}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};
export default TableHeader;
