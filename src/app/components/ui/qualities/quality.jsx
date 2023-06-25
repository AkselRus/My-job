import React from "react";
import PropTypes from "prop-types";
import { useQualitie } from "../../../hooks/useQualitie";
const Quality = ({ id }) => {
    if (typeof id === "string") {
        const { getQuality } = useQualitie();
        const { color, name } = getQuality(id);
        return <span className={"badge m-1 bg-" + color}>{name}</span>;
    }

    return <span className={"badge m-1 bg-" + id?.color}>{id?.name}</span>;
};
Quality.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    // color: PropTypes.string.isRequired,
    // name: PropTypes.string.isRequired
};

export default Quality;
