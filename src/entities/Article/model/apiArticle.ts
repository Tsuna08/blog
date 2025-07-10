import {
  addDoc,
  deleteDoc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { baseApi } from "@/app/store/baseApi";

import { collectionFc, docFc } from "../helpers/collection";
import { IArticle, IArticleLikes } from "../types/article";

export const articlesApi = baseApi.enhanceEndpoints({ addTagTypes: ["Articles"] }).injectEndpoints({
  endpoints: (builder) => ({
    fetchArticles: builder.query<IArticle[], void>({
      async queryFn() {
        const snapshot = await getDocs(query(collectionFc(), orderBy("createdAt", "desc")));
        const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as IArticle);
        return { data: articles };
      },
      providesTags: ["Articles"],
    }),
    fetchPopularArticles: builder.query<IArticle[], void>({
      async queryFn() {
        const snapshot = await getDocs(query(collectionFc(), orderBy("likes", "desc"), limit(3)));
        const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as IArticle);
        return { data: articles };
      },
      providesTags: ["Articles"],
    }),
    getArticle: builder.query<IArticle, string>({
      async queryFn(id) {
        const snapshot = await getDoc(docFc(id));
        return { data: { id: snapshot.id, ...snapshot.data() } as IArticle };
      },
      providesTags: ["Articles"],
    }),
    addArticle: builder.mutation<IArticle, Omit<IArticle, "id">>({
      async queryFn(article) {
        const docRef = await addDoc(collectionFc(), article);
        return { data: { id: docRef.id, ...article } };
      },
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation<void, string>({
      async queryFn(id) {
        await deleteDoc(docFc(id));
        return { data: undefined };
      },
      invalidatesTags: ["Articles"],
    }),
    updateArticle: builder.mutation<IArticle, IArticle>({
      async queryFn(article) {
        const { id, ...data } = article;
        await updateDoc(docFc(id), data);
        return { data: article };
      },
      invalidatesTags: ["Articles"],
    }),
    updateArticlesLikes: builder.mutation<IArticleLikes[], IArticleLikes[]>({
      async queryFn(articles) {
        const updates = articles.map((article) => updateDoc(docFc(article.id), { ...article }));

        try {
          await Promise.all(updates);
          return { data: articles };
        } catch (error) {
          console.error("Ошибка при обновлении:", error);
          throw error;
        }
      },
      invalidatesTags: ["Articles"],
    }),
  }),
});

export const {
  useFetchArticlesQuery,
  useGetArticleQuery,
  useAddArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
  useFetchPopularArticlesQuery,
  useUpdateArticlesLikesMutation,
} = articlesApi;
