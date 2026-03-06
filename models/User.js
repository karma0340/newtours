
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            maxlength: [60, "Name cannot be more than 60 characters"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            // Password is optional because of OAuth (Google Login)
            select: false,
        },
        image: {
            type: String,
        },
<<<<<<< HEAD
        phone: {
            type: String,
        },
=======
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        provider: {
            type: String,
            default: "credentials",
        },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
