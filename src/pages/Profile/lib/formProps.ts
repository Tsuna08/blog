import * as yup from "yup";

import { requiredLabel } from "@/shared/constants/constants";

import { ProfileFormData } from "../types/profile";

export const schema = yup.object().shape({
  displayName: yup.string().required(requiredLabel),
  role: yup.string().required(requiredLabel),
});

export const defaultValues = {
  displayName: undefined,
  role: "user",
};

export const prepareFormValues = (data: ProfileFormData) => ({
  displayName: data.displayName,
  role: data.role,
});
