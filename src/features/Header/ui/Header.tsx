import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import { Box, TypographyProps } from "@mui/material";
import { FC, ReactNode } from "react";

import { IconButton, Title } from "@/shared/components";

interface HeaderProps extends TypographyProps {
  icon?: ReactNode;
  onClose?: () => void;
}

export const Header: FC<HeaderProps> = ({ children, icon, onClose }) => {
  return (
    <Box display='flex' alignItems='center' gap='0.5rem'>
      <IconButton
        ariaLabel='return-icon'
        icon={icon ?? <ArrowBackIosSharpIcon />}
        onClick={onClose ?? (() => window.history.back())}
      />
      <Title>{children}</Title>
    </Box>
  );
};
