
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        tour: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tour",
            required: true,
        },
        bookingDate: {
            type: Date,
            default: Date.now,
        },
        travelDate: {
            type: Date,
            required: [true, "Please select a travel date"],
        },
        travelers: {
            type: Number,
            required: true,
            min: 1,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "completed"],
            default: "pending",
        },
        paymentId: {
            type: String, // from Razorpay
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
        specialRequests: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
