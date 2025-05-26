import { routers } from "@/app/routers";

export const listLinks = [
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
  {
    link: routers.login,
    name: "Войти",
  },
];

export const isUserLinks = [
  {
    link: routers.createArticle,
    name: "Написать статью",
  },
];
export const adminLink = [
  {
    link: routers.admin,
    name: "Панель администратора",
  },
];
