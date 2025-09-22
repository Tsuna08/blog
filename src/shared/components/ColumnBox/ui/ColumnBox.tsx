import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface ColumnBoxProps {
  children: ReactNode;
  sx?: object;
}

export const ColumnBox: FC<ColumnBoxProps> = ({ children, sx }) => (
  <Box display='flex' flexDirection='column' justifyContent='center' gap='1rem' sx={{ ...sx }}>
    {children}
  </Box>
);
