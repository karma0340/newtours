
import mongoose from "mongoose";

const TourSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a tour title"],
            trim: true,
            maxlength: [100, "Title cannot be more than 100 characters"],
        },
        slug: {
            type: String,
            unique: true,
            required: true,
        },
        destination: {
            type: String,
            required: [true, "Please provide a destination"],
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
        },
        price: {
            type: Number,
            required: [true, "Please provide a price"],
        },
        duration: {
            type: String, // e.g., "3 Days / 2 Nights"
            required: [true, "Please provide duration"],
        },
        images: {
            type: [String], // Array of image URLs
            default: [],
        },
        featured: {
            type: Boolean,
            default: false,
        },
        startDate: {
            type: Date,
        },
        availableSeats: {
            type: Number,
            default: 20,
        },
        itinerary: [
            {
                day: Number,
                title: String,
                details: String,
            },
        ],
        rating: {
            type: Number,
            default: 0,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        category: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.models.Tour || mongoose.model("Tour", TourSchema);
