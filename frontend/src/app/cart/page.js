"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaImage } from "react-icons/fa";

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
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCart({ products: [] });
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
      const data = await res.json();
      setCart(data);
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
      alert("Order placed successfully!");
      router.push("/orders");
    } catch (error) {
      console.error(error);
      alert("Error placing order.");
    }
  };

  const calculateSubtotal = () => {
    if (!cart || !cart.products) return "0.00";
    return cart.products
      .reduce((total, item) => {
        if (item.product) {
          return total + item.product.price * item.quantity;
        }
        return total;
      }, 0)
      .toFixed(2);
  };

  if (loading)
    return <p className="text-center py-12">Loading your cart...</p>;
  if (!user)
    return (
      <p className="text-center py-12">
        Please{" "}
        <Link href="/login" className="text-green-600 underline">
          log in
        </Link>{" "}
        to view your cart.
      </p>
    );
  if (!cart || cart.products.length === 0)
    return <p className="text-center py-12">Your cart is empty.</p>;

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section - Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.products.map(
            (item) =>
              item.product && (
                <div
                  key={item.product._id}
                  className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
                >
                  <div className="flex items-center space-x-4">
                    {item.product.mainImage ? (
                      <Image
                        src={item.product.mainImage}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="rounded object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">
                        <FaImage className="text-gray-400" size={24} />
                      </div>
                    )}
                    <div>
                      <h2 className="font-semibold">{item.product.name}</h2>
                      <p className="text-gray-600">
                        ₹{item.product.price.toFixed(2)}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Total: ₹
                        {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p>Qty: {item.quantity}</p>
                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
          )}
        </div>

        {/* Right Section - Summary */}
        <div className="bg-gray-100 p-6 rounded-lg self-start">
          <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>
          <div className="flex justify-between mb-2 text-black">
            <span>Subtotal</span>
            <span>₹{calculateSubtotal()}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2 text-black">
            <span>Total</span>
            <span>₹{calculateSubtotal()}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-bold"
          >
            Proceed to Checkout
          </button>

          {/* Continue Shopping */}
          <Link
            href="/products"
            className="block w-full mt-3 text-center text-green-600 font-semibold hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
