import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress, MenuItem, Select, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { Timestamp } from "firebase/firestore";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useAuth } from "@/app/providers/AuthProvider";
import { IUser, useGetUserByIdQuery, useUpdateUserMutation } from "@/entities/User";
import { Button, TextInput } from "@/shared/components";
import { convertFromTimestamp } from "@/shared/hooks/getDate";

import { defaultValues, schema } from "../lib/formProps";
import { ProfileFormData } from "../types/profile";
import { StyledShadowBox } from "./Profile.module";

export const Profile: FC = () => {
  const { isSuperAdmin, isAdmin } = useAuth();

  const { id } = useParams();

  const { data: user, isLoading } = useGetUserByIdQuery(id ?? skipToken);
  const [updateUser] = useUpdateUserMutation();

  const { handleSubmit, control, reset } = useForm<ProfileFormData>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ProfileFormData> = (data: ProfileFormData) => {
    updateUser({ ...user, displayName: data.displayName, role: data.role } as IUser);
    reset();
  };

  useEffect(() => {
    if (user) {
      reset(user as ProfileFormData);
    }
  }, [user, reset]);

  return (
    <>
      <Typography component='h1' variant='h5' sx={{ mb: 3 }}>
        Мои данные
      </Typography>
      <StyledShadowBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='displayName'
            control={control}
            render={({ field }) => <TextInput label='Никнейм' required {...field} />}
          />
          {(isSuperAdmin || isAdmin) && (
            <Controller
              name='role'
              control={control}
              render={({ field }) => (
                <Select label='Роль' required disabled={!isSuperAdmin} {...field}>
                  <MenuItem value='user'>Пользователь</MenuItem>
                  <MenuItem value='admin'>Администратор</MenuItem>
                </Select>
              )}
            />
          )}
          {user && (
            <>
              <Typography sx={{ color: "#2F222266", fontWeight: 400, fontSize: "0.75rem" }}>
                Email
              </Typography>
              <Typography variant='subtitle1' sx={{ color: "#2F222266" }}>
                {user.email}
              </Typography>

              <Typography sx={{ color: "#2F222266", fontWeight: 400, fontSize: "0.75rem" }}>
                Дата регистрации
              </Typography>
              <Typography variant='subtitle1' sx={{ color: "#2F222266" }}>
                {convertFromTimestamp(user.createdAt as Timestamp)}
              </Typography>
            </>
          )}
          <Button
            type='submit'
            fullWidth
            sx={{ mt: 4, mb: 3 }}
            endIcon={isLoading && <CircularProgress />}
            disabled={isLoading}
          >
            Сохранить
          </Button>
        </form>
      </StyledShadowBox>
    </>
  );
};
