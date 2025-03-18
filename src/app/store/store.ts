import { configureStore } from "@reduxjs/toolkit";

import articleReducer from "@/entities/Article/model/articleSlice";
import usersReducer from "@/entities/User/model/usersSlice";
import commentsReducer from "@/features/Comments/model/commentsSlice";

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    articles: articleReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
