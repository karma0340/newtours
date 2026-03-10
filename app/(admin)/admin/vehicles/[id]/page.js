import VehicleForm from "@/components/admin/VehicleForm";
import dbConnect from "@/lib/db";
import Vehicle from "@/models/Vehicle";
import { notFound } from "next/navigation";

async function getVehicle(id) {
    await dbConnect();
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) return null;
    return JSON.parse(JSON.stringify(vehicle));
}

export default async function EditVehiclePage({ params }) {
    const { id } = await params;
    const vehicle = await getVehicle(id);

    if (!vehicle) {
        notFound();
    }

    return (
        <div className="pb-10">
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                    Edit <span className="text-blue-600">Vehicle</span>
                </h1>
                <p className="text-gray-500 mt-2 font-medium">Update vehicle details, pricing, and availability.</p>
            </div>
            <VehicleForm initialData={vehicle} isEdit={true} />
        </div>
    );
}
