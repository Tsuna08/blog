import { MouseEvent, ReactNode } from "react";

import { StyledIcon, StyledIconButton } from "./IconButton.module";

interface IconProps {
  icon: ReactNode;
  ariaLabel: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const IconButton = ({ icon, ariaLabel, onClick }: IconProps) => (
  <StyledIconButton aria-label={ariaLabel} onClick={(event) => onClick(event)}>
    <StyledIcon>{icon}</StyledIcon>
  </StyledIconButton>
);
