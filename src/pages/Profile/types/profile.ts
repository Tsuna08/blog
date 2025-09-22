import { Role } from "@/entities/User";

export interface ProfileFormData {
  displayName: string;
  role: Role;
  ban: boolean;
}
