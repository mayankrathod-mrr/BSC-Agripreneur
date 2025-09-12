import ProductCard from '@/components/ProductCard';
import SearchBox from '@/components/SearchBox'; // 🔍 Search input component

// 🔹 Fetch products by category and/or keyword
async function getProducts(category, keyword) {
  try {
    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (keyword) params.append("keyword", keyword);

    const res = await fetch(
      `http://localhost:5000/api/products?${params.toString()}`,
      { cache: "no-store" } // Always fetch fresh data
    );

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
  // ✅ Await searchParams (required in new Next.js)
  const awaitedParams = await searchParams;
  const category = awaitedParams?.category || "";
  const keyword = awaitedParams?.keyword || "";

  // Fetch products with filters
  const products = await getProducts(category, keyword);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-4 capitalize">
        {category ? category : "All Products"}
      </h1>

      {/* 🔍 Search Box */}
      <div className="max-w-md mx-auto mb-8">
        <SearchBox />
      </div>

      {/* Product Grid / Empty State */}
      {products.length === 0 ? (
        <p className="text-center text-white-500">
          No products found {keyword && `for "${keyword}"`}.
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
