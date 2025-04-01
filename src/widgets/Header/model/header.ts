import { routers } from "@/app/routers";

export const userLinks = [
  {
    link: routers.root,
    name: "Главная",
  },
  {
    link: routers.createArticle,
    name: "Написать статью",
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

export const adminLink = [
  {
    link: routers.admin,
    name: "Панель администратора",
  },
];
