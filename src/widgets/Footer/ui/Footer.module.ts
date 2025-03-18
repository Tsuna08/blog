import { Box, Link, styled } from "@mui/material";

export const StyledFooter = styled("footer")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  background: #f1f2f8;
  height: 250px;
`;

export const StyledBox = styled(Box)`
  display: flex;
  gap: 6rem;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 400;
  font-size: 0.9rem;
  color: #2f2222;
  cursor: pointer;
`;
