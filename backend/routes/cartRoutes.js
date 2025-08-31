// backend/routes/cartRoutes.js
import express from 'express';
const router = express.Router();
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

// All these routes are for logged-in users only
router.route('/').get(protect, getCart);
router.route('/add').post(protect, addToCart);
router.route('/remove/:productId').delete(protect, removeFromCart);

export default router;