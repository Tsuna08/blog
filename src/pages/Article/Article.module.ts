import { Box, styled } from "@mui/material";

export const StyledImage = styled("img")`
  width: 100%;
  max-height: 190px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;
