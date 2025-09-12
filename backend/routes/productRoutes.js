import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview, // Make sure this is imported
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../config/cloudinary.js';

// This line is for debugging to prove the file is loading
console.log("✅ productRoutes.js file loaded successfully."); 

const cpUpload = upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'afterImage', maxCount: 1 }
]);

router.route('/').get(getProducts).post(protect, admin, cpUpload, createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, cpUpload, updateProduct)
  .delete(protect, admin, deleteProduct);

// === THIS IS THE ROUTE THAT WAS MISSING ===
// It tells the server what to do for POST /api/products/:id/reviews
router.route('/:id/reviews').post(protect, createProductReview);

export default router;

