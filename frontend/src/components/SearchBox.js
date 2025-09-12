"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  const handleSearch = (e) => {
    e.preventDefault();
    const currentParams = new URLSearchParams(searchParams.toString());

    if (keyword.trim()) {
      currentParams.set("keyword", keyword.trim());
    } else {
      currentParams.delete("keyword");
    }

    router.push(`/products?${currentParams.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full max-w-2xl mx-auto mb-10 bg-white rounded-full shadow-md border border-gray-200 overflow-hidden"
    >
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="🔍 Search products by name, category..."
        className="flex-grow px-5 py-3 text-gray-700 bg-transparent focus:outline-none text-base"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
      >
        <FaSearch className="w-5 h-5" />
      </button>
    </form>
  );
}
