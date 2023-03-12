import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const userAll = api.users.fetchAll();
  const [list, setList] = useState(userAll);

  const handleDelete = (id) => {
    setList(list.filter((tag) => tag._id !== id));
  };

  let result = list.map(function (item) {
    let classes = `badge p-2 m-2 bg-`;
    const x = item.qualities.map((i) => (
      <span key={i._id} className={classes + i.color}>
        {i.name}
      </span>
    ));

    return (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{x}</td>
        <td>{item.profession.name}</td>
        <td>{item.completedMeetings}</td>
        <td>{item.rate + "/5"}</td>
        <td>
          <button className="bg-danger" onClick={() => handleDelete(item._id)}>
            delete
          </button>
        </td>
      </tr>
    );
  });

  const renderCountPeople = () => {
    let count = list.length;
    count =
      count > 4 || count < 2
        ? count + " человек тусанет с тобой сегодня"
        : count + " человека тусанет с тобой сегодня";
    return <h1 className="badge m-2 bg-primary">{count}</h1>;
  };

  return list.length !== 0 ? (
    <>
      <div>{renderCountPeople()}</div>
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качество</th>
            <th scope="col">Проффесия</th>
            <th scope="col">Встретился,раз</th>
            <th scope="col">Оценка</th>
          </tr>
        </thead>
        <tbody>{result}</tbody>
      </table>
    </>
  ) : (
    <h1 className="badge m-2 bg-danger">{"Никто с тобой не тусанет"}</h1>
  );
};

export default Users;
