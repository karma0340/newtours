"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
    Mountain,
    Compass,
    SlidersHorizontal,
    ArrowRight,
    Loader2,
    Sparkles,
    Zap,
    Users,
    Star,
    Phone,
    Calendar,
} from "lucide-react";

// Modular Components
import PackageCard from "./PackageCard";
import CustomPackageForm from "./CustomPackageForm";

// Dynamic Loaded Modals
const BookingModal = dynamic(() => import("./BookingModal"), { ssr: false });
const TourDetailsModal = dynamic(() => import("./TourDetailsModal"), { ssr: false });

const packageTabs = [
    { id: "all", label: "All Packages" },
    { id: "popular", label: "Popular" },
    { id: "adventure", label: "Adventure" },
    { id: "spiritual", label: "Spiritual" },
    { id: "offbeat", label: "Offbeat" },
];

const TourPackages = ({ initialTours }) => {
    const [activeTab, setActiveTab] = useState("all");
    const [showCustom, setShowCustom] = useState(false);
    const [selectedDetailsPkg, setSelectedDetailsPkg] = useState(null);
    const [selectedBookingPkg, setSelectedBookingPkg] = useState(null);
    const [tours, setTours] = useState(initialTours || []);
    const [loading, setLoading] = useState(!initialTours);

    useEffect(() => {
        if (initialTours) return;
        const fetchTours = async () => {
            try {
                const res = await fetch('/api/tours');
                const data = await res.json();
                setTours(data);
            } catch (err) {
                console.error("Error fetching tours:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTours();
    }, [initialTours]);

    const filtered = useMemo(() => 
        activeTab === "all"
            ? tours
            : tours.filter((p) => p.category?.includes(activeTab)),
    [activeTab, tours]);

    if (loading) {
        return (
            <div className="py-24 bg-gray-50 flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    return (
        <section className="py-12 md:py-24 bg-gray-50 relative">
            <AnimatePresence>
                {selectedDetailsPkg && (
                    <TourDetailsModal 
                        pkg={selectedDetailsPkg} 
                        onClose={() => setSelectedDetailsPkg(null)} 
                        onBook={(pkg) => {
                            setSelectedDetailsPkg(null);
                            setSelectedBookingPkg(pkg);
                        }} 
                    />
                )}
                {selectedBookingPkg && (
                    <BookingModal pkg={selectedBookingPkg} onClose={() => setSelectedBookingPkg(null)} />
                )}
            </AnimatePresence>

            {/* Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-20 -translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="container mx-auto px-3 sm:px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-14">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 text-blue-600 font-bold tracking-widest uppercase text-sm mb-3"
                    >
                        <Mountain size={16} /> Himachal Pradesh Tours
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 mb-3 md:mb-4 leading-tight"
                    >
                        Our Tour Packages
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg"
                    >
                        Choose from our curated Himachal itineraries or let us craft a
                        fully personalized journey just for you.
                    </motion.p>
                </div>

                {/* Toggle: Predefined / Custom */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                    className="flex justify-center mb-10"
                >
                    <div className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-1 shadow-sm gap-1 w-full sm:w-auto">
                        <button
                            onClick={() => setShowCustom(false)}
                            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${!showCustom
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <Compass size={16} />
                            Predefined Packages
                        </button>
                        <button
                            onClick={() => setShowCustom(true)}
                            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${showCustom
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <SlidersHorizontal size={16} />
                            Build Custom Trip
                        </button>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!showCustom && (
                        <motion.div
                            key="predefined"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35 }}
                        >
                            {/* Filter Tabs */}
                            <div className="flex flex-wrap justify-center gap-1.5 mb-8 md:mb-10">
                                {packageTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-200 ${activeTab === tab.id
                                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Cards Grid */}
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
                            >
                                {filtered.map((pkg, i) => (
                                    <PackageCard
                                        key={pkg._id || i}
                                        pkg={pkg}
                                        index={i}
                                        onBook={(p) => setSelectedDetailsPkg(p)}
                                    />
                                ))}
                            </motion.div>

                            {/* View All CTA */}
                            <div className="text-center mt-14">
                                <Link
                                    href="/tours"
                                    className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 group"
                                >
                                    View All Tours
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    )}

                    {showCustom && (
                        <motion.div
                            key="custom"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35 }}
                            className="max-w-5xl mx-auto"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/4" />
                                        <SlidersHorizontal size={36} className="mb-4 text-blue-200" />
                                        <h3 className="text-2xl font-bold mb-3">Build Your Dream Trip</h3>
                                        <p className="text-blue-100 leading-relaxed">
                                            Have something specific in mind? Tell us your preferences
                                            and our Himachal travel experts will design a bespoke itinerary
                                            tailored just for you.
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                                        <h4 className="font-bold text-gray-900">Why Go Custom?</h4>
                                        {[
                                            { icon: <Zap size={16} className="text-orange-500" />, text: "Fully flexible dates & routes" },
                                            { icon: <Users size={16} className="text-blue-500" />, text: "Solo, couple, or large groups" },
                                            { icon: <Star size={16} className="text-yellow-500" />, text: "Handpicked stays & experiences" },
                                            { icon: <Phone size={16} className="text-green-500" />, text: "Expert guidance at every step" },
                                            { icon: <Calendar size={16} className="text-purple-500" />, text: "Plan months ahead or last-minute" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                                <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                                                    {item.icon}
                                                </div>
                                                {item.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:col-span-3 bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Sparkles size={20} className="text-blue-600" />
                                        Customize Your Itinerary
                                    </h3>
                                    <CustomPackageForm />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default TourPackages;
