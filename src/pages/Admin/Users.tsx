import { Header } from "@/features/Header";
import { UserList } from "@/features/UserList";
import { ColumnBox } from "@/shared/components";

export const Users = () => {
  return (
    <ColumnBox>
      <Header> Список пользователей</Header>
      <UserList />
    </ColumnBox>
  );
};
