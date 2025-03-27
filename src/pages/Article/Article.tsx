import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { AppDispatch, RootState } from "@/app/store/store";
import { Article, fetchArticles, selectArticleById } from "@/entities/Article";
import Image from "@/shared/assets/background.jpg";
import { Loader } from "@/shared/components/Loader";

import { StyledImage } from "./Article.module";

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
      <Article {...article} />
    </Box>
  );
};
