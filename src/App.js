import React, { useState } from "react";
import API from "./api";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";

function App() {
  const [users, setUsers] = useState(API.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((tag) => tag._id !== userId));
  };
  return users.length !== 0
    ? (
      <>
        <div>{<SearchStatus length={users.length} />}</div>
        <div>{<Users users={users} onDelete={handleDelete} />}</div>
      </>
    )
    : (
      <h1 className="badge m-2 bg-danger">{"Никто с тобой не тусанет"}</h1>
    );
}
export default App;
