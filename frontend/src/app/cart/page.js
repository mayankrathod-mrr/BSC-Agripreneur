// frontend/src/app/cart/page.js
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.status === 404) {
        setCart({ products: [] });
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const handleRemoveItem = async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/cart/remove/${productId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to remove item");
      fetchCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert("Error removing item.");
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/checkout", {
        method: "POST",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) throw new Error("Checkout failed");
      alert("✅ Order placed successfully!");
      router.push("/orders");
    } catch (error) {
      console.error(error);
      alert("Error placing order.");
    }
  };

  const calculateSubtotal = () => {
    if (!cart || !cart.products) return "0.00";
    return cart.products
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  // === Different States ===
  if (loading)
    return <p className="text-center py-12 text-gray-600">Loading your cart...</p>;

  if (!user)
    return (
      <p className="text-center py-12 text-gray-700">
        Please{" "}
        <Link href="/login" className="text-green-600 underline font-medium">
          log in
        </Link>{" "}
        to view your cart.
      </p>
    );

  if (!cart || cart.products.length === 0)
    return (
      <p className="text-center py-12 text-gray-700">
        Your cart is empty.{" "}
        <Link href="/products" className="text-green-600 underline font-medium">
          Start shopping
        </Link>
      </p>
    );

  // === Cart Page ===
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">🛒 Your Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.products.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between p-4 bg-white border rounded-lg shadow hover:shadow-md transition"
            >
              <div className="flex items-center space-x-4 min-w-0">
                <Image
                  src={item.product.beforeImage}
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <h2 className="font-semibold text-lg text-gray-900 truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px]">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-600">₹{item.product.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 flex-shrink-0">
                <p className="text-gray-700">Qty: {item.quantity}</p>
                <button
                  onClick={() => handleRemoveItem(item.product._id)}
                  className="text-red-500 hover:text-red-700 font-semibold transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white border rounded-lg shadow p-6 self-start">
          <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>
          <div className="flex justify-between mb-2 text-gray-700">
            <span>Subtotal</span>
            <span>₹{calculateSubtotal()}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2 text-black">
            <span>Total</span>
            <span>₹{calculateSubtotal()}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-bold transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
