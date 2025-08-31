// frontend/src/app/products/page.js
import ProductCard from '@/components/ProductCard';

// This is an async function to fetch data from our API
async function getProducts() {
  try {
    // We fetch from the backend API you built
    const res = await fetch('http://localhost:5000/api/products', {
      cache: 'no-store', // This ensures we get fresh data on every request
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    // In case of an error, we return an empty array
    return [];
  }
}


export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      
      {products.length === 0 ? (
        <p className="text-center">No products found. The admin needs to add some!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}