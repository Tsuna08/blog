import { Typography } from "@mui/material";
import React from "react";

import { Title } from "@/shared/components";
import { SafeHtmlRenderer } from "@/shared/components/SafeHtmlRenderer";
import { getDate } from "@/shared/hooks/getDate";

import { IArticle } from "../../types/article";
import classes from "./Article.module.scss";

export const Article = (article: IArticle) => {
  return (
    <>
      <Typography variant='subtitle1' sx={{ color: "#2F222266" }}>
        {getDate(article?.createdAt)}
      </Typography>
      <Title>{article.title}</Title>
      <SafeHtmlRenderer className={classes.article} htmlContent={article.context} />
    </>
  );
};
