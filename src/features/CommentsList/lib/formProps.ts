import * as yup from "yup";

import { IUser } from "@/entities/User/types/user";
import { requiredLabel } from "@/shared/constants/constants";

import { ICommentForm } from "../types/commentForm";

export const commentSchema = yup.object({
  comment: yup.string().required(requiredLabel),
});

export const defaultValues = {
  comment: undefined,
};

export const prepareFormValues = (data: ICommentForm, user: IUser, articleId: string) => {
  return {
    comment: data?.comment,
    authorId: user.uid,
    articleId: articleId,
    authorName: user.displayName,
    createdAt: new Date().toISOString(),
  };
};
