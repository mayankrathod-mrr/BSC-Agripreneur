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
    // Main image is now strictly required
    mainImage: { 
      type: String, 
      required: true,
    },
    // Result image is completely optional with no default value
    afterImage: { 
      type: String, 
      required: false,
    },
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