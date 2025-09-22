import { routers } from "@/app/routers";
import Article from "@/shared/assets/article.jpg";
import Comments from "@/shared/assets/comments.png";
import User from "@/shared/assets/user.png";

export const links = [
  {
    link: routers.adminArticles,
    title: "Статьи",
    context: "Список статей для модерирования",
    icon: Article,
  },
  {
    link: routers.adminComments,
    title: "Комментарии",
    context: "Список комментариев под статьями для модерирования",
    icon: Comments,
  },
  {
    link: routers.adminUsers,
    title: "Пользователи",
    context: "Список пользователей",
    icon: User,
  },
];
