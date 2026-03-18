import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, default: "Hike The Himalaya Team" },
    published: { type: Boolean, default: true },
    readTime: { type: String, default: "5 min" },
    tags: [{ type: String }],
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: [{ type: String }]
}, { timestamps: true });

export default mongoose.models?.Blog || mongoose.model("Blog", BlogSchema);
