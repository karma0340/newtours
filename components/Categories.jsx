"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Mountain, Map, Zap, Trees, Music, Infinity,
    Camera, Compass, Globe, Sun, Star, Heart
} from 'lucide-react';

// Icon map — matches the icon names stored in DB
const ICON_MAP = {
    Mountain, Map, Zap, Trees, Music, Infinity,
    Camera, Compass, Globe, Sun, Star, Heart,
};

const Categories = ({ categories = [] }) => {
    if (categories.length === 0) return null;

    return (
        <section className="py-12 md:py-16 bg-gray-50 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-14">
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
                        className="text-gray-500 max-w-xl mx-auto text-base"
                    >
                        From snow-capped peaks to tranquil spiritual retreats, choose the experience that moves your soul.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => {
                        const IconComponent = ICON_MAP[category.icon] || Map;
                        return (
                            <motion.div
                                key={category._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="group cursor-pointer"
                            >
                                <Link href={`/categories/${category.slug}`} className="block">
                                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                                        {/* Background Image */}
                                        {category.image ? (
                                            <Image
                                                src={category.image}
                                                alt={category.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700" />
                                        )}

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

                                        {/* Content */}
                                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                            <div className="mb-3">
                                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm text-white border border-white/30">
                                                    <IconComponent size={20} />
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-black text-white mb-1 tracking-tight">
                                                {category.title}
                                            </h3>
                                            <p className="text-white/75 text-sm leading-relaxed mb-3 line-clamp-2">
                                                {category.description}
                                            </p>
                                            <span className="inline-flex items-center gap-1 text-white text-xs font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 group-hover:gap-2 transition-all duration-300">
                                                Explore →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Categories;
