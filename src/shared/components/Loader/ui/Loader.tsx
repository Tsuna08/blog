import { Box, CircularProgress } from "@mui/material";

export const Loader = () => (
  <Box position='absolute' top='52%' left='49%'>
    <CircularProgress sx={{ color: "#5D71DD" }} />
  </Box>
);
