import { Typography } from "@mui/material";

import { StyledBox, StyledText } from "./About.module";

export const About = () => {
  return (
    <StyledBox>
      <StyledText>
        <Typography variant='h3' color='#5d71dd' fontWeight={600}>
          Blog
        </Typography>
        <Typography variant='h4'>
          — это система управления контентом, предназначенная для публикации статей и постов
        </Typography>
      </StyledText>
    </StyledBox>
  );
};
