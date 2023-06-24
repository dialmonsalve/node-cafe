import { Rol } from "./enums";
import { Request } from 'express';

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

export type Role = 'ADMIN_ROLE' | 'USER_ROLE' | 'SALE_ROLE'

interface AuthenticatedRequest extends Request {
  user?: IUser;
}