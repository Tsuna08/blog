import { IArticle } from "@/entities/Article";

export type IArticleForm = Omit<IArticle, "id" | "authorId" | "createdAt" | "likes">;
