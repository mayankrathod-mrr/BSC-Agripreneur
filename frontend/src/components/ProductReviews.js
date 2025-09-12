"use client";

import { useState, useEffect } from 'react'; // <-- Import useEffect
import { useAuth } from '@/context/AuthContext';
import { Rating } from 'react-simple-star-rating';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductReviews({ product }) {
    const { user } = useAuth();
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // === THIS IS THE GUARANTEED FIX FOR THE DATE HYDRATION ERROR ===
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    // =============================================================

    const handleRating = (rate) => {
        setRating(rate);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const res = await fetch(`http://localhost:5000/api/products/${product._id}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ rating, comment }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to submit review');
            }
            
            setRating(0);
            setComment('');
            alert('Review submitted successfully!');
            router.refresh();
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            {product.reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}
            
            <div className="space-y-4 mb-8">
                {product.reviews.map((review) => (
                    <div key={review._id} className="p-4 border rounded-md bg-white">
                        <div className="flex items-center mb-1">
                            <strong className="mr-2">{review.name}</strong>
                            <Rating initialValue={review.rating} readonly size={16} fillColor="#f59e0b" />
                        </div>
                        
                        {/* We only render the date if the component is mounted on the client */}
                        {isMounted && (
                            <p className="text-gray-500 text-sm mb-2">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                        )}

                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>

            {user ? (
                <form onSubmit={submitHandler} className="p-6 border rounded-md bg-gray-50">
                    <h3 className="text-xl font-semibold mb-2">Write a Customer Review</h3>
                    {message && <p className="text-red-500 mb-2">{message}</p>}
                    <div className="mb-2">
                        <label className="block font-medium mb-1">Your Rating</label>
                        <Rating onClick={handleRating} initialValue={rating} size={28} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="comment" className="block font-medium mb-1">Your Comment</label>
                        <textarea
                            id="comment"
                            rows="3"
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        ></textarea>
                    </div>
                    <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400">
                        {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            ) : (
                <p className="p-4 border rounded-md bg-gray-100 text-center">Please <Link href="/login" className="font-bold text-green-600 hover:underline">log in</Link> to write a review.</p>
            )}
        </div>
    );
}

