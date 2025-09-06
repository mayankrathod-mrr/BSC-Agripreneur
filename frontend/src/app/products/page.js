// frontend/src/app/products/page.js

import ProductCard from "@/components/ProductCard";

// Fetch products from backend
async function getProducts() {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/products", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Title */}
      <h1
        className="text-4xl font-extrabold text-center mb-10 
                   text-white drop-shadow-lg"
      >
        🌱 Our Products
      </h1>

      {products.length === 0 ? (
        // Empty state
        <div className="text-center py-20 text-gray-600">
          <p className="text-lg">No products available at the moment.</p>
          <p className="text-sm mt-2">Please check back later!</p>
        </div>
      ) : (
        // Product Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
