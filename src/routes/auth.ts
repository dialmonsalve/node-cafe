import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth';
import { validFields } from '../middlewares/validFields';

const router = Router();

router.post('/login', [
  check('email', 'Field email is requerid').isEmail(),
  check('password', 'Field password must be at least six characters').not().isEmpty(),
  validFields
], login);

// router.post('/', (req:Request, res:Response)=>{

// });



export default router;