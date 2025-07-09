import { Box, styled } from "@mui/material";
export const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
  padding-bottom: 1rem;
  box-sizing: border-box;
`;

export const StyledImage = styled("img")(({ theme }) => ({
  width: "99.9vw",
  maxHeight: 220,
  margin: "-2rem -10% 0 -9.4%",
  objectFit: "cover",

  [theme.breakpoints.down("desktop")]: {
    maxHeight: 180,
  },
  [theme.breakpoints.down("laptop")]: {
    maxHeight: 120,
  },
  [theme.breakpoints.down("tablet")]: {
    maxHeight: 80,
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "2.5rem",
  justifyContent: "space-between",
  flexGrow: 2,

  [theme.breakpoints.down("laptop")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));
