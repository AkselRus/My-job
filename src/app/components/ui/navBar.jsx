import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="nav">
            <Link className="nav-link active" to="/">
                Main
            </Link>
            <Link className="nav-link" to="../layouts/login">
                Login
            </Link>
            <Link className="nav-link" to="../layouts/usersList">
                Users
            </Link>
        </nav>
    );
};
export default NavBar;
