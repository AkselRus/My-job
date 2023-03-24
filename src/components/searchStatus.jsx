import React from "react";
import PropTypes from "prop-types";

const SearchStatus = (props) => {
  let val = props.length;
  val =
    val > 4 || val < 2
      ? val + " человек тусанет с тобой сегодня"
      : val + " человека тусанет с тобой сегодня";
  return <h1 className="badge m-2 bg-primary fs-5">{val}</h1>;
};
SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
};
export default SearchStatus;
