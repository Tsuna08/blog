import { Timestamp } from "firebase/firestore";

export interface IUser {
  id: string;
  uid: string;
  email: string | null;
  displayName: string | null;
  createdAt: Date | Timestamp;
  role: string;
  ban: boolean;
}

export interface IUserRegister {
  email: string;
  password: string;
  displayName: string;
  role: string;
  ban: boolean;
}
