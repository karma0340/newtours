"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Loader2, Check, X, Edit2, Info, Users, MapPin, Calendar } from "lucide-react";

export default function AdminBookingTable({ initialBookings }) {
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
        setLoading(true);

        try {
            const res = await fetch(`/api/admin/bookings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: currentStatus })
            });
            const data = await res.json();

            if (res.ok) {
                toast.success("Status updated!");
                setBookings(prev =>
                    prev.map(b => b._id === id ? { ...b, status: currentStatus } : b)
                );
                setEditingId(null);
            } else {
                toast.error(data.message || "Failed to update status");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "confirmed": return "bg-green-100 text-green-800 border-green-200";
            case "cancelled": return "bg-red-100 text-red-800 border-red-200";
            case "completed": return "bg-blue-100 text-blue-800 border-blue-200";
            default: return "bg-yellow-100 text-yellow-800 border-yellow-200";
        }
    };

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                            <th className="p-4 pl-8">Customer & Trip</th>
                            <th className="p-4">Travel Date</th>
                            <th className="p-4 text-center">Guests</th>
                            <th className="p-4">Total Amount</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4 text-right pr-8">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-12 text-center text-gray-400 font-medium">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Info size={40} className="text-gray-300" />
                                        <p>No transactions exist yet.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            bookings.map(booking => (
                                <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="p-4 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">
                                                {booking.user?.name ? booking.user.name.charAt(0).toUpperCase() : '?'}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 leading-tight">
                                                    {booking.tour?.title || booking.destination || <span className="text-red-500 italic">Custom / Deleted Trip</span>}
                                                </div>
                                                <div className="text-xs text-gray-500 font-medium tracking-wide">
                                                    ID: {booking._id.substr(-6)} • {booking.user?.name || "Unknown User"}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-4 font-medium text-gray-800">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-gray-400" />
                                            {new Date(booking.travelDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </td>

                                    <td className="p-4 text-gray-600 text-center font-bold">
                                        {booking.travelers}
                                    </td>

                                    <td className="p-4">
                                        <div className="font-black text-gray-900">
                                            ₹{booking.totalPrice?.toLocaleString() || 0}
                                        </div>
                                    </td>

                                    <td className="p-4 text-center">
                                        {editingId === booking._id ? (
                                            <select
                                                value={currentStatus}
                                                onChange={(e) => setCurrentStatus(e.target.value)}
                                                className="bg-white border border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 py-1 shadow-sm font-bold uppercase tracking-wide cursor-pointer"
                                            >
                                                {statuses.map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <span className={`inline-flex items-center justify-center min-w-28 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${getStatusStyle(booking.status)} shadow-xs`}>
                                                {booking.status}
                                            </span>
                                        )}
                                    </td>

                                    <td className="p-4 text-right pr-8">
                                        {editingId === booking._id ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleSave(booking._id)}
                                                    disabled={loading}
                                                    className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50"
                                                >
                                                    {loading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    disabled={loading}
                                                    className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleEditClick(booking)}
                                                className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-all cursor-pointer"
                                            >
                                                <Edit2 size={12} />
                                                Edit Status
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
