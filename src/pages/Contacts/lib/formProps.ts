import * as yup from "yup";

import { requiredLabel } from "@/shared/constants/constants";

import { ContactFormData } from "../types/contacts";

export const schema = yup.object().shape({
  name: yup.string().required(requiredLabel),
  email: yup.string().required(requiredLabel),
  message: yup.string(),
});

export const defaultValues = {
  name: undefined,
  email: undefined,
  message: "",
};

export const prepareFormValues = (data: ContactFormData) => ({
  name: data.name,
  email: data.email,
  message: data.message,
});
