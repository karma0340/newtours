
import Link from "next/link";
import { Plus } from "lucide-react";
import dbConnect from "@/lib/db";
import Vehicle from "@/models/Vehicle";
import Image from "next/image";
import RefreshButton from "@/components/admin/RefreshButton";

async function getVehicles() {
    await dbConnect();
    const vehicles = await Vehicle.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(vehicles));
}

export default async function AdminVehiclesPage() {
    const vehicles = await getVehicles();

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                        Manage <span className="text-blue-600">Vehicles</span>
                    </h1>
                </div>
                <div className="flex gap-3">
                    <RefreshButton />
                    <Link href="/admin/vehicles/new" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2">
                        <Plus size={16} />
                        Add New Vehicle
                    </Link>
                </div>
            </div>

            {/* Table UI */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                                <th className="p-4">Image</th>
                                <th className="p-4">Vehicle</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Capacity</th>
                                <th className="p-4 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {vehicles.map((v) => (
                                <tr key={v._id} className="hover:bg-gray-50/50">
                                    <td className="p-4">
                                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100">
                                            <Image src={v.images[0] || '/images/hero/vehicle-default.jpg'} alt={v.name} fill className="object-cover" />
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-gray-900">{v.name}</td>
                                    <td className="p-4 text-gray-600 text-xs font-bold">{v.type}</td>
                                    <td className="p-4 text-gray-600 text-xs font-bold">{v.capacity}</td>
                                    <td className="p-4 text-right">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${v.available ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                            {v.available ? 'Available' : 'Unavailable'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
