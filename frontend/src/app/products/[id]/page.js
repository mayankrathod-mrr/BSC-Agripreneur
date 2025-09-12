import Image from 'next/image';
import ProductActions from '@/components/ProductActions';
import StarRating from '@/components/StarRating'; 
import ProductReviews from '@/components/ProductReviews'; 

// Fetch product details
async function getProductDetails(id) {
    try {
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

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Image Showcase Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center">Product Showcase</h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 text-center">
                            <h3 className="text-lg font-semibold mb-2">Main Image</h3>
                            <div className="relative w-full h-80 border rounded-lg overflow-hidden">
                                <Image
                                    src={product.mainImage}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="50vw"
                                    priority
                                />
                            </div>
                        </div>
                        {product.afterImage && (
                            <div className="flex-1 text-center">
                                <h3 className="text-lg font-semibold mb-2">Result Image</h3>
                                <div className="relative w-full h-80 border rounded-lg overflow-hidden">
                                    <Image
                                        src={product.afterImage}
                                        alt="Result of product usage"
                                        fill
                                        className="object-cover"
                                        sizes="50vw"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">{product.name}</h1>

                    {/* ⭐ STAR RATING VERTICALLY (Y-AXIS) ⭐ */}
                    <div className="flex flex-col items-start gap-1">
                        <div>
                            <StarRating rating={product.rating} numReviews={product.numReviews} />
                        </div>
                        <span className="text-sm text-gray-600">
                            ({product.numReviews} reviews)
                        </span>
                    </div>

                    <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded capitalize">
                        {product.category}
                    </span>
                    <p className="text-gray-600 text-lg">{product.description}</p>
                    <p className="text-3xl font-bold text-green-700">₹{product.price}</p>
                    <p className="text-md">
                        <span className="font-semibold">Stock:</span>{" "}
                        {product.quantity > 0
                            ? `${product.quantity} units available`
                            : "Out of Stock"}
                    </p>

                    <ProductActions product={product} />
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-16">
                <ProductReviews product={product} />
            </div>
        </div>
    );
}
