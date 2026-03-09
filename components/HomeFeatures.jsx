"use client";

import { motion } from "framer-motion";
import { Star, Zap, Compass, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomeFeatures() {
    return (
        <>
            {/* Features Section */}
            <section className="py-12 md:py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Star size={24} />, title: "Best Prices", desc: "Premium experiences at competitive rates with zero hidden costs.", color: "blue" },
                            { icon: <Zap size={24} />, title: "Fast Booking", desc: "Instant confirmation and digital itinerary for your peace of mind.", color: "emerald" },
                            { icon: <Compass size={24} />, title: "Top Locations", desc: "Handpicked destinations by local Himalayan experts and guides.", color: "indigo" },
                            { icon: <Users size={24} />, title: "24/7 Support", desc: "Dedicated trip coordinators available round the clock during your trip.", color: "orange" }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                            >
                                <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-20 bg-gray-900 relative overflow-hidden rounded-[4rem] mx-4 mb-12 shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-10" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                            Ready for your next <span className="italic text-blue-500">Epic</span> Himachal journey?
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of explorers who have discovered the true spirit of the Himalayas with our luxury guided expeditions.
                        </p>
                        <Link href="/login" className="inline-flex items-center gap-3 bg-blue-600 text-white px-12 py-5 rounded-full font-black uppercase text-sm tracking-[0.2em] hover:bg-blue-500 hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-600/40">
                            Get Started Now <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
