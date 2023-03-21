import React from "react";

const SearchStatus = (value) => {
  let val = value.length;
  val =
    val > 4 || val < 2
      ? val + " человек тусанет с тобой сегодня"
      : val + " человека тусанет с тобой сегодня";
  return <h1 className="badge m-2 bg-primary">{val}</h1>;
};
export default SearchStatus;
