import { Card, CardContent, CardHeader, List, styled } from "@mui/material";

export const StyledList = styled(List)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(100px, auto);
  gap: 1rem;
  padding-top: 1rem;
  flex-shrink: 2;
`;

export const StyledCard = styled(Card)`
  border-radius: 10px;
  background: white;
  align-items: flex-start;
  box-shadow: 4px 8px 40px 0px rgba(8, 23, 111, 0.05);

  &:hover {
    box-shadow: 4px 8px 40px 0px #08186f33;
    cursor: pointer;
  }
`;

export const StyledHeader = styled(CardHeader)`
  padding: 0.8rem 1rem;
  .MuiCardHeader-content {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;

    span:nth-of-type(2) {
      flex-shrink: 0;
      color: #2f222266;
    }
  }
`;

export const StyledContent = styled(CardContent)`
  padding: 0 1rem;
  &:last-child {
    padding-bottom: 1rem;
  }

  p:nth-of-type(1) {
    margin-top: 0;
  }
`;
