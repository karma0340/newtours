
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
    MapPin,
    Clock,
    Users,
    Star,
    Check,
    ChevronRight,
    Mountain,
    Zap,
    Compass,
    SlidersHorizontal,
    Calendar,
    Phone,
    Sparkles,
    ArrowRight,
    Mail,
    X,
    Loader2,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const packageTabs = [
    { id: "all", label: "All Packages" },
    { id: "popular", label: "Popular" },
    { id: "adventure", label: "Adventure" },
    { id: "spiritual", label: "Spiritual" },
    { id: "offbeat", label: "Offbeat" },
];

const predefinedPackages = [
    {
        id: 1,
        title: "Manali – Solang Valley Escape",
        slug: "manali-solang-valley",
        category: ["popular", "adventure"],
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
        location: "Manali, Himachal Pradesh",
        duration: "5 Days / 4 Nights",
        groupSize: "4 – 15 people",
        rating: 4.9,
        reviews: 214,
        price: 8499,
        originalPrice: 11000,
        badge: "Best Seller",
        badgeColor: "bg-blue-600",
        highlights: ["Solang Valley snow activities", "Rohtang Pass visit", "Hadimba Temple darshan", "Beas River riverside camp"],
        inclusions: ["Hotel Stay", "Transfers", "Guided Trek", "Meals (CP)"],
    },
    {
        id: 2,
        title: "Spiti Valley Cold Desert Odyssey",
        slug: "spiti-valley-odyssey",
        category: ["offbeat", "adventure"],
        image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=800&auto=format&fit=crop",
        location: "Spiti Valley, Himachal Pradesh",
        duration: "8 Days / 7 Nights",
        groupSize: "6 – 12 people",
        rating: 4.8,
        reviews: 178,
        price: 14999,
        originalPrice: 19000,
        badge: "Offbeat Gem",
        badgeColor: "bg-teal-600",
        highlights: ["Key Monastery & Kaza town", "Chandratal Lake camp", "Fossil Valley at Langza", "Chicham Bridge crossing"],
        inclusions: ["Guesthouse Stay", "SUV Transfers", "Expert Guide", "All Meals"],
    },
    {
        id: 3,
        title: "Shimla – Kufri Heritage Trail",
        slug: "shimla-kufri-heritage",
        category: ["popular"],
        image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=800&auto=format&fit=crop",
        location: "Shimla & Kufri, Himachal Pradesh",
        duration: "4 Days / 3 Nights",
        groupSize: "2 – 20 people",
        rating: 4.7,
        reviews: 312,
        price: 6499,
        originalPrice: 8500,
        badge: "Family Favorite",
        badgeColor: "bg-rose-500",
        highlights: ["Toy Train ride on Kalka-Shimla rail", "Mall Road evening stroll", "Kufri's snowy slopes", "Christ Church heritage tour"],
        inclusions: ["Hotel Stay", "Toy Train Tickets", "City Tour", "Breakfast"],
    },
    {
        id: 4,
        title: "Kasol – Kheerganga Trek",
        slug: "kasol-kheerganga",
        category: ["adventure", "offbeat"],
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
        location: "Kasol & Parvati Valley",
        duration: "6 Days / 5 Nights",
        groupSize: "5 – 18 people",
        rating: 4.8,
        reviews: 156,
        price: 9299,
        originalPrice: 12000,
        badge: "Trekker's Choice",
        badgeColor: "bg-green-600",
        highlights: ["Kheerganga hot springs trek", "Parvati River camping", "Malana village cultural tour", "Star-gazing nights"],
        inclusions: ["Camp Stay", "Trekking Gear", "Trek Guide", "All Meals"],
    },
    {
        id: 5,
        title: "Dharamshala – McLeod Ganj Spiritual Sojourn",
        slug: "dharamshala-mcleod-ganj",
        category: ["spiritual", "popular"],
        image: "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?q=80&w=800&auto=format&fit=crop",
        location: "Dharamshala, Himachal Pradesh",
        duration: "5 Days / 4 Nights",
        groupSize: "2 – 20 people",
        rating: 4.9,
        reviews: 289,
        price: 7799,
        originalPrice: 10000,
        badge: "Spiritual Escape",
        badgeColor: "bg-purple-600",
        highlights: ["Dalai Lama Temple visit", "Namgyal Monastery meditation", "Triund trek with valley views", "Tibetan market shopping"],
        inclusions: ["Hotel Stay", "Transfers", "Monastery Guide", "Breakfast"],
    },
    {
        id: 6,
        title: "Bir Billing Paragliding Adventure",
        slug: "bir-billing-paragliding",
        category: ["adventure"],
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop",
        location: "Bir Billing, Himachal Pradesh",
        duration: "3 Days / 2 Nights",
        groupSize: "2 – 10 people",
        rating: 4.9,
        reviews: 98,
        price: 5999,
        originalPrice: 7500,
        badge: "Adrenaline Rush",
        badgeColor: "bg-orange-500",
        highlights: ["Certified tandem paragliding", "World's 2nd highest paragliding site", "Bir village exploration", "Tibetan colony visit"],
        inclusions: ["Hotel Stay", "Paragliding Flight", "Transfers", "Breakfast"],
    },
];

const tripTypes = ["Trekking", "Adventure", "Cultural", "Pilgrimage", "Honeymoon", "Family", "Wildlife", "Photography"];
const durations = ["1–3 Days", "4–5 Days", "6–7 Days", "8–10 Days", "10+ Days"];
const budgets = ["Under ₹5,000", "₹5,000 – ₹10,000", "₹10,000 – ₹20,000", "₹20,000+"];

// ─── Helper ──────────────────────────────────────────────────────────────────

const discount = (orig, price) => Math.round(((orig - price) / orig) * 100);

// ─── Direction helpers for scroll animation ───────────────────────────────────
// 0 → from left, 1 → from right, 2 → from below (repeating)
const getHidden = (index) => {
    const dir = index % 3;
    if (dir === 0) return { opacity: 0, x: -220, y: 0 };
    if (dir === 1) return { opacity: 0, x: 220, y: 0 };
    return { opacity: 0, x: 0, y: 100 };
};

// ─── PackageCard ─────────────────────────────────────────────────────────────

const PackageCard = ({ pkg, index, onBook }) => {
    const ref = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(ref, { once: false, margin: "0px 0px -80px 0px" });

    useEffect(() => {
        if (isInView) {
            controls.start({
                opacity: 1, x: 0, y: 0,
                transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
            });
        } else {
            controls.start({
                ...getHidden(index),
                transition: { duration: 0.75, ease: [0.4, 0, 0.6, 0] },
            });
        }
    }, [isInView, index, controls]);

    return (
        <motion.div
            ref={ref}
            initial={getHidden(index)}
            animate={controls}
            className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 hover:border-blue-100 transition-shadow duration-300 flex flex-col"
        >
            {/* Image */}
            <div className="relative h-36 sm:h-44 md:h-52 overflow-hidden">
                <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge */}
                <span className={`absolute top-4 left-4 ${pkg.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}>
                    {pkg.badge}
                </span>

                {/* Discount */}
                <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {discount(pkg.originalPrice, pkg.price)}% OFF
                </span>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-gray-800">{pkg.rating}</span>
                    <span className="text-xs text-gray-500">({pkg.reviews})</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="flex items-start gap-1 text-blue-600 text-xs font-semibold mb-2">
                    <MapPin size={12} className="mt-0.5 shrink-0" />
                    <span>{pkg.location}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors leading-snug">
                    {pkg.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                        <Clock size={13} className="text-blue-400" />
                        {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1">
                        <Users size={13} className="text-blue-400" />
                        {pkg.groupSize}
                    </span>
                </div>

                {/* Highlights */}
                <ul className="space-y-1 mb-5 flex-1">
                    {pkg.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check size={13} className="text-green-500 mt-0.5 shrink-0" />
                            {h}
                        </li>
                    ))}
                </ul>

                {/* Inclusions */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {pkg.inclusions.map((inc, i) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-600 font-medium px-2 py-0.5 rounded-full border border-blue-100">
                            {inc}
                        </span>
                    ))}
                </div>

                {/* Price + CTA */}
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 mt-auto xl:flex-row xl:items-center xl:justify-between">
                    <div className="shrink-0">
                        <span className="text-xs text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                        <div className="text-xl font-extrabold text-gray-900">
                            ₹{pkg.price.toLocaleString()}
                            <span className="text-sm font-normal text-gray-500">/person</span>
                        </div>
                    </div>
                    <button
                        onClick={() => onBook(pkg)}
                        className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white w-full xl:w-auto px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
                    >
                        Book Now <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// ─── CustomPackageForm Component (Extracted for reuse) ─────────────────────────

const CustomPackageForm = ({ initialData = {}, onCancel }) => {
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

        if (!session) {
            toast.error("Please login to submit a booking request");
            signIn(undefined, { callbackUrl: window.location.href });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/bookings/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    slug: initialData.slug,
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
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 bg-gray-50/50 transition" />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 98XXXXXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 bg-gray-50/50 transition" />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Destination</label>
                    <input
                        type="text"
                        name="destination"
                        value={form.destination}
                        onChange={handleChange}
                        placeholder="e.g. Spiti, Kasol, Manali…"
                        readOnly={!!initialData.location}
                        className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 bg-gray-50/50 transition ${!!initialData.location ? 'bg-gray-100 cursor-not-allowed opacity-80' : ''}`}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Travel Date *</label>
                    <input type="date" name="travelDate" value={form.travelDate} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-gray-50/50 transition" />
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

            <div className="flex flex-col sm:flex-row gap-3">
                {onCancel && (
                    <button type="button" onClick={onCancel}
                        className="flex-1 border border-gray-200 text-gray-600 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition">
                        Cancel
                    </button>
                )}
                <button
                    type={session ? "submit" : "button"}
                    onClick={!session ? () => signIn(undefined, { callbackUrl: window.location.href }) : undefined}
                    disabled={loading}
                    className="flex-[2] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center justify-center gap-2 group disabled:opacity-70">
                    {loading ? (
                        <Loader2 size={24} className="animate-spin" />
                    ) : !session ? (
                        <>
                            <Sparkles size={20} />
                            Login to Book
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
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
};

// ─── BookingModal ────────────────────────────────────────────────────────────

const BookingModal = ({ pkg, onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]">
                <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-white/20 hover:bg-white/40 rounded-full lg:hidden text-white">
                    <X size={24} />
                </button>
                <div className="lg:w-[35%] bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white relative flex flex-col justify-between shrink-0 overflow-y-auto hidden lg:flex scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                <div className="lg:w-[65%] p-6 sm:p-10 lg:p-12 overflow-y-auto bg-white scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-2 flex items-center gap-2">
                                <Compass size={24} className="text-blue-600" />
                                Customize Your Itinerary
                            </h3>
                            <p className="text-gray-500">Selected: {pkg.title}</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden lg:block">
                            <X size={24} className="text-gray-400" />
                        </button>
                    </div>
                    <CustomPackageForm initialData={pkg} onCancel={onClose} />
                </div>
            </motion.div>
        </div>
    );
};

// ─── TourDetailsModal ─────────────────────────────────────────────────────────

const TourDetailsModal = ({ pkg, onClose, onBook }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                    <X size={24} className="text-gray-600" />
                </button>

                <div className="overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {/* Header Image */}
                    <div className="relative h-64 sm:h-80 w-full">
                        <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-8 right-8">
                            <span className={`inline-block ${pkg.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>{pkg.badge}</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{pkg.title}</h2>
                            <div className="flex flex-wrap gap-4 text-blue-100 text-sm">
                                <span className="flex items-center gap-1"><MapPin size={14} /> {pkg.location}</span>
                                <span className="flex items-center gap-1"><Clock size={14} /> {pkg.duration}</span>
                                <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /> {pkg.rating} ({pkg.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 sm:p-10 space-y-10">
                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Compass size={20} className="text-blue-600" /> Overview
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Embark on a breath-taking journey through {pkg.location}. This curated package is designed to give you the most authentic and memorable experience possible.
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Zap size={20} className="text-orange-500" /> Highlights
                                </h3>
                                <ul className="space-y-3">
                                    {pkg.highlights.map((h, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-700">
                                            <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                <Check size={14} className="text-green-600" />
                                            </div>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Sparkles size={20} className="text-blue-500" /> Inclusions
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {pkg.inclusions.map((inc, i) => (
                                        <span key={i} className="bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-xl border border-blue-100">
                                            {inc}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <section className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-center justify-between flex-wrap gap-6">
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Total Package Price</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-extrabold text-gray-900">₹{pkg.price.toLocaleString()}</span>
                                    <span className="text-gray-500">/ person</span>
                                </div>
                            </div>
                            <button
                                onClick={() => { onClose(); onBook(pkg); }}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/30"
                            >
                                Book This Trip Now
                            </button>
                        </section>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const TourPackages = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [showCustom, setShowCustom] = useState(false);
    const [selectedPkg, setSelectedPkg] = useState(null);

    const filtered =
        activeTab === "all"
            ? predefinedPackages
            : predefinedPackages.filter((p) => p.category.includes(activeTab));

    return (
        <section className="py-12 md:py-24 bg-gray-50 relative">
            <AnimatePresence>
                {selectedPkg && (
                    <BookingModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
                )}
            </AnimatePresence>

            {/* Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-20 -translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="container mx-auto px-3 sm:px-4 relative z-10">

                {/* ── Section Header ── */}
                <div className="text-center mb-8 md:mb-14">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 text-blue-600 font-bold tracking-widest uppercase text-sm mb-3"
                    >
                        <Mountain size={16} /> Himachal Pradesh Tours
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 mb-3 md:mb-4 leading-tight"
                    >
                        Our Tour Packages
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg"
                    >
                        Choose from our curated Himachal itineraries or let us craft a
                        fully personalized journey just for you.
                    </motion.p>
                </div>

                {/* ── Toggle: Predefined / Custom ── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                    className="flex justify-center mb-10"
                >
                    <div className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-1 shadow-sm gap-1 w-full sm:w-auto">
                        <button
                            onClick={() => setShowCustom(false)}
                            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${!showCustom
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <Compass size={16} />
                            Predefined Packages
                        </button>
                        <button
                            onClick={() => setShowCustom(true)}
                            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${showCustom
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <SlidersHorizontal size={16} />
                            Build Custom Trip
                        </button>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {/* ── Predefined Packages ── */}
                    {!showCustom && (
                        <motion.div
                            key="predefined"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35 }}
                        >
                            {/* Filter Tabs */}
                            <div className="flex flex-wrap justify-center gap-1.5 mb-8 md:mb-10">
                                {packageTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-200 ${activeTab === tab.id
                                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Cards Grid */}
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
                            >
                                {filtered.map((pkg, i) => (
                                    <PackageCard
                                        key={pkg.id}
                                        pkg={pkg}
                                        index={i}
                                        onBook={(p) => setSelectedPkg(p)}
                                    />
                                ))}
                            </motion.div>

                            {/* View All CTA */}
                            <div className="text-center mt-14">
                                <Link
                                    href="/tours"
                                    className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 group"
                                >
                                    View All Tours
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    )}

                    {/* ── Custom Package Builder ── */}
                    {showCustom && (
                        <motion.div
                            key="custom"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35 }}
                            className="max-w-5xl mx-auto"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                                {/* Left Info Panel */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/4" />
                                        <SlidersHorizontal size={36} className="mb-4 text-blue-200" />
                                        <h3 className="text-2xl font-bold mb-3">Build Your Dream Trip</h3>
                                        <p className="text-blue-100 leading-relaxed">
                                            Have something specific in mind? Tell us your preferences
                                            and our Himachal travel experts will design a bespoke itinerary
                                            tailored just for you.
                                        </p>
                                    </div>

                                    {/* Why Custom */}
                                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                                        <h4 className="font-bold text-gray-900">Why Go Custom?</h4>
                                        {[
                                            { icon: <Zap size={16} className="text-orange-500" />, text: "Fully flexible dates & routes" },
                                            { icon: <Users size={16} className="text-blue-500" />, text: "Solo, couple, or large groups" },
                                            { icon: <Star size={16} className="text-yellow-500" />, text: "Handpicked stays & experiences" },
                                            { icon: <Phone size={16} className="text-green-500" />, text: "Expert guidance at every step" },
                                            { icon: <Calendar size={16} className="text-purple-500" />, text: "Plan months ahead or last-minute" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                                <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                                                    {item.icon}
                                                </div>
                                                {item.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Form */}
                                <div className="lg:col-span-3 bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Sparkles size={20} className="text-blue-600" />
                                        Customize Your Itinerary
                                    </h3>
                                    <CustomPackageForm />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default TourPackages;
