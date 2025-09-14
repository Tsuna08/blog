import { yupResolver } from "@hookform/resolvers/yup";
import BlockIcon from "@mui/icons-material/Block";
import { Box, Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { Timestamp } from "firebase/firestore";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useAuth } from "@/app/providers/AuthProvider";
import { Role, useGetUserByIdQuery, useUpdateUserMutation } from "@/entities/User";
import { getUserRole } from "@/entities/User/helpers/getUserRole";
import { Header } from "@/features/Header";
import {
  Button,
  ColumnBox,
  Loader,
  Select,
  TextField,
  TextInput,
  Title,
} from "@/shared/components";
import { convertFromTimestamp } from "@/shared/hooks/getDate";

import { defaultValues, schema } from "../lib/formProps";
import { RolesList } from "../lib/profile";
import { ProfileFormData } from "../types/profile";
import { StyledShadowBox } from "./Profile.module";

export const Profile: FC = () => {
  const { isSuperAdmin, isAdmin, user: userData } = useAuth();

  const { id } = useParams();

  const { data: user, isLoading } = useGetUserByIdQuery(id ?? skipToken);
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();

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
    <ColumnBox>
      {isSuperAdmin || isAdmin ? <Header>Профиль пользователя</Header> : <Title>Мои данные</Title>}
      <StyledShadowBox>
        {isLoading ? (
          <Loader />
        ) : (
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
            {isSuperAdmin && userData?.uid !== user?.uid && (
              <Controller
                name='role'
                control={control}
                render={({ field }) => (
                  <Select label='Роль' required options={RolesList} {...field}></Select>
                )}
              />
            )}
            {user && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", ml: 1, mt: 1 }}>
                {userData?.uid === user?.uid && (
                  <TextField label='Роль' value={getUserRole(user?.role) ?? ""} />
                )}
                <TextField label='Email' value={user.email} />
                <TextField
                  label='Дата регистрации'
                  value={convertFromTimestamp(user.createdAt as Timestamp)}
                />
              </Box>
            )}
            {userData?.uid !== user?.uid && (
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
            )}

            <Button
              type='submit'
              fullWidth
              sx={{ mt: 4, mb: 3 }}
              endIcon={isUpdateLoading && <CircularProgress />}
              disabled={isUpdateLoading}
            >
              Сохранить
            </Button>
          </form>
        )}
      </StyledShadowBox>
    </ColumnBox>
  );
};
