export interface IComment {
  id: string;
  authorName: string | null;
  authorId: string;
  createdAt: string;
  comment: string;
  articleId: string;
}
