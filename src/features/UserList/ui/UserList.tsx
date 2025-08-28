import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { MouseEvent } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { useAuth } from "@/app/providers/AuthProvider";
import { routers } from "@/app/routers";
import { IUser, useFetchUsersQuery, useUpdateUserMutation } from "@/entities/User";
import { IconButton, Loader } from "@/shared/components";
import { convertFromTimestamp } from "@/shared/hooks/getDate";

import { StyledTableRow } from "./UserList.module";

export const UserList = () => {
  const navigate = useNavigate();
  const { user, isSuperAdmin } = useAuth();
  const { data: users, isLoading } = useFetchUsersQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleBan = (event: MouseEvent<HTMLButtonElement>, user: IUser) => {
    event?.stopPropagation();
    updateUser({ ...user, ban: !user.ban });
  };

  return (
    <>
      {isLoading || isUpdating ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Ник пользователя</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Роль</TableCell>
                <TableCell>Дата регистрации</TableCell>
                <TableCell align='right'> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((item: IUser) => (
                <StyledTableRow
                  key={item.id}
                  onClick={() => navigate(generatePath(routers.profile, { id: item.id }))}
                >
                  <TableCell component='th' scope='row'>
                    {item.displayName}
                  </TableCell>
                  <TableCell> {item.email}</TableCell>
                  <TableCell>{item.role} </TableCell>
                  <TableCell>{convertFromTimestamp(item.createdAt as Timestamp)}</TableCell>

                  <TableCell align='right'>
                    {user?.uid !== item.id && !isSuperAdmin && (
                      <IconButton
                        icon={item.ban ? <LockOpenIcon /> : <BlockIcon />}
                        onClick={(e) => handleBan(e, item)}
                        ariaLabel={item.ban ? "unlock item icon" : "ban item icon"}
                      />
                    )}
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
