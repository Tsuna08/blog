import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { links } from "../model/admin";
import { StyledBox } from "./Admin.module";

export const Admin = () => {
  const navigate = useNavigate();

  return (
    <StyledBox>
      {links.map((item) => (
        <Card sx={{ width: 345 }} onClick={() => navigate(item.link)}>
          <CardActionArea>
            <CardMedia component='img' height='140' image={item.icon} alt={item.title} />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {item.title}
              </Typography>
              <Typography variant='body2' sx={{ color: "text.secondary" }}>
                {item.context}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </StyledBox>
  );
};
