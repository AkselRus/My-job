import React from "react";
import PropTypes from "prop-types";
import { useQualitie } from "../../../hooks/useQualitie";
const Quality = ({ id }) => {
    const { getQuality, isLoading } = useQualitie();
    const props = getQuality(id);
    console.log("props", props);
    if (isLoading) return "Loading";
    return (
        <span className={"badge m-1 bg-" + props?.color}>{props?.name}</span>
    );
};
Quality.propTypes = {
    id: PropTypes.string.isRequired,
    color: PropTypes.string,
    name: PropTypes.string
};

export default Quality;
