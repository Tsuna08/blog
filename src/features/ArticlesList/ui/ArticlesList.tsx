import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useNavigate } from "react-router-dom";

import { routers } from "@/app/routers";
import { AppDispatch, RootState } from "@/app/store/store";
import { fetchArticles, selectAllArticles } from "@/entities/Article";
import { Loader, SafeHtmlRenderer } from "@/shared/components";
import { getDate } from "@/shared/hooks/getDate";

import { getGridStyles } from "../lib/getGridStyles";
import { StyledCard, StyledContent, StyledHeader, StyledList } from "./ArticlesList.module";
import classes from "./ArticlesList.module.scss";

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
        <StyledCard
          onClick={() => navigate(generatePath(routers.article, { id: article.id }))}
          sx={getGridStyles(index)}
        >
          <StyledHeader title={article.title} subheader={getDate(article?.createdAt)} />
          {article.context && (
            <StyledContent>
              <SafeHtmlRenderer className={classes.text} htmlContent={article.context} />
            </StyledContent>
          )}
        </StyledCard>
      ))}
    </StyledList>
  );
};
