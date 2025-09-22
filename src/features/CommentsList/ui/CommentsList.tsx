import { Fragment } from "react";

import { useFetchCommentsQuery } from "@/entities/Comments";
import { ColumnBox, Loader } from "@/shared/components";

export const CommentsList = () => {
  const { data: comments, isLoading } = useFetchCommentsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ColumnBox>
          {comments?.map((comment) => <Fragment key={comment.id}>{comment.text}</Fragment>)}
        </ColumnBox>
      )}
    </>
  );
};
