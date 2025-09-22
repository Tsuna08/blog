import { configureStore } from "@reduxjs/toolkit";

import { articlesApi } from "@/entities/Article/model/apiArticle";
import { commentsApi } from "@/entities/Comments/model/apiComments";
import { usersApi } from "@/entities/User/model/apiUser";

import { baseApi } from "./baseApi";

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    users: usersApi.reducer,
    comments: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});
