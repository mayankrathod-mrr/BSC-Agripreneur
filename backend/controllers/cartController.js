import Cart from '../models/Cart.js';

// @desc    Add item to cart or update quantity
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = await Cart.create({ user: userId, products: [] });
        }
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex > -1) {
            // If product exists, update its quantity
            cart.products[productIndex].quantity = quantity;
        } else {
            // Otherwise, add as a new product
            cart.products.push({ product: productId, quantity });
        }
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user's cart with full product details
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    try {
        // This .populate() is the key. It looks up the details for each product.
        const cart = await Cart.findOne({ user: req.user._id }).populate({
            path: 'products.product',
            model: 'Product',
            select: 'name price mainImage' // Explicitly ask for name, price, and mainImage
        });

        if (cart) {
            res.json(cart);
        } else {
            // If no cart exists, send back a valid empty cart structure
            res.json({ products: [] });
        }
    } catch (error) {
        console.error("Get Cart Error:", error);
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
            cart.products = cart.products.filter(
                p => p.product._id.toString() !== productId
            );
            await cart.save();
            // After removing, send back the updated cart
            const updatedCart = await Cart.findOne({ user: userId }).populate('products.product', 'name price mainImage');
            res.json(updatedCart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        console.error("Remove from Cart Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export { addToCart, getCart, removeFromCart };

