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
    <div>
      {/* Full-width Hero Slider */}
      <HeroSlider />

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Categories Section */}
        <section className="text-center my-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-orang-800 mb-10">
            🌿 Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Seeds", link: "/products?category=seeds" },
              { name: "Fertilizers", link: "/products?category=fertilizers" },
              { name: "Pesticides", link: "/products?category=pesticides" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.link}
                className="bg-green-50 p-10 rounded-xl shadow-sm hover:shadow-lg 
                           hover:-translate-y-1 transition-all duration-300 
                           border border-green-100"
              >
                <h3 className="text-2xl font-semibold text-green-700">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-orang-800 mb-10">
             Featured Products
          </h2>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">
              No featured products available at the moment.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
