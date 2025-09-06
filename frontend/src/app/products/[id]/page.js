import Image from "next/image";
import ProductActions from "@/components/ProductActions";

async function getProductDetails(id) {
  try {
    const res = await fetch(`http://127.0.0.1:5000/api/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductDetails(id);

  if (!product) {
    return (
      <div className="text-center py-24 text-xl font-semibold text-gray-700">
        ❌ Product not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Product Showcase
          </h2>
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Main Image */}
            <div className="flex-1 text-center">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Main Image
              </h3>
              <div className="relative w-full h-80 border rounded-xl overflow-hidden shadow-md">
                <Image
                  src={product.mainImage}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="50vw"
                  priority
                />
              </div>
            </div>

            {/* Result Image */}
            {product.afterImage && (
              <div className="flex-1 text-center">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  Result Image
                </h3>
                <div className="relative w-full h-80 border rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={product.afterImage}
                    alt="Result of product usage"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="50vw"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

          <span className="inline-block text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full capitalize shadow-sm">
            {product.category}
          </span>

          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          <p className="text-3xl font-extrabold text-green-700">
            ₹{product.price}
          </p>

          <p className="text-md text-gray-700">
            <span className="font-semibold">Stock:</span>{" "}
            {product.quantity > 0 ? (
              <span className="text-green-600 font-medium">
                {product.quantity} units available
              </span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </p>

          {/* Actions (Add to Cart / Buy) */}
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
}
