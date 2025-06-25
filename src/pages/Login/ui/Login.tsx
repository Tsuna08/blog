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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/app/providers/AuthProvider";
import { routers } from "@/app/routers";
import { RootState } from "@/app/store/store";
import { Button, TextInput } from "@/shared/components";

import { defaultValues, schema } from "../lib/formProps";
import { LoginFormData } from "../types/login";
import { StyledBox } from "./Login.module";

export const Login: FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { user, error, loading } = useSelector((state: RootState) => state.users);

  const [open, setOpen] = useState(false);

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
    login(data.login, data.password);
    reset();
  };

  const handleClose = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") return;

    setOpen(false);
  };

  useEffect(() => {
    if (error) setOpen(true);

    if (!error && !loading && user) {
      navigate(routers.root);
    }
  }, [error, loading, user]);

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
          endIcon={loading && <CircularProgress />}
          disabled={loading}
        >
          Войти
        </Button>
      </form>
      <Link sx={{ textDecoration: "none", color: "#5d71dd" }} href={routers.signup}>
        Регистрация
      </Link>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' variant='filled' sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </StyledBox>
  );
};
