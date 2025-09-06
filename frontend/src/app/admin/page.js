// frontend/src/app/admin/page.js
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("seeds");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [mainImage, setMainImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [previewMain, setPreviewMain] = useState(null);
  const [previewAfter, setPreviewAfter] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess("");

    if (!user || user.role !== "admin") {
      setMessage("🚫 You are not authorized.");
      return;
    }
    if (!mainImage) {
      setMessage("⚠️ Please upload the main product image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("quantity", Number(quantity));
    formData.append("price", Number(price));
    formData.append("mainImage", mainImage);
    if (afterImage) formData.append("afterImage", afterImage);

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { Authorization: `Bearer ${user.token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add product");

      setSuccess("✅ Product added successfully!");
      setName("");
      setCategory("seeds");
      setDescription("");
      setQuantity(1);
      setPrice(0);
      setMainImage(null);
      setAfterImage(null);
      setPreviewMain(null);
      setPreviewAfter(null);

      // Optionally redirect after a short delay
      setTimeout(() => router.push("/products"), 1500);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <p className="text-center py-12 text-lg text-red-500">
        🚫 Access Denied. You must be an admin to view this page.
      </p>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-10 text-green-700">
          Admin Dashboard
        </h1>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            ➕ Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter product name"
                className="mt-2 block w-full rounded-lg border-gray-300 px-4 py-2 shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 block w-full rounded-lg border-gray-300 px-4 py-2 shadow-sm focus:ring-green-500 focus:border-green-500"
              >
                <option value="seeds">🌱 Seeds</option>
                <option value="fertilizers">🧪 Fertilizers</option>
                <option value="pesticides">🪲 Pesticides</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Write a short product description..."
                className="mt-2 block w-full rounded-lg border-gray-300 px-4 py-2 shadow-sm focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>

            {/* Quantity & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  required
                  className="mt-2 block w-full rounded-lg border-gray-300 px-4 py-2 shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  step="0.01"
                  required
                  className="mt-2 block w-full rounded-lg border-gray-300 px-4 py-2 shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Image Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Main Product Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setMainImage(file);
                    setPreviewMain(URL.createObjectURL(file));
                  }}
                  required
                  className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                {previewMain && (
                  <img
                    src={previewMain}
                    alt="Main Preview"
                    className="mt-3 h-32 w-full object-cover rounded-lg border"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  "After" Result Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setAfterImage(file);
                    setPreviewAfter(URL.createObjectURL(file));
                  }}
                  className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
                {previewAfter && (
                  <img
                    src={previewAfter}
                    alt="After Preview"
                    className="mt-3 h-32 w-full object-cover rounded-lg border"
                  />
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition disabled:bg-gray-400"
            >
              {loading ? "⏳ Uploading..." : "✅ Add Product"}
            </button>

            {/* Messages */}
            {message && (
              <p className="text-center text-sm text-red-500 pt-2">{message}</p>
            )}
            {success && (
              <p className="text-center text-sm text-green-600 font-medium pt-2">
                {success}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
