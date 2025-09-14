import Logout from "@mui/icons-material/Logout";
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { FC, MouseEvent, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { useAuth } from "@/app/providers/AuthProvider";
import { routers } from "@/app/routers";

export const AccountMenu: FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickProfile = () => {
    setAnchorEl(null);
    navigate(generatePath(routers.profile, { id: user?.uid }));
  };

  const logoutUser = () => {
    logout().then(() => window.location.assign(routers.root));
  };

  const menu = [
    {
      label: "Профиль",
      icon: <Avatar sx={{ width: 25, height: 25 }} />,
      onClick: handleClickProfile,
    },
    { label: "Выход", icon: <Logout fontSize='small' />, onClick: logoutUser },
  ];

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
            sx={{ "&:focus": { outline: "none" } }}
          >
            <Avatar src='/broken-image.jpg' sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {menu.map((item) => (
          <MenuItem key={item.label} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
