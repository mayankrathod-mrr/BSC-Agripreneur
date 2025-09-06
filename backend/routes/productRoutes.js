// backend/routes/productRoutes.js
import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../config/cloudinary.js';

// This middleware will process up to two file fields from our form
const cpUpload = upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'afterImage', maxCount: 1 }
]);

// The POST route uses cpUpload to create products with images
router.route('/').get(getProducts).post(protect, admin, cpUpload, createProduct);

// The PUT route now ALSO uses cpUpload to handle updating images
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, cpUpload, updateProduct) // <-- ADDED cpUpload HERE
  .delete(protect, admin, deleteProduct);

export default router;