import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ item, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
    return (
        <ul className="list-group">
            {Object.keys(item).map((i) =>
                <li
                    key={item[i][valueProperty]}
                    className={"list-group-item" + (item[i] === selectedItem ? " active" : "")}
                    onClick={() => onItemSelect(item[i])}
                    role="button"
                >
                    {item[i][contentProperty]}
                </li>)}

        </ul>);
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    item: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object

};
export default GroupList;
