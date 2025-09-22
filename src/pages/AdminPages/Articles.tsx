import { ArticlesPanel, Header } from "@/features";
import { ColumnBox } from "@/shared/components";

export const Articles = () => {
  return (
    <ColumnBox>
      <Header>Список статей</Header>
      <ArticlesPanel />
    </ColumnBox>
  );
};
