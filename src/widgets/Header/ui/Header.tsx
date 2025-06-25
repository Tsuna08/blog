import { Menu } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/app/providers/AuthProvider";
import { routers } from "@/app/routers";
import Logo from "@/shared/assets/Logo.svg";

import { adminLink, isUserLinks, listLinks, noUsersLinks } from "../model/header";
import {
  StyledAppBar,
  StyledBottomNavigation,
  StyledBottomNavigationAction,
  StyledIconButton,
  StyledToolbar,
} from "./Headers.module";

interface HeaderProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Header = ({ onClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { isAdmin, user, logout } = useAuth();

  const [value, setValue] = useState(0);
  const [links, setLinks] = useState(listLinks);

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

  const logoutUser = () => {
    logout().then(() => window.location.assign(routers.root));
  };

  return (
    <StyledAppBar position='static'>
      <StyledToolbar>
        {onClick && (
          <Tooltip title='Menu'>
            <StyledIconButton aria-label='open drawer' onClick={onClick}>
              <Menu />
            </StyledIconButton>
          </Tooltip>
        )}
        <Avatar component={Link} to={routers.root} alt='Logo' src={Logo} />
      </StyledToolbar>
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
        ,
      </StyledBottomNavigation>
    </StyledAppBar>
  );
};
