
import Link from "next/link";
import { Plus } from "lucide-react";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import Image from "next/image";
import TourActions from "@/components/TourActions";
import RefreshButton from "@/components/RefreshButton";

async function getTours() {
    await dbConnect();
    const tours = await Tour.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(tours));
}

export default async function AdminToursPage() {
    const tours = await getTours();

    return (
        <div>
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

            {/* Table UI */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                                <th className="p-4">Image</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Location</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tours.map((tour) => (
                                <tr key={tour._id} className="hover:bg-gray-50/50">
                                    <td className="p-4">
                                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100">
                                            <Image src={tour.images[0] || 'https://via.placeholder.com/150'} alt={tour.title} fill className="object-cover" />
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-gray-900">{tour.title}</td>
                                    <td className="p-4 text-gray-600">${tour.price}</td>
                                    <td className="p-4 text-gray-600">{tour.destination}</td>
                                    <td className="p-4 text-right">
                                        <TourActions tourId={tour._id.toString()} />
                                    </td>
                                </tr>
                            ))}
                            {tours.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">
                                        No tours found. Create one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
