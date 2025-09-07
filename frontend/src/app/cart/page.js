"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaImage } from 'react-icons/fa';

export default function CartPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    const fetchCart = useCallback(async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/cart', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });

            if (res.status === 404) {
                setCart({ products: [] });
                return;
            }
            if (!res.ok) {
                throw new Error('Failed to fetch cart');
            }
            const data = await res.json();
            setCart(data);
        } catch (error) {
            console.error("Failed to fetch cart:", error);
            setCart(null);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleRemoveItem = async (productId) => {
        if (!user) return;
        try {
            const res = await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (!res.ok) throw new Error('Failed to remove item');
            fetchCart();
        } catch (error) {
            console.error("Failed to remove item:", error);
            alert('Error removing item from cart.');
        }
    };

    const handleCheckout = async () => {
        if (!user) return;
        setProcessing(true);
        try {
            const res = await fetch(`http://localhost:5000/api/orders/checkout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (!res.ok) throw new Error('Failed to place order');

            alert('Order placed successfully!');
            router.push('/orders');
        } catch (error) {
            console.error("Checkout failed:", error);
            alert('Error placing order.');
        } finally {
            setProcessing(false);
        }
    };

    const calculateSubtotal = () => {
        if (!cart || !cart.products) return '0.00';
        return cart.products.reduce((total, item) => {
            if (item.product) {
                return total + item.product.price * item.quantity;
            }
            return total;
        }, 0).toFixed(2);
    };

    if (loading) {
        return <p className="text-center py-24 text-xl font-semibold">Loading your cart...</p>;
    }

    if (!user) {
        return <p className="text-center py-24 text-xl font-semibold">
            Please <Link href="/login" className="text-green-600 underline hover:text-green-700">log in</Link> to view your cart.
        </p>;
    }

    if (!cart || cart.products.length === 0) {
        return <p className="text-center py-24 text-xl font-semibold">Your cart is empty.</p>;
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cart.products.map(item => (
                        item.product && (
                            <div key={item.product._id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
                                <div className="flex items-center space-x-4">
                                    {item.product.mainImage ? (
                                        <Image src={item.product.mainImage} alt={item.product.name} width={80} height={80} className="rounded object-cover" />
                                    ) : (
                                        <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">
                                            <FaImage className="text-gray-400" size={24} />
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="font-semibold text-gray-900">{item.product.name}</h2>
                                        <p className="text-gray-600">₹{item.product.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <p className="text-gray-700">Qty: {item.quantity}</p>
                                    <button
                                        onClick={() => handleRemoveItem(item.product._id)}
                                        className="text-red-500 hover:text-red-700 font-semibold transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )
                    ))}
                </div>
                <div className="bg-gray-50 p-6 rounded-lg self-start shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="flex justify-between mb-2 text-gray-700">
                        <span>Subtotal</span>
                        <span>₹{calculateSubtotal()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2 text-gray-900">
                        <span>Total</span>
                        <span>₹{calculateSubtotal()}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={processing}
                        className={`w-full mt-6 py-2 rounded-lg font-bold transition 
                            ${processing ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"} text-white`}
                    >
                        {processing ? "Processing..." : "Proceed to Checkout"}
                    </button>
                </div>
            </div>
        </div>
    );
}
