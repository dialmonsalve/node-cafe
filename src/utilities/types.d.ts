import { Rol } from "./enums";

export interface IUser {
  // id: string;
  name: string;
  email: string;
  img: string;
  rol: Rol;
  status: boolean;
  google: boolean;
  password: string;
}

export type Role = 'ADMIN_ROLE' | 'USER_ROLE'
