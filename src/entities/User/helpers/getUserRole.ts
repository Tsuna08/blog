import { Role } from "../types/user";

export const getUserRole = (role?: Role) => {
  switch (role) {
    case Role.ADMIN:
      return "Администратор";
    case Role.USER:
      return "Пользователь";
    case Role.SUPER_ADMIN:
      return "Главный администратор";
    default:
      return "Пользователь";
  }
};
