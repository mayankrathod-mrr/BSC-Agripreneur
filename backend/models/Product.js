import mongoose from 'mongoose';

// We create a separate schema for the reviews
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true, enum: ['seeds', 'fertilizers', 'pesticides'] },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    mainImage: { type: String, required: true },
    afterImage: { type: String, required: false },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    
    // === NEW FIELDS FOR REVIEWS ===
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    // ============================
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
