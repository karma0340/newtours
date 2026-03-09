"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

import {
    MapPin,
    Clock,
    Check,
    Calendar,
    Phone,
    Sparkles,
    ArrowRight,
    Mail,
    Loader2,
    User,
} from "lucide-react";

const tripTypes = ["Trekking", "Adventure", "Cultural", "Pilgrimage", "Honeymoon", "Family", "Wildlife", "Photography"];
const durations = ["1–3 Days", "4–5 Days", "6–7 Days", "8–10 Days", "10+ Days"];

export default function CustomPackageForm({ initialData = {}, onCancel }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [form, setForm] = useState({
        name: session?.user?.name || "",
        phone: "",
        destination: initialData.location || "",
        tripType: initialData.tripType || "",
        duration: initialData.duration || "",
        travelDate: "",
        guests: 2,
        specialRequests: initialData.title ? `Inquiry for: ${initialData.title}` : "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/bookings/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    slug: initialData.slug,
                    name: form.name,
                    travelers: form.guests,
                    travelDate: form.travelDate,
                    totalPrice: (initialData.price || 0) * form.guests,
                    specialRequests: form.specialRequests,
                    phone: form.phone,
                    destination: form.destination,
                    tripType: form.tripType,
                    duration: form.duration
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitted(true);
                toast.success("Request processed!");
            } else {
                toast.error(data.message || "Failed to submit request");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 px-6"
            >
                <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25" />
                    <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/30">
                        <Check size={40} className="text-white" />
                    </div>
                </div>

                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Booking Request Received!</h3>
                <div className="space-y-4 max-w-sm mx-auto">
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-left">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                            <Clock size={20} />
                        </div>
                        <p className="text-sm font-bold text-gray-600">
                            Our experts will review and <span className="text-blue-600">confirm your tour within 24 hours.</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-left">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                            <Mail size={20} />
                        </div>
                        <p className="text-sm font-bold text-gray-600">
                            Complete details and your <span className="text-blue-600">personalized itinerary</span> will be sent to your email.
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-3">
                    <button
                        onClick={onCancel}
                        className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-800 transition shadow-xl"
                    >
                        Back to Exploration
                    </button>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Thank you for choosing Hike The Himalaya</p>
                </div>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe"
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 bg-gray-50/50 transition" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 98XXXXXXXX"
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 bg-gray-50/50 transition" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Destination</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            name="destination"
                            value={form.destination}
                            onChange={handleChange}
                            placeholder="e.g. Spiti, Kasol, Manali…"
                            readOnly={!!initialData.location}
                            className={`w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 bg-gray-50/50 transition ${!!initialData.location ? 'bg-gray-100 cursor-not-allowed opacity-80' : ''}`}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Travel Date *</label>
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="date" name="travelDate" value={form.travelDate} onChange={handleChange} required
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-gray-50/50 transition" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Trip Type *</label>
                    <select name="tripType" value={form.tripType} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-gray-50/50 transition">
                        <option value="">Select type…</option>
                        {tripTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Duration *</label>
                    <select name="duration" value={form.duration} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-gray-50/50 transition">
                        <option value="">Select duration…</option>
                        {durations.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Number of Guests: <span className="text-blue-600">{form.guests}</span>
                    </label>
                    <input type="range" name="guests" min={1} max={30} value={form.guests} onChange={handleChange}
                        className="w-full accent-blue-600 cursor-pointer" />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>1</span><span>15</span><span>30</span>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Special Requests / Notes</label>
                <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} rows={3}
                    placeholder="Any specific activities, dietary needs, accommodation preferences, or questions?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 bg-gray-50/50 transition resize-none" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-4">
                {onCancel && (
                    <button type="button" onClick={onCancel}
                        className="flex-1 border border-gray-200 text-gray-600 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition">
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-[2] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center justify-center gap-2 group disabled:opacity-70">
                    {loading ? (
                        <Loader2 size={24} className="animate-spin" />
                    ) : (
                        <>
                            <Sparkles size={20} />
                            Submit Booking Request
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
