import { Box, styled } from "@mui/material";

export const StyledShadowBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "1rem",
  boxShadow: "4px 8px 40px 0px #08186f33",
  width: "460px",
  borderRadius: "20px",
  padding: "3rem 2.5rem",

  "& form": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "0.5rem",
  },

  [theme.breakpoints.down("tablet")]: {
    width: "250px",
    padding: "2rem 1.5rem",
  },

  [theme.breakpoints.down("mobile")]: {
    width: "100%",
    padding: "2rem 1.5rem",
    borderRadius: 0,
    background: "#FFFFFF",
    boxShadow: "none",
  },
}));
