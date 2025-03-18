import { routers } from "@/app/routers";

export const footerLinks = [
  {
    title: "Главная",
    link: routers.root,
  },
  {
    title: "О нас",
    link: routers.about,
  },
  {
    title: "Контакты",
    link: routers.contacts,
  },
];
