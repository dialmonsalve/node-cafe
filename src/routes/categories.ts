import { Router } from 'express';
import { check } from 'express-validator';

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/categories';
import { /*hasRole,**/ isAdminRole, validFields, validateJWT } from '../middlewares';
import { existCategoryById } from '../utilities/db-validators';


const router = Router();

// Get all categories - Public Rout
router.get('/', getCategories);

// Get category by Id - Public Rout
router.get('/:id', [
  check('id', 'There is no a valid id').isMongoId(),
  check('id').custom(existCategoryById),
  validFields
], getCategory);

// Create category - Private Rout whit valid token
router.post('/', [
  validateJWT,
  check('name', 'Field name is requerid').not().isEmpty(),
  validFields
], createCategory);

// Update category - Private Rout whit valid token
router.put('/:id', [
  validateJWT,
  check('id', 'There is no a valid id').isMongoId(),
  check('id').custom(existCategoryById),
  check('name', 'Field name is requerid').not().isEmpty(),
  validFields
], updateCategory);

// Delete category - Private Rout whit user admin
router.delete('/:id', [
  validateJWT,
  isAdminRole,
  // hasRole('ADMIN_ROLE'),
  check('id', 'There is no a valid id').isMongoId(),
  check('id').custom(existCategoryById),
  validFields
], deleteCategory);


export default router;