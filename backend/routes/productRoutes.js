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

// This is the middleware that will process the files from the form
const cpUpload = upload.fields([
    { name: 'beforeImage', maxCount: 1 },
    { name: 'afterImage', maxCount: 1 }
]);

// We add 'admin' and 'cpUpload' middleware to the POST route.
// The order is important: first check if user is admin, then process files.
router.route('/').get(getProducts).post(protect, admin, cpUpload, createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;