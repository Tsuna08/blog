import { Menu } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/app/providers/AuthProvider";
import { routers } from "@/app/routers";
import Logo from "@/shared/assets/Logo.svg";

import { adminLink, userLinks } from "../model/header";
import {
  StyledAppBar,
  StyledBottomNavigation,
  StyledBottomNavigationAction,
  StyledIconButton,
  StyledToolbar,
} from "./Headers.module";

interface HeaderProps {
  onClick?: (open: any) => void;
}

export const Header = ({ onClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [value, setValue] = useState(0);

  const links = isAdmin ? [...userLinks, ...adminLink] : userLinks;

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
            onClick={() => navigate(item.link)}
          />
        ))}
      </StyledBottomNavigation>
    </StyledAppBar>
  );
};
