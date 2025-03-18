import * as yup from "yup";

import { requiredLabel } from "@/shared/constants/constants";

import { RegistrationFormData } from "../types/registration";

export const schema = yup.object().shape({
  login: yup.string().required(requiredLabel),
  password: yup.string().required(requiredLabel).min(6, "Минимальная длина пароля 6 символов"),
  displayName: yup.string().required(requiredLabel),
});

export const defaultValues = {
  login: undefined,
  password: undefined,
  displayName: undefined,
};

export const prepareFormValues = (data: RegistrationFormData) => ({
  login: data.login,
  password: data.password,
  displayName: data.displayName,
});
