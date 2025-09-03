// backend/controllers/productController.js
import Product from '../models/Product.js';

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Backend Error in getProducts:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Backend Error in getProductById:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, category, description, quantity, price } = req.body;
    let beforeImageUrl = '/placeholder.png'; 
    let afterImageUrl = '/placeholder.png';

    if (req.files) {
      if (req.files.beforeImage) {
        beforeImageUrl = req.files.beforeImage[0].path;
      }
      if (req.files.afterImage) {
        afterImageUrl = req.files.afterImage[0].path;
      }
    }
    
    const product = new Product({
      name, category, description, quantity, price,
      beforeImage: beforeImageUrl,
      afterImage: afterImageUrl,
      uploadedBy: req.user._id, 
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateProduct = async (req, res) => {
    // your updateProduct function
};

const deleteProduct = async (req, res) => {
    // your deleteProduct function
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};