import { IArticle } from "@/entities/Article";

export interface IArticleLikes extends IArticle {
  likedByUser?: boolean;
}
