"use client";

import { motion } from "framer-motion";
import { Users, Briefcase } from "lucide-react";

export default function VehicleCard({ vehicle, index, onInquire }) {
    const isLeft = index % 3 === 0;
    const isRight = index % 3 === 2;
    const initialX = isLeft ? -50 : isRight ? 50 : 0;
    const initialY = !isLeft && !isRight ? 50 : 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: initialX, y: initialY }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: index * 0.1, type: "spring", stiffness: 70, damping: 15 }}
            className="bg-white rounded-[2.5rem] p-4 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full"
        >
            <div className="relative h-56 w-full shrink-0 rounded-[2rem] overflow-hidden mb-6 transform-gpu bg-gray-100 z-10">
                <img
                    src={vehicle.images?.[0] || '/images/hero/vehicle-default.jpg'}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm z-20">
                    <span className="text-[10px] font-black uppercase text-blue-600">{vehicle.type}</span>
                </div>
            </div>

            <div className="px-4 pb-4 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {vehicle.name}
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-8 flex-grow">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                            <Users size={14} />
                        </div>
                        <span className="text-xs font-bold text-gray-500">{vehicle.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                            <Briefcase size={14} />
                        </div>
                        <span className="text-xs font-bold text-gray-500">AC / Carrier</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Vehicle Status</span>
                        <span className="text-sm font-black text-emerald-600 uppercase">Available</span>
                    </div>
                    <button
                        onClick={() => onInquire(vehicle)}
                        className="bg-gray-900 text-white px-6 py-3 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors text-[10px] font-black uppercase tracking-widest cursor-pointer border-none"
                    >
                        Inquire
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
