import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/app/providers/AuthProvider";
import { routers } from "@/app/routers";
import {
  useDeleteArticleMutation,
  useGetArticleQuery,
  useUpdateArticleMutation,
} from "@/entities/Article";
import { IArticleLikes } from "@/entities/Article/types/article";
import { CounterButton } from "@/features/CounterButton";
import { PopularArticles } from "@/features/PopularArticles";
import Image from "@/shared/assets/background.jpg";
import { Loader, SafeHtmlRenderer, Title } from "@/shared/components";
import { IconButton } from "@/shared/components/IconButton";
import { getDate } from "@/shared/hooks/getDate";

import { StyledArticle, StyledBox, StyledImage, StyledInfo } from "./Article.module";
import classes from "./Article.module.scss";

export const ArticlePage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { isAdmin, user } = useAuth();

  const { data: article, isLoading } = useGetArticleQuery(id ?? skipToken);
  const [deleteArticle, { isLoading: isDeleteLoading }] = useDeleteArticleMutation();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();

  const [card, setCard] = useState<IArticleLikes | undefined>(article);

  useEffect(() => {
    setCard(article ? { ...article, likedByUser: false } : undefined);
  }, [article]);

  const addFavorites = () => {
    const likesCounter = card?.likedByUser ? (card?.likes || 0) - 1 : (card?.likes || 0) + 1;

    setCard(card ? { ...card, likedByUser: !card.likedByUser, likes: likesCounter } : undefined);

    if (article) {
      updateArticle({ ...article, likes: likesCounter })
        .unwrap()
        .catch(console.error);
    }
  };

  const onDelete = (id: string) => {
    deleteArticle(id).then(() => navigate(routers.root));
  };

  return (
    <StyledBox>
      {!isLoading && article && (
        <StyledImage srcSet={Image} src={Image} alt='Image' loading='lazy' />
      )}

      <StyledArticle>
        {isLoading || isDeleteLoading || isUpdating ? (
          <Loader />
        ) : (
          <StyledBox flexShrink={2} width='100%'>
            {card ? (
              <>
                <StyledInfo>
                  <Typography variant='subtitle1' sx={{ color: "#2F222266" }}>
                    {getDate(card?.createdAt)}
                  </Typography>

                  <Box display='flex'>
                    <CounterButton
                      ariaLabel='add to favorites'
                      icon={
                        <FavoriteBorderIcon sx={card.likedByUser ? { color: "#5d70dd" } : {}} />
                      }
                      counter={card?.likes ?? 0}
                      onClick={addFavorites}
                    />
                    {(isAdmin || user?.uid === card?.authorId) && (
                      <>
                        <IconButton
                          icon={<EditIcon />}
                          ariaLabel='edit button'
                          onClick={() =>
                            navigate(generatePath(routers.editArticle, { id: card.id }))
                          }
                        />
                        <IconButton
                          icon={<DeleteOutlineIcon />}
                          ariaLabel='delete button'
                          onClick={() => onDelete(card.id)}
                        />
                      </>
                    )}
                  </Box>
                </StyledInfo>
                <Title>{card?.title}</Title>
                <SafeHtmlRenderer className={classes.article} htmlContent={card?.context ?? ""} />
              </>
            ) : (
              <Typography>Статья не найдена</Typography>
            )}
          </StyledBox>
        )}

        <PopularArticles />
      </StyledArticle>
    </StyledBox>
  );
};
