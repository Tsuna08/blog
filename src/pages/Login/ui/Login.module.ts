import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  & > form {
    max-width: 40%;
  }
`;
