import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ label, name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <textarea
                className={getInputClasses()}
                id={name}
                name={name}
                rows="3"
                onChange={handleChange}
                value={value}
            ></textarea>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
TextArea.defaultProps = {
    type: "text"
};
TextArea.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextArea;
