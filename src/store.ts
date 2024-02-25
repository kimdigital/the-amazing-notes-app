import { configureStore } from "@reduxjs/toolkit";
import blockReducer from "./slices/block-slice";
import noteReducer from "./slices/note-slice";

export const store = configureStore({
    reducer: {
        block: blockReducer,
        note: noteReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch