// frontend/src/app/products/[id]/page.js
import Image from 'next/image';
import ProductActions from '@/components/ProductActions'; // <-- The button component

// This is a Server Component that fetches data
async function getProductDetails(id) {
    try {
        // It fetches directly from the backend
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
            cache: 'no-store',
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Error fetching on server:", error);
        return null;
    }
}

export default async function ProductDetailPage({ params }) {
    const { id } = await params;
    const product = await getProductDetails(id);

    if (!product) {
        return <div className="text-center py-24 text-xl font-semibold">Product not found.</div>;
    }

    // The page renders instantly with the data. No loading state needed.
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center">Product Showcase</h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 text-center">
                            <h3 className="text-lg font-semibold mb-2">Main Image</h3>
                            <div className="relative w-full h-80 border rounded-lg overflow-hidden">
                                <Image src={product.beforeImage} alt={product.name} fill className="object-cover" sizes="50vw" priority />
                            </div>
                        </div>
                        <div className="flex-1 text-center">
                            <h3 className="text-lg font-semibold mb-2">Result Image</h3>
                            <div className="relative w-full h-80 border rounded-lg overflow-hidden">
                                <Image src={product.afterImage} alt="Result of product usage" fill className="object-cover" sizes="50vw" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">{product.name}</h1>
                    <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded capitalize">{product.category}</span>
                    <p className="text-gray-600 text-lg">{product.description}</p>
                    <p className="text-3xl font-bold text-green-700">₹{product.price}</p>
                    <p className="text-md"><span className="font-semibold">Stock:</span> {product.quantity > 0 ? `${product.quantity} units available` : 'Out of Stock'}</p>
                    
                    {/* The interactive button is handled by its own component */}
                    <ProductActions product={product} />
                </div>
            </div>
        </div>
    );
}