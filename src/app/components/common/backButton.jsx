import React from "react";
import { Navigate } from "react-router-dom";
const BackHistoryButton = () => {
    return (
        <button
            className="btn btn-primary"
            onClick={() => <Navigate to={-1} />}
        >
            <i className="bi bi-caret-left"></i>
            Назад
        </button>
    );
};

export default BackHistoryButton;
