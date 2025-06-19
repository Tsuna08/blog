import { Box, ListItem, ListItemText, styled } from "@mui/material";

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding-top: 0.5rem;
  max-width: 20%;
`;

export const StyledListItem = styled(ListItem)`
  padding: 0.5rem 0;
  cursor: pointer;
`;

export const StyledListItemText = styled(ListItemText)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .MuiListItemText-secondary {
    color: #2f222266;
  }
`;
