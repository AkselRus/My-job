import React from "react";

const User = (user) => {
  let classes = `badge p-2 m-2 bg-`;
  const qualitie = user.qualities.map((el) => (
    <span key={el._id} className={classes + el.color}>
      {el.name}
    </span>
  ));

  return (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{qualitie}</td>
      <td>{user.profession.name}</td>
      <td>{user.meetings}</td>
      <td>{user.rate}</td>
      <td>{user.bookmark}</td>
      <td>
        <button className="bg-danger" onClick={() => user.onDel(user.id)}>
          delete
        </button>
      </td>
    </tr>
  );
};
export default User;
