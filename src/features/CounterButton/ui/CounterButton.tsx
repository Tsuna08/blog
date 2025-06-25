import { Typography } from "@mui/material";
import { MouseEvent, ReactNode } from "react";

import { StyledIcon, StyledIconButton } from "./CounterButton.module";

interface CounterButtonProps {
  icon: ReactNode;
  counter: number;
  ariaLabel: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const CounterButton = ({ icon, counter, ariaLabel, onClick }: CounterButtonProps) => (
  <StyledIconButton aria-label={ariaLabel} onClick={(event) => onClick(event)}>
    <StyledIcon>{icon}</StyledIcon>
    <Typography variant='body2'>{counter}</Typography>
  </StyledIconButton>
);
