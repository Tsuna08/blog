import { Menu } from "@mui/icons-material";
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/app/providers/AuthProvider";
import { routers } from "@/app/routers";
import Logo from "@/shared/assets/Logo.svg";
import { theme } from "@/shared/theme/palette";

import { adminLink, isUserLinks, listLinks, noUsersLinks } from "../model/header";
import {
  StyledAppBar,
  StyledBottomNavigation,
  StyledBottomNavigationAction,
  StyledIconButton,
  StyledToolbar,
} from "./Headers.module";

export const Header = () => {
  const navigate = useNavigate();
  const { isAdmin, user, logout } = useAuth();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const currentPath = location.pathname;
  const links = useMemo(
    () => [...listLinks, ...(isAdmin ? adminLink : []), ...(user ? isUserLinks : noUsersLinks)],
    [isAdmin, user],
  );
  const activeIndex = links.findIndex((item) => item.link === currentPath);
  const value = activeIndex !== -1 ? activeIndex : -1;

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const logoutUser = () => {
    logout().then(() => window.location.assign(routers.root));
  };

  const handleClickMenu = (link: string) => () => {
    setOpen(false);
    navigate(link);
  };

  return (
    <StyledAppBar position='static'>
      <StyledToolbar>
        {isTablet && (
          <Tooltip title='Menu'>
            <StyledIconButton aria-label='Open drawer' onClick={() => toggleDrawer(true)}>
              <Menu />
            </StyledIconButton>
          </Tooltip>
        )}
        <Avatar component={Link} to={routers.root} alt='Logo' src={Logo} />
      </StyledToolbar>
      <Drawer
        open={open}
        aria-label='Main menu'
        role='navigation'
        onClose={() => toggleDrawer(false)}
      >
        <List>
          {links.map((item) => (
            <ListItem key={item.link} disablePadding>
              <ListItemButton onClick={handleClickMenu(item.link)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {!isTablet && (
        <StyledBottomNavigation showLabels value={value}>
          {links.map((item, index) => (
            <StyledBottomNavigationAction
              label={item.name}
              key={index}
              value={index}
              onClick={() => navigate(item.link)}
            />
          ))}
          {user && (
            <StyledBottomNavigationAction label='Выйти' onClick={logoutUser} value={links.length} />
          )}
        </StyledBottomNavigation>
      )}
    </StyledAppBar>
  );
};
