import { User, Role, Category, Product } from '../models';

const isValidRole = async (rol = '') => {
  const rolExists = await Role.findOne({ rol });
  if (!rolExists) {
    throw new Error(`Role: ${rol}, does not exist in database`);
  }
}

const emailExists = async (email = '') => {

  // Verify exist email
  const emailExist = await User.findOne({ email: email.toLowerCase() })

  if (emailExist) {
    throw new Error(`The email: ${email}, is already registered`)
  };
}

const existUserById = async (id: string) => {

  // Verify exist email
  const existUser = await User.findById(id)

  if (!existUser) {
    throw new Error(`The user with id: ${id}, does not exist`)
  };
}

const existCategoryById = async (id: string) => {

  const existCategory = await Category.findById(id)

  if (!existCategory) {
    throw new Error(`The category with id: ${id}, does not exist`)
  }

}

const existProductById = async (id: string) => {

  const existProduct = await Product.findById(id)

  if (!existProduct) {
    throw new Error(`The category with id: ${id}, does not exist`)
  }

}

const existProductByName = async (name = '') => {

  // Verify exist product name
  const nameExist = await Product.findOne({ name: name.toUpperCase() })

  console.log(nameExist);


  if (nameExist) {
    throw new Error(`The product: ${name}, is already registered`)
  };
}


export {
  isValidRole,
  emailExists,
  existUserById,
  existCategoryById,
  existProductById,
  existProductByName
}