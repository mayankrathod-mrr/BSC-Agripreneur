import Product from '../models/Product.js';
import { v2 as cloudinary } from 'cloudinary';

// Helper function to get the public ID from a full Cloudinary URL
const getPublicIdFromUrl = (url) => {
    try {
        if (!url || !url.includes('cloudinary')) return null;
        const parts = url.split('/');
        const publicIdWithFolder = parts.slice(-2).join('/').split('.')[0];
        return publicIdWithFolder;
    } catch (error) {
        console.error("Could not extract public_id from URL:", url);
        return null;
    }
};

const getProducts = async (req, res) => {
  try {
    const category = req.query.category ? { category: req.query.category } : {};
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    const products = await Product.find({ ...category, ...keyword }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
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
    res.status(500).json({ message: 'Server Error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, category, description, quantity, price } = req.body;
    if (!req.files || !req.files.mainImage) {
        return res.status(400).json({ message: 'Please upload the main product image.' });
    }
    const productData = {
        name, category, description, quantity, price,
        mainImage: req.files.mainImage[0].path,
        uploadedBy: req.user._id,
    };
    if (req.files.afterImage) {
      productData.afterImage = req.files.afterImage[0].path;
    }
    const product = new Product(productData);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, description, quantity, category } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.quantity = quantity || product.quantity;
      product.category = category || product.category;
      if (req.files) {
        if (req.files.mainImage) {
          const oldPublicId = getPublicIdFromUrl(product.mainImage);
          if (oldPublicId) await cloudinary.uploader.destroy(oldPublicId);
          product.mainImage = req.files.mainImage[0].path;
        }
        if (req.files.afterImage) {
          if(product.afterImage) {
            const oldPublicId = getPublicIdFromUrl(product.afterImage);
            if (oldPublicId) await cloudinary.uploader.destroy(oldPublicId);
          }
          product.afterImage = req.files.afterImage[0].path;
        }
      }
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      if (product.mainImage) {
        const publicId = getPublicIdFromUrl(product.mainImage);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
      if (product.afterImage) {
        const publicId = getPublicIdFromUrl(product.afterImage);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;
  if (!rating || !comment) {
    return res.status(400).json({ message: 'Please provide rating and comment' });
  }
  
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'You have already reviewed this product' });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error("Create Review Error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};

