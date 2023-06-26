import { Router } from 'express';
import { check } from 'express-validator';

import {
  createProduct,
  deleteProduct,
  getProducts,
  getProduct,
  updateProduct,
} from '../controllers/products';
import { /*hasRole,**/ isAdminRole, validFields, validateJWT } from '../middlewares';
import { existCategoryById, existProductById, existProductByName } from '../utilities/db-validators';


const router = Router();

// Get all categories - Public Rout
router.get('/', getProducts);

// Get category by Id - Public Rout
router.get('/:id', [
  check('id', 'There is no a valid id').isMongoId(),
  check('id').custom(existProductById),
  validFields
], getProduct);

// Create category - Private Rout whit valid token
router.post('/', [
  validateJWT,
  // check('id').custom(existProductById),
  check('name', 'Field name is requerid').not().isEmpty(),
  check('category', 'There is no a valid id').isMongoId(),
  check('category').custom(existCategoryById),
  check('name').custom((value: string) => existProductByName(value)),
  validFields
], createProduct);

// Update category - Private Rout whit valid token
router.put('/:id', [
  validateJWT,
  check('id', 'There is no a valid id').isMongoId(),
  check('id').custom(existProductById),
  validFields
], updateProduct);

// Delete category - Private Rout whit user admin
router.delete('/:id', [
  validateJWT,
  isAdminRole,
  // hasRole('ADMIN_ROLE'),
  check('id', 'There is no a valid id').isMongoId(),
  check('id').custom(existProductById),
  validFields
], deleteProduct);


export default router;