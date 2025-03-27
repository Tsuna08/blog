import { Divider, ListItem, Typography } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/app/store/store";
import { fetchArticles, selectAllArticles } from "@/entities/Article";
import { Loader } from "@/shared/components/Loader";
import { getDate } from "@/shared/hooks/getDate";

import { StyledList, StyledListItemText } from "./ArticleModeration.module";

export const ArticleModeration = () => {
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
                    {getDate(article.createdAt)}
                  </Typography>{" "}
                  {article.context}
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
