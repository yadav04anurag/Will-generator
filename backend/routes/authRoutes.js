import express from 'express';
import { register, login, toggleDarkMode, updateProfile, changePassword } from '../controllers/authController.js';
import auth from '../middleware/auth.js';
import { validateRegister, validateLogin } from '../middleware/validators.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.patch('/theme', auth, toggleDarkMode);
router.put('/profile', auth, updateProfile);
router.put('/password', auth, changePassword);

export default router;