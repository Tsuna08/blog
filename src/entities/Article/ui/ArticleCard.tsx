import { SafeHtmlRenderer } from "@/shared/components/SafeHtmlRenderer";
import { getDate } from "@/shared/hooks/getDate";

import { IArticle } from "../types/article";
import { StyledCard, StyledContent, StyledHeader } from "./ArticleCard.module";
import classes from "./ArticleCard.module.scss";

export const ArticleCard = (article: IArticle) => {
  return (
    <StyledCard onClick={article.onClick} sx={article?.sx}>
      <StyledHeader title={article.title} subheader={getDate(article?.createdAt)} />
      {article.context && (
        <StyledContent>
          <SafeHtmlRenderer className={classes.text} htmlContent={article.context} />
        </StyledContent>
      )}
    </StyledCard>
  );
};
