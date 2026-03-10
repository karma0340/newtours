import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { mkdir, readdir } from "fs/promises";
import sharp from "sharp";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

const TourSchema = new mongoose.Schema({
    title: String,
    images: [String],
    image: String, // Keeping image field as well for backward compatibility if used
}, { strict: false });

const VehicleSchema = new mongoose.Schema({
    name: String,
    images: [String],
}, { strict: false });

const Tour = mongoose.models.Tour || mongoose.model("Tour", TourSchema);
const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);

const tourMapping = {
    "bir_billing.jpg": "Bir Billing Paragliding Adventure",
    "dharamshala_mcleodganj.jpg": "Dharamshala – McLeod Ganj Spiritual Sojourn",
    "kasol_kheerganga.jpg": "Kasol – Kheerganga Trek",
    "manali_solang_valley.jpg": "Manali – Solang Valley Escape",
    "shimla_kufri.jpg": "Shimla – Kufri Heritage Trail",
    "spiti_valley.jpg": "Spiti Valley Cold Desert Odyssey"
};

const vehicleMapping = {
    "force_tempo_traveler.jpg": "Force Tempo Traveler",
    "luxury_volvo_tourist_bus.jpg": "Luxury Volvo Tourist Bus",
    "mahindra_scorpio_n.jpg": "Mahindra Scorpio N",
    "toyota_innova_crysta.jpg": "Toyota Innova Crysta",
    "traveller_urbania.jpg": "Traveller Urbania"
};

async function processImages() {
    console.log("🚀 Starting Image Optimization & Deployed to MongoDB...");
    
    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is missing in .env.local");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB Connected.");

    const rootDir = path.join(__dirname, "..");
    const uploadBase = path.join(rootDir, "public", "uploads");

    // 1. Process Tour Images
    const tourSourceDir = path.join(rootDir, "ai_tour_images");
    const tourUploadDir = path.join(uploadBase, "tours");
    await mkdir(tourUploadDir, { recursive: true });

    console.log("\n🏔 Processing Tour Images...");
    for (const [filename, title] of Object.entries(tourMapping)) {
        const sourcePath = path.join(tourSourceDir, filename);
        const webpFilename = `${Date.now()}_${filename.replace(/\.[^/.]+$/, "")}.webp`;
        const destPath = path.join(tourUploadDir, webpFilename);
        const publicUrl = `/uploads/tours/${webpFilename}`;

        try {
            console.log(`- Optimizing: ${filename} for "${title}"`);
            await sharp(sourcePath)
                .resize({ width: 1200, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(destPath);

            const tour = await Tour.findOne({ title });
            if (tour) {
                tour.images = [publicUrl];
                tour.image = publicUrl; // Set primary image
                await tour.save();
                console.log(`  ✅ Successfully updated DB.`);
            } else {
                console.warn(`  ⚠️ Tour not found in DB: ${title}`);
            }
        } catch (err) {
            console.error(`  ❌ Error processing ${filename}:`, err.message);
        }
    }

    // 2. Process Vehicle Images
    const vehicleSourceDir = path.join(rootDir, "ai_vehicle_images");
    const vehicleUploadDir = path.join(uploadBase, "vehicles");
    await mkdir(vehicleUploadDir, { recursive: true });

    console.log("\n🚐 Processing Vehicle Images...");
    for (const [filename, name] of Object.entries(vehicleMapping)) {
        const sourcePath = path.join(vehicleSourceDir, filename);
        const webpFilename = `${Date.now()}_${filename.replace(/\.[^/.]+$/, "")}.webp`;
        const destPath = path.join(vehicleUploadDir, webpFilename);
        const publicUrl = `/uploads/vehicles/${webpFilename}`;

        try {
            console.log(`- Optimizing: ${filename} for "${name}"`);
            await sharp(sourcePath)
                .resize({ width: 1200, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(destPath);

            const vehicle = await Vehicle.findOne({ name });
            if (vehicle) {
                vehicle.images = [publicUrl];
                await vehicle.save();
                console.log(`  ✅ Successfully updated DB.`);
            } else {
                console.warn(`  ⚠️ Vehicle not found in DB: ${name}`);
            }
        } catch (err) {
            console.error(`  ❌ Error processing ${filename}:`, err.message);
        }
    }

    console.log("\n✨ All images have been optimized and uploaded!");
    await mongoose.disconnect();
}

processImages().catch(err => {
    console.error("Fatal error:", err);
    process.exit(1);
});
