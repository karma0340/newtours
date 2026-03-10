import Link from "next/link";
import { Plus, MapPin, Tag } from "lucide-react";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import Image from "next/image";
import TourActions from "@/components/admin/TourActions";
import RefreshButton from "@/components/admin/RefreshButton";

async function getTours() {
    await dbConnect();
    const tours = await Tour.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(tours));
}

export default async function AdminToursPage() {
    const tours = await getTours();

    return (
        <div className="pb-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                        Manage <span className="text-blue-600">Tours</span>
                    </h1>
                </div>
                <div className="flex gap-3">
                    <RefreshButton />
                    <Link href="/admin/tours/new" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2">
                        <Plus size={16} />
                        Add New Tour
                    </Link>
                </div>
            </div>

            {/* Responsive List: Table on Desktop, Cards on Mobile */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                
                {/* Mobile Card View (Hidden on Tablet/Desktop) */}
                <div className="md:hidden divide-y divide-gray-100">
                    {tours.map((tour) => (
                        <div key={tour._id} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                            <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-sm">
                                <Image src={tour.images[0] || '/images/hero/vehicle-default.jpg'} alt={tour.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 truncate mb-1">{tour.title}</h3>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                        <Tag size={12} className="text-blue-500" />
                                        ₹{tour.price.toLocaleString()}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                        <MapPin size={12} className="text-rose-500" />
                                        {tour.destination}
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</span>
                                    <TourActions tourId={tour._id.toString()} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table View (Hidden on Mobile) */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase tracking-widest text-gray-400 font-black">
                                <th className="p-4 pl-8">Image</th>
                                <th className="p-4">Tour Details</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Location</th>
                                <th className="p-4 pr-8 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium">
                            {tours.map((tour) => (
                                <tr key={tour._id} className="hover:bg-gray-50/50 group">
                                    <td className="p-4 pl-8">
                                        <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-gray-100 shadow-sm border-2 border-white group-hover:scale-110 transition-transform">
                                            <Image src={tour.images[0] || '/images/hero/vehicle-default.jpg'} alt={tour.title} fill className="object-cover" />
                                        </div>
                                    </td>
                                    <td className="p-4 font-bold text-gray-900">{tour.title}</td>
                                    <td className="p-4 text-gray-600 font-black">₹{tour.price.toLocaleString()}</td>
                                    <td className="p-4 text-gray-500 flex items-center gap-1.5 mt-4">
                                        <MapPin size={14} className="text-rose-500" />
                                        {tour.destination}
                                    </td>
                                    <td className="p-4 pr-8 text-right">
                                        <TourActions tourId={tour._id.toString()} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {tours.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus size={32} className="text-gray-300" />
                        </div>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No tours found.</p>
                        <Link href="/admin/tours/new" className="text-blue-600 text-sm font-bold mt-2 inline-block hover:underline">Create your first tour package</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
