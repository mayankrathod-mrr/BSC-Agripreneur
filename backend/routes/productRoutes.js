// backend/routes/productRoutes.js
import express from 'express';
const router = express.Router();
import { // <-- FIX
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'; // <-- FIX
import { protect } from '../middleware/authMiddleware.js'; // Let's also protect the create, update, delete routes

router.route('/').get(getProducts).post(protect, createProduct); // <-- Added 'protect' middleware
router
  .route('/:id')
  .get(getProductById)
  .put(protect, updateProduct) // <-- Added 'protect' middleware
  .delete(protect, deleteProduct); // <-- Added 'protect' middleware

export default router; // <-- FIX