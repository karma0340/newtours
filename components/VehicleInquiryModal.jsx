"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mock useSession
const useSession = () => ({ data: null });
const signIn = () => console.log("Signing in...");
const useRouter = () => ({ push: (path) => console.log("Navigating to", path) });
import { toast } from "react-hot-toast";
import { useScrollLock } from "@/lib/useScrollLock";
import {
    MapPin,
    Clock,
    Users,
    Check,
    X,
    Loader2,
    Calendar,
    Phone,
    Sparkles,
    ArrowRight,
    Car,
    ShieldCheck
} from "lucide-react";

export default function VehicleInquiryModal({ vehicle, onClose }) {
    useScrollLock();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: session?.user?.name || "",
        phone: "",
        travelDate: "",
        duration: "1-3 Days",
        guests: 2,
        destination: "",
        notes: ""
    });

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
                    vehicleId: vehicle._id,
                    name: form.name,
                    travelers: form.guests,
                    travelDate: form.travelDate,
                    totalPrice: 0, // Vehicles are inquiry-only
                    specialRequests: `Inquiry for ${vehicle.name}. Notes: ${form.notes}`,
                    phone: form.phone,
                    destination: form.destination,
                    duration: form.duration,
                    tripType: "Vehicle Rental"
                })
            });

            if (response.ok) {
                setSubmitted(true);
                toast.success("Inquiry sent successfully!");
            } else {
                const data = await response.json();
                toast.error(data.message || "Failed to send inquiry");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    className="relative bg-white w-full max-w-lg rounded-[3rem] p-12 text-center overflow-hidden shadow-2xl"
                >
                    <div className="relative w-24 h-24 mx-auto mb-8">
                        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25" />
                        <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/30">
                            <Check size={40} className="text-white" />
                        </div>
                    </div>

                    <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Inquiry Received!</h3>
                    <p className="text-gray-500 mb-10 font-medium">Our fleet manager will check the availability of <span className="text-blue-600 font-bold">{vehicle.name}</span> for your dates and call you back shortly.</p>
                    
                    <button 
                        onClick={onClose}
                        className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-blue-600 shadow-xl shadow-gray-200"
                    >
                        Back to Fleet
                    </button>
                    <p className="mt-6 text-[10px] font-black text-gray-300 uppercase tracking-widest leading-loose">Hike the Himalayas • Private Fleet Service</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[101] flex p-2 sm:p-4 items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/70 backdrop-blur-md pointer-events-auto"
            />
            
            {/* Modal Container */}
            <motion.div 
                initial={{ opacity: 0, y: 60 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 60 }}
                transition={{ type: "spring", damping: 28, stiffness: 350 }}
                className="relative bg-white w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] rounded-t-[2rem] sm:rounded-[3rem] shadow-2xl flex flex-col md:flex-row overflow-hidden pointer-events-auto"
            >
                {/* Drag handle — mobile only */}
                <div className="md:hidden absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gray-300 rounded-full z-20" />

                {/* Left Side: Vehicle Info (Desktop Only) */}
                <div className="hidden md:flex md:w-[35%] bg-gray-900 p-10 text-white flex-col justify-between relative overflow-hidden shrink-0">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2" />
                    
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-xl">
                            <Car size={28} className="text-blue-400" />
                        </div>
                        <h2 className="text-3xl font-black mb-2 leading-tight">Inquire About <br/><span className="text-blue-400 italic">{vehicle.name}</span></h2>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">Premium Himalayan Fleet</p>
                        
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-sm font-bold text-gray-300">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-blue-400 border border-white/10"><ShieldCheck size={18}/></div>
                                Expert Local Drivers
                            </div>
                            <div className="flex items-center gap-4 text-sm font-bold text-gray-300">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 border border-white/10"><Users size={18}/></div>
                                Up to {vehicle.capacity} Passengers
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 relative z-10">
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Why Book With Us?</p>
                        <div className="flex flex-wrap gap-2">
                             {['24/7 Support', 'Insurance Covered', 'AC / Heater', 'Roof Carrier'].map((tag, i) => (
                                 <span key={i} className="text-[9px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full font-black uppercase tracking-wider text-blue-300">{tag}</span>
                             ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Form (Scrollable content) */}
                <div className="flex-1 min-h-0 overflow-y-auto bg-white p-6 pt-10 md:p-12 overscroll-none custom-scrollbar">
                    <div className="flex justify-between items-start mb-8 sticky top-0 bg-white/95 backdrop-blur-md z-10 pb-4">
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2">Request Availability</h3>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest font-medium">Safe & Reliable Himalayan Journeys</p>
                        </div>
                        <button onClick={onClose} className="p-2 bg-gray-50 hover:bg-gray-200 rounded-full transition-colors border border-gray-100 shadow-sm ml-4 shrink-0">
                            <X size={24} className="text-gray-400" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name *</label>
                                <div className="relative">
                                    <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="John Doe" 
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number *</label>
                                <div className="relative">
                                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 98XXX-XXXXX" 
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Travel Date *</label>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="date" name="travelDate" required value={form.travelDate} onChange={handleChange} 
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm text-gray-700" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Duration *</label>
                                <select name="duration" required value={form.duration} onChange={handleChange} 
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm text-gray-700">
                                    {['1-3 Days', '4-6 Days', '7-10 Days', '10+ Days'].map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Drop / Destination *</label>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" name="destination" required value={form.destination} onChange={handleChange} placeholder="e.g. Kasol, Spiti, Manali (from Delhi/Chandigarh)" 
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center justify-between ml-1">
                                <span>Total Passengers</span>
                                <span className="text-blue-600 text-lg">{form.guests}</span>
                            </label>
                            <input 
                                type="range" 
                                name="guests" 
                                min={1} 
                                max={vehicle.capacity || 20} 
                                value={form.guests} 
                                onChange={handleChange}
                                className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] font-bold text-gray-400 px-1">
                                <span>1</span>
                                <span>Max {vehicle.capacity || 20}</span>
                            </div>
                        </div>

                        <div className="space-y-2 pt-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Special Requirements</label>
                            <textarea 
                                name="notes" 
                                value={form.notes} 
                                onChange={handleChange} 
                                rows={3}
                                placeholder="Any specific requirements for your journey?"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-blue-500 outline-none font-medium text-sm resize-none"
                            />
                        </div>

                        <div className="pt-6">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-blue-600 text-white rounded-2xl py-5 font-black uppercase tracking-[0.1em] text-sm transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 flex items-center justify-center gap-3 disabled:opacity-70 group"
                            >
                                {loading ? <Loader2 size={20} className="animate-spin" /> : (
                                    <>
                                        Send Inquiry
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

