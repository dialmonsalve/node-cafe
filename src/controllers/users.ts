import { type Request, Response } from "express";
import User from "../models/user";

const getUsers = (_req: Request, res: Response) => {

  res.json({
    "msg": 'get'
  });
}

const postUsers = async (req: Request, res: Response) => {


  const { body } = req;
  const user = new User(body);
  await user.save();

  res.json({
    user
  });
}

const putUsers = (req: Request, res: Response) => {

  const { id } = req.params

  res.status(201).json({
    "msg": 'post',
    id
  });
}

const patchUsers = (_req: Request, res: Response) => {

  res.json({
    "msg": 'patch'
  });
}

const deleteUsers = (_req: Request, res: Response) => {

  res.json({
    "msg": 'delete'
  });
}

export {
  deleteUsers,
  getUsers,
  patchUsers,
  postUsers,
  putUsers,
}