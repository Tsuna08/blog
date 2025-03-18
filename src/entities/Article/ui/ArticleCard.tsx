import { CardContent, CardHeader } from "@mui/material";

import { getDate } from "@/shared/hooks/getDate";

import { IArticle } from "../types/article";
import { StyledCard, StyledContent } from "./ArticleCard.module";

export const ArticleCard = (article: IArticle) => {
  return (
    <StyledCard>
      <CardHeader title={article.title} subheader={getDate(article?.createdAt)} />
      <CardContent>
        <StyledContent variant='body2'>{article.context}</StyledContent>
      </CardContent>
    </StyledCard>
  );
};
