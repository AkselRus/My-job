import { configureStore, combineReducers } from "@reduxjs/toolkit";
import qualititiesReducer from "./qualities";
import professionsReducer from "./professions";

const rootReducer = combineReducers({
    qualities: qualititiesReducer,
    professions: professionsReducer
});

export function createSrore() {
    return configureStore({
        reducer: rootReducer
    });
}
