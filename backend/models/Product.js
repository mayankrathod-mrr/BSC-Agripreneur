// backend/models/Product.js
import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true, enum: ['seeds', 'fertilizers', 'pesticides'] },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    offer: {
      isOffer: { type: Boolean, default: false },
      discountPercentage: { type: Number, default: 0 },
    },
    beforeImage: { type: String, required: true },
    afterImage: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product; // <-- FIX IS HERE