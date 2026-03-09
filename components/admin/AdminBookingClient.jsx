"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Check, X, Trash2 } from "lucide-react";

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

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                            <th className="p-4">Tour Info</th>
                            <th className="p-4">User Details</th>
                            <th className="p-4">Travel Date</th>
                            <th className="p-4 text-center">Travelers</th>
                            <th className="p-4">Total Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-50/50">
                                <td className="p-4">
                                    <div className="font-medium text-gray-900 line-clamp-1">
                                        {booking.tour?.title || <span className="text-red-500 italic">Tour Deleted</span>}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        ID: {booking._id.substr(-6)}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">
                                        {booking.user?.name || booking.guestName || "Guest User"}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {booking.user?.email || booking.guestEmail || booking.phone || "No contact info"}
                                    </div>
                                </td>
                                <td className="p-4 text-gray-600 font-medium">
                                    {new Date(booking.travelDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>
                                <td className="p-4 text-gray-600 text-center">
                                    {booking.travelers}
                                </td>
                                <td className="p-4 font-bold text-gray-900">
                                    ₹{booking.totalPrice?.toLocaleString() || 0}
                                </td>
                                <td className="p-4">
                                    {editingId === booking._id ? (
                                        <select
                                            value={currentStatus}
                                            onChange={(e) => setCurrentStatus(e.target.value)}
                                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                                        >
                                            {statuses.map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                    booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'}`}>
                                            {booking.status}
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    {editingId === booking._id ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleSave(booking._id)}
                                                disabled={loading}
                                                className="text-green-600 hover:text-green-800 p-1"
                                                title="Save"
                                            >
                                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                disabled={loading}
                                                className="text-gray-400 hover:text-gray-600 p-1"
                                                title="Cancel"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => handleEditClick(booking)}
                                                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(booking._id)}
                                                className="text-red-500 hover:text-red-700 p-1 transition-colors"
                                                title="Delete Trip"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-12 text-center text-gray-500">
                                    <div className="mb-2">No bookings found found.</div>
                                    <p className="text-sm">When users book tours, they will appear here.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

