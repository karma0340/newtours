"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Mountain,
    Map,
    Zap,
    Trees,
    Music,
    Infinity
} from 'lucide-react';

const categories = [
    {
        slug: "trekking",
        title: "Trekking",
        description: "Conquer high-altitude base camps and majestic peaks.",
        icon: <Mountain className="w-8 h-8" />,
        color: "bg-blue-500",
        lightColor: "bg-blue-50",
        textColor: "text-blue-600"
    },
    {
        slug: "adventure",
        title: "Adventure",
        description: "Feel the rush with paragliding, rafting, and skiing.",
        icon: <Zap className="w-8 h-8" />,
        color: "bg-orange-500",
        lightColor: "bg-orange-50",
        textColor: "text-orange-600"
    },
    {
        slug: "spiritual",
        title: "Spiritual",
        description: "Discover peace in ancient temples and monasteries.",
        icon: <Infinity className="w-8 h-8" />,
        color: "bg-purple-500",
        lightColor: "bg-purple-50",
        textColor: "text-purple-600"
    },
    {
        slug: "nature",
        title: "Nature",
        description: "Experience lush valleys, waterfalls, and pine forests.",
        icon: <Trees className="w-8 h-8" />,
        color: "bg-green-500",
        lightColor: "bg-green-50",
        textColor: "text-green-600"
    },
    {
        slug: "offbeat",
        title: "Offbeat",
        description: "Explore hidden gems like Spiti, Jibhi, and Zanskar.",
        icon: <Map className="w-8 h-8" />,
        color: "bg-teal-500",
        lightColor: "bg-teal-50",
        textColor: "text-teal-600"
    },
    {
        slug: "culture",
        title: "Culture",
        description: "Immerse yourself in local traditions and festivals.",
        icon: <Music className="w-8 h-8" />,
        color: "bg-rose-500",
        lightColor: "bg-rose-50",
        textColor: "text-rose-600"
    }
];

const Categories = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Gradients */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3 block"
                    >
                        Explore Himachal
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Find Your Next Adventure
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto text-lg"
                    >
                        From snow-capped peaks to tranquil spiritual retreats, choose the experience that moves your soul.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer"
                        >
                            <Link href={`/categories/${category.slug}`} className="block h-full">
                                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm group-hover:shadow-2xl group-hover:border-blue-100 transition-all duration-300 h-full relative overflow-hidden">
                                    {/* Hover Background Accent */}
                                    <div className={`absolute top-0 right-0 w-24 h-24 ${category.lightColor} rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                    <div className={`w-16 h-16 ${category.lightColor} ${category.textColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                                        {category.icon}
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">
                                        {category.title}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
                                        {category.description}
                                    </p>

                                    <div className="flex items-center gap-1 text-sm font-bold text-blue-600 group-hover:gap-2 transition-all duration-300 relative z-10">
                                        Explore Destinations
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;

