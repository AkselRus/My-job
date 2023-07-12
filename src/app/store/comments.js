import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        commentsRequesFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequesFiled,
    commentCreated,
    commentRemoved
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequesFiled(error.message));
    }
};

export const createComment = (payload) => async (dispatch) => {
    const comment = {
        ...payload,
        _id: nanoid(),
        created_at: Date.now()
    };
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentsRequesFiled(error.message));
    }
};

export const removedComment = (commentId) => async (dispatch) => {
    try {
        const { content } = await commentService.removeComment(commentId);
        if (content === null) {
            dispatch(commentRemoved(commentId));
        }
    } catch (error) {
        dispatch(commentsRequesFiled(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
