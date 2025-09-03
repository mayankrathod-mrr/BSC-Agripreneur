// frontend/src/app/products/page.js
import ProductCard from '@/components/ProductCard';

// This is a Server Component, so it can be async
async function getProducts() {
  try {
    const res = await fetch('http://localhost:5000/api/products', {
      cache: 'no-store', // This ensures we get fresh data on every request
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return an empty array on error
  }
}


export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      
      {products.length === 0 ? (
        <p className="text-center">No products found.</p>
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