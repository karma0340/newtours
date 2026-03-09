import dbConnect from "@/lib/db";
import Vehicle from "@/models/Vehicle";
import VehiclesPageClient from "./VehiclesPageClient";

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
