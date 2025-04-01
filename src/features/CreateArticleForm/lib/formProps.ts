import * as yup from "yup";

import { requiredLabel } from "@/shared/constants/constants";

import { IArticleForm } from "../types/articleForm";

export const articleSchema = yup.object({
  title: yup.string().required(requiredLabel).max(100, "Слишком длинный заголовок"),
  context: yup.string().required(requiredLabel),
});

export const defaultValues = {
  title: undefined,
  context: undefined,
};

export const prepareFormValues = (data: IArticleForm, user: any) => {
  return {
    title: data.title,
    context: "<p>" + data?.context.replace(/\n+/g, "</p><p>") + "</p>",
    authorId: user.uid,
    createdAt: new Date().toISOString(),
  };
};
