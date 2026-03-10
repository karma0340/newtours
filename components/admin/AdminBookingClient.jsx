"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Check, X, Trash2, Calendar, User, CreditCard, Users as UsersIcon } from "lucide-react";

export default function AdminBookingClient({ initialBookings }) {
    const [bookings, setBookings] = useState(initialBookings);
    const [editingId, setEditingId] = useState(null);
    const [currentStatus, setCurrentStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const statuses = ["pending", "confirmed", "completed", "cancelled"];

    const handleEditClick = (booking) => {
        setEditingId(booking._id);
        setCurrentStatus(booking.status);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setCurrentStatus("");
    };

    const handleSave = async (id) => {
        if (!currentStatus) return;
        setLoading(true);

        try {
            const res = await fetch(`/api/admin/bookings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: currentStatus })
            });

            if (res.ok) {
                toast.success("Status updated!");
                setBookings(prev =>
                    prev.map(b => b._id === id ? { ...b, status: currentStatus } : b)
                );
                setEditingId(null);
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to update status");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this booking?")) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/admin/bookings/${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                toast.success("Booking deleted!");
                setBookings(prev => prev.filter(b => b._id !== id));
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to delete booking");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'cancelled': return 'bg-rose-50 text-rose-700 border-rose-100';
            case 'completed': return 'bg-blue-50 text-blue-700 border-blue-100';
            default: return 'bg-amber-50 text-amber-700 border-amber-100';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-100">
                {bookings.map((booking) => (
                    <div key={booking._id} className="p-4 space-y-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 truncate">
                                    {booking.tour?.title || "Deleted Tour"}
                                </h3>
                                <p className="text-[10px] font-mono text-gray-400 mt-0.5">#{booking._id.substr(-6).toUpperCase()}</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(booking.status)}`}>
                                {booking.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                                <User size={14} className="text-gray-400" />
                                <span className="truncate">{booking.user?.name || "Guest"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                                <Calendar size={14} className="text-gray-400" />
                                {new Date(booking.travelDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                                <UsersIcon size={14} className="text-gray-400" />
                                {booking.travelers} Guests
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-900 font-black">
                                <CreditCard size={14} className="text-gray-400" />
                                ₹{booking.totalPrice?.toLocaleString()}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                            {editingId === booking._id ? (
                                <div className="flex flex-1 items-center gap-2">
                                    <select
                                        value={currentStatus}
                                        onChange={(e) => setCurrentStatus(e.target.value)}
                                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 bg-white outline-none flex-1"
                                    >
                                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <button onClick={() => handleSave(booking._id)} disabled={loading} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                                        <Check size={18} />
                                    </button>
                                    <button onClick={handleCancelEdit} className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg">
                                        <X size={18} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <button onClick={() => handleEditClick(booking)} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                                        Change Status
                                    </button>
                                    <button onClick={() => handleDelete(booking._id)} className="p-2 text-gray-400 hover:text-rose-600 transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase tracking-widest text-gray-400 font-black">
                            <th className="p-4 pl-8">Tour/ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Date/Guests</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 pr-8 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-50/50 group">
                                <td className="p-4 pl-8">
                                    <div className="font-bold text-gray-900 line-clamp-1">
                                        {booking.tour?.title || <span className="text-rose-500 italic">Tour Deleted</span>}
                                    </div>
                                    <div className="text-[10px] font-mono text-gray-400 mt-0.5">
                                        ID: {booking._id.substr(-6).toUpperCase()}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="font-bold text-gray-900">{booking.user?.name || booking.guestName || "Guest User"}</div>
                                    <div className="text-xs text-gray-400">{booking.user?.email || booking.guestEmail || "No email"}</div>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-1">
                                        <Calendar size={12} className="text-blue-500" />
                                        {new Date(booking.travelDate).toLocaleDateString()}
                                    </div>
                                    <div className="text-xs text-gray-400 flex items-center gap-1.5 uppercase font-black tracking-widest">
                                        <UsersIcon size={12} /> {booking.travelers} Guests
                                    </div>
                                </td>
                                <td className="p-4 font-black text-gray-900 text-lg">
                                    ₹{booking.totalPrice?.toLocaleString()}
                                </td>
                                <td className="p-4">
                                    {editingId === booking._id ? (
                                        <select
                                            value={currentStatus}
                                            onChange={(e) => setCurrentStatus(e.target.value)}
                                            className="text-xs border border-gray-300 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        >
                                            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    ) : (
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${getStatusStyle(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 pr-8 text-right">
                                    {editingId === booking._id ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => handleSave(booking._id)} disabled={loading} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                                                {loading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                                            </button>
                                            <button onClick={handleCancelEdit} disabled={loading} className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-end gap-3 translate-x-2 group-hover:translate-x-0 transition-transform">
                                            <button onClick={() => handleEditClick(booking)} className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                                                Edit Status
                                            </button>
                                            <button onClick={() => handleDelete(booking._id)} className="text-gray-300 hover:text-rose-600 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {bookings.length === 0 && (
                <div className="p-20 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar size={32} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No active bookings.</p>
                </div>
            )}
        </div>
    );
}
