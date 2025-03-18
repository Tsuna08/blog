import * as yup from "yup";

import { requiredLabel } from "@/shared/constants/constants";

import { LoginFormData } from "../types/login";

export const schema = yup.object().shape({
  login: yup.string().required(requiredLabel),
  password: yup.string().required(requiredLabel),
});

export const defaultValues = {
  login: undefined,
  password: undefined,
};

export const prepareFormValues = (data: LoginFormData) => ({
  login: data.login,
  password: data.password,
});
