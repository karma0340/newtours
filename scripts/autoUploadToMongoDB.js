import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import sharp from "sharp";
import Redis from "ioredis";

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

const TourSchema = new mongoose.Schema({ title: String, image: String, images: [String], slug: String }, { strict: false });
const Tour = mongoose.models.Tour || mongoose.model("Tour", TourSchema);

const VehicleSchema = new mongoose.Schema({ name: String, image: String, images: [String], slug: String }, { strict: false });
const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);

const toursMap = {
    "manali_solang_valley.jpg": "Manali – Solang Valley Escape",
    "spiti_valley.jpg": "Spiti Valley Cold Desert Odyssey",
    "shimla_kufri.jpg": "Shimla – Kufri Heritage Trail",
    "kasol_kheerganga.jpg": "Kasol – Kheerganga Trek",
    "dharamshala_mcleodganj.jpg": "Dharamshala – McLeod Ganj Spiritual Sojourn",
    "bir_billing.jpg": "Bir Billing Paragliding Adventure"
};

const vehiclesMap = {
    "toyota_innova_crysta.jpg": "Toyota Innova Crysta",
    "luxury_volvo_tourist_bus.jpg": "Luxury Volvo Tourist Bus",
    "force_tempo_traveler.jpg": "Force Tempo Traveler",
    "mahindra_scorpio_n.jpg": "Mahindra Scorpio N",
    "traveller_urbania.jpg": "Traveller Urbania"
};

async function uploadImages() {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    let updatedTours = 0;
    const toursDir = path.join(process.cwd(), "ai_tour_images");
    for (const [filename, title] of Object.entries(toursMap)) {
        const sourcePath = path.join(toursDir, filename);
        if (!fs.existsSync(sourcePath)) {
            console.warn(`Missing AI image: ${filename}`);
            continue;
        }

        const tour = await Tour.findOne({ title });
        if (tour) {
            const safeSlug = tour.slug || title.replace(/\s+/g, "_").toLowerCase();
            const newFilename = `${Date.now()}_${safeSlug}.webp`;
            const destPath = path.join(uploadsDir, newFilename);
            const publicUrl = `/uploads/${newFilename}`;

            const buffer = fs.readFileSync(sourcePath);
            await sharp(buffer)
                .resize({ width: 1200, withoutEnlargement: true }) // Emulate Admin Optimization!
                .webp({ quality: 80 }) // 80% optimal WebP
                .toFile(destPath);

            tour.image = publicUrl;
            if (!tour.images) tour.images = [];
            tour.images = [publicUrl, ...tour.images.filter(img => !img.includes(publicUrl))];
            
            await tour.save();
            updatedTours++;
            console.log(`✅ Uploaded and compressed tour imagery for: ${title}`);
        }
    }

    let updatedVehicles = 0;
    const vehiclesDir = path.join(process.cwd(), "ai_vehicle_images");
    for (const [filename, name] of Object.entries(vehiclesMap)) {
        const sourcePath = path.join(vehiclesDir, filename);
        if (!fs.existsSync(sourcePath)) {
            console.warn(`Missing AI vehicle image: ${filename}`);
            continue;
        }

        const vehiclesList = await Vehicle.find({ name });
        if (!vehiclesList.length) {
            console.warn(`Vehicle not found in DB: ${name}`);
        }

        for (const vehicle of vehiclesList) {
            const safeSlug = vehicle.slug || name.replace(/\s+/g, "_").toLowerCase();
            const newFilename = `${Date.now()}_${safeSlug}.webp`;
            const destPath = path.join(uploadsDir, newFilename);
            const publicUrl = `/uploads/${newFilename}`;

            const buffer = fs.readFileSync(sourcePath);
            await sharp(buffer)
                .resize({ width: 1200, withoutEnlargement: true }) // Emulate Admin Optimization
                .webp({ quality: 80 })
                .toFile(destPath);

            vehicle.image = publicUrl;
            if (!vehicle.images) vehicle.images = [];
            vehicle.images = [publicUrl, ...vehicle.images.filter(img => !img.includes(publicUrl))];

            await vehicle.save();
            updatedVehicles++;
            console.log(`✅ Uploaded and compressed vehicle imagery for: ${name}`);
        }
    }

    console.log(`\n🎉 Uploaded ${updatedTours} Tours and ${updatedVehicles} Vehicles!`);

    if (process.env.REDIS_URL) {
        console.log("Clearing Redis Cache for homepage...");
        const redis = new Redis(process.env.REDIS_URL);
        await redis.del("home_data");
        console.log("Redis Cache Cleared!");
        redis.disconnect();
    }

    await mongoose.disconnect();
    process.exit(0);
}

uploadImages().catch(console.error);
