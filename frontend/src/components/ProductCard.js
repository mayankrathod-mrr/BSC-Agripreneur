// frontend/src/components/ProductCard.js
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link href={`/products/${product._id}`}>
          <div className="relative w-full h-48 bg-gray-200">
             <Image 
               src="/placeholder.png"
               alt={product.name}
               fill // The layout="fill" prop becomes just 'fill'
               className="object-cover" // objectFit is now a Tailwind class
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Helps with performance
/>
             {product.offer && product.offer.isOffer && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.offer.discountPercentage}% OFF
                </span>
             )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold truncate">{product.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{product.category}</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xl font-bold text-green-700">₹{product.price}</p>
            </div>
          </div>
      </Link>
    </div>
  );
};

export default ProductCard;