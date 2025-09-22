import { List, ListItemText, styled } from "@mui/material";

export const StyledList = styled(List)`
  box-shadow: 4px 8px 40px 0px #08186f33;
`;

export const StyledListItemText = styled(ListItemText)`
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;

  .MuiTypography-body1:hover {
    cursor: pointer;
  }
`;
