
import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a vehicle name"],
            trim: true,
        },
        type: {
            type: String,
            required: [true, "Please provide vehicle type"],
            enum: ["SUV", "SADAN", "HATCHBACK", "BUS", "TEMPO TRAVELER", "BIKE"],
        },
        capacity: {
            type: String,
            required: [true, "Please provide passenger capacity"],
        },
        pricePerKm: {
            type: Number,
            required: [true, "Please provide price per KM"],
        },
        pricePerDay: {
            type: Number,
            required: [true, "Please provide price per day"],
        },
        images: {
            type: [String],
            required: [true, "Please provide at least one image"],
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
        },
        features: {
            type: [String],
            default: ["Professional Driver", "AC", "Music System", "Carrier"],
        },
        available: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);
