import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface TextFieldProps {
  label: string;
  value: string | null;
}

export const TextField: FC<TextFieldProps> = ({ label = "", value = "" }) => {
  return (
    <Box>
      <Typography sx={{ color: "#2F222266", fontWeight: 400, fontSize: "0.75rem" }}>
        {label}
      </Typography>
      <Typography variant='subtitle1'>{value}</Typography>
    </Box>
  );
};
