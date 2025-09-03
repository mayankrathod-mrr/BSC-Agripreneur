// frontend/src/components/ProductActions.js
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

export default function ProductActions({ product }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      alert("✅ Product added to cart successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Error adding product to cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={product.quantity === 0 || loading}
      className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-4 rounded-lg transition-all duration-300 
        ${
          product.quantity > 0 && !loading
            ? "bg-green-600 hover:bg-green-700 active:scale-95 text-white"
            : "bg-gray-300 cursor-not-allowed text-gray-600"
        }`}
    >
      {loading ? (
        <>
          <ImSpinner2 className="animate-spin" size={20} />
          Adding...
        </>
      ) : product.quantity > 0 ? (
        <>
          <FaShoppingCart size={18} />
          Add to Cart
        </>
      ) : (
        "Out of Stock"
      )}
    </button>
  );
}
