import AdminPanelSettingsSharpIcon from "@mui/icons-material/AdminPanelSettingsSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { ReactNode } from "react";

import { routers } from "@/app/routers";

export interface NavLink {
  link: string;
  name: string;
  icon?: ReactNode;
}

export const listLinks: NavLink[] = [
  {
    link: routers.root,
    name: "Главная",
  },
  {
    link: routers.about,
    name: "О нас",
  },
  {
    link: routers.contacts,
    name: "Контакты",
  },
];

export const isUserLinks: NavLink[] = [
  {
    link: routers.createArticle,
    name: "Написать статью",
    icon: <EditSharpIcon />,
  },
];

export const noUsersLinks: NavLink[] = [
  {
    link: routers.login,
    name: "Войти",
  },
];

export const adminLink = [
  {
    link: routers.admin,
    name: "Панель администратора",
    icon: <AdminPanelSettingsSharpIcon />,
  },
];
