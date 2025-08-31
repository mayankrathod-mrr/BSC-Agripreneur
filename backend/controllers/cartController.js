// backend/controllers/cartController.js
import Cart from '../models/Cart.js';

// @desc    Add item to cart or update quantity
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
    // ... this function stays the same
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = await Cart.create({ user: userId, products: [] });
        }
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate(
            'products.product',
            'name price beforeImage' // Select which fields from the Product model to include
        );

        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (cart) {
            // Filter out the product to be removed
            cart.products = cart.products.filter(
                p => p.product.toString() !== productId
            );
            await cart.save();
            res.json({ message: 'Product removed from cart' });
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { addToCart, getCart, removeFromCart };