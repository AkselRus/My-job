import React from "react";

const Qualitie = (props) => {
  let classes = `badge p-2 m-2 bg-`;
  const qualitie = props.qualities.map((el) => (
    <span key={el._id} className={classes + el.color}>
      {el.name}
    </span>
  ));
  console.log("qualitie", qualitie);
  return <div>{qualitie}</div>;
};
export default Qualitie;
