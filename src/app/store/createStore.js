import { configureStore, combineReducers } from "@reduxjs/toolkit";
import qualititiesReducer from "./qualities";
import professionsReducer from "./professions";
import usersReducer from "./users";
import commentsReducer from "./comments";
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";

const rootReducer = combineReducers({
    qualities: qualititiesReducer,
    professions: professionsReducer,
    users: usersReducer,
    comments: commentsReducer,
    auth: authReducer,
    message: messageReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
