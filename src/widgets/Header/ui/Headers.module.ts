import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  styled,
  Toolbar,
} from "@mui/material";

export const StyledAppBar = styled(AppBar)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 0 2rem;
`;

export const StyledToolbar = styled(Toolbar)`
  height: 60px;
  background: white;
`;

export const StyledIconButton = styled(IconButton)`
  margin-right: 1rem;

  &:focus {
    outline: none;
  }
`;

export const StyledBottomNavigation = styled(BottomNavigation)`
  height: auto;
  gap: 0.5rem;
`;

export const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  text-align: center;
  padding: 0;
  min-width: auto;
  padding: 0.5rem 0.3rem;
  border-radius: 8px;

  .Mui-selected {
    color: #5d71dd;
    font-weight: 400;
    font-size: 0.75rem !important;
  }

  &.Mui-selected {
    color: #5d70dd;
  }

  &:focus {
    outline: none;
  }
`;
