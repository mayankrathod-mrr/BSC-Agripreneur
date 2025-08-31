// frontend/src/app/products/[id]/page.js
"use client";

import { useState, useEffect, use } from 'react'; // <-- 1. IMPORT 'use' FROM REACT
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

export default function ProductDetailPage({ params }) {
  const { id } = use(params); // <-- 2. WRAP 'params' WITH use()
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      getProductDetails();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });
      if (!res.ok) throw new Error('Failed to add to cart');
      const data = await res.json();
      console.log('Updated Cart:', data);
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding product to cart.');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading product details...</div>;
  }
  if (!product) {
    return <div className="text-center py-12">Product not found.</div>;
  }

  // The rest of the JSX stays exactly the same
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">Product Showcase</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 text-center">
              <h3 className="text-lg font-semibold mb-2">Before</h3>
              <div className="relative w-full h-64 border rounded-lg overflow-hidden">
                <Image src="/placeholder.png" alt="Before usage" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
              </div>
            </div>
            <div className="flex-1 text-center">
              <h3 className="text-lg font-semibold mb-2">After</h3>
              <div className="relative w-full h-64 border rounded-lg overflow-hidden">
                <Image src="/placeholder.png" alt="After usage" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded capitalize">{product.category}</span>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-3xl font-bold text-green-700">₹{product.price}</p>
          <p className="text-md"><span className="font-semibold">Stock:</span> {product.quantity > 0 ? `${product.quantity} units available` : 'Out of Stock'}</p>
          <button onClick={handleAddToCart} className="w-full bg-green-700 text-white font-bold py-3 px-4 rounded hover:bg-green-800 transition-colors duration-300 disabled:bg-gray-400" disabled={product.quantity === 0}>
            {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}