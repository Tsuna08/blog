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
  gap: 0.5rem;
`;

export const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  text-align: center;

  .Mui-selected {
    color: #5d71dd;
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }
`;
