import { generatePath, useNavigate } from "react-router-dom";

import { routers } from "@/app/routers";
import { useFetchArticlesQuery } from "@/entities/Article";
import { Loader, SafeHtmlRenderer } from "@/shared/components";
import { getDate } from "@/shared/hooks/getDate";

import { getGridStyles } from "../lib/getGridStyles";
import { StyledCard, StyledContent, StyledHeader, StyledList } from "./ArticlesList.module";
import classes from "./ArticlesList.module.scss";

export const ArticlesList = () => {
  const navigate = useNavigate();
  const { data: articles, isLoading } = useFetchArticlesQuery();

  return (
    <StyledList>
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </StyledList>
  );
};
