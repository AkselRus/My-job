import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData, getCurrentUserId } from "../../store/users";

const NavProfile = () => {
    const currentUserId = useSelector(getCurrentUserId());
    console.log(currentUserId);
    const currentUser = useSelector(getCurrentUserData());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prev) => !prev);
    };
    if (!currentUser) return "Loading";
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`}
                    alt="avatar"
                    width="65"
                    height="65"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link to={currentUserId} className="dropdown-item">
                    Profile
                </Link>
                <Link to="logout" className="dropdown-item">
                    Exit
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
