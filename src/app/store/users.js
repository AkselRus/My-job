import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import history from "../utils/hystory";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequesFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestedSuccess: (state, action) => {
            state.auth = action.payload;
            console.log(state.auth);
            state.isLoading = true;
        },
        authRequestedFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = null;
        },
        userUpdate: (state, action) => {
            const elIndex = state.entities.findIndex(
                (u) => u._id === action.payload._id
            );
            state.entities[elIndex] = action.payload;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceved,
    usersRequesFailed,
    authRequestedSuccess,
    authRequestedFailed,
    userCreated,
    userLoggedOut,
    userUpdate
} = actions;

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequesFailed(error.message));
    }
};

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};
export const logIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.logIn({ email, password });
            dispatch(authRequestedSuccess({ userId: data.localId }));
            localStorageService.setTokens(data);
            history.push(redirect);
        } catch (error) {
            dispatch(authRequestedFailed(error.message));
        }
    };

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestedSuccess({ userId: data.localId }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    rate: randomInt(1, 5),
                    completedMeetings: randomInt(0, 200),
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestedFailed(error.message));
        }
    };
function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push("/users");
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
}
export const updateUser = (payload) => async (dispatch) => {
    try {
        const { content } = await userService.update(payload);
        dispatch(userUpdate(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};

export const deleteUser = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.filter((user) => user._id !== userId);
    }
};
export const getUsersList = () => (state) => state.users.entities;
export const getCurrentUserData = () => (state) =>
    state.users.entities.find((u) => u._id === state.users.auth.userId);
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId);
    }
};

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth?.userId;

export default usersReducer;
