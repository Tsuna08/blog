import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)(({ variant }) => ({
  background: variant === "contained" ? "#5d71dd" : "#5d71dd0d",
  border: "none",
  borderRadius: "1rem",
  color: variant === "contained" ? "white" : "#5d71dd",
  "text-transform": "math-auto",
}));
