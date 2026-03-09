
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Star, ArrowLeft, Mountain, Zap, Infinity, Trees, Map, Music } from "lucide-react";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import { notFound } from "next/navigation";

// Category configuration
const categoryData = {
    trekking: {
        title: "Trekking Adventures",
        description: "Conquer high-altitude base camps and majestic peaks in the Himalayas.",
        icon: <Mountain className="w-12 h-12" />,
        color: "from-blue-600 to-indigo-800",
        bgPattern: ""
    },
    adventure: {
        title: "Action & Adventure",
        description: "Feel the rush with paragliding, river rafting, and mountain skiing.",
        icon: <Zap className="w-12 h-12" />,
        color: "from-orange-500 to-red-700",
        bgPattern: ""
    },
    spiritual: {
        title: "Spiritual Journeys",
        description: "Discover inner peace in ancient temples, monasteries, and sacred valleys.",
        icon: <Infinity className="w-12 h-12" />,
        color: "from-purple-600 to-deep-purple-900",
        bgPattern: ""
    },
    nature: {
        title: "Nature & Wilderness",
        description: "Experience lush valleys, cascading waterfalls, and serene pine forests.",
        icon: <Trees className="w-12 h-12" />,
        color: "from-green-500 to-teal-800",
        bgPattern: ""
    },
    offbeat: {
        title: "Offbeat Explorations",
        description: "Explore hidden gems and remote cultures like Spiti, Jibhi, and Zanskar.",
        icon: <Map className="w-12 h-12" />,
        color: "from-teal-500 to-blue-900",
        bgPattern: ""
    },
    culture: {
        title: "Cultural Immersion",
        description: "Immerse yourself in local traditions, festivals, and Himalayan lifestyle.",
        icon: <Music className="w-12 h-12" />,
        color: "from-rose-500 to-pink-900",
        bgPattern: ""
    }
};

async function getToursByCategory(categorySlug) {
    await dbConnect();

    // Find tours that have this category slug in their category array
    const tours = await Tour.find({
        category: { $in: [categorySlug] }
    }).lean();

    return JSON.parse(JSON.stringify(tours));
}

export default async function CategoryPage({ params }) {
    const { slug } = await params;
    const category = categoryData[slug];

    if (!category) {
        notFound();
    }

    const tours = await getToursByCategory(slug);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className={`bg-gradient-to-br ${category.color} pt-24 pb-32 text-center text-white relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('${category.bgPattern}')` }}></div>

                {/* Back Link */}
                <div className="absolute top-10 left-8 z-20">
                    <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-bold hover:bg-white/20 transition-all border border-white/20 group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
                    <div className="mb-6 p-4 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl">
                        {category.icon}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">{category.title}</h1>
                    <p className="text-blue-100 max-w-2xl text-lg font-medium opacity-90">{category.description}</p>
                </div>

                {/* Decorative Wave */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 fill-gray-50">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.15,130,121,210.35,116.79,268.08,113.78,300,105,321.39,56.44Z"></path>
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {/* Results Count & Filter Info */}
                <div className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 mb-12 flex flex-col md:flex-row gap-6 items-center justify-between border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className={`w-2 h-10 rounded-full bg-gradient-to-b ${category.color}`} />
                        <div>
                            <span className="text-gray-400 text-xs font-black uppercase tracking-widest">Adventure results</span>
                            <h3 className="text-xl font-bold text-gray-900">Found {tours.length} Experiences</h3>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/tours" className="px-6 py-2.5 bg-gray-50 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
                            All Tours
                        </Link>
                        <Link href="/contact" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                            Custom Package
                        </Link>
                    </div>
                </div>

                {tours.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-[3rem] shadow-sm border border-gray-100">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Map className="text-gray-300" size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">No tours found in this category.</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">We're currently preparing new adventures for this category. Stay tuned or explore our other destinations.</p>
                        <Link href="/tours" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline group">
                            Explore all available tours
                            <ArrowLeft size={18} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tours.map((tour) => (
                            <Link key={tour._id} href={`/tours/${tour.slug}`} className="group h-full">
                                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <Image
                                            src={tour.images?.[0] || tour.image || '/images/hero/vehicle-default.jpg'}
                                            alt={tour.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {tour.featured && (
                                            <span className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-lg">
                                                Featured
                                            </span>
                                        )}

                                        <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-2xl shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm font-black text-gray-900">{tour.rating}</span>
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-3">
                                            <MapPin size={14} />
                                            {tour.destination.split(',')[0]}
                                        </div>

                                        <h2 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                                            {tour.title}
                                        </h2>

                                        <p className="text-gray-500 text-sm line-clamp-2 mb-8 flex-1 leading-relaxed">
                                            {tour.description}
                                        </p>

                                        <div className="space-y-6 pt-6 border-t border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Duration</span>
                                                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                                                        <Clock size={16} className="text-blue-600" />
                                                        {tour.duration}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Starting from</span>
                                                    <span className="text-2xl font-black text-blue-600">₹{tour.price.toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <div className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 group-hover:bg-blue-600 transition-colors duration-300">
                                                View Journey
                                                <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
