import { CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/app/store/store";

import { fetchComments, selectAllComments } from "../model/commentsSlice"; // Путь к вашему slice

const CommentsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector(selectAllComments);
  const { loading, error } = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <ul>
      {comments?.map((comment: any) => (
        <li key={comment.id}>
          {comment.text} - {comment.author}
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
