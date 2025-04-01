import { Box, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useParams } from "react-router-dom";

import { useGetArticleQuery } from "@/entities/Article";
import Image from "@/shared/assets/background.jpg";
import { Loader, SafeHtmlRenderer, Title } from "@/shared/components";
import { getDate } from "@/shared/hooks/getDate";

import { StyledImage } from "./Article.module";
import classes from "./Article.module.scss";

export const ArticlePage = () => {
  const { id } = useParams();
  const { data: article, isLoading } = useGetArticleQuery(id ?? skipToken);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box display='flex' flexDirection='column' gap='1rem'>
      <StyledImage srcSet={Image} src={Image} alt='Image' loading='lazy' />

      <Typography variant='subtitle1' sx={{ color: "#2F222266" }}>
        {getDate(article?.createdAt)}
      </Typography>
      <Title>{article?.title}</Title>
      <SafeHtmlRenderer className={classes.article} htmlContent={article?.context ?? ""} />
    </Box>
  );
};
