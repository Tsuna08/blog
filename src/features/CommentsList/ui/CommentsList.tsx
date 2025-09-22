import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Divider, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useAuth } from "@/app/providers/AuthProvider";
import { useAddCommentMutation, useGetCommentByArticleIdQuery } from "@/entities/Comments";
import { IUser } from "@/entities/User";
import Arrow from "@/shared/assets/arrow.svg";
import { Button, ColumnBox, Loader, TextInput, Title } from "@/shared/components";
import { getShortDateTime } from "@/shared/hooks/getDate";

import { commentSchema, defaultValues, prepareFormValues } from "../lib/formProps";
import { ICommentForm } from "../types/commentForm";

export const CommentsList = () => {
  const { id } = useParams();

  const { data: comments, isLoading } = useGetCommentByArticleIdQuery(id ?? skipToken);
  const [addComment, { isLoading: isAddLoading }] = useAddCommentMutation();

  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICommentForm>({
    defaultValues: defaultValues,
    resolver: yupResolver(commentSchema),
  });

  const onSubmit = (data: ICommentForm) => {
    addComment(prepareFormValues(data, user as IUser, id as string)).then(() => reset());
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Title>Комментарии</Title>
          <ColumnBox sx={{ gap: "0.5rem" }}>
            {comments && comments?.length > 0 ? (
              comments?.map((comment, index) => (
                <>
                  <ColumnBox key={comment.id} sx={{ gap: "0.3rem" }}>
                    <Box display='flex' alignItems='center' gap='1rem'>
                      <Typography variant='body2'>{comment.authorName}</Typography>
                      <Typography variant='caption' sx={{ color: "#2F222266" }}>
                        {getShortDateTime(comment.createdAt)}
                      </Typography>
                    </Box>
                    <Typography variant='body1'>{comment.comment}</Typography>
                  </ColumnBox>
                  {comments.length - 1 !== index && <Divider />}
                </>
              ))
            ) : (
              <Typography variant='body2'>Комментариев пока нет...</Typography>
            )}
          </ColumnBox>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='body1' sx={{ mt: 1 }}>
              Ваш комментарий
            </Typography>
            <Controller
              name='comment'
              control={control}
              render={({ field }) => (
                <TextInput
                  error={!!errors.comment}
                  helperText={errors?.comment?.message}
                  rows={5}
                  disabled={isLoading}
                  multiline
                  type='text'
                  {...field}
                />
              )}
            />
            <Button
              type='submit'
              fullWidth
              sx={{ mt: 2 }}
              disabled={isAddLoading}
              endIcon={<img height={15} src={Arrow} alt='Arrow' />}
            >
              Опубликовать
            </Button>
          </form>
        </>
      )}
    </>
  );
};
