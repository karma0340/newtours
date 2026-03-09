import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import Redis from "ioredis";
import sharp from "sharp";
import { mkdir } from "fs/promises";

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

const TourSchema = new mongoose.Schema({
    title: String,
    image: String,
    images: [String],
    slug: String,
}, { strict: false });

const Tour = mongoose.models.Tour || mongoose.model("Tour", TourSchema);

const destinationsMap = {
    "Manali – Solang Valley Escape": "https://images.unsplash.com/photo-1605649487212-4dcbac0e3a47?q=80&w=1600&fm=jpg&fit=crop",
    "Spiti Valley Cold Desert Odyssey": "https://images.unsplash.com/photo-1614212720516-f28a9eafe90e?q=80&w=1600&fm=jpg&fit=crop",
    "Shimla – Kufri Heritage Trail": "https://images.unsplash.com/photo-1593693397690-362cb9666991?q=80&w=1600&fm=jpg&fit=crop",
    "Kasol – Kheerganga Trek": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&fm=jpg&fit=crop",
    "Dharamshala – McLeod Ganj Spiritual Sojourn": "https://images.unsplash.com/photo-1555881400-642159ee4fd5?q=80&w=1600&fm=jpg&fit=crop",
    "Bir Billing Paragliding Adventure": "https://images.unsplash.com/photo-1520625904838-89c5643a60c8?q=80&w=1600&fm=jpg&fit=crop"
};

async function seed() {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    
    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", "tours");
    await mkdir(uploadDir, { recursive: true });

    let updated = 0;
    
    for (const [title, imgUrl] of Object.entries(destinationsMap)) {
        const tour = await Tour.findOne({ title });
        if (tour) {
            console.log(`Downloading high-res JPG for: ${title}...`);
            
            // 1. Download the JPG
            const response = await fetch(imgUrl);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            
            // 2. Mocking the exact Admin Upload process with Sharp
            const safeSlug = tour.slug || title.replace(/\s+/g, "_").toLowerCase();
            const filename = `${Date.now()}_${safeSlug}.webp`;
            const filepath = path.join(uploadDir, filename);
            const publicUrl = `/uploads/tours/${filename}`;

            console.log(`Compressing to WebP: ${filename}`);
            
            // 3. Compress, resize, and convert to WebP
            await sharp(buffer)
                .resize({ width: 1200, withoutEnlargement: true }) // desktop standard size
                .webp({ quality: 80 }) // strict compression
                .toFile(filepath);
                
            // 4. Update the DB
            tour.image = publicUrl;
            if (!tour.images) tour.images = [];
            tour.images = [publicUrl, ...tour.images.filter(i => !i.includes(publicUrl))];
            
            await tour.save();
            updated++;
            console.log(`✅ Success! Compressed and uploaded.\n`);
        }
    }
    
    console.log(`Updated ${updated} tour packages natively inside your files.\n`);

    if (process.env.REDIS_URL) {
        console.log("Clearing Redis Cache for homepage...");
        const redis = new Redis(process.env.REDIS_URL);
        await redis.del("home_data");
        console.log("Cache cleared! New WebPs will load instantly.");
        redis.disconnect();
    }

    await mongoose.disconnect();
    process.exit(0);
}

seed().catch(console.error);
