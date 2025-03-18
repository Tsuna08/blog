import { Box, Typography } from "@mui/material";

import CommentsList from "@/features/Comments/ui/CommentsList";

export const Comments = () => {
  return (
    <Box>
      <Typography variant='h5'>Comments</Typography>
      <CommentsList />
    </Box>
  );
};
