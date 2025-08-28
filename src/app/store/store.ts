import { configureStore } from "@reduxjs/toolkit";

import { articlesApi } from "@/entities/Article/model/apiArticle";
import { usersApi } from "@/entities/User/model/apiUser";
import commentsReducer from "@/features/Comments/model/commentsSlice";

import { baseApi } from "./baseApi";

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    comments: commentsReducer,
    users: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});
