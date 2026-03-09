
import Link from "next/link";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import TourHero from "@/components/TourHero";
import TourCard from "@/components/TourCard";

// Force dynamic rendering to ensure we get the latest data
export const dynamic = 'force-dynamic';

async function getTours(searchParams) {
    await dbConnect();

    const query = {};
    if (searchParams?.destination) {
        query.destination = { $regex: searchParams.destination, $options: 'i' };
    }

    const tours = await Tour.find(query).lean();
    
    // Performance: Manual serialization is faster than JSON.parse(JSON.stringify())
    // Also serialize nested sub-document _ids (e.g. itinerary items)
    const serializeSubDoc = (sub) => sub?._id
        ? { ...sub, _id: sub._id.toString() }
        : sub;

    return tours.map(tour => ({
        ...tour,
        _id: tour._id.toString(),
        createdAt: tour.createdAt?.toISOString(),
        updatedAt: tour.updatedAt?.toISOString(),
        startDate: tour.startDate?.toISOString?.() ?? tour.startDate ?? null,
        itinerary: Array.isArray(tour.itinerary) ? tour.itinerary.map(serializeSubDoc) : [],
    }));
}

export default async function ToursPage(props) {
    const searchParams = await props.searchParams;
    const tours = await getTours(searchParams);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <TourHero />

            <div className="container mx-auto px-4 py-8">
                {/* Results Count */}
                <div className="bg-white p-6 rounded-[2rem] shadow-sm mb-12 flex flex-col md:flex-row gap-4 items-center justify-between border border-gray-100">
                    <div className="text-gray-900 font-bold tracking-tight px-4">
                        We found <span className="text-blue-600">{tours?.length || 0}</span> legendary journeys for you
                    </div>
                </div>

                {!tours || tours.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">No tours found matching your criteria.</h3>
                        <p className="text-gray-500 font-medium mb-8">Try zooming out or searching for a different valley.</p>
                        <Link href="/tours" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                            Clear all filters
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {tours.map((tour, index) => (
                            <TourCard key={tour._id} tour={tour} priority={index < 2} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
