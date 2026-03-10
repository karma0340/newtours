import Link from "next/link";
import { Plus, Car, Users as UsersIcon } from "lucide-react";
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
        <div className="pb-10">
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

            {/* Responsive Vehicle List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                
                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-100">
                    {vehicles.map((v) => (
                        <div key={v._id} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                            <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-sm">
                                <Image src={v.images[0] || '/images/hero/vehicle-default.jpg'} alt={v.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-gray-900 truncate">{v.name}</h3>
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${v.available ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                        {v.available ? 'Live' : 'Out'}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                        <Car size={12} className="text-blue-500" />
                                        {v.type}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                        <UsersIcon size={12} className="text-purple-500" />
                                        {v.capacity}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase tracking-widest text-gray-400 font-black">
                                <th className="p-4 pl-8 font-black">Image</th>
                                <th className="p-4 font-black">Vehicle Name</th>
                                <th className="p-4 font-black">Type</th>
                                <th className="p-4 font-black">Capacity</th>
                                <th className="p-4 pr-8 text-right font-black">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {vehicles.map((v) => (
                                <tr key={v._id} className="hover:bg-gray-50/50 group">
                                    <td className="p-4 pl-8">
                                        <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-gray-100 shadow-sm border-2 border-white group-hover:scale-110 transition-transform">
                                            <Image src={v.images[0] || '/images/hero/vehicle-default.jpg'} alt={v.name} fill className="object-cover" />
                                        </div>
                                    </td>
                                    <td className="p-4 font-bold text-gray-900">{v.name}</td>
                                    <td className="p-4">
                                        <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                                            {v.type}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                                            <UsersIcon size={14} className="text-gray-400" />
                                            {v.capacity}
                                        </div>
                                    </td>
                                    <td className="p-4 pr-8 text-right">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${v.available ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                            {v.available ? 'Available' : 'Unavailable'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {vehicles.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Car size={32} className="text-gray-300" />
                        </div>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No vehicles in fleet.</p>
                        <Link href="/admin/vehicles/new" className="text-blue-600 text-sm font-bold mt-2 inline-block hover:underline">Add your first vehicle</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
