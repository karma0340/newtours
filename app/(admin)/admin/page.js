
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Users, DollarSign, Calendar, Map, ArrowUpRight, ArrowRight, Clock, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

const StatusBadge = ({ status }) => {
    const configs = {
        pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
        confirmed: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
        completed: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
        cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
    };
    const c = configs[status] || configs.pending;
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${c.bg} ${c.text} ${c.border}`}>
            {status}
        </span>
    );
};

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState(null);
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated" && session?.user?.role !== "admin") {
            router.push("/");
        }
    }, [status, session, router]);

    useEffect(() => {
        if (session?.user?.role === "admin") {
            fetchDashboardData();
        }
    }, [session]);

    const fetchDashboardData = async () => {
        setRefreshing(true);
        try {
            const res = await fetch("/api/admin/dashboard");
            const data = await res.json();
            if (res.ok) {
                setStats(data.stats);
                setRecentBookings(data.recentBookings);
            } else {
                toast.error(data.message || "Failed to load dashboard");
            }
        } catch (error) {
            console.error("Dashboard error:", error);
            toast.error("An error occurred fetching dashboard data");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 size={40} className="animate-spin text-blue-600" />
                    <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Loading Analytics...</p>
                </div>
            </div>
        );
    }

    if (session?.user?.role !== "admin") {
        return null;
    }

    const statCards = [
        { name: 'Total Revenue', value: `₹${stats?.totalRevenue.toLocaleString() || '0'}`, icon: DollarSign, color: 'bg-gradient-to-br from-green-500 to-emerald-600', shadow: 'shadow-green-500/30' },
        { name: 'Total Bookings', value: stats?.totalBookings || '0', icon: Calendar, color: 'bg-gradient-to-br from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/30' },
        { name: 'Active Users', value: stats?.activeUsers || '0', icon: Users, color: 'bg-gradient-to-br from-purple-500 to-pink-600', shadow: 'shadow-purple-500/30' },
        { name: 'Tour Packages', value: stats?.totalTours || '0', icon: Map, color: 'bg-gradient-to-br from-orange-500 to-red-600', shadow: 'shadow-orange-500/30' },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-12 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">
                        Control <span className="text-blue-600">Center</span>
                    </h1>
                    <p className="text-gray-500 font-medium flex items-center gap-2">
                        <Sparkles size={16} className="text-yellow-500" />
                        Welcome back, {session.user.name}. Here's what's happening.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/tours/new" className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:border-blue-300 hover:text-blue-600 transition-colors shadow-sm">
                        Create Package
                    </Link>
                    <button
                        onClick={() => fetchDashboardData()}
                        disabled={refreshing}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2 group disabled:opacity-75"
                    >
                        Refresh
                        <span className={refreshing ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}>
                            <ArrowRight size={16} />
                        </span>
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={stat.name}
                            className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-xl transition-all group"
                        >
                            <div className={`${stat.color} p-4 rounded-2xl text-white shrink-0 shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform`}>
                                <Icon size={28} />
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">{stat.name}</p>
                                <h3 className="text-3xl font-black text-gray-900 leading-none">{stat.value}</h3>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Bookings Table */}
                <div className="xl:col-span-2 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-black text-gray-900">Recent Bookings</h2>
                        <Link href="/admin/bookings" className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                                    <th className="p-4 pl-8 font-bold">Customer</th>
                                    <th className="p-4 font-bold">Package</th>
                                    <th className="p-4 font-bold">Date & Guests</th>
                                    <th className="p-4 font-bold">Price</th>
                                    <th className="p-4 font-bold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-500 font-medium">
                                            No recent bookings found.
                                        </td>
                                    </tr>
                                ) : (
                                    recentBookings.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="p-4 pl-8">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
                                                        {booking.user?.image ? (
                                                            <Image src={booking.user.image} alt="" width={40} height={40} className="object-cover" />
                                                        ) : (
                                                            <span className="text-blue-600 font-bold text-sm">
                                                                {booking.user?.name ? booking.user.name.charAt(0).toUpperCase() : '?'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{booking.user?.name || "Unknown User"}</p>
                                                        <p className="text-xs text-gray-500">{booking.user?.email || "No email"}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm font-medium text-gray-700">
                                                {booking.tour?.title || booking.destination || "Custom Trip"}
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm font-medium text-gray-900 mb-0.5">{new Date(booking.travelDate).toLocaleDateString()}</div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Users size={12} /> {booking.travelers} Guests
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm font-bold text-gray-900">₹{booking.totalPrice?.toLocaleString() || '0'}</div>
                                            </td>
                                            <td className="p-4">
                                                <StatusBadge status={booking.status} />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column / Quick Actions */}
                <div className="space-y-8">
                    {/* Live Activity Placeholder */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-gray-900/20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform -translate-y-1/2 translate-x-1/2" />

                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <h2 className="text-lg font-black text-white">System Status</h2>
                            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold uppercase tracking-widest border border-green-500/20">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                Online
                            </div>
                        </div>

                        <ul className="space-y-6 relative z-10">
                            {[
                                { text: "Database connection stable", time: "Just now", icon: AlertCircle, color: "text-blue-400" },
                                { text: "Payment gateway active", time: "Just now", icon: DollarSign, color: "text-green-400" },
                                { text: "Recent backup completed", time: "2 hours ago", icon: Clock, color: "text-gray-400" }
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 items-start">
                                    <div className={`mt-0.5 ${item.color}`}>
                                        <item.icon size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-200 mb-1">{item.text}</p>
                                        <p className="text-xs text-gray-500">{item.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
