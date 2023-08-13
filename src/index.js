import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app/App";
// import { Router } from "react-router-dom";
// import { createSrore } from "./app/store/createStore";

// const store = createSrore();

ReactDOM.render(
    // <React.StrictMode>
    // <Provider store={store}>
    //     <Router>
    <App />,
    //     </Router>
    // </Provider>
    // </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
