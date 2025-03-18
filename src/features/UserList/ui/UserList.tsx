import { Divider, ListItem, Typography } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/app/store/store";
import { fetchUsers, selectAllUsers } from "@/entities/User";

import { StyledList, StyledListItemText } from "./UserList.module";

export const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <StyledList>
      {users?.map((user, index) => (
        <Fragment key={user.id}>
          <ListItem>
            <StyledListItemText
              primary={user.displayName}
              secondary={
                <>
                  <Typography
                    component='span'
                    variant='body2'
                    sx={{ color: "text.primary", display: "inline" }}
                  ></Typography>
                  {user.role}
                </>
              }
            />
          </ListItem>
          {users.length !== ++index && (
            <Divider variant='inset' component='li' sx={{ margin: "0 40px" }} />
          )}
        </Fragment>
      ))}
    </StyledList>
  );
};
