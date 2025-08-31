// backend/controllers/productController.js
import Product from '../models/Product.js'; // <-- FIX

const getProducts = async (req, res) => {
    //... function code is the same
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getProductById = async (req, res) => {
    //... function code is the same
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
    //... function code is the same
    try {
        const product = new Product({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price,
            offer: req.body.offer,
            beforeImage: '/images/sample_before.jpg',
            afterImage: '/images/sample_after.jpg',   
            uploadedBy: req.user._id, // Assumes user is authenticated
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateProduct = async (req, res) => {
    //... function code is the same
    const { name, price, description, quantity, category } = req.body;
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.quantity = quantity || product.quantity;
            product.category = category || product.category;
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
    //... function code is the same
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { // <-- FIX
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};