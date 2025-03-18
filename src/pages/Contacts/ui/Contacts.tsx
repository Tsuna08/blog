import { yupResolver } from "@hookform/resolvers/yup";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import { Avatar, Box, Typography } from "@mui/material";
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Arrow from "@/shared/assets/arrow.svg";
import { Button, TextInput, Title } from "@/shared/components";

import { defaultValues, schema } from "../lib/formProps";
import { socialNetworks } from "../model/contacts";
import { ContactFormData } from "../types/contacts";
import { StyledBox, StyledContact, StyledContainer } from "./Contacts.module";

export const Contacts: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ContactFormData>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ContactFormData> = (data: ContactFormData) => {
    console.log("data: ", data);
    reset();
  };

  return (
    <StyledContainer>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Title>Контактная информация</Title>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <StyledContact>
            <PhoneIcon />
            <Typography variant='subtitle2'>+7 (987) 887-87</Typography>
          </StyledContact>
          <StyledContact>
            <PlaceIcon />
            <Typography variant='subtitle2'>г. Санкт-Петербург, ул. Ленина, 9</Typography>
          </StyledContact>
        </Box>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          {socialNetworks.map((item, index) => (
            <Avatar key={index} component={Link} to={item.link} alt={item.title} src={item.icon} />
          ))}
        </Box>
      </Box>
      <StyledBox>
        <Title>Напишите нам</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <TextInput
                label='Ваше имя'
                error={!!errors.name}
                helperText={errors?.name?.message}
                {...register("name", { required: true })}
                {...field}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextInput
                label='Email'
                error={!!errors.email}
                helperText={errors?.email?.message}
                type='text'
                {...register("email", { required: true })}
                {...field}
              />
            )}
          />
          <Controller
            name='message'
            control={control}
            render={({ field }) => (
              <TextInput
                label='Сообщение'
                error={!!errors.message}
                helperText={errors?.message?.message}
                rows={3}
                multiline
                type='text'
                {...register("message")}
                {...field}
              />
            )}
          />
          <Button
            type='submit'
            fullWidth
            sx={{ mt: 2 }}
            endIcon={<img height={15} src={Arrow} alt='Arrow' />}
          >
            Отправить
          </Button>
        </form>
      </StyledBox>
    </StyledContainer>
  );
};
