
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Clock, Star, Calendar, CheckCircle } from "lucide-react";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import BookingForm from "@/components/BookingForm";
import Reviews from "@/components/Reviews";

async function getTour(slug) {
    await dbConnect();
    const tour = await Tour.findOne({ slug }).lean();
    if (!tour) return null;
    return JSON.parse(JSON.stringify(tour));
}

export default async function TourDetailsPage(props) {
    const params = await props.params;
    const tour = await getTour(params.slug);

    if (!tour) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Hero Header */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src={tour.images[0] || 'https://via.placeholder.com/1920x1080'}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{tour.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-gray-200">
                        <div className="flex items-center gap-1">
                            <MapPin size={18} className="text-blue-400" />
                            {tour.destination}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={18} className="text-blue-400" />
                            {tour.duration}
                        </div>
                        <div className="flex items-center gap-1">
                            <Star size={18} className="text-yellow-400 fill-yellow-400" />
                            {tour.rating} ({tour.numReviews} reviews)
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {tour.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h2>
                            <div className="space-y-6">
                                {tour.itinerary.map((item, index) => (
                                    <div key={index} className="flex gap-4 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                {item.day}
                                            </div>
                                            <div className="h-full w-0.5 bg-gray-100 my-2 group-last:hidden"></div>
                                        </div>
                                        <div className="pb-6">
                                            <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                                            <p className="text-gray-600">{item.details}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                                    <span className="text-gray-700">Accommodation in 4-star hotels</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                                    <span className="text-gray-700">Daily Breakfast & Dinner</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                                    <span className="text-gray-700">Professional Guide</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                                    <span className="text-gray-700">Transportation in AC vehicle</span>
                                </div>
                            </div>
                        </section>

                        <Reviews tourId={tour._id} />
                    </div>

                    {/* Sidebar - Booking Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <BookingForm tour={tour} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
