import ProductCard from '@/components/ProductCard';

// This function fetches products based on a category
async function getProducts(category) {
  try {
    const url = category
      ? `http://localhost:5000/api/products?category=${encodeURIComponent(category)}`
      : 'http://localhost:5000/api/products';

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// The page component receives searchParams from the URL
export default async function ProductsPage({ searchParams }) {
  // ✅ Correct way (no await needed)
  const category = searchParams?.category || '';

  const products = await getProducts(category);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 capitalize">
        {category ? category : 'All Products'}
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found {category ? `in "${category}"` : ''}.
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
