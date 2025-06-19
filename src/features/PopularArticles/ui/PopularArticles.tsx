import { Divider, List, Typography } from "@mui/material";
import { generatePath, useNavigate } from "react-router-dom";

import { routers } from "@/app/routers";
import { useFetchPopularArticlesQuery } from "@/entities/Article";
import { Loader } from "@/shared/components";
import { getDate } from "@/shared/hooks/getDate";

import { StyledBox, StyledListItem, StyledListItemText } from "./PopularArticles.module";

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
            Попоулярные статьи
          </Typography>
          <List>
            {articles?.map((article, index) => (
              <>
                <StyledListItem
                  alignItems='flex-start'
                  onClick={() => navigate(generatePath(routers.article, { id: article.id }))}
                >
                  <StyledListItemText
                    primary={article.title}
                    secondary={getDate(article?.createdAt)}
                  />
                </StyledListItem>
                {articles.length !== index + 1 && <Divider />}
              </>
            ))}
          </List>
        </>
      )}
    </StyledBox>
  );
};
