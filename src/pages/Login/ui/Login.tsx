import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  CircularProgress,
  Link,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { routers } from "@/app/routers";
import { useLoginUserMutation } from "@/entities/User";
import { Button, TextInput } from "@/shared/components";
import { getErrorMessage } from "@/shared/hooks/getErrorMessage";

import { defaultValues, schema } from "../lib/formProps";
import { LoginFormData } from "../types/login";
import { StyledBox } from "./Login.module";

export const Login: FC = () => {
  const navigate = useNavigate();
  const [loginUser, { data, isLoading, error }] = useLoginUserMutation();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<LoginFormData>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data: LoginFormData) => {
    loginUser({ email: data.login, password: data.password });
    reset();
  };

  const handleClose = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") return;

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
      setErrorMessage(getErrorMessage(error));
    }

    if (!error && !isLoading && data) {
      navigate(routers.root);
    }
  }, [error, isLoading, data]);

  return (
    <StyledBox>
      <Typography component='h1' variant='h5' sx={{ mb: 3 }}>
        Авторизация
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='login'
          control={control}
          render={({ field }) => (
            <TextInput
              label='Логин'
              required
              error={!!errors.login}
              helperText={errors.login ? errors.login.message : ""}
              {...register("login", { required: true })}
              {...field}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <TextInput
              label='Пароль'
              required
              error={!!errors.password}
              helperText={errors?.password?.message}
              type='password'
              {...register("password", { required: true })}
              {...field}
            />
          )}
        />
        <Button
          type='submit'
          fullWidth
          sx={{ mt: 4, mb: 3 }}
          endIcon={isLoading && <CircularProgress />}
          disabled={isLoading}
        >
          Войти
        </Button>
      </form>
      <Link sx={{ textDecoration: "none", color: "#5d71dd" }} href={routers.signup}>
        Регистрация
      </Link>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' variant='filled' sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </StyledBox>
  );
};
