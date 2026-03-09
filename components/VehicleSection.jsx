"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Loader2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import VehicleCard from './VehicleCard';

// Lazy load vehicle inquiry modal
const VehicleInquiryModal = dynamic(() => import('./VehicleInquiryModal'), {
    loading: () => <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-md flex items-center justify-center"><Loader2 className="animate-spin text-white" size={40} /></div>,
    ssr: false
});

const VehicleSection = ({ initialVehicles }) => {
    const [vehicles, setVehicles] = useState(initialVehicles || []);
    const [loading, setLoading] = useState(!initialVehicles);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    useEffect(() => {
        if (initialVehicles) return;
        const fetchVehicles = async () => {
            try {
                const res = await fetch('/api/vehicles');
                const data = await res.json();
                setVehicles(data.slice(0, 6)); // Show top 6
            } catch (error) {
                console.error("Failed to fetch vehicles", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, [initialVehicles]);

    if (loading) return null;
    if (vehicles.length === 0) return null;

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-20 -translate-y-1/2" />
            
            <AnimatePresence>
                {selectedVehicle && (
                    <VehicleInquiryModal 
                        vehicle={selectedVehicle} 
                        onClose={() => setSelectedVehicle(null)} 
                    />
                )}
            </AnimatePresence>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4"
                        >
                            <div className="w-8 h-px bg-blue-600" />
                            Premium Himachal Fleet
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight"
                        >
                            Explore Mountains in <br /> <span className="text-blue-600 italic">Ultimate Comfort</span>
                        </motion.h2>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100">
                            <ShieldCheck size={18} className="text-emerald-500" /> Verified Drivers
                        </div>
                        <Link href="/vehicles" className="group flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-blue-600/20 transition-all duration-500 hover:bg-blue-600">
                            <span className="font-black uppercase tracking-widest text-xs">View Full Fleet</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                >
                    {vehicles.map((vehicle, index) => (
                        <div key={vehicle._id || index} className="group">
                            <VehicleCard
                                vehicle={vehicle}
                                index={index}
                                onInquire={(v) => setSelectedVehicle(v)}
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Trust Badges */}
                <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                    {["Sanitized Daily", "GPS Tracked", "All India Permit", "Dual AC System", "Emergency Support"].map((badge, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                            <Zap size={14} className="text-blue-600" />
                            {badge}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VehicleSection;
