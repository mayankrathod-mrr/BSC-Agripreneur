import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="group block rounded-xl border border-gray-200 shadow-md overflow-hidden bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative w-full h-52 bg-gray-100">
        <Image
          src={product.mainImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        <span className="inline-block text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded capitalize">
          {product.category}
        </span>

        <div className="flex items-center justify-between mt-2">
          <p className="text-2xl font-extrabold text-green-700">
            ₹{product.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
