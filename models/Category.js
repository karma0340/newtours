
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        image: {
            type: String, // URL path, e.g. /images/categories/trekking.png
            default: "",
        },
        icon: {
            type: String, // Icon name from lucide-react
            default: "Map",
        },
        order: {
            type: Number,
            default: 0,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
