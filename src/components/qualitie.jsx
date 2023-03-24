import React from "react";
import PropTypes from "prop-types";

const Qualitie = (props) => {
  const classes = `badge p-2 m-2 bg-`;
  const qualitie = props.qualities.map((el) => (
    <span key={el._id} className={classes + el.color}>
      {el.name}
    </span>
  ));
  return <div>{qualitie}</div>;
};
Qualitie.propTypes = {
  qualities: PropTypes.object.isRequired
};
export default Qualitie;
