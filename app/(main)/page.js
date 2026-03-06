
"use client";

import Link from "next/link";
<<<<<<< HEAD
import { Search, MapPin, Calendar, Users, Star, X, Clock, Compass, Sparkles, Check, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Categories from "../../components/Categories";
import TourPackages from "../../components/TourPackages";
import { useSession } from "next-auth/react";

// ─── TourDetailsModal ─────────────────────────────────────────────────────────

const TourDetailsModal = ({ tour, onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors backdrop-blur-md text-white">
                    <X size={24} />
                </button>

                <div className="overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {/* Header Image */}
                    <div className="relative h-64 sm:h-96 w-full">
                        <Image src={tour.image} alt={tour.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                        <div className="absolute bottom-10 left-10 right-10">
                            <span className="inline-block bg-blue-600 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-lg shadow-blue-600/30">Top Destination</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">{tour.title}</h2>
                            <div className="flex flex-wrap gap-6 text-gray-200 text-sm font-medium">
                                <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm"><MapPin size={16} className="text-blue-400" /> {tour.location}</span>
                                <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm"><Clock size={16} className="text-blue-400" /> {tour.duration || "5-7 Days"}</span>
                                <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm"><Star size={16} className="text-yellow-400 fill-yellow-400" /> {tour.rating}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-10 space-y-12">
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
                                <Compass size={24} className="text-blue-600" /> Voyage Overview
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-xl">
                                {tour.description} This curated itinerary is designed to immerse you in the authentic spirit of {tour.title.split(',')[0]}, balancing iconic landmarks with hidden local gems.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                                    <Zap size={22} className="text-orange-500" /> Hidden Highlights
                                </h3>
                                <ul className="space-y-4">
                                    {["VIP skip-the-line access", "Private local photography guide", "Curated dinner in a secret location", "Luxury boutique stay"].map((h, i) => (
                                        <li key={i} className="flex items-start gap-4 text-gray-700 text-lg">
                                            <div className="w-7 h-7 bg-green-50 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-green-100">
                                                <Check size={16} className="text-green-600" />
                                            </div>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                                    <Sparkles size={22} className="text-blue-500" /> What's Included
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {["5* Accommodation", "Fine Dining Credits", "Airport Transfers", "Cultural Pass", "English Host", "Health Assist"].map((inc, i) => (
                                        <div key={i} className="bg-gray-50 text-gray-700 text-sm font-bold p-3 rounded-2xl border border-gray-100 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                            {inc}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Bottom CTA */}
                        <div className="bg-gradient-to-br from-gray-900 to-blue-900 p-8 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                            <div>
                                <p className="text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-2">Exquisite Package Price</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black">${tour.price}</span>
                                    <span className="text-blue-300 font-medium">/ person</span>
                                </div>
                            </div>
                            <Link
                                href={`/tours/${tour.slug}`}
                                className="bg-white text-gray-900 hover:bg-blue-600 hover:text-white px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center gap-3 group"
                            >
                                View Full Itinerary
                                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default function Home() {
    const { data: session } = useSession();
    const [selectedTour, setSelectedTour] = useState(null);
    const [destination, setDestination] = useState("");
=======
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users, Star } from "lucide-react";
import Image from "next/image";

export default function Home() {
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
    const featuredTours = [
        {
            id: 1,
            title: "Paris, France",
            slug: "paris-explorer",
            image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=800&auto=format&fit=crop",
            location: "Europe",
            description: "Experience the magic of Paris with our customized 5-day tour package including accommodation and guided tours.",
            price: "1,299",
            rating: 4.8
        },
        {
            id: 2,
            title: "Tokyo, Japan",
            slug: "tokyo-adventure",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
            location: "Asia",
            description: "Experience the perfect blend of tradition and future in Tokyo with our comprehensive 7-day tour.",
            price: "1,599",
            rating: 4.9
        },
        {
            id: 3,
            title: "Bali, Indonesia",
            slug: "bali-bliss",
            image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
            location: "Indonesia",
            description: "Relax on the beautiful beaches of Bali with our exclusive 6-day tour package.",
            price: "899",
            rating: 4.7
        }
    ];

    return (
        <div className="bg-white">
<<<<<<< HEAD
            <AnimatePresence>
                {selectedTour && (
                    <TourDetailsModal tour={selectedTour} onClose={() => setSelectedTour(null)} />
                )}
            </AnimatePresence>
=======
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
                        alt="Travel Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
                    >
                        Explore the World <br /> with <span className="text-blue-400">NewTours</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
                    >
                        Discover new places and experiences. Book your dream vacation today with our exclusive travel packages.
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 max-w-4xl mx-auto"
                    >
                        <div className="bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2">
                            <div className="flex-1 flex items-center px-4 py-2 bg-gray-50 rounded-xl">
                                <MapPin className="text-blue-500 mr-2" size={20} />
                                <input
                                    type="text"
                                    placeholder="Where do you want to go?"
<<<<<<< HEAD
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const params = new URLSearchParams();
                                            if (destination) params.set('destination', destination);
                                            window.location.href = `/tours?${params.toString()}`;
                                        }
                                    }}
=======
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                                    className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                                />
                            </div>

                            <div className="flex-1 flex items-center px-4 py-2 bg-gray-50 rounded-xl">
                                <Calendar className="text-blue-500 mr-2" size={20} />
                                <input
                                    type="date"
                                    className="w-full bg-transparent outline-none text-gray-700"
                                />
                            </div>

                            <div className="flex-1 flex items-center px-4 py-2 bg-gray-50 rounded-xl">
                                <Users className="text-blue-500 mr-2" size={20} />
                                <select className="w-full bg-transparent outline-none text-gray-700">
                                    <option value="">Guests</option>
                                    <option value="1">1 Person</option>
                                    <option value="2">2 Persons</option>
                                    <option value="4">4+ Persons</option>
                                </select>
                            </div>

<<<<<<< HEAD
                            <button
                                onClick={() => {
                                    const params = new URLSearchParams();
                                    if (destination) params.set('destination', destination);
                                    window.location.href = `/tours?${params.toString()}`;
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center border-none cursor-pointer"
                            >
                                Search
                            </button>
=======
                            <Link href="/tours" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center">
                                Search
                            </Link>
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                        </div>
                    </motion.div>
                </div>
            </section>

<<<<<<< HEAD
            {/* Categories Section */}
            <Categories />

            {/* Tour Packages Section */}
            <TourPackages />

=======
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
            {/* Featured Destinations */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Explore our top-rated tours and find the perfect getaway for your next adventure.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredTours.map((tour) => (
<<<<<<< HEAD
                            <div key={tour.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-start h-full">
                                <div className="relative h-64 w-full overflow-hidden">
=======
                            <div key={tour.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="relative h-64 overflow-hidden">
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                                    <Image
                                        src={tour.image}
                                        alt={tour.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 flex items-center gap-1 shadow-sm">
                                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                        {tour.rating}
                                    </div>
                                </div>
<<<<<<< HEAD
                                <div className="p-6 flex flex-col flex-1 w-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
=======
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                                            {tour.title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                        <MapPin size={14} className="mr-1" />
                                        {tour.location}
                                    </div>
<<<<<<< HEAD
                                    <p className="text-gray-600 mb-6 line-clamp-2 flex-1">
                                        {tour.description}
                                    </p>
                                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 lg:flex-row lg:items-center lg:justify-between">
=======
                                    <p className="text-gray-600 mb-6 line-clamp-2">
                                        {tour.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500">Starting from</span>
                                            <span className="text-lg font-bold text-blue-600">${tour.price}</span>
                                        </div>
<<<<<<< HEAD
                                        <button
                                            onClick={() => setSelectedTour(tour)}
                                            className="flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors w-full lg:w-auto"
                                        >
                                            View Details
                                        </button>
=======
                                        <Link href={`/tours/${tour.slug}`} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                                            View Details
                                        </Link>
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/tours" className="inline-flex items-center justify-center px-8 py-3 border border-gray-200 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                            View All Tours
                        </Link>
                    </div>
                </div>
            </section>

<<<<<<< HEAD

=======
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-6 bg-blue-50 rounded-2xl">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                                <Star size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Best Prices</h3>
                            <p className="text-gray-600">We offer the best prices for all our tour packages with no hidden fees.</p>
                        </div>
                        <div className="p-6 bg-green-50 rounded-2xl">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                                <Calendar size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Booking</h3>
                            <p className="text-gray-600">Secure your spot in minutes with our easy-to-use booking system.</p>
                        </div>
                        <div className="p-6 bg-purple-50 rounded-2xl">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                                <MapPin size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Top Locations</h3>
                            <p className="text-gray-600">Choose from hundreds of destinations around the globe.</p>
                        </div>
                        <div className="p-6 bg-orange-50 rounded-2xl">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
                            <p className="text-gray-600">Our support team is available around the clock to assist you.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready for your next adventure?</h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">Join thousands of travelers who have found their perfect trip with NewTours. Sign up today to get exclusive offers.</p>
<<<<<<< HEAD
                    <Link href={session ? "/tours" : "/login"} className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/50">
=======
                    <Link href="/login" className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/50">
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                        Get Started
                    </Link>
                </div>
            </section>
        </div>
    );
}
