"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HeroSlider from "./HeroSlider";

export default function TourHero() {
    return (
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
            <HeroSlider opacity="opacity-70" overlayColor="from-black/60 via-black/30 to-gray-50/50" />

            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 backdrop-blur-md border border-white/10 text-blue-400 text-xs font-black uppercase tracking-[0.2em]">
                        Find Your Adventure
                    </span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight"
                >
                    Explore <span className="text-blue-500">Himachal</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-gray-200 text-sm md:text-base max-w-xl mx-auto font-bold uppercase tracking-widest"
                >
                    Handpicked journeys through the peaks and valleys
                </motion.p>
            </div>

            {/* Back Link */}
            <div className="absolute top-8 left-8 z-20 hidden md:block">
                <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-bold hover:bg-white/20 transition-all border border-white/20 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Go Back
                </Link>
            </div>
        </section>
    );
}
