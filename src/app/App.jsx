import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./layouts/AuthLayout";
import "react-toastify/dist/ReactToastify.css";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import withRouter from "./hoc/withRouter";
import withRedux from "./hoc/withRedux";
import AppLoader from "./components/ui/hoc/appLoader";
import LoginForm from "./components/ui/loginForm";
import RegisterForm from "./components/ui/registerForm";
import Users from "./layouts/users";
import UsersListPage from "./components/page/usersListPage";
import UserPage from "./components/page/userPage";
import EditUserPage from "./components/page/editUserPage";

function App() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-150 flex flex-col">
            <AppLoader>
                <NavBar />
                <Routes>
                    <Route index element={<Main />} />
                    <Route path="auth/*" element={<AuthLayout />}>
                        <Route index element={<Navigate to="/auth/signup" />} />
                        <Route path="login" element={<LoginForm />} />
                        <Route path="signup" element={<RegisterForm />} />
                        <Route
                            path="*"
                            element={<Navigate to="/auth/signup" />}
                        />
                    </Route>
                    <Route path="users/*" element={<Users />}>
                        <Route index element={<UsersListPage />} />
                        <Route path=":userId" element={<UserPage />} />
                        <Route path="edit" element={<EditUserPage />} />
                        <Route path="*" element={<Navigate to="users" />} />
                    </Route>
                    <Route path="*" element={<Navigate to="" />} />

                    {/* <ProtectedRoute path='/posts/:id?' component={PostsLayout} /> */}
                    {/* <Redirect from='*' to='/' /> */}
                </Routes>
            </AppLoader>
            <ToastContainer />
        </div>
    );
}
const AppWithStoreAndRoutes = withRedux(withRouter(App));
export default AppWithStoreAndRoutes;
