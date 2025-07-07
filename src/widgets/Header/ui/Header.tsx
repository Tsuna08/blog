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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  const [value, setValue] = useState(0);
  const [links, setLinks] = useState(listLinks);
  const [open, setOpen] = useState(false);

  useEffect(() => setValue(0), [links]);
  useEffect(
    () =>
      setLinks([
        ...listLinks,
        ...(isAdmin ? adminLink : []),
        ...(user ? isUserLinks : noUsersLinks),
      ]),
    [isAdmin, user],
  );

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
            <StyledIconButton aria-label='open drawer' onClick={() => toggleDrawer(true)}>
              <Menu />
            </StyledIconButton>
          </Tooltip>
        )}
        <Avatar component={Link} to={routers.root} alt='Logo' src={Logo} />
      </StyledToolbar>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <List>
          {links.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={handleClickMenu(item.link)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {!isTablet && (
        <StyledBottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
        >
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
