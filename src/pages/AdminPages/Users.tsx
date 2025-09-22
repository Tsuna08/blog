import { Header, UsersPanel } from "@/features";
import { ColumnBox } from "@/shared/components";

export const Users = () => {
  return (
    <ColumnBox>
      <Header> Список пользователей</Header>
      <UsersPanel />
    </ColumnBox>
  );
};
