import { CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/app/store/store";
import { ArticleCard, fetchArticles, selectAllArticles } from "@/entities/Article";

import { StyledList } from "./ArticlesList.module";

export const ArticlesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const articles = useSelector(selectAllArticles);

  const { loading, error } = useSelector((state: RootState) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <StyledList>
      {articles?.map((article) => <ArticleCard key={article.id} {...article} />)}
    </StyledList>
  );
};
