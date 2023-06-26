
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import { User } from '../models';
import { generateJWT } from '../utilities/generateJWT';
import { googleVerify } from '../utilities/google-verify';

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

const googleSignIn = async (req: Request, res: Response) => {

  const { id_token } = req.body;

  try {
    const { name, img, email } = await googleVerify(id_token);

    let user = await User.findOne({ email })

    if (!user) {
      // Create user
      const data = {
        name,
        email,
        password: ':P',
        img,
        google: true
      };

      user = new User(data);
      await user.save();
    }

    // if User in db is eliminated
    if (!user.status) {
      return res.status(401).json({
        msg: 'Something wrong, Speak whit user admin. User is blocked'
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
    return res.status(400).json({
      ok: false,
      msg: 'Token cannot be verified'
    });
  }



}

export {
  login,
  googleSignIn
}