import { configureStore } from "@reduxjs/toolkit";

import { articlesApi } from "@/entities/Article/model/apiArticle";
import usersReducer from "@/entities/User/model/usersSlice";
import commentsReducer from "@/features/Comments/model/commentsSlice";

import { baseApi } from "./baseApi";

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
