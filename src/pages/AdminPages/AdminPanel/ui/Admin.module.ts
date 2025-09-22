import { Box, CardActionArea, styled } from "@mui/material";

export const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-around;
  height: inherit;
`;

export const StyledCardActionArea = styled(CardActionArea)`
  :focus {
    outline: none;
  }
`;
