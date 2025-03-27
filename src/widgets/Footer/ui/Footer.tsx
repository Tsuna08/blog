import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { routers } from "@/app/routers";
import Logo from "@/shared/assets/Logo.svg";

import { footerLinks } from "../model/footer";
import { StyledBox, StyledCaption, StyledFooter, StyledLink } from "./Footer.module";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <StyledFooter>
      <Avatar component={Link} to={routers.root} alt='Logo' src={Logo} />
      <StyledBox>
        {footerLinks.map((item, index) => (
          <StyledLink key={index} variant='caption' onClick={() => navigate(item.link)}>
            {item.title}
          </StyledLink>
        ))}
      </StyledBox>
      <StyledCaption variant='caption'>
        ООО “Организация” 2020 - {new Date().getFullYear()}. Все права защищены
      </StyledCaption>
    </StyledFooter>
  );
};
