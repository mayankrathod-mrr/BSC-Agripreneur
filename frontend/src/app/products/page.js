import ProductCard from '@/components/ProductCard';

// 🔹 Fetch products from the backend API
async function getProducts(category) {
  try {
    // Build the API URL with optional category filter
    const url = category
      ? `http://localhost:5000/api/products?category=${category}`
      : 'http://localhost:5000/api/products';

    const res = await fetch(url, { cache: 'no-store' }); // Always fetch fresh data

    if (!res.ok) {
      console.error("API response was not ok:", res.status, res.statusText);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Fallback: return empty array on error
  }
}

// 🔹 Products Page (Server Component)
export default async function ProductsPage({ searchParams }) {
  // ✅ Fix for Next.js: Await searchParams before using
  const awaitedParams = await searchParams;
  const category = awaitedParams?.category || '';

  // Fetch products based on category
  const products = await getProducts(category);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-8 capitalize">
        {category ? category : "All Products"}
      </h1>

      {/* Product Grid / Empty State */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found for this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
