import { SxProps, Theme } from "@mui/material";

export interface IArticle {
  id: string;
  title: string;
  context: string;
  authorId?: string;
  createdAt?: string;
  onClick: () => void;
  sx?: SxProps<Theme>;
}
