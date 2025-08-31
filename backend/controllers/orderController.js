// backend/controllers/orderController.js
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

// @desc    Create new order from cart
// @route   POST /api/orders/checkout
// @access  Private
const addOrderItems = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId }).populate('products.product');

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'No items in cart' });
    }

    // Create a new order object
    const order = new Order({
      user: userId,
      orderItems: cart.products.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        image: item.product.beforeImage,
        price: item.product.price,
        product: item.product._id,
      })),
      totalPrice: cart.products.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
    });

    const createdOrder = await order.save();
    
    // Clear the user's cart after the order is created
    await Cart.deleteOne({ user: userId });

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { addOrderItems, getMyOrders };