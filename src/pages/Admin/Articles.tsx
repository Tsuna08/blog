import { Box, Typography } from "@mui/material";

import { ArticleModeration } from "@/features/ArticleModeration/ArticleModeration";

export const Articles = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography variant='h5'>Список статей</Typography>
      <ArticleModeration />
    </Box>
  );
};
