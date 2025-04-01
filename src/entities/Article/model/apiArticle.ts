import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";

import { db } from "@/app/firebase";
import { baseApi } from "@/app/store/baseApi";

import { IArticle } from "../types/article";

const collectionName = "articles";

export const articlesApi = baseApi.enhanceEndpoints({ addTagTypes: ["Articles"] }).injectEndpoints({
  endpoints: (builder) => ({
    fetchArticles: builder.query<IArticle[], void>({
      async queryFn() {
        const snapshot = await getDocs(collection(db, collectionName));
        const articles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as IArticle);
        return { data: articles };
      },
      providesTags: ["Articles"],
    }),

    getArticle: builder.query<IArticle, string>({
      async queryFn(id) {
        const snapshot = await getDoc(doc(db, collectionName, id));
        if (!snapshot.exists()) {
          throw new Error("Статья не найдена");
        }
        return { data: { id: snapshot.id, ...snapshot.data() } as IArticle };
      },
      providesTags: ["Articles"],
    }),

    addArticle: builder.mutation<IArticle, Omit<IArticle, "id">>({
      async queryFn(article) {
        const docRef = await addDoc(collection(db, collectionName), article);
        return { data: { id: docRef.id, ...article } };
      },
      invalidatesTags: ["Articles"],
    }),

    deleteArticle: builder.mutation<void, string>({
      async queryFn(id) {
        await deleteDoc(doc(db, collectionName, id));
        return { data: undefined };
      },
      invalidatesTags: ["Articles"],
    }),

    updateArticle: builder.mutation<IArticle, IArticle>({
      async queryFn(article) {
        const { id, ...data } = article;
        await updateDoc(doc(db, collectionName, id), data);
        return { data: article };
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
} = articlesApi;
