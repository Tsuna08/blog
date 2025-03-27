import { Box, styled } from "@mui/material";

export const StyledContainer = styled("div")`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;

export const StyledContact = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & svg {
    width: 1.3rem;

    path {
      fill: #5d71dd;
    }
  }

  & h6 {
    color: #5d71dd;
  }
`;

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  box-shadow: 4px 8px 40px 0px #08186f33;
  width: 360px;
  border-radius: 20px;
  padding: 3rem 2.5rem;

  & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
  }
`;
