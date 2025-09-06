// frontend/src/app/login/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data);
        router.push("/");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("⚠️ An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg border border-green-100">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-green-700">
          Log In
        </h1>
        <p className="text-center text-gray-500 text-sm">
          Access your account to shop smarter 🌱
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-2 focus:ring-green-500 focus:border-green-500 
                         transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-2 focus:ring-green-500 focus:border-green-500 
                         transition-all duration-200"
            />
          </div>

          {/* Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 
                         font-bold text-white bg-green-600 rounded-lg shadow 
                         hover:bg-green-700 focus:outline-none 
                         focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
                         transition-all duration-200 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <ImSpinner2 className="animate-spin" size={18} />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>

        {/* Error / Message */}
        {message && (
          <p className="text-center text-sm text-red-500 font-medium">{message}</p>
        )}

        {/* Register Link */}
        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-green-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
