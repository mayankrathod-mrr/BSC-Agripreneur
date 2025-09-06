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
      if (!user) return;
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
      <p className="text-center py-12 text-gray-600 animate-pulse">
        Loading your orders...
      </p>
    );

  if (!user)
    return (
      <p className="text-center py-12">
        Please{" "}
        <Link href="/login" className="text-green-600 underline font-semibold">
          log in
        </Link>{" "}
        to see your orders.
      </p>
    );

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-green-700 text-center">
        Your Order History
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You don’t have any past orders yet.
        </p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition p-6 bg-white"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID:{" "}
                    <span className="text-gray-800 font-medium">
                      {order._id}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-3 md:mt-0 text-right">
                  <p className="font-bold text-lg text-green-700">
                    ₹{order.totalPrice.toFixed(2)}
                  </p>
                  <span
                    className={`mt-1 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
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

              {/* Items */}
              <div className="divide-y divide-gray-200">
                {order.orderItems.map((item) => (
                  <div
                    key={item.product}
                    className="flex justify-between items-center py-3"
                  >
                    <div>
                      <p className="text-gray-800 font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-700">
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
