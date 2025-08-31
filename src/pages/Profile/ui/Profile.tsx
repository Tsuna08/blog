import { yupResolver } from "@hookform/resolvers/yup";
import BlockIcon from "@mui/icons-material/Block";
import { Box, Checkbox, CircularProgress, FormControlLabel, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { Timestamp } from "firebase/firestore";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useAuth } from "@/app/providers/AuthProvider";
import { Role, useGetUserByIdQuery, useUpdateUserMutation } from "@/entities/User";
import { Button, Select, TextField, TextInput } from "@/shared/components";
import { convertFromTimestamp } from "@/shared/hooks/getDate";

import { defaultValues, schema } from "../lib/formProps";
import { RolesList } from "../lib/profile";
import { ProfileFormData } from "../types/profile";
import { StyledShadowBox } from "./Profile.module";

export const Profile: FC = () => {
  const { isSuperAdmin } = useAuth();

  const { id } = useParams();

  const { data: user } = useGetUserByIdQuery(id ?? skipToken);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ProfileFormData> = (data: ProfileFormData) => {
    if (!user?.id) return;

    updateUser({ ...user, displayName: data.displayName, role: data.role, ban: data.ban });
  };

  useEffect(() => {
    if (user) {
      reset({
        displayName: user.displayName ?? "",
        role: user.role ?? Role.USER,
        ban: user.ban ?? false,
      });
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
            render={({ field }) => (
              <TextInput
                label='Никнейм'
                required
                error={!!errors.displayName}
                helperText={errors.displayName ? errors.displayName.message : ""}
                {...field}
              />
            )}
          />
          {isSuperAdmin ? (
            <Controller
              name='role'
              control={control}
              render={({ field }) => (
                <Select label='Роль' required options={RolesList} {...field}></Select>
              )}
            />
          ) : (
            <TextField label='Роль' value={user?.role ?? ""} />
          )}
          {user && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", ml: 1, mt: 1 }}>
              <TextField label='Email' value={user.email} />
              <TextField
                label='Дата регистрации'
                value={convertFromTimestamp(user.createdAt as Timestamp)}
              />
            </Box>
          )}
          <Controller
            name='ban'
            control={control}
            render={({ field }) => (
              <FormControlLabel
                label={field.value ? "Разблокировать" : "Заблокировать"}
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "left",
                  ml: 1,
                  gap: "0.5rem",
                }}
                control={
                  <Checkbox
                    icon={<BlockIcon sx={field?.value ? { fill: "red" } : {}} />}
                    checkedIcon={<BlockIcon sx={{ fill: "red" }} />}
                    {...field}
                  />
                }
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
            Сохранить
          </Button>
        </form>
      </StyledShadowBox>
    </>
  );
};
