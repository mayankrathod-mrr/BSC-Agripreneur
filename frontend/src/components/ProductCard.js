// frontend/src/components/ProductCard.js
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="block border border-green-100 rounded-xl shadow-md overflow-hidden 
                 transition-transform duration-300 hover:scale-105 hover:shadow-xl 
                 bg-white group"
    >
      {/* Image Section */}
      <div className="relative w-full h-48 bg-green-50">
        <Image
          src={product.beforeImage}
          alt={product.name}
          fill
          className="object-cover group-hover:opacity-90 transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {product.offer && product.offer.isOffer && (
          <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
            {product.offer.discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-green-800">
          {product.name}
        </h3>
        <p className="text-sm text-green-600 capitalize">{product.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xl font-bold text-green-700">₹{product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
