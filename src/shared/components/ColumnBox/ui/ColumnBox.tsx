import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface ColumnBoxProps {
  children: ReactNode;
}

export const ColumnBox: FC<ColumnBoxProps> = ({ children }) => (
  <Box display='flex' flexDirection='column' justifyContent='center' gap='1rem'>
    {children}
  </Box>
);
