// backend/controllers/productController.js
import Product from '../models/Product.js';

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getProductById = async (req, res) => {
    // ... function is unchanged
};

const createProduct = async (req, res) => {
  try {
    const { name, category, description, quantity, price } = req.body;
    
    // Default image paths
    let beforeImageUrl = '/placeholder.png'; 
    let afterImageUrl = '/placeholder.png';

    // Check if files were uploaded and assign their paths
    if (req.files) {
      if (req.files.beforeImage) {
        beforeImageUrl = req.files.beforeImage[0].path;
      }
      if (req.files.afterImage) {
        afterImageUrl = req.files.afterImage[0].path;
      }
    }
    
    const product = new Product({
      name,
      category,
      description,
      quantity,
      price,
      beforeImage: beforeImageUrl,
      afterImage: afterImageUrl,
      uploadedBy: req.user._id, 
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error); // This will log the detailed error to your backend terminal
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateProduct = async (req, res) => {
    // ... function is unchanged
};

const deleteProduct = async (req, res) => {
    // ... function is unchanged
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};