// import React from "react";
// import UsersList from "./layouts/usersList";
// import UsersComp from "./components/users";
// import NavBar from "./components/navBar";
// import { Route, Switch } from "react-router-dom";
// import Main from "./layouts/main";
// import Login from "./layouts/login";

// function App() {
//     return (
//         <>
//             <NavBar />
//             <Switch>
//                 <Route path="/" exact component={Main} />
//                 <Route path="/layouts/login" component={Login} />
//                 <Route path="/layouts/users/:usersId?" component={UsersList} />
//                 <Route path="/layouts/users" component={UsersComp} />
//             </Switch>
//         </>
//     );
// }

// export default App;

import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
