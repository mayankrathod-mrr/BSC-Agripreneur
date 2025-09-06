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
      className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-5 rounded-xl 
        transition-all duration-300 shadow-md
        ${
          product.quantity > 0 && !loading
            ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-600 active:scale-95"
            : "bg-gray-200 cursor-not-allowed text-gray-500"
        }`}
    >
      {loading ? (
        <>
          <ImSpinner2 className="animate-spin" size={20} />
          <span>Adding...</span>
        </>
      ) : product.quantity > 0 ? (
        <>
          <FaShoppingCart size={18} />
          <span>Add to Cart</span>
        </>
      ) : (
        "Out of Stock"
      )}
    </button>
  );
}
