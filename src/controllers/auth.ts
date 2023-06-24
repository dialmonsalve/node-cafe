
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import User from '../models/user';
import { generateJWT } from '../utilities/generateJWT';

const login = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  try {

    // Verify if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'User / Password are incorrect'
      });
    }

    // Verify if user is active
    if (!user.status) {
      return res.status(400).json({
        msg: 'User / Password are incorrect'
      });
    }

    // Verify password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User / Password are incorrect'
      });
    }

    // Generate a JWT
    const token = await generateJWT(user.id)
    return res.json({
      user,
      token
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something is wrong, consult to admin'
    })
  }
}

export {
  login
}