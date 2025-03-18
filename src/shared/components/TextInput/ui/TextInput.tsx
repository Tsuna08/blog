import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextFieldProps } from "@mui/material";
import { ChangeEvent, FC, MouseEvent, useState } from "react";

import { StyledTextInput } from "./TextInput.module";

interface InputProps extends Omit<TextFieldProps, "onChange"> {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: FC<InputProps> = ({
  label = "",
  name = "",
  value = "",
  required = false,
  type = "text",
  error = false,
  helperText = "",
  disabled = false,
  multiline = false,
  rows = 1,
  onChange,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <StyledTextInput
      label={label}
      name={name}
      value={value}
      required={required}
      type={showPassword ? "text" : type}
      error={error}
      helperText={helperText}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      onChange={onChange}
      size='small'
      fullWidth
      margin='dense'
      {...rest}
      slotProps={{
        input: {
          endAdornment: type === "password" && (
            <InputAdornment position='end'>
              <IconButton
                aria-label={showPassword ? "hide the password" : "display the password"}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
