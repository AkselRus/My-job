import React, { useState } from "react";

const BookMark = () => {
  const [activeState, setActiveState] = useState(false);

  return (
    <div onClick={() => setActiveState((prev) => !prev)}>
      {activeState ? (
        <i className="bi bi-star-fill"></i>
      ) : (
        <i className="bi bi-star"></i>
      )}
    </div>
  );
};
export default BookMark;
