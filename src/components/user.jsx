import React from "react";
import BookMark from "./bookmark";
import Qualitie from "./qualitie";

const User = (user) => {
  return (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{<Qualitie qualities={user.qualities} />}</td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>{<BookMark />}</td>
      <td>
        <button className="bg-danger" onClick={() => user.onDel(user.id)}>
          delete
        </button>
      </td>
    </tr>
  );
};
export default User;
