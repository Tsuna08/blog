import { Divider, ListItem, Typography } from "@mui/material";
import { Fragment } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { routers } from "@/app/routers";
import { useFetchArticlesQuery } from "@/entities/Article";
import { Loader, SafeHtmlRenderer } from "@/shared/components";
import { getShortDate } from "@/shared/hooks/getDate";

import { StyledList, StyledListItemText } from "./ArticlesPanel.module";

export const ArticlesPanel = () => {
  const navigate = useNavigate();

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
              onClick={() => navigate(generatePath(routers.article, { id: article.id }))}
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
