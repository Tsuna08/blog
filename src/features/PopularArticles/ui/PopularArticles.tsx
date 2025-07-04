import { Divider, Typography } from "@mui/material";
import { Fragment } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { routers } from "@/app/routers";
import { useFetchPopularArticlesQuery } from "@/entities/Article";
import { Loader } from "@/shared/components";
import { getDate } from "@/shared/hooks/getDate";

import {
  StyledBox,
  StyledList,
  StyledListItem,
  StyledListItemText,
} from "./PopularArticles.module";

export const PopularArticles = () => {
  const navigate = useNavigate();
  const { data: articles, isLoading } = useFetchPopularArticlesQuery();

  return (
    <StyledBox>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Typography variant='h6' fontSize='24px'>
            Популярные статьи
          </Typography>
          <StyledList>
            {articles?.map((article, index) => (
              <Fragment key={index}>
                <StyledListItem
                  key={article.id}
                  alignItems='flex-start'
                  onClick={() => navigate(generatePath(routers.article, { id: article.id }))}
                >
                  <StyledListItemText
                    primary={article.title}
                    secondary={getDate(article?.createdAt)}
                  />
                </StyledListItem>
                {articles.length !== index + 1 && <Divider key={index} />}
              </Fragment>
            ))}
          </StyledList>
        </>
      )}
    </StyledBox>
  );
};
