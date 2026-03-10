
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env.local") });

async function check() {
    await mongoose.connect(process.env.MONGODB_URI);
    const Tour = mongoose.model("Tour", new mongoose.Schema({}, { strict: false }));
    const Vehicle = mongoose.model("Vehicle", new mongoose.Schema({}, { strict: false }));
    
    const tours = await Tour.find({});
    console.log("--- TOURS ---");
    tours.forEach(t => console.log(`${t.title}: ${JSON.stringify(t.images)}`));
    
    const vehicles = await Vehicle.find({});
    console.log("--- VEHICLES ---");
    vehicles.forEach(v => console.log(`${v.name}: ${JSON.stringify(v.images)}`));
    
    await mongoose.disconnect();
}

check();
