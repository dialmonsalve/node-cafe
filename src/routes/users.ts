import { Router } from 'express';
import { check } from 'express-validator';

import {
  deleteUsers,
  getUsers,
  patchUsers,
  postUsers,
  putUsers
} from '../controllers/users';

import { validFields } from '../middlewares/validFields';
import { emailExists, isValidRole, existUserById } from '../utilities/db-validators';

const router = Router();

router.get('/', getUsers);

router.post('/', [
  check('name', 'Field name is required').not().isEmpty(),
  check('password', 'Field password must be at least six characters').isLength({ min: 6 }),
  check('email', 'Field email is an email invalid').isEmail(),
  check('email').custom(emailExists),
  check('rol').custom(isValidRole),
  // check('rol', 'The rol is not a valid rol').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  validFields
], postUsers);

router.put('/:id',[
  check('id', 'There is no a valid id').isMongoId(),
  check('id').custom(existUserById),
  check('rol').custom(isValidRole),
  validFields
], putUsers);

router.patch('/:id', patchUsers);

router.delete('/:id',[
  check('id', 'There is no a valid id').isMongoId(),
  check('id').custom(existUserById),
  validFields
], deleteUsers);

export default router;