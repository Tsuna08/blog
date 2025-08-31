import * as yup from "yup";

import { Role } from "@/entities/User";
import { requiredLabel } from "@/shared/constants/constants";

import { ProfileFormData } from "../types/profile";

export const schema = yup.object().shape({
  displayName: yup.string().required(requiredLabel),
  role: yup.mixed<Role>().required(requiredLabel),
  ban: yup.boolean().required(),
});

export const defaultValues = {
  displayName: undefined,
  role: Role.USER,
  ban: false,
};

export const prepareFormValues = (data: ProfileFormData) => ({
  displayName: data.displayName,
  role: data.role,
  ban: data.ban,
});
