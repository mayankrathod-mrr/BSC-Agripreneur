// backend/routes/authRoutes.js
import express from 'express';
const router = express.Router();
import { registerUser, loginUser } from '../controllers/authController.js'; // <-- FIX

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router; // <-- FIX