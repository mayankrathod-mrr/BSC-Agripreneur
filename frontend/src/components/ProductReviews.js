"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// We use our OWN component to DISPLAY stars horizontally
import StarRating from './StarRating'; 

// A simple star icon for our new rating input
const StarIcon = ({ filled, onClick }) => (
    <button type="button" onClick={onClick} className="focus:outline-none p-0.5">
        <svg
            className={`w-7 h-7 ${filled ? 'text-amber-500' : 'text-gray-300'} hover:text-amber-400 transition-colors`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    </button>
);

export default function ProductReviews({ product }) {
    const { user } = useAuth();
    const router = useRouter();
    const [rating, setRating] = useState(0); // State for the new review's rating
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // This is for the date hydration fix
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            setMessage('Please select a star rating.');
            return;
        }
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
            if (!res.ok) throw new Error(data.message || 'Failed to submit review');
            
            setRating(0);
            setComment('');
            alert('Review submitted successfully!');
            router.refresh(); // Reloads the page to show the new review
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
                            {/* Use our custom component for horizontal display */}
                            <StarRating rating={review.rating} />
                        </div>
                        {isMounted && (
                             <p className="text-gray-500 text-sm mb-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                        )}
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>

            {user ? (
                <form onSubmit={submitHandler} className="p-6 border rounded-md bg-gray-50">
                    <h3 className="text-xl font-semibold mb-2">Write a Customer Review</h3>
                    {message && <p className="text-red-500 mb-2">{message}</p>}
                    
                    {/* === OUR NEW, GUARANTEED WORKING RATING INPUT === */}
                    <div className="mb-2">
                        <label className="block font-medium mb-1">Your Rating</label>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, index) => {
                                const starValue = index + 1;
                                return (
                                    <StarIcon 
                                        key={index}
                                        filled={starValue <= rating}
                                        onClick={() => setRating(starValue)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    {/* ============================================== */}

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

