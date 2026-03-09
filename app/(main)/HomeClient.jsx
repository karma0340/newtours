"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, MapPin, Clock, Star, Compass, Zap, Check, Sparkles, ArrowRight, Calendar, Users, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic Loaded Modal
const TourDetailsModal = dynamic(() => import("@/components/TourDetailsModal"), { ssr: false });

export default function HomeClient({ featuredTours }) {
    const [selectedTour, setSelectedTour] = useState(null);

    return (
        <>
            <AnimatePresence>
                {selectedTour && (
                    <TourDetailsModal
                        pkg={selectedTour}
                        onClose={() => setSelectedTour(null)}
                        viewType="tour"
                        onBook={() => {
                            // Link to booking or handle as needed
                            window.location.href = `/tours/${selectedTour.slug}`;
                        }}
                    />
                )}
            </AnimatePresence>

            <section className="py-12 md:py-20 bg-gray-50 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3 block"
                            >
                                Experience More
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-black text-gray-900 leading-tight"
                            >
                                Popular <span className="text-blue-600">Destinations</span>
                            </motion.h2>
                        </div>
                        <Link href="/tours" className="group flex items-center justify-center w-full md:w-auto gap-3 bg-white px-8 py-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <span className="font-black uppercase tracking-widest text-xs text-gray-900">Explore All</span>
                            <ArrowRight size={18} className="text-blue-600 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredTours.map((tour, index) => (
                            <motion.div
                                key={tour._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
                            >
                                <div className="relative h-64 w-full overflow-hidden shrink-0 transform-gpu bg-gray-100">
                                    <Image
                                        src={tour.image || (tour.images && tour.images[0]) || '/images/hero/vehicle-default.jpg'}
                                        alt={tour.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 flex items-center gap-1 shadow-sm z-10">
                                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                        {tour.rating}
                                    </div>

                                    {tour.badge && (
                                        <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                            {tour.badge}
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 flex flex-col flex-grow w-full">
                                    <div className="flex items-center text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                                        <MapPin size={12} className="mr-1.5" />
                                        {tour.location || tour.destination}
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {tour.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {tour.description}
                                    </p>

                                    <div className="flex items-center gap-4 mb-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-blue-500" /> {tour.duration}</span>
                                        <span className="flex items-center gap-1.5"><Info size={14} className="text-blue-500" /> Tour Info</span>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Starting From</span>
                                            <span className="text-2xl font-black text-gray-900">
                                                {tour.price ? `₹${Number(tour.price).toLocaleString('en-IN')}` : 'Contact Us'}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setSelectedTour(tour)}
                                            className="bg-gray-50 hover:bg-blue-600 text-gray-900 hover:text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 border border-gray-100 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/20"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
