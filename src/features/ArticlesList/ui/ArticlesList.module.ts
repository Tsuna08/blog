import { List, styled } from "@mui/material";

export const StyledList = styled(List)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(100px, auto);
  gap: 1rem;
  padding-top: 1rem;
`;
