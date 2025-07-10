import { Divider, ListItem, Typography } from "@mui/material";
import { Fragment } from "react";

import { useFetchArticlesQuery } from "@/entities/Article";
import { Loader, SafeHtmlRenderer } from "@/shared/components";
import { getShortDate } from "@/shared/hooks/getDate";

import { StyledList, StyledListItemText } from "./ArticleModeration.module";

export const ArticleModeration = () => {
  const { data: articles, isLoading } = useFetchArticlesQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <StyledList>
      {articles?.map((article, index) => (
        <Fragment key={article.id}>
          <ListItem>
            <StyledListItemText
              primary={article.title}
              secondary={
                <>
                  <Typography
                    component='span'
                    variant='body2'
                    sx={{ color: "text.primary", display: "inline" }}
                  >
                    {getShortDate(article.createdAt)}
                  </Typography>
                  <SafeHtmlRenderer htmlContent={article.context} />
                </>
              }
            />
          </ListItem>
          {articles.length !== ++index && (
            <Divider variant='inset' component='li' sx={{ margin: "0 40px" }} />
          )}
        </Fragment>
      ))}
    </StyledList>
  );
};
