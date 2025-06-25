import { IconButton, styled } from "@mui/material";

export const StyledIconButton = styled(IconButton)`
  display: flex;
  align-items: center;
  gap: 0.1rem;
  padding: 0.45rem 0.3rem;

  &:focus {
    outline: none;
  }
`;

export const StyledIcon = styled("div")`
  display: flex;
  color: #2f222266;
`;
