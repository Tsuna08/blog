import { addDoc, deleteDoc, getDoc, getDocs, updateDoc } from "firebase/firestore";

import { baseApi } from "@/app/store/baseApi";

import { collectionFc, docFc } from "../helpers/collection";
import { IComment } from "../types/comments";

export const commentsApi = baseApi.enhanceEndpoints({ addTagTypes: ["Comments"] }).injectEndpoints({
  endpoints: (builder) => ({
    fetchComments: builder.query<IComment[], void>({
      async queryFn() {
        const querySnapshot = await getDocs(collectionFc());
        const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as IComment);
        return { data: users };
      },
      providesTags: ["Comments"],
    }),

    getCommentById: builder.query<IComment, string>({
      async queryFn(uid) {
        const userDoc = await getDoc(docFc(uid));
        return { data: { id: userDoc.id, ...userDoc.data() } as IComment };
      },
      providesTags: ["Comments"],
    }),

    getCommentByArticleId: builder.query<IComment[], string>({
      async queryFn(articleId) {
        const querySnapshot = await getDocs(collectionFc());
        const comments = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }) as IComment)
          .filter((comment) => comment.articleId === articleId)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        return { data: comments };
      },
      providesTags: ["Comments"],
    }),

    addComment: builder.mutation<IComment, Omit<IComment, "id">>({
      async queryFn(article) {
        const docRef = await addDoc(collectionFc(), article);
        return { data: { id: docRef.id, ...article } };
      },
      invalidatesTags: ["Comments"],
    }),

    deleteComment: builder.mutation<void, string>({
      async queryFn(id) {
        await deleteDoc(docFc(id));
        return { data: undefined };
      },
      invalidatesTags: ["Comments"],
    }),

    updateComment: builder.mutation<IComment, IComment>({
      async queryFn(user) {
        const { id, ...data } = user;
        await updateDoc(docFc(id), data);
        return { data: user };
      },
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useFetchCommentsQuery,
  useGetCommentByIdQuery,
  useGetCommentByArticleIdQuery,
} = commentsApi;
