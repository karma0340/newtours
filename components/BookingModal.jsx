import { motion } from "framer-motion";
import { X, Sparkles, Clock, Users, MapPin, Compass } from "lucide-react";
import CustomPackageForm from "./CustomPackageForm";
import { useScrollLock } from "@/lib/useScrollLock";

export default function BookingModal({ pkg, onClose }) {
    useScrollLock();

    return (
        <div className="fixed inset-0 z-[100] flex p-2 sm:p-4 items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
            />

            {/* Modal Container */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 60 }}
                transition={{ type: "spring", damping: 28, stiffness: 350 }}
                className="relative bg-white w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] rounded-t-[2rem] sm:rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden pointer-events-auto"
            >
                {/* Drag handle — mobile only */}
                <div className="lg:hidden absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gray-300 rounded-full z-20" />

                {/* Left sidebar — desktop only */}
                <div className="lg:w-[35%] bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white relative hidden lg:flex flex-col justify-between shrink-0 overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-10">
                            <Sparkles size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Book Your Trip</h2>
                        <p className="text-blue-100 text-lg leading-relaxed mb-8">
                            Experience the best of <span className="text-white font-bold">{pkg.location}</span>.
                            Complete this quick form and our experts will finalize everything for you.
                        </p>
                        <div className="space-y-4">
                            {[
                                { icon: <Clock size={16} />, text: pkg.duration },
                                { icon: <Users size={16} />, text: pkg.groupSize },
                                { icon: <MapPin size={16} />, text: "Professional Guide" },
                                { icon: <Compass size={16} />, text: "Curated Experiences" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-blue-100">
                                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                        <p className="text-blue-200 text-xs font-medium uppercase tracking-widest mb-1">Starting from</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-extrabold text-white">₹{pkg.price.toLocaleString()}</span>
                            <span className="text-blue-200 uppercase text-xs">/ person</span>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                </div>

                {/* Right panel — the scrollable area */}
                <div className="flex-1 min-h-0 overflow-y-auto bg-white p-6 pt-10 sm:p-10 lg:p-12 overscroll-none">
                    <div className="flex justify-between items-start mb-6 sm:mb-8 sticky top-0 bg-white/95 backdrop-blur-md z-10 pb-4">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1.5 flex items-center gap-2">
                                <Compass size={22} className="text-blue-600" />
                                Customize Your Itinerary
                            </h3>
                            <p className="text-gray-500 text-sm">Selected: {pkg.title}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 bg-gray-50 hover:bg-gray-200 rounded-full transition-colors shrink-0 ml-4 border border-gray-100 shadow-sm"
                        >
                            <X size={22} className="text-gray-500" />
                        </button>
                    </div>
                    
                    <CustomPackageForm initialData={pkg} onCancel={onClose} />
                </div>
            </motion.div>
        </div>
    );
}
