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
import { AccountMenu } from "@/features";
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
  const { isAdmin, isSuperAdmin, user } = useAuth();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const currentPath = location.pathname;
  const links = useMemo(
    () => [
      ...listLinks,
      ...(isAdmin || isSuperAdmin ? adminLink : []),
      ...(user ? isUserLinks : noUsersLinks),
    ],
    [isAdmin, isSuperAdmin, user],
  );
  const activeIndex = links.findIndex((item) => item.link === currentPath);
  const value = activeIndex !== -1 ? activeIndex : -1;

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleClickMenu = (link: string) => () => {
    setOpen(false);
    navigate(link);
  };

  return (
    <StyledAppBar position='static'>
      <StyledToolbar>
        {isTablet && (
          <Tooltip title='Меню'>
            <StyledIconButton aria-label='Open drawer' onClick={() => toggleDrawer(true)}>
              <Menu />
            </StyledIconButton>
          </Tooltip>
        )}
        <Avatar component={Link} to={routers.root} alt='Logo' src={Logo} />
      </StyledToolbar>
      <Drawer
        open={open}
        aria-label='Меню навигации'
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
              label={!item?.icon ? item.name : undefined}
              key={index}
              value={index}
              icon={item?.icon ?? undefined}
              onClick={() => navigate(item.link)}
            />
          ))}
          {user && <AccountMenu />}
        </StyledBottomNavigation>
      )}
    </StyledAppBar>
  );
};
