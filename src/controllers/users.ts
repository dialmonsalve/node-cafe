import { type Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import { User } from '../models';
import { IUser } from '../utilities/types';

const getUsers = async (req: Request, res: Response) => {

  const { limit = 5, from = 0 } = req.query;

  const [total, users] = await Promise.all([
    User.countDocuments({ status: true }),
    User.find({ status: true })
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    total,
    users
  });
}

const postUsers = async (req: Request, res: Response) => {

  const { name, email, password, rol }: IUser = req.body;
  const user = new User({ name, email: email.toLowerCase(), password, rol });

  // Crypt the password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save on db
  await user.save();

  return res.status(201).json({ user });
}

const putUsers = async (req: Request, res: Response) => {

  const { id } = req.params;
  const { _id, password, google, email, ...spread } = req.body;

  if (password) {
    // Crypt the password
    const salt = bcryptjs.genSaltSync();
    spread.password = bcryptjs.hashSync(password, salt);
  };

  const user = await User.findByIdAndUpdate(id, spread, { new: true })

  return res.json(user);
}

const patchUsers = (_req: Request, res: Response) => {

  res.json({
    "msg": 'patch'
  });
}

const deleteUsers = async (req: Request, res: Response) => {

  const { id } = req.params;

  // Delete on database
  // const user = await User.findByIdAndDelete(id)

  // Logic Delete
  const user = await User.findByIdAndUpdate(id, { status: false, new: true });

  res.json(user);
}

export {
  deleteUsers,
  getUsers,
  patchUsers,
  postUsers,
  putUsers,
}