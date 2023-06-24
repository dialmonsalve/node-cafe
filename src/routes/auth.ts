import { Router } from 'express';
import { check } from 'express-validator';
import { googleSignIn, login } from '../controllers/auth';
import { validFields } from '../middlewares/validFields';

const router = Router();

router.post('/login', [
  check('email', 'Field email is requerid').isEmail(),
  check('password', 'Field password must be at least six characters').not().isEmpty(),
  validFields
], login);

router.post('/google', [
  check('id_token', 'Token is requerid').not().isEmpty(),
  validFields
], googleSignIn);





export default router;