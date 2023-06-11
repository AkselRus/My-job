import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualitie } from "../../../hooks/useQualitie";

const QualitiesList = ({ qualities }) => {
    console.log("QualitiesList", qualities);
    const { isLoading } = useQualitie();
    if (isLoading) return "Loading";
    return (
        <>
            {qualities.map((qual) => (
                <Quality key={qual} id={qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
