import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { AppDispatch, RootState } from "@/app/store/store";
import { fetchArticles, selectArticleById } from "@/entities/Article";
import Image from "@/shared/assets/background.jpg";
import { SafeHtmlRenderer, Title } from "@/shared/components";
import { Loader } from "@/shared/components";
import { getDate } from "@/shared/hooks/getDate";

import { StyledImage } from "./Article.module";
import classes from "./Article.module.scss";

export const ArticlePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const article = useSelector((state: RootState) => selectArticleById(state, id ?? ""));

  const { loading } = useSelector((state: RootState) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box display='flex' flexDirection='column' gap='1rem'>
      <StyledImage srcSet={Image} src={Image} alt='Image' loading='lazy' />

      <Typography variant='subtitle1' sx={{ color: "#2F222266" }}>
        {getDate(article?.createdAt)}
      </Typography>
      <Title>{article.title}</Title>
      <SafeHtmlRenderer className={classes.article} htmlContent={article.context} />
    </Box>
  );
};
