import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
    return (
        <div>
            <AppLoader>
                <NavBar />
                <Routes>
                    <Route path="/users/:userId?/:edit?" element={<Users />} />
                    <Route path="/login/:type?" element={<Login />} />
                    <Route path="/logout" element={<LogOut />} />
                    <Route path="" element={<Main />} />
                    {/* <Redirect to="/" /> */}
                </Routes>
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
