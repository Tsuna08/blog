import { MenuItem, OutlinedInputProps, SelectChangeEvent } from "@mui/material";
import { FC } from "react";

import { StyledSelect } from "./Select.module";

interface SelectProps extends Omit<OutlinedInputProps, "onChange"> {
  onChange: (event: SelectChangeEvent) => void;
  options?: { label: string; value: string }[];
}

export const Select: FC<SelectProps> = ({
  label = "",
  name = "",
  value = "",
  required = false,
  error = false,
  disabled = false,
  multiline = false,
  rows = 1,
  defaultValue,
  options,
  onChange,
  ...rest
}) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const stringEvent = {
      ...event,
      target: {
        ...event.target,
        value: String(event.target.value),
      },
    } as SelectChangeEvent;
    onChange(stringEvent);
  };

  return (
    <StyledSelect
      label={label}
      name={name}
      value={typeof value === "string" ? value : ""}
      defaultValue={
        typeof defaultValue === "string" || typeof defaultValue === "undefined" ? defaultValue : ""
      }
      required={required}
      error={error}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      onChange={handleChange}
      size='small'
      fullWidth
      {...rest}
    >
      {options?.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};
