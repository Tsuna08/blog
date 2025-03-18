import { ButtonProps as MuiButtonProps } from "@mui/material";
import { FC } from "react";

import { StyledButton } from "./Button.module";

export const Button: FC<MuiButtonProps> = ({ children, variant = "contained", ...rest }) => {
  return (
    <StyledButton variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
};
