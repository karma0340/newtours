
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env.local") });

async function check() {
    await mongoose.connect(process.env.MONGODB_URI);
    const Tour = mongoose.model("Tour", new mongoose.Schema({ title: String, image: String, images: [String] }, { strict: false }));
    const Vehicle = mongoose.model("Vehicle", new mongoose.Schema({ name: String, image: String, images: [String] }, { strict: false }));
    const Category = mongoose.model("Category", new mongoose.Schema({ title: String, image: String }, { strict: false }));

    console.log("--- TOURS ---");
    const tours = await Tour.find();
    tours.forEach(t => console.log(`${t.title}: ${t.image}`));

    console.log("\n--- VEHICLES ---");
    const vehicles = await Vehicle.find();
    vehicles.forEach(v => console.log(`${v.name}: ${v.image}`));

    console.log("\n--- CATEGORIES ---");
    const cats = await Category.find();
    cats.forEach(c => console.log(`${c.title}: ${c.image}`));

    await mongoose.disconnect();
}

check();
