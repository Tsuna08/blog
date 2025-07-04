import { Box, List, ListItem, ListItemText, styled } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  paddingTop: "0.5rem",
  maxWidth: "20%",

  [theme.breakpoints.down("laptop")]: {
    maxWidth: "100%",
  },
}));

export const StyledList = styled(List)(({ theme }) => ({
  [theme.breakpoints.down("laptop")]: {
    display: "flex",
    justifyContent: "space-between",
    gap: "0.5rem",
  },
  [theme.breakpoints.down("mobile")]: {
    flexDirection: "column",
  },
}));

export const StyledListItem = styled(ListItem)`
  padding: 0;
  cursor: pointer;
`;

export const StyledListItemText = styled(ListItemText)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover {
    color: #5d71dd;
  }

  .MuiListItemText-secondary {
    color: #2f222266;
  }
`;
