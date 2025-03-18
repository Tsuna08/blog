import { Box, Typography } from "@mui/material";

import { UserList } from "@/features/UserList";

export const Users = () => {
  return (
    <Box>
      <Typography variant='h5'>Список пользователей</Typography>
      <UserList />
    </Box>
  );
};
