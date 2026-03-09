/**
 * SEED SCRIPT — Run once to populate categories in MongoDB
 * Usage: node scripts/seedCategories.js
 *
 * Make sure your .env.local has MONGODB_URI set.
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌  MONGODB_URI not found in .env.local");
    process.exit(1);
}

const CategorySchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    icon: { type: String, default: "Map" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

const categories = [
    {
        slug: "trekking",
        title: "Trekking",
        description: "Conquer high-altitude base camps and majestic peaks.",
        image: "/images/categories/trekking.png",
        icon: "Mountain",
        order: 1,
    },
    {
        slug: "adventure",
        title: "Adventure",
        description: "Feel the rush with paragliding, rafting, and skiing.",
        image: "/images/categories/adventure.png",
        icon: "Zap",
        order: 2,
    },
    {
        slug: "spiritual",
        title: "Spiritual",
        description: "Discover peace in ancient temples and monasteries.",
        image: "/images/categories/spiritual.png",
        icon: "Infinity",
        order: 3,
    },
    {
        slug: "nature",
        title: "Nature",
        description: "Experience lush valleys, waterfalls, and pine forests.",
        image: "/images/categories/nature.png",
        icon: "Trees",
        order: 4,
    },
    {
        slug: "offbeat",
        title: "Offbeat",
        description: "Explore hidden gems like Spiti, Jibhi, and Zanskar.",
        image: "/images/categories/offbeat.png",
        icon: "Map",
        order: 5,
    },
    {
        slug: "culture",
        title: "Culture",
        description: "Immerse yourself in local traditions and festivals.",
        image: "/images/categories/culture.png",
        icon: "Music",
        order: 6,
    },
];

async function seed() {
    console.log("🌱 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected!\n");

    let created = 0;
    let skipped = 0;

    for (const cat of categories) {
        const exists = await Category.findOne({ slug: cat.slug });
        if (exists) {
            console.log(`⏭️  Skipped (already exists): ${cat.slug}`);
            skipped++;
        } else {
            await Category.create(cat);
            console.log(`✅ Created: ${cat.slug}`);
            created++;
        }
    }

    console.log(`\n📊 Done! Created: ${created}, Skipped: ${skipped}`);
    await mongoose.disconnect();
    process.exit(0);
}

seed().catch(err => {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
});
