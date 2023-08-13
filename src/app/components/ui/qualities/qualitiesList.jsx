import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesById,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    console.log(qualities);
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesById(qualities));
    console.log(qualitiesList);
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    if (isLoading) return "Loading";
    return (
        <>
            {qualitiesList &&
                qualitiesList.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
