import { Box, styled } from "@mui/material";

export const StyledImage = styled("img")`
  width: 100%;
  max-height: 190px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
`;

export const StyledArticle = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "8rem",

  [theme.breakpoints.down("laptop")]: {
    flexDirection: "column",
    gap: "1rem",
  },
}));

export const StyledInfo = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
