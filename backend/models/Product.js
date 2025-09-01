// backend/models/Product.js
import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['seeds', 'fertilizers', 'pesticides'],
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    offer: {
      isOffer: { type: Boolean, default: false },
      discountPercentage: { type: Number, default: 0 },
    },
    // --- CHANGES ARE HERE ---
    beforeImage: { 
      type: String, 
      required: false, // No longer required
      default: '/placeholder.png' // Default image if none is provided
    },
    afterImage: { 
      type: String, 
      required: false, // No longer required
      default: '/placeholder.png' // Default image if none is provided
    },
    // -------------------------
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;