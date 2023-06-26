import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models';
import { AuthenticatedRequest } from '../utilities/types';

const validateJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'There is no token in the request'
    })
  }

  try {

    const { uid }: any = jwt.verify(token, process.env.SECRETOPRIVATEKEY!)

    const user = await User.findById(uid);

    // Verify if user exists
    if (!user) {
      return res.status(401).json({
        msg: 'Token no valid'
      })
    }

    // Verify if user is not deleted
    if (!user.status) {
      return res.status(401).json({
        msg: 'Token no valid'
      })
    }

    req.user = user;

    next();

    return;

  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: 'Token no valid'
    })
  }
}

export {
  validateJWT
}