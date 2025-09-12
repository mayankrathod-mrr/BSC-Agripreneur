"use client";
import { Rating } from 'react-simple-star-rating';

export default function StarRating({ rating, numReviews }) {
    // The main container uses flexbox to align items horizontally
    return (
        <div className="flex items-center space-x-2">
            <Rating
                initialValue={rating}
                readonly
                size={20}
                fillColor="#f59e0b" // A bright yellow/amber color for the stars
                emptyColor="#d1d5db" // A light gray for the empty stars
                allowFraction // This allows for average ratings like 4.5
            />
            {/* Show the number of reviews next to the stars */}
            {numReviews > 0 && (
                 <span className="text-gray-600 text-sm">
                    ({numReviews} {numReviews === 1 ? 'review' : 'reviews'})
                </span>
            )}
        </div>
    );
}