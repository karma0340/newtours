import { motion } from "framer-motion";
import { X, MapPin, Clock, Star, Compass, Zap, Check, Sparkles, Info } from "lucide-react";
import { useScrollLock } from "@/lib/useScrollLock";

export default function TourDetailsModal({ pkg, onClose, onBook, viewType = "package" }) {
    useScrollLock();

    const isTourMode = viewType === "tour";

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
                className="relative bg-white w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] rounded-t-[2rem] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
            >
                {/* Drag handle — mobile only */}
                <div className="sm:hidden absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gray-300 rounded-full z-20 pointer-events-none" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 bg-white border border-gray-100/50 hover:bg-gray-100 rounded-full transition-colors shadow-lg"
                >
                    <X size={22} className="text-gray-900" />
                </button>

                {/* Inner Scrollable Content */}
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-none w-full flex flex-col bg-white custom-scrollbar">
                    
                    {/* Header Image section inside scroll bounds */}
                    <div className="relative h-64 sm:h-80 w-full shrink-0">
                        <img src={pkg.images?.[0] || pkg.image || '/images/hero/vehicle-default.jpg'} alt={pkg.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 sm:left-10 right-8">
                            {pkg.badge && (
                                <span className={`inline-block ${pkg.badgeColor || 'bg-blue-600'} text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3`}>{pkg.badge}</span>
                            )}
                            <h2 className="text-3xl sm:text-5xl font-black text-white mb-2 leading-tight tracking-tight">
                                {isTourMode ? "Explore " : ""}{pkg.title}
                            </h2>
                            <div className="flex flex-wrap gap-4 text-blue-100 text-[10px] font-black uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-blue-400" /> {pkg.location || pkg.destination}</span>
                                <span className="flex items-center gap-1.5"><Clock size={14} className="text-blue-400" /> {pkg.duration}</span>
                                <span className="flex items-center gap-1.5"><Star size={14} className="text-yellow-400 fill-yellow-400" /> {pkg.rating} ({pkg.reviews || pkg.numReviews || 0})</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-10 space-y-10 shrink-0">
                        <section>
                            <h3 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-widest">
                                <Compass size={18} className="text-blue-600" /> {isTourMode ? "Tour Overview" : "Package Description"}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg font-medium">
                                {pkg.description || `Embark on a breath-taking journey through ${pkg.location}. This curated experience is designed to give you the most authentic and memorable encounter with the Himalayas.`}
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <section>
                                <h3 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-widest">
                                    <Zap size={18} className="text-orange-500" /> Experience Highlights
                                </h3>
                                <ul className="space-y-4">
                                    {pkg.highlights?.map((h, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-600 text-sm font-medium">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                                            {h}
                                        </li>
                                    )) || (
                                        <li className="text-gray-400 italic">No highlights specified</li>
                                    )}
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-widest">
                                    <Sparkles size={18} className="text-blue-500" /> {isTourMode ? "Key Information" : "What's Included"}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {(isTourMode ? ["Professional Guide", "Standard Transport", "Permits Included", "Emergency Backup"] : pkg.inclusions)?.map((inc, i) => (
                                        <span key={i} className="bg-gray-50 text-gray-700 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-gray-100">
                                            {inc}
                                        </span>
                                    )) || (
                                        <span className="text-gray-400 italic">No inclusions specified</span>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Booking Footer section */}
                        {!isTourMode ? (
                            <section className="bg-gray-900 p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between flex-wrap gap-8 mt-4 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[80px] opacity-10" />
                                <div className="relative z-10">
                                    <p className="text-[10px] text-blue-400 uppercase tracking-[0.2em] font-black mb-1">Total Package Price</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-white">₹{pkg.price?.toLocaleString()}</span>
                                        <span className="text-gray-400 text-xs uppercase tracking-widest font-black">/ person</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { onClose(); onBook(pkg); }}
                                    className="relative z-10 w-full sm:w-auto bg-blue-600 hover:bg-white hover:text-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-blue-600/30 text-center"
                                >
                                    Book This Package Now
                                </button>
                            </section>
                        ) : (
                            <section className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 flex items-center justify-between flex-wrap gap-8 mt-4">
                                <div className="max-w-md">
                                    <h4 className="text-blue-900 font-black uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                                        <Info size={16} /> Heritage Expedition
                                    </h4>
                                    <p className="text-blue-800 text-sm leading-relaxed font-medium">
                                        Interested in this destination? We offer multiple ways to explore it, from day tours to full week-long expeditions.
                                    </p>
                                </div>
                                <button
                                    onClick={() => { window.location.href = `/tours/${pkg.slug}`; }}
                                    className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 text-center"
                                >
                                    Explore Full Catalog
                                </button>
                            </section>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
