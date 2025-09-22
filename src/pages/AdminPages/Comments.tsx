import { CommentsPanel, Header } from "@/features";
import { ColumnBox } from "@/shared/components";

export const Comments = () => {
  return (
    <ColumnBox>
      <Header>Список комментариев</Header>
      <CommentsPanel />
    </ColumnBox>
  );
};
