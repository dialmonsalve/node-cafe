import Role from '../models/role';
import User from '../models/user';

const isValidRole = async (rol = '') => {
  const rolExists = await Role.findOne({ rol });
  if (!rolExists) {
    throw new Error(`Role: ${rol}, does not exist in database`);
  }
}

const emailExists = async (email = '') => {
  
  // Verify exist email
  const emailExist = await User.findOne({ email })

  if (emailExist) {
    throw new Error(`The email: ${email}, is already registered`)
  };
}

const existUserById = async (id:string) => {
  
  // Verify exist email
  const existUser = await User.findById(id)

  if (!existUser) {
    throw new Error(`The user with id: ${id}, does not exist`)
  };
}


export {
  isValidRole,
  emailExists,
  existUserById
}