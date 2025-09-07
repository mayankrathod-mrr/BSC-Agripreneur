// frontend/src/app/orders/page.js
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/orders/myorders", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading)
    return (
      <p className="text-center py-12 text-gray-300">
        Loading your orders...
      </p>
    );

  if (!user)
    return (
      <p className="text-center py-12 text-gray-300">
        Please{" "}
        <Link href="/login" className="text-green-400 underline font-semibold">
          log in
        </Link>{" "}
        to see your orders.
      </p>
    );

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-white drop-shadow-lg">
        📦 Your Order History
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-400">
          You have no past orders.
        </p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-900/70 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <p className="font-bold text-white">
                    Order ID:{" "}
                    <span className="text-gray-400 font-normal">
                      {order._id}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-3 md:mt-0 text-right">
                  <p className="font-bold text-lg text-green-400">
                    ₹{order.totalPrice.toFixed(2)}
                  </p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full 
                      ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-700">
                {order.orderItems.map((item) => (
                  <div
                    key={item.product}
                    className="flex justify-between items-center py-3"
                  >
                    <span className="text-gray-200">
                      {item.name}{" "}
                      <span className="text-sm text-gray-400">
                        (x{item.quantity})
                      </span>
                    </span>
                    <span className="font-medium text-white">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
