import * as yup from "yup";

import { IArticle } from "@/entities/Article";
import { requiredLabel } from "@/shared/constants/constants";

import { IArticleForm } from "../types/articleForm";

export const articleSchema = yup.object({
  title: yup.string().required(requiredLabel).max(100, "Слишком длинный заголовок"),
  context: yup.string().required(requiredLabel),
});

export const getDefaultValue = (article?: IArticle) => {
  return {
    title: article?.title,
    context: article?.context.replace(/<\/?p>/g, ""),
  };
};

export const prepareFormValues = (data: IArticleForm, article: IArticle) => {
  return {
    id: article?.id,
    title: data.title,
    context: "<p>" + data?.context.replace(/\n+/g, "</p><p>") + "</p>",
    authorId: article?.authorId,
    createdAt: article?.createdAt,
    likes: article.likes,
  };
};
