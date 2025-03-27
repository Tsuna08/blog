import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useNavigate } from "react-router-dom";

import { routers } from "@/app/routers";
import { AppDispatch, RootState } from "@/app/store/store";
import { ArticleCard, fetchArticles, selectAllArticles } from "@/entities/Article";
import { Loader } from "@/shared/components/Loader";

import { getGridStyles } from "../lib/getGridStyles";
import { StyledList } from "./ArticlesList.module";

export const ArticlesList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const articles = useSelector(selectAllArticles);
  const { loading } = useSelector((state: RootState) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <StyledList>
      {articles?.map((article, index) => (
        <ArticleCard
          {...article}
          sx={getGridStyles(index)}
          key={article.id}
          onClick={() => navigate(generatePath(routers.article, { id: article.id }))}
        />
      ))}
    </StyledList>
  );
};
