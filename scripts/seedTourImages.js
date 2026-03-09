import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import Redis from "ioredis";

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

const TourSchema = new mongoose.Schema({
    title: String,
    image: String, // primary image
    images: [String],
}, { strict: false });

const Tour = mongoose.models.Tour || mongoose.model("Tour", TourSchema);

const imagesMap = {
    "Manali – Solang Valley Escape": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
    "Spiti Valley Cold Desert Odyssey": "https://images.unsplash.com/photo-1614212720516-f28a9eafe90e?q=80&w=1200&auto=format&fit=crop",
    "Shimla – Kufri Heritage Trail": "https://images.unsplash.com/photo-1593693397690-362cb9666991?q=80&w=1200&auto=format&fit=crop",
    "Kasol – Kheerganga Trek": "https://images.unsplash.com/photo-1605649487212-4dcbac0e3a47?q=80&w=1200&auto=format&fit=crop",
    "Dharamshala – McLeod Ganj Spiritual Sojourn": "https://images.unsplash.com/photo-1555881400-642159ee4fd5?q=80&w=1200&auto=format&fit=crop",
    "Bir Billing Paragliding Adventure": "https://images.unsplash.com/photo-1520625904838-89c5643a60c8?q=80&w=1200&auto=format&fit=crop"
};

async function seed() {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    
    let updated = 0;
    
    for (const [title, imgUrl] of Object.entries(imagesMap)) {
        const tour = await Tour.findOne({ title });
        if (tour) {
            // Set the primary image
            tour.image = imgUrl;
            
            // Unshift to place the new AI-like image at index 0 of the gallery
            if (!tour.images) tour.images = [];
            tour.images = [imgUrl, ...tour.images.filter(i => i !== imgUrl)];
            
            await tour.save();
            updated++;
            console.log(`Updated images for: ${title}`);
        }
    }
    
    console.log(`Updated ${updated} tours.`);

    if (process.env.REDIS_URL) {
        console.log("Clearing Redis Cache for homepage...");
        const redis = new Redis(process.env.REDIS_URL);
        await redis.del("home_data");
        console.log("Cache cleared!");
        redis.disconnect();
    }

    await mongoose.disconnect();
    process.exit(0);
}

seed();
