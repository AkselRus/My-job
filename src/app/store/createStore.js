import { configureStore, combineReducers } from "@reduxjs/toolkit";
import qualititiesReducer from "./qualities";
import professionsReducer from "./professions";
import usersReducer from "./users";

const rootReducer = combineReducers({
    qualities: qualititiesReducer,
    professions: professionsReducer,
    users: usersReducer
});

export function createSrore() {
    return configureStore({
        reducer: rootReducer
    });
}
