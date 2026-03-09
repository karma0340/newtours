"use client";

import { useState } from "react";
import { Star, User } from "lucide-react";
import { toast } from "react-hot-toast";

// Mock useSession
const useSession = () => ({ data: { user: { name: "John Doe" } } });

const Reviews = ({ tourId, reviews = [] }) => {
    const { data: session } = useSession();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Mock initial reviews if empty
    const displayReviews = reviews.length > 0 ? reviews : [
        {
            _id: 1,
            user: { name: "Alice Johnson", image: "" },
            rating: 5,
            comment: "Amazing experience! The tour guide was knowledgeable and friendly.",
            createdAt: new Date().toISOString()
        },
        {
            _id: 2,
            user: { name: "Bob Smith", image: "" },
            rating: 4,
            comment: "Great trip, very well organized. Highly recommended.",
            createdAt: new Date().toISOString()
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!session) {
            toast.error("Please sign in to leave a review");
            return;
        }
        setSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            toast.success("Review submitted!");
            setSubmitting(false);
            setComment("");
            setRating(5);
        }, 1000);
    };

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Reviews ({displayReviews.length})</h2>

            {/* Review Form */}
            <div className="bg-gray-50 p-6 rounded-2xl mb-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Write a Review</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`focus:outline-none transition-colors ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                                >
                                    <Star size={24} fill={rating >= star ? "currentColor" : "none"} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            rows="3"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            placeholder="Share your experience..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-70"
                    >
                        {submitting ? "Submitting..." : "Post Review"}
                    </button>
                </form>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {displayReviews.map((review) => (
                    <div key={review._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                    {review.user?.image ? (
                                        <img src={review.user.image} alt={review.user.name} />
                                    ) : (
                                        <User className="text-gray-500" size={20} />
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{review.user?.name}</h4>
                                    <span className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex gap-1 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-yellow-400" : "text-gray-200"} />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;

