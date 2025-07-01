import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { generatePath, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/app/providers/AuthProvider";
import { routers } from "@/app/routers";
import { useDeleteArticleMutation, useGetArticleQuery } from "@/entities/Article";
import { CounterButton } from "@/features/CounterButton";
import { PopularArticles } from "@/features/PopularArticles";
import Image from "@/shared/assets/background.jpg";
import { Loader, SafeHtmlRenderer, Title } from "@/shared/components";
import { IconButton } from "@/shared/components/IconButton";
import { getDate } from "@/shared/hooks/getDate";

import { StyledBox, StyledImage } from "./Article.module";
import classes from "./Article.module.scss";

export const ArticlePage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { isAdmin, user } = useAuth();

  const { data: article, isLoading } = useGetArticleQuery(id ?? skipToken);
  const [deleteArticle, { isLoading: isDeleteLoading }] = useDeleteArticleMutation();

  const onDelete = (id: string) => {
    deleteArticle(id).then(() => navigate(routers.root));
  };

  return (
    <StyledBox>
      {!isLoading && article && (
        <StyledImage srcSet={Image} src={Image} alt='Image' loading='lazy' />
      )}

      <Box display='flex' gap='8rem' justifyContent='space-between'>
        {isLoading || isDeleteLoading ? (
          <Loader />
        ) : (
          <StyledBox flexShrink={2} width='100%'>
            {article ? (
              <>
                <Box display='flex' justifyContent='space-between'>
                  <Typography variant='subtitle1' sx={{ color: "#2F222266" }}>
                    {getDate(article?.createdAt)}
                  </Typography>

                  <Box display='flex'>
                    <CounterButton
                      ariaLabel='add to favorites'
                      icon={<FavoriteBorderIcon />}
                      counter={article?.likes ?? 0}
                      onClick={() => {}}
                    />
                    {(isAdmin || user?.uid === article?.authorId) && (
                      <>
                        <IconButton
                          icon={<EditIcon />}
                          ariaLabel='edit button'
                          onClick={() =>
                            navigate(generatePath(routers.editArticle, { id: article.id }))
                          }
                        />
                        <IconButton
                          icon={<DeleteOutlineIcon />}
                          ariaLabel='delete button'
                          onClick={() => onDelete(article.id)}
                        />
                      </>
                    )}
                  </Box>
                </Box>
                <Title>{article?.title}</Title>
                <SafeHtmlRenderer
                  className={classes.article}
                  htmlContent={article?.context ?? ""}
                />
              </>
            ) : (
              <Typography>Статья не найдена</Typography>
            )}
          </StyledBox>
        )}

        <PopularArticles />
      </Box>
    </StyledBox>
  );
};
