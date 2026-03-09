"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VehicleCard from "@/components/VehicleCard";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Car, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const VehicleInquiryModal = dynamic(() => import("@/components/VehicleInquiryModal"), {
    loading: () => <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-md flex items-center justify-center"><Loader2 className="animate-spin text-white" size={40} /></div>,
    ssr: false
});

export default function VehiclesPageClient({ initialVehicles }) {
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <AnimatePresence>
                {selectedVehicle && (
                    <VehicleInquiryModal 
                        vehicle={selectedVehicle} 
                        onClose={() => setSelectedVehicle(null)} 
                    />
                )}
            </AnimatePresence>

            <section className="relative h-[45vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gray-900">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero/about.jpg"
                        alt="Himachal Road Trip"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-gray-50" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="mb-6 flex justify-center">
                        <motion.div 
                            initial={{ rotate: 12, opacity: 0 }}
                            animate={{ rotate: 15, opacity: 1 }}
                            className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-blue-600/40 rotate-12 group hover:rotate-0 transition-transform duration-500"
                        >
                            <Car size={32} />
                        </motion.div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tight">
                        Premium <span className="text-blue-500 italic">Fleet</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed uppercase tracking-widest">
                        Reliable transport for your himachal adventure
                    </p>
                </div>

                <div className="absolute top-8 left-8 z-20 hidden md:block">
                    <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-bold hover:bg-white/20 transition-all border border-white/20 group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </Link>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
                        <h4 className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-2">Service Quality</h4>
                        <p className="text-2xl font-black text-gray-900 leading-tight">Expert Local Drivers</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
                        <h4 className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-2">Fleet Size</h4>
                        <p className="text-2xl font-black text-blue-600 leading-tight">20+ Modern Vehicles</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
                        <h4 className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-2">Support</h4>
                        <p className="text-2xl font-black text-gray-900 leading-tight">24/7 Road Assistance</p>
                    </div>
                </div>

                {initialVehicles.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-[3.5rem] border border-dashed border-gray-200">
                        <Car size={48} className="text-gray-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Expanding Our Fleet</h3>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">New vehicles arriving shortly in Shimla & Manali</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {initialVehicles.map((vehicle, index) => (
                            <VehicleCard 
                                key={vehicle._id} 
                                vehicle={vehicle} 
                                index={index} 
                                onInquire={(v) => setSelectedVehicle(v)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
