import { configureStore } from "@reduxjs/toolkit";
import blockReducer from "./slices/block-slice";

export const store = configureStore({
    reducer: {
        block: blockReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch