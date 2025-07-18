import express from 'express';
import { legalAssistance } from '../controllers/aiController.js';
import auth from '../middleware/auth.js';

const router = express.Router();
router.post('/legal-assist', auth, legalAssistance);
export default router;