import React from "react";
import User from "./user";

const Users = (props) => {
  console.log("props", props);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качество</th>
            <th scope="col">Проффесия</th>
            <th scope="col">Встретился,раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((comp) => (
            <User
              key={comp._id}
              name={comp.name}
              qualities={comp.qualities}
              profession={comp.profession}
              meetings={comp.completedMeetings}
              rate={comp.rate}
              bookmark={comp.bookmark}
              onDel={() => props.onDelete(comp._id)}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Users;
