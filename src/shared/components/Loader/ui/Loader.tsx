import { Box, CircularProgress } from "@mui/material";

export const Loader = () => (
  <Box flexGrow='2' display='flex' justifyContent='center' alignItems='anchor-center'>
    <CircularProgress sx={{ color: "#5D71DD" }} />
  </Box>
);
