// frontend/src/app/orders/page.js
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function OrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const res = await fetch('http://localhost:5000/api/orders/myorders', {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch orders');
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

    if (loading) return <p className="text-center py-12">Loading your orders...</p>;
    if (!user) return <p className="text-center py-12">Please <Link href="/login" className="text-green-600 underline">log in</Link> to see your orders.</p>;

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-8">Your Order History</h1>
            {orders.length === 0 ? (
                <p>You have no past orders.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order._id} className="border rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="font-bold">Order ID: {order._id}</p>
                                    <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">Total: ₹{order.totalPrice.toFixed(2)}</p>
                                    <p className={`text-sm font-semibold ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</p>
                                </div>
                            </div>
                            <div>
                                {order.orderItems.map(item => (
                                    <div key={item.product} className="flex justify-between items-center py-2 border-t">
                                        <span>{item.name} (x{item.quantity})</span>
                                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
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