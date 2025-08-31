import { Timestamp } from "firebase/firestore";

export interface IUser {
  id: string;
  uid: string;
  email: string | null;
  displayName: string | null;
  createdAt: Date | Timestamp;
  role: Role;
  ban: boolean;
}

export interface IUserRegister {
  email: string;
  password: string;
  displayName: string;
  role: Role;
  ban: boolean;
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
  SUPER_ADMIN = "super_admin",
}
