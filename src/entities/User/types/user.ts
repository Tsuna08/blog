export interface IUser {
  id: string;
  uid: any;
  email: string | null;
  displayName?: string | null;
  createdAt?: Date | string;
  role?: string;
}

export interface IUserRegister {
  email: string;
  password: string;
  displayName?: string;
  role?: string;
}
