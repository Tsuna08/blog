import { ArticleModeration } from "@/features/ArticleModeration/ArticleModeration";
import { Header } from "@/features/Header";
import { ColumnBox } from "@/shared/components";

export const Articles = () => {
  return (
    <ColumnBox>
      <Header>Список статей</Header>
      <ArticleModeration />
    </ColumnBox>
  );
};
