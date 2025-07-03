export interface IArticle {
  id: string;
  title: string;
  context: string;
  likes: number;
  authorId?: string;
  createdAt?: string | Date;
}

export interface IArticleLikes extends IArticle {
  likedByUser?: boolean;
}
