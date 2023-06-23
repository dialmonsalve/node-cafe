import { Router } from 'express';

import {
  deleteUsers,
  getUsers,
  patchUsers,
  postUsers,
  putUsers
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.post('/', postUsers);

router.patch('/:id', patchUsers);

router.put('/:id', putUsers);

router.delete('/', deleteUsers);

export default router;