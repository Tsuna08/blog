import { Card, styled, Typography } from "@mui/material";

export const StyledCard = styled(Card)`
  max-width: 1040px;
  max-height: 280px;
  border-radius: 10px;
  background: white;
  align-items: flex-start;
  box-shadow: 4px 8px 40px 0px rgba(8, 23, 111, 0.05);

  &:hover {
    box-shadow: 4px 8px 40px 0px #08186f33;
  }
`;

export const StyledContent = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #2f222266;
`;
