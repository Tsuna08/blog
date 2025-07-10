import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CardActions } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { routers } from "@/app/routers";
import {
  IArticleLikes,
  useFetchArticlesQuery,
  useUpdateArticlesLikesMutation,
} from "@/entities/Article";
import { CounterButton } from "@/features/CounterButton";
import { Loader, SafeHtmlRenderer } from "@/shared/components";
import { getShortDate } from "@/shared/hooks/getDate";

import { getGridStyles } from "../lib/getGridStyles";
import { StyledCard, StyledContent, StyledHeader, StyledList } from "./ArticlesList.module";
import classes from "./ArticlesList.module.scss";

export const ArticlesList = () => {
  const navigate = useNavigate();

  const { data: articles, isLoading } = useFetchArticlesQuery();
  const [updateArticlesLikes, { isLoading: isUpdating }] = useUpdateArticlesLikesMutation();

  const [allCards, setAllCards] = useState<IArticleLikes[] | undefined>(articles);

  useEffect(() => {
    setAllCards(articles?.map((item) => ({ ...item, likedByUser: false })) ?? []);
  }, [articles]);

  useEffect(() => {
    return () => {
      const likedArticles = allCards?.filter((item) => item.likedByUser);
      if (likedArticles?.length) {
        updateArticlesLikes(likedArticles).unwrap().catch(console.error);
      }
    };
  }, [allCards]);

  const addFavorites = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();
    setAllCards(
      allCards?.map((item) =>
        item.id === id
          ? {
              ...item,
              likedByUser: !item.likedByUser,
              likes: item.likedByUser ? (item.likes || 0) - 1 : (item.likes || 0) + 1,
            }
          : item,
      ),
    );
  };

  return (
    <>
      {isLoading || isUpdating ? (
        <Loader />
      ) : (
        <StyledList>
          {allCards?.map((article, index) => (
            <StyledCard
              onClick={() => navigate(generatePath(routers.article, { id: article.id }))}
              sx={getGridStyles(index)}
              key={article.id}
            >
              <StyledHeader title={article.title} subheader={getShortDate(article?.createdAt)} />
              {article.context && (
                <StyledContent>
                  <SafeHtmlRenderer className={classes.text} htmlContent={article.context} />
                </StyledContent>
              )}
              <CardActions>
                <CounterButton
                  ariaLabel='add to favorites'
                  icon={<FavoriteBorderIcon sx={article.likedByUser ? { color: "#5d70dd" } : {}} />}
                  counter={article.likes}
                  onClick={(event) => addFavorites(event, article.id)}
                />
              </CardActions>
            </StyledCard>
          ))}
        </StyledList>
      )}
    </>
  );
};
