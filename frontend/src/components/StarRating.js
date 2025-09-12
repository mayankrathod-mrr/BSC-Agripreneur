"use client";

// This is our own custom Star component. It uses SVG and Tailwind CSS.
const Star = ({ filled }) => (
    <svg
        className={`w-5 h-5 ${filled ? 'text-amber-500' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export default function StarRating({ rating = 0, numReviews = 0 }) {
    return (
        <div className="flex items-center space-x-2">
            <div className="flex items-center">
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    // Fills the star if the rating is higher than its value
                    const filled = rating >= starValue;
                    return <Star key={index} filled={filled} />;
                })}
            </div>
            {numReviews > 0 && (
                 <span className="text-gray-600 text-sm">
                    ({numReviews} {numReviews === 1 ? 'review' : 'reviews'})
                </span>
            )}
        </div>
    );
}

