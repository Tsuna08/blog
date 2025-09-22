import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";

import { useGetArticlesByIdsQuery } from "@/entities/Article";
import { useDeleteCommentMutation, useFetchCommentsQuery } from "@/entities/Comments";
import { IconButton, Loader } from "@/shared/components";
import { getShortDateTime } from "@/shared/hooks/getDate";

import { StyledTableRow } from "./CommentsPanel.module";

export const CommentsPanel = () => {
  const { data: comments, isLoading } = useFetchCommentsQuery();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const ids = comments?.map((comment) => comment.articleId);
  const { data: articles, isLoading: isLoadingArticles } = useGetArticlesByIdsQuery(
    ids ?? skipToken,
  );

  const handleDelete = (id: string) => {
    deleteComment(id);
  };

  return (
    <>
      {isLoading || isDeleting || isLoadingArticles ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 550 }} size='small' aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Ник пользователя</TableCell>
                <TableCell>Комментарий</TableCell>
                <TableCell>Статья</TableCell>
                <TableCell>Дата создания</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments?.map((item) => (
                <StyledTableRow key={item.id}>
                  <TableCell component='th' scope='row'>
                    {item.authorName}
                  </TableCell>
                  <TableCell> {item.comment}</TableCell>
                  <TableCell>
                    {articles?.find((article) => article.id === item.articleId)?.title || "_"}
                  </TableCell>
                  <TableCell>{getShortDateTime(item.createdAt)}</TableCell>

                  <TableCell align='right'>
                    <IconButton
                      icon={<DeleteOutlineIcon />}
                      onClick={() => handleDelete(item.id)}
                      ariaLabel='delete item icon'
                    />
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
