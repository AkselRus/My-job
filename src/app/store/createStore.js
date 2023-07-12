import { configureStore, combineReducers } from "@reduxjs/toolkit";
import qualititiesReducer from "./qualities";
import professionsReducer from "./professions";
import usersReducer from "./users";
import commentsReducer from "./comments";

const rootReducer = combineReducers({
    qualities: qualititiesReducer,
    professions: professionsReducer,
    users: usersReducer,
    comments: commentsReducer
});

export function createSrore() {
    return configureStore({
        reducer: rootReducer
    });
}
