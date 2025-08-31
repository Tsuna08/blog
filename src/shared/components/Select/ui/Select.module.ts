import { Select, styled } from "@mui/material";

export const StyledSelect = styled(Select)`
  background: rgb(240, 240, 240);
  border-radius: 0.9rem;
  border: none;

  &:hover {
    background: rgb(235, 235, 235);
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: transparent !important;
  }

  .MuiFormLabel-root {
    font-weight: 400;
    font-size: 0.9rem;
    color: #2f222266;
  }

  .Mui-focused {
    color: #2f2222 !important;
  }
`;
