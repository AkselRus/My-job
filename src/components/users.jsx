import React, { useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";

const Users = (props) => {
  console.log("props", props);
  const count = props.users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    console.log("page", pageIndex);
    setCurrentPage(pageIndex);
  };

  const userCrop = paginate(props.users, currentPage, pageSize);

  return (
    <>
      <table className="table">
        <thead className="text-capitalize">
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качество</th>
            <th scope="col">Проффесия</th>
            <th scope="col" className="text-center">
              Встретился,раз
            </th>
            <th scope="col" className="text-center">
              Оценка
            </th>
            <th scope="col" className="text-center">
              Избранное
            </th>
          </tr>
        </thead>
        <tbody>
          {userCrop.map((comp) => (
            <User
              key={comp._id}
              onDel={() => props.onDelete(comp._id)}
              {...comp}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        itemCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};
Users.propTypes = {
  users: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired

};
export default Users;
