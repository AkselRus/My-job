import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualityList = ({ qualities }) => {
    return <>
        {qualities.map((qual) => (
            <Quality key={qual._id} {...qual} />
        ))}
    </>;
};
QualityList.propTypes = {
    qualities: PropTypes.array
};
export default QualityList;
