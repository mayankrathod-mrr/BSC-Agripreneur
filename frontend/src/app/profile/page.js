// frontend/src/app/profile/page.js
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
    const { user, login } = useAuth(); // We need 'login' to update the context
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setLoading(false);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await fetch('http://localhost:5000/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ name }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            // IMPORTANT: We call login() again with the updated user data
            // This will update the user's name everywhere on the site!
            login(data);
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    if (loading) return <p className="text-center py-12">Loading profile...</p>;

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" value={email} disabled className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100 cursor-not-allowed" />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700">
                    Update Profile
                </button>
                {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
            </form>
        </div>
    );
}