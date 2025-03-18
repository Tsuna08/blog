import { TypographyProps } from "@mui/material";
import { FC } from "react";

import { StyledTitle } from "./Title.module";

export const Title: FC<TypographyProps> = ({ children, ...rest }) => {
  return <StyledTitle {...rest}>{children}</StyledTitle>;
};
