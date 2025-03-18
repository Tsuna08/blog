import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

import { db } from "@/app/firebase";

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

const commentsAdapter = createEntityAdapter<Comment>();

const initialState: CommentsState = commentsAdapter.getInitialState({
  loading: false,
  error: null,
});

interface CommentsState extends ReturnType<typeof commentsAdapter.getInitialState> {
  loading: boolean;
  error: string | null;
}

export const fetchComments = createAsyncThunk("comments/fetchComments", async () => {
  const commentsCollection = collection(db, "comments");

  return getDocs(commentsCollection)
    .then((querySnapshot) => {
      const comments: Comment[] = [];
      querySnapshot.forEach((doc) => {
        comments.push({
          id: doc.id,
          ...doc.data(),
        } as Comment);
      });
      return comments;
    })
    .catch((error: any) => {
      throw new Error(error.message);
    });
});

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (comment: Omit<Comment, "id">) => {
    try {
      const commentsCollection = collection(db, "comments");
      const docRef = await addDoc(commentsCollection, comment);
      const newComment = {
        id: docRef.id,
        ...comment,
      };
      return newComment as Comment;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId: string) => {
    try {
      const commentDoc = doc(db, "comments", commentId);
      await deleteDoc(commentDoc);
      return commentId;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (comment: Comment) => {
    try {
      const commentDoc = doc(db, "comments", comment.id);
      await updateDoc(commentDoc, {
        text: comment.text,
        author: comment.author,
      });
      return comment;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        commentsAdapter.setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch comments";
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        commentsAdapter.addOne(state, action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<string>) => {
        commentsAdapter.removeOne(state, action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        commentsAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
      });
  },
});

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentIds,
} = commentsAdapter.getSelectors((state: any) => state.comments);

export default commentsSlice.reducer;
