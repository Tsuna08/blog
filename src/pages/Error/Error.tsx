import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { routers } from "@/app/routers";
import Avatar from "@/shared/assets/Avatar.png";
import { Button } from "@/shared/components";

import { StyledBox } from "./Error.module";

export const Error = () => {
  const navigate = useNavigate();

  return (
    <StyledBox>
      <img srcSet={Avatar} src={Avatar} alt='Avatar' loading='lazy' />
      <Typography variant='h5'>Что-то пошло не так...</Typography>
      <Button
        variant='outlined'
        startIcon={<KeyboardArrowLeftIcon />}
        onClick={() => navigate(routers.root)}
      >
        Вернуться назад
      </Button>
    </StyledBox>
  );
};
