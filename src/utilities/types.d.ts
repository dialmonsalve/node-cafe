import { Rol } from "./enums";
import { Request } from 'express';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  img?: string;
  rol: Rol;
  status?: boolean;
  google?: boolean;
  password: string;
}

export type Role = 'ADMIN_ROLE' | 'USER_ROLE' | 'SALE_ROLE';

export interface ICategory {
  name?: string;
  status: boolean;
  user: IUser;
}

export interface IProduct {
  _id: string;
  name: string;
  status?: boolean;
  user: IUser;
  price?: number;
  category: ICategory;
  description: string;
  stock: boolean;
  img?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export interface IRoutes {
  users: string,
  auth: string,
  categories: string,
  products: string,
  search: string
}