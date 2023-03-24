import React from "react";
import BookMark from "./bookmark";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

const User = (props) => {
  return (
    <tr key={props.id} className="text-capitalize">
      <td>{props.name}</td>
      <td>{<Qualitie qualities={props.qualities} />}</td>
      <td>{props.profession.name}</td>
      <td className="text-center">{props.completedMeetings}</td>
      <td className="text-center">{props.rate + "/5"}</td>
      <td>{<BookMark />}</td>
      <td>
        <button
          className="bg-danger d-flex"
          onClick={() => props.onDel(props.id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};
User.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profession: PropTypes.object.isRequired,
  qualities: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  onDel: PropTypes.func.isRequired
};
export default User;
