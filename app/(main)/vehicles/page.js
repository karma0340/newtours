import dbConnect from "@/lib/db";
import Vehicle from "@/models/Vehicle";
import VehiclesPageClient from "./VehiclesPageClient";

export const metadata = {
    title: "Our Fleet - Luxury Buses & 4x4 Mountain SUVs",
    description: "Explore our private fleet of specialized Himalayan vehicles. From luxury Volvo buses to rugged 4x4 SUVs, we ensure your safety and comfort.",
    keywords: ["top 10 taxi service in Chandigarh", "top 10 tour and travels in Himachal", "taxi service", "top taxi service", "near taxi", "Volvo bus tours Himachal", "4x4 SUV mountain tours", "Hike The Himalaya taxi"],
};

export const dynamic = 'force-dynamic';

async function getVehicles() {
    await dbConnect();
    const vehicles = await Vehicle.find({ available: true }).sort({ createdAt: -1 }).lean();
    return vehicles.map(v => ({
        ...v,
        _id: v._id.toString(),
        createdAt: v.createdAt?.toISOString() || null,
        updatedAt: v.updatedAt?.toISOString() || null
    }));
}

export default async function VehiclesPage() {
    const vehicles = await getVehicles();
    return <VehiclesPageClient initialVehicles={vehicles} />;
}
