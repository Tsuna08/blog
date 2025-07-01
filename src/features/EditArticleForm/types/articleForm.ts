import { IArticle } from "@/entities/Article/types/article";

export type IArticleForm = Omit<IArticle, "id" | "authorId" | "createdAt" | "likes">;
