import { Box, Typography } from "@mui/material";

import { UserList } from "@/features/UserList";

export const Users = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography variant='h5'>Список пользователей</Typography>
      <UserList />
    </Box>
  );
};
