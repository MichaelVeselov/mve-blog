import { Router } from 'express';
import { registerValidation, loginValidation } from '../utils/validations.js';
import handleValidationErrors from '../middleware/handleValidationErrors.js';

import {
  registration,
  login,
  getProfile,
} from '../controllers/AuthController.js';
import { checkAuth } from '../middleware/checkAuth.js';

const router = new Router();

router.post(
  '/register',
  registerValidation,
  handleValidationErrors,
  registration
);
router.post('/login', loginValidation, handleValidationErrors, login);
router.get('/profile', checkAuth, getProfile);

export default router;
