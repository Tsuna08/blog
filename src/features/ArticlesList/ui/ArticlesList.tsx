// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CardActions } from "@mui/material";
import { MouseEvent } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { routers } from "@/app/routers";
import { useFetchArticlesQuery } from "@/entities/Article";
import { CounterButton } from "@/features/CounterButton";
import { Loader, SafeHtmlRenderer } from "@/shared/components";
import { getDate } from "@/shared/hooks/getDate";

import { getGridStyles } from "../lib/getGridStyles";
import { StyledCard, StyledContent, StyledHeader, StyledList } from "./ArticlesList.module";
import classes from "./ArticlesList.module.scss";

export const ArticlesList = () => {
  const navigate = useNavigate();
  const { data: articles, isLoading } = useFetchArticlesQuery();
  // const [updateArticle /*, { isLoading: isLoadingArticle }*/] = useUpdateArticleMutation();

  const addFavorites = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    // updateArticle({});
  };

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
              key={index}
            >
              <StyledHeader title={article.title} subheader={getDate(article?.createdAt)} />
              {article.context && (
                <StyledContent>
                  <SafeHtmlRenderer className={classes.text} htmlContent={article.context} />
                </StyledContent>
              )}
              <CardActions>
                <CounterButton
                  ariaLabel='add to favorites'
                  icon={<FavoriteBorderIcon />}
                  counter={article.likes}
                  onClick={addFavorites}
                />
              </CardActions>
            </StyledCard>
          ))}
        </>
      )}
    </StyledList>
  );
};
