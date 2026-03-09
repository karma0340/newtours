"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Star, Clock, ArrowLeft } from "lucide-react";

export default function TourCard({ tour }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col items-start group relative"
        >
            <div className="relative h-72 w-full overflow-hidden">
                <img
                    src={tour.images?.[0] || '/images/hero/vehicle-default.jpg'}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {tour.featured && (
                    <span className="absolute top-6 left-6 bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg">
                        Featured
                    </span>
                )}

                <div className="absolute bottom-6 left-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-blue-400" />
                        <span className="text-xs font-bold">{tour.destination}</span>
                    </div>
                </div>
            </div>

            <div className="p-8 w-full flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                        <Link href={`/tours/${tour.slug}`}>{tour.title}</Link>
                    </h2>
                    <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1 rounded-full shrink-0">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-black text-yellow-700">{tour.rating}</span>
                    </div>
                </div>

                <p className="text-gray-500 text-sm font-medium line-clamp-2 mb-8 flex-1 leading-relaxed">
                    {tour.description}
                </p>

                <div className="space-y-6 pt-6 border-t border-gray-100 w-full mt-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full text-gray-600 font-bold text-xs">
                            <Clock size={14} className="text-blue-500" />
                            {tour.duration}
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">from</span>
                            <span className="text-2xl font-black text-gray-900 leading-none" suppressHydrationWarning>₹{Number(tour.price).toLocaleString()}</span>
                        </div>
                    </div>

                    <Link
                        href={`/tours/${tour.slug}`}
                        className="group/btn relative flex items-center justify-center gap-3 w-full bg-gray-900 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] overflow-hidden transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-600/30 active:scale-[0.98]"
                    >
                        View Details
                        <ArrowLeft size={16} className="rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
