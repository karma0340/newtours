import { motion } from "framer-motion";
import { MapPin, Clock, Users, Star, Check, ChevronRight } from "lucide-react";

const discount = (orig, price) => Math.round(((orig - price) / orig) * 100);

export default function PackageCard({ pkg, index, onBook }) {
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
            className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-100 transition-shadow duration-300 flex flex-col h-full ring-1 ring-gray-100/50"
        >
            <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden w-full shrink-0 transform-gpu z-10 bg-gray-100">
                <img
                    src={pkg.images?.[0] || pkg.image || '/images/hero/vehicle-default.jpg'}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {pkg.badge && (
                    <span className={`absolute top-4 left-4 ${pkg.badgeColor || 'bg-blue-600'} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}>
                        {pkg.badge}
                    </span>
                )}

                {pkg.originalPrice > pkg.price && (
                    <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {discount(pkg.originalPrice, pkg.price)}% OFF
                    </span>
                )}

                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-gray-800">{pkg.rating}</span>
                    <span className="text-xs text-gray-500">({pkg.numReviews || 0})</span>
                </div>
            </div>

            <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <div className="flex items-start gap-1 text-blue-600 text-xs font-semibold mb-2">
                    <MapPin size={12} className="mt-0.5 shrink-0" />
                    <span>{pkg.destination}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors leading-snug line-clamp-2">
                    {pkg.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                        <Clock size={13} className="text-blue-400" />
                        {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1">
                        <Users size={13} className="text-blue-400" />
                        {pkg.groupSize || 'Any'}
                    </span>
                </div>

                <ul className="space-y-1 mb-5 flex-grow">
                    {pkg.highlights?.slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 line-clamp-1">
                            <Check size={13} className="text-green-500 mt-0.5 shrink-0" />
                            {h}
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-5">
                    {pkg.inclusions?.slice(0, 3).map((inc, i) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-600 font-medium px-2 py-0.5 rounded-full border border-blue-100 whitespace-nowrap">
                            {inc}
                        </span>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100 mt-auto">
                    <div className="shrink-0">
                        {pkg.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                        )}
                        <div className="text-xl font-extrabold text-gray-900">
                            ₹{pkg.price?.toLocaleString()}
                            <span className="text-sm font-normal text-gray-500">/person</span>
                        </div>
                    </div>
                    <button
                        onClick={() => onBook(pkg)}
                        className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
                    >
                        Book Now <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
