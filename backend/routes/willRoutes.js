import express from 'express';
import auth from '../middleware/auth.js';
import { validateWill } from '../middleware/validators.js';
import { createWill, getUserWills, getWillById, updateWill, deleteWill } from '../controllers/willController.js';

const router = express.Router();

router.post('/create', auth, validateWill, createWill);
router.get('/', auth, getUserWills);
router.get('/:willId', auth, getWillById);
router.put('/:willId', auth, validateWill, updateWill);
router.delete('/:willId', auth, deleteWill);

export default router;