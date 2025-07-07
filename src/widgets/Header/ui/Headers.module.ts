import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  styled,
  Toolbar,
} from "@mui/material";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  background: "white",
  padding: "0 2rem",

  [theme.breakpoints.down("tablet")]: {
    padding: "0 0.1rem",
  },
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: "60px",
  background: "white",

  [theme.breakpoints.down("tablet")]: {
    padding: 0,
    display: "flex",
    gap: "0.5rem",
  },
}));

export const StyledIconButton = styled(IconButton)`
  margin-right: 0;

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
