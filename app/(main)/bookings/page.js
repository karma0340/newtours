
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Users,
    MapPin,
    Clock,
    CreditCard,
    ChevronRight,
    Package,
    AlertCircle,
    CheckCircle2,
    Timer,
    ArrowRight,
    Lock
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

const StatusBadge = ({ status }) => {
    const configs = {
        pending: {
            label: "Under Review",
            icon: Timer,
            color: "bg-amber-50 text-amber-600 border-amber-100",
            dot: "bg-amber-500"
        },
        confirmed: {
            label: "Confirmed",
            icon: CheckCircle2,
            color: "bg-green-50 text-green-600 border-green-100",
            dot: "bg-green-500"
        },
        cancelled: {
            label: "Cancelled",
            icon: AlertCircle,
            color: "bg-red-50 text-red-600 border-red-100",
            dot: "bg-red-500"
        },
        completed: {
            label: "Completed",
            icon: Package,
            color: "bg-blue-50 text-blue-600 border-blue-100",
            dot: "bg-blue-500"
        }
    };

    const config = configs[status] || configs.pending;
    const Icon = config.icon;

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.color} text-xs font-bold uppercase tracking-wider shadow-sm`}>
            <div className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
            <Icon size={14} />
            {config.label}
        </div>
    );
};

const NewBookingNotification = ({ count, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-white rounded-[2rem] shadow-2xl shadow-blue-600/20 border border-blue-100 p-6 flex items-center gap-6 max-w-md w-full mx-4"
        >
            <div className="w-16 h-16 bg-blue-600 rounded-[1.25rem] flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/30">
                <Package size={32} />
            </div>
            <div className="flex-1">
                <h4 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-1">Adventure Added!</h4>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest text-[10px]">Your journey is being prepared</p>
            </div>
            <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
            >
                <ChevronRight size={20} className="rotate-270" />
            </button>
        </motion.div>
    );
};

export default function MyBookings() {
    const { data: session, status } = useSession();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastCount, setLastCount] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            fetchBookings();
        }
    }, [status]);

    useEffect(() => {
        // Only trigger if we already had a count and it increased
        if (lastCount !== null && bookings.length > lastCount) {
            setShowPopup(true);
            const timer = setTimeout(() => setShowPopup(false), 5000);
            return () => clearTimeout(timer);
        }
        // Update the baseline count
        if (bookings.length > 0 && lastCount === null) {
            setLastCount(bookings.length);
        }
    }, [bookings.length, lastCount]);

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/bookings/user");
            const data = await res.json();
            if (res.ok) {
                setBookings(data);
            } else {
                toast.error(data.message || "Failed to load bookings");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while fetching bookings");
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading" || (status === "authenticated" && loading)) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Retrieving your adventures...</p>
                </div>
            </div>
        );
    }

    if (status === "unauthenticated") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20 px-4 pb-20">
                <div className="bg-white p-10 max-w-sm w-full text-center rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />

                    <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center rotate-3 overflow-hidden shadow-inner relative z-10">
                        <Lock size={32} />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-2xl font-black text-gray-900 mb-2">Access Denied</h2>
                        <p className="text-gray-500 font-medium text-sm leading-relaxed">Plz login first to continew.</p>
                    </div>

                    <Link href="/login" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group relative z-10">
                        Login Now
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-20">
            <AnimatePresence>
                {showPopup && (
                    <NewBookingNotification
                        count={bookings.length}
                        onClose={() => setShowPopup(false)}
                    />
                )}
            </AnimatePresence>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                            My <span className="text-blue-600">Adventurs</span>
                        </h1>
                        <p className="text-gray-500 font-medium">Track your upcoming and past Himalayan expeditions.</p>
                    </div>
                    <div className="bg-white px-6 py-4 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-8">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Trips</p>
                            <p className="text-2xl font-black text-gray-900 leading-none">{bookings.length}</p>
                        </div>
                        <div className="w-px h-8 bg-gray-100" />
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                            <p className="text-sm font-bold text-green-600">Active Account</p>
                        </div>
                    </div>
                </div>

                {bookings.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[3rem] p-12 md:p-20 text-center border border-dashed border-gray-200"
                    >
                        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 text-blue-600">
                            <MapPin size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-4">No Bookings Found Yet</h2>
                        <p className="text-gray-500 max-w-sm mx-auto mb-10 font-medium">
                            It looks like you haven't planned your next adventure with us. The mountains are calling!
                        </p>
                        <Link href="/tours" className="inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-600/30 group">
                            Explore All Tours
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid gap-6">
                        {bookings.map((booking, idx) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all border border-gray-100 group relative overflow-hidden"
                            >
                                {/* Background Accent */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -z-10 opacity-40 group-hover:scale-110 transition-transform duration-700" />

                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <StatusBadge status={booking.status} />
                                            {booking.paymentStatus === 'paid' && (
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest">
                                                    <CreditCard size={12} />
                                                    Paid
                                                </div>
                                            )}
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-auto">
                                                ID: #{booking._id.slice(-6).toUpperCase()}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors capitalize">
                                            {booking.tour?.title || booking.destination || "Custom Itinerary Request"}
                                        </h3>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                                    <Calendar size={14} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Travel Date</span>
                                                </div>
                                                <p className="font-bold text-gray-900">
                                                    {new Date(booking.travelDate).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                                    <Users size={14} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Travelers</span>
                                                </div>
                                                <p className="font-bold text-gray-900">{booking.travelers} Persons</p>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                                    <Clock size={14} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Duration</span>
                                                </div>
                                                <p className="font-bold text-gray-900">{booking.tour?.duration || booking.duration || "N/A"}</p>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                                    <CreditCard size={14} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Total Price</span>
                                                </div>
                                                <p className="font-bold text-blue-600 font-black">₹{booking.totalPrice?.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 lg:w-48">
                                        {booking.tour && (
                                            <Link
                                                href={`/tours/${booking.tour.slug}`}
                                                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-white hover:shadow-md transition-all active:scale-[0.98]"
                                            >
                                                View Trip
                                            </Link>
                                        )}
                                        <Link
                                            href="/contact"
                                            className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 shadow-lg hover:shadow-blue-600/30 transition-all active:scale-[0.98]"
                                        >
                                            Get Help
                  1                      </Link>
                                    </div>
                                </div>

                                {booking.specialRequests && (
                                    <div className="mt-6 pt-6 border-t border-gray-50 flex gap-3 italic text-sm text-gray-400">
                                        <div className="shrink-0 font-bold uppercase text-[10px] tracking-widest pt-1">Notes:</div>
                                        <div>"{booking.specialRequests}"</div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

