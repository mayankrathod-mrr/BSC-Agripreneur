"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
// We don't need the AdminRoute component here, we can do the check directly
// import AdminRoute from '@/components/AdminRoute'; 

const AddProductPage = () => {
    const { user } = useAuth();
    const router = useRouter();

    const [name, setName] = useState('');
    const [category, setCategory] = useState('seeds');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [beforeImage, setBeforeImage] = useState(null);
    const [afterImage, setAfterImage] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!beforeImage) { // Now, we require at least the main product image
            setMessage('Please upload the main product image.');
            return;
        }
        
        setLoading(true);
        setMessage('');
        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('beforeImage', beforeImage);
        if (afterImage) {
            formData.append('afterImage', afterImage);
        }

        try {
            const res = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${user.token}` },
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to add product');

            alert('Product added successfully!');
            router.push('/products');
        } catch (error) {
            setMessage(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!user || user.role !== 'admin') {
        return <p className="text-center py-12">Access Denied. You must be an admin to view this page.</p>;
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard - Add Product</h1>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-4">
                {/* Text fields remain the same */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                </div>
                {/* ... other fields ... */}
                 <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500">
                        <option value="seeds">Seeds</option>
                        <option value="fertilizers">Fertilizers</option>
                        <option value="pesticides">Pesticides</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                        <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
                        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
                    </div>
                </div>

                {/* --- IMAGE UPLOADS (LABELS UPDATED) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="beforeImage" className="block text-sm font-medium text-gray-700">Main Product Image (Required)</label>
                        <input type="file" id="beforeImage" onChange={(e) => setBeforeImage(e.target.files[0])} required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"/>
                    </div>
                    <div>
                        <label htmlFor="afterImage" className="block text-sm font-medium text-gray-700">"After" Result Image (Optional)</label>
                        <input type="file" id="afterImage" onChange={(e) => setAfterImage(e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"/>
                    </div>
                </div>
                {/* ------------------------------------------- */}

                <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400">
                    {loading ? 'Uploading...' : 'Add Product'}
                </button>
                {message && <p className="text-center text-sm text-red-500 pt-4">{message}</p>}
            </form>
        </div>
    );
};

export default AddProductPage;