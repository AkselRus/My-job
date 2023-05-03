import React from "react";
import UsersList from "./layouts/usersList";
import UsersComp from "./components/users";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/layouts/login" component={Login} />
                <Route path="/layouts/users/:usersId?" component={UsersList} />
                <Route path="/layouts/users" component={UsersComp} />
            </Switch>
        </>
    );
}

export default App;
