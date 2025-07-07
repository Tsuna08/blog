import { Box, styled } from "@mui/material";

export const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  height: "100%",
  gap: "1rem",

  [theme.breakpoints.down("tablet")]: {
    flexDirection: "column",
  },
}));

export const StyledContact = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & svg {
    width: 1.3rem;

    path {
      fill: #5d71dd;
    }
  }

  & h6 {
    color: #5d71dd;
  }
`;

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "1rem",
  boxShadow: "4px 8px 40px 0px #08186f33",
  width: "360px",
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
