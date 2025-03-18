import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

import { db } from "@/app/firebase";
import { RootState } from "@/app/store/store";

import { IArticle } from "../types/article";

const articlesAdapter = createEntityAdapter<IArticle>();

const initialState = articlesAdapter.getInitialState({
  loading: false,
  error: null as string | null,
});

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async () => {
  const querySnapshot = await getDocs(collection(db, "articles"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as IArticle);
});

export const addArticle = createAsyncThunk(
  "articles/addArticle",
  async (article: Omit<IArticle, "id">) => {
    const docRef = await addDoc(collection(db, "articles"), article);

    return { id: docRef.id, ...article } as IArticle;
  },
);

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (articleId: string) => {
    await deleteDoc(doc(db, "articles", articleId));

    return articleId;
  },
);

export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async (article: IArticle) => {
    await updateDoc(doc(db, "articles", article.id), {
      title: article.title,
      context: article.context,
      authorId: article.authorId,
    });

    return article;
  },
);

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        articlesAdapter.setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка получения статей";
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        articlesAdapter.addOne(state, action.payload);
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        articlesAdapter.removeOne(state, action.payload);
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        articlesAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
      });
  },
});

export const {
  selectAll: selectAllArticles,
  selectById: selectArticleById,
  selectIds: selectArticleIds,
} = articlesAdapter.getSelectors((state: RootState) => state.articles);

export default articlesSlice.reducer;
