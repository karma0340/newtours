
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, DollarSign, Star } from "lucide-react";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";

// Force dynamic rendering to ensure we get the latest data
export const dynamic = 'force-dynamic';

async function getTours(searchParams) {
    await dbConnect();

    const query = {};
    if (searchParams?.destination) {
        query.destination = { $regex: searchParams.destination, $options: 'i' };
    }

    const tours = await Tour.find(query).lean();
    return JSON.parse(JSON.stringify(tours));
}

export default async function ToursPage(props) {
    const searchParams = await props.searchParams;
    const tours = await getTours(searchParams);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-blue-900 py-16 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <h1 className="text-4xl font-bold relative z-10">Explore Our Tours</h1>
                <p className="mt-4 text-blue-200 relative z-10">Find your next perfect getaway</p>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Filters - Basic implementation for now */}
                <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="text-gray-600 font-medium">
                        Showing {tours.length} results
                    </div>
                    {/* Add more complex filters here later */}
                </div>

                {tours.length === 0 ? (
                    <div className="text-center py-20">
                        <h3 className="text-xl text-gray-600 mb-4">No tours found matching your criteria.</h3>
                        <Link href="/tours" className="text-blue-600 hover:underline">Clear filters</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tours.map((tour) => (
                            <div key={tour._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-start group">
                                <div className="relative h-60 w-full overflow-hidden">
                                    <Image
                                        src={tour.images[0] || 'https://via.placeholder.com/800x600'}
                                        alt={tour.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {tour.featured && (
                                        <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wider">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                <div className="p-6 w-full flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                                            <Link href={`/tours/${tour.slug}`}>{tour.title}</Link>
                                        </h2>
                                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm font-bold text-yellow-700">{tour.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                        <MapPin size={16} className="mr-1 text-gray-400" />
                                        {tour.destination}
                                    </div>

                                    <p className="text-gray-600 text-sm line-clamp-2 mb-6 flex-1">
                                        {tour.description}
                                    </p>

                                    <div className="space-y-3 pt-4 border-t border-gray-100 w-full">
                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-blue-500" />
                                                {tour.duration}
                                            </div>
                                            <div className="flex items-center gap-1 font-bold text-gray-900 text-lg">
                                                <span className="text-blue-600 text-sm">$</span>{tour.price}
                                            </div>
                                        </div>

                                        <Link
                                            href={`/tours/${tour.slug}`}
                                            className="block w-full text-center bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
