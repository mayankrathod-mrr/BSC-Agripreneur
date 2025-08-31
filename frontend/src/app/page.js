// frontend/src/app/page.js
import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';

async function getProducts() {
  try {
    const res = await fetch('http://localhost:5000/api/products', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch products for homepage:", error);
    return [];
  }
}

export default async function HomePage() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero Slider Section - It stays full-width */}
      <HeroSlider />

      <div className="container mx-auto px-4">
        {/* Categories Section */}
        <section className="text-center mb-16"> {/* Increased bottom margin */}
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Categories</h2> {/* Added dark text and more margin */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Added text-gray-800 to make the text visible */}
            <Link href="/products?category=seeds" className="bg-gray-100 p-8 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-gray-800">
              <h3 className="text-2xl font-semibold">Seeds</h3>
            </Link>
            <Link href="/products?category=fertilizers" className="bg-gray-100 p-8 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-gray-800">
              <h3 className="text-2xl font-semibold">Fertilizers</h3>
            </Link>
            <Link href="/products?category=pesticides" className="bg-gray-100 p-8 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-gray-800">
              <h3 className="text-2xl font-semibold">Pesticides</h3>
            </Link>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="mb-16"> {/* Increased bottom margin */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Products</h2> {/* Added dark text and more margin */}
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No featured products available at the moment.</p>
          )}
        </section>
      </div>
    </div>
  );
}