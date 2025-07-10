import BlockIcon from "@mui/icons-material/Block";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { generatePath, useNavigate } from "react-router-dom";

import { routers } from "@/app/routers";
import { useFetchUsersQuery } from "@/entities/User";
import { Loader } from "@/shared/components";

// import { StyledList, StyledListItemText } from "./UserList.module";

export const UserList = () => {
  const navigate = useNavigate();
  const { data: users, isLoading } = useFetchUsersQuery();

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
                <TableCell>Email</TableCell>
                <TableCell>Роль</TableCell>
                <TableCell>Дата регистлрации</TableCell>
                <TableCell align='right'> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => navigate(generatePath(routers.profile, { id: user.id }))}
                >
                  <TableCell component='th' scope='row'>
                    {user.displayName}
                  </TableCell>
                  <TableCell> {user.email}</TableCell>
                  <TableCell>{user.role} </TableCell>
                  <TableCell>{user.createdAt as any}</TableCell>
                  <TableCell align='right'>
                    <BlockIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
