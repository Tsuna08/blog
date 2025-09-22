import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { IComment, useFetchCommentsQuery } from "@/entities/Comments";
import { Loader } from "@/shared/components";

import { StyledTableRow } from "./CommentsPanel.module";

export const CommentsPanel = () => {
  const { data: comments, isLoading } = useFetchCommentsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Ник пользователя</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments?.map((item: IComment) => (
                <StyledTableRow key={item.uid}>
                  <TableCell component='th' scope='row'></TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
