
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
<<<<<<< HEAD
import { Minus, Plus, Calendar, Users, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
=======
import { Minus, Plus, Calendar, Users, Loader2 } from "lucide-react";
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
import { toast } from "react-hot-toast";

const BookingForm = ({ tour }) => {
    const { data: session } = useSession();
    const router = useRouter();

    const [startDate, setStartDate] = useState(new Date());
    const [travelers, setTravelers] = useState(1);
<<<<<<< HEAD
    const [phone, setPhone] = useState("");
=======
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(tour.price);

    useEffect(() => {
<<<<<<< HEAD
        setPhone(session?.user?.phone || "");
    }, [session]);

    useEffect(() => {
=======
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
        setTotalPrice(tour.price * travelers);
    }, [travelers, tour.price]);

    const handleBooking = async () => {
        if (!session) {
            toast.error("Please sign in to book this tour");
            router.push("/login?callbackUrl=" + window.location.pathname);
            return;
        }

        setLoading(true);

        try {
            // 1. Create Booking in DB (Pending Status)
            const res = await fetch("/api/bookings/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tourId: tour._id,
                    tourPrice: tour.price,
                    travelers,
                    travelDate: startDate,
<<<<<<< HEAD
                    totalPrice,
                    phone
=======
                    totalPrice
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            // 2. Initiate Payment (Razorpay)
            // For this demo, we will simulate a successful payment verification if no keys are present
            // or if we were integrating the real SDK.

            // In a real app, you would load the Razorpay script and open the modal here.
            // fetch /api/payment/razorpay which returns { orderId, key }
            // const paymentRes = await fetch("/api/payment/razorpay", { ... });

            // Simulating success for now to ensure the flow works without real keys
            toast.success("Booking initiated! Redirecting to payment...");

            setTimeout(() => {
                // Verify payment endpoint
                verifyPayment(data.bookingId);
            }, 1500);

        } catch (error) {
            toast.error(error.message || "Something went wrong");
            setLoading(false);
        }
    };

    const verifyPayment = async (bookingId) => {
        try {
            const res = await fetch("/api/bookings/confirm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookingId,
                    paymentId: "mock_payment_id_" + Date.now(), // In real app, from Razorpay response
                })
            });

            if (res.ok) {
                toast.success("Booking Confirmed!");
                router.push("/profile");
            } else {
                toast.error("Payment confirmation failed");
            }
        } catch (error) {
            toast.error("Error confirming booking");
        } finally {
            setLoading(false);
        }
    }

    return (
<<<<<<< HEAD
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 -z-10" />

            <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-8">
                <div>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-2">Starting from</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-gray-900">₹{tour.price.toLocaleString()}</span>
                        <span className="text-gray-400 text-sm font-medium">/person</span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full text-green-600 text-xs font-black uppercase tracking-tighter">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Live Booking
                    </div>
=======
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-6">
                <div>
                    <p className="text-gray-500 text-sm mb-1">Price per person</p>
                    <span className="text-3xl font-bold text-gray-900">${tour.price}</span>
                </div>
                <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full text-green-700 text-xs font-bold">
                    Available
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                </div>
            </div>

            <div className="space-y-6">
<<<<<<< HEAD
                {/* Date Picker Section */}
                <div>
                    <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">
                        Travel Schedule
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                            <Calendar className="text-blue-500" size={18} />
                        </div>
=======
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Date
                    </label>
                    <div className="relative">
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            minDate={new Date()}
<<<<<<< HEAD
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all text-gray-900 font-bold"
                            placeholderText="Select your date"
                        />
                    </div>
                </div>

                {/* Travelers Section */}
                <div>
                    <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">
                        Group Size
                    </label>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-2xl border border-gray-100">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setTravelers(Math.max(1, travelers - 1))}
                            className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-600 hover:shadow-md transition-all active:bg-blue-50"
                        >
                            <Minus size={20} />
                        </motion.button>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black text-gray-900 leading-none">{travelers}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Travelers</span>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setTravelers(travelers + 1)}
                            className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-600 hover:shadow-md transition-all active:bg-blue-50"
                        >
                            <Plus size={20} />
                        </motion.button>
                    </div>
                </div>

                {/* Phone Section */}
                <div>
                    <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">
                        Contact detail
                    </label>
                    <div className="relative">
                        <input
                            type="tel"
                            placeholder="Whatsapp / Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all text-gray-900 font-bold"
                            required
                        />
                    </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-gray-50/50 rounded-3xl p-6 space-y-3 mt-8">
                    <div className="flex justify-between text-sm font-medium text-gray-500">
                        <span>Base Fare (₹{tour.price.toLocaleString()} x {travelers})</span>
                        <span className="text-gray-900">₹{(tour.price * travelers).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-gray-500">
                        <span>Platform Fee</span>
                        <span className="text-green-600 font-bold">Free</span>
                    </div>
                    <div className="h-px bg-gray-100 my-4" />
                    <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900">Total Amount</span>
                        <div className="text-right">
                            <span className="text-3xl font-black text-blue-600">₹{totalPrice.toLocaleString()}</span>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Gst Inclusive</p>
                        </div>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBooking}
                    disabled={loading}
                    className="w-full relative mt-4 overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    {loading ? (
                        <Loader2 className="animate-spin" size={24} />
                    ) : (
                        <>
                            Book Adventure Now
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </motion.button>

                <p className="text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-6 bg-gray-50 py-2 rounded-full">
                    ⚡ Instant confirmation available
=======
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Travelers
                    </label>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-xl border border-gray-200">
                        <button
                            onClick={() => setTravelers(Math.max(1, travelers - 1))}
                            className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="font-bold text-gray-900 flex items-center gap-2">
                            <Users size={18} className="text-gray-400" />
                            {travelers}
                        </span>
                        <button
                            onClick={() => setTravelers(travelers + 1)}
                            className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-2">
                    <div className="flex justify-between text-gray-600">
                        <span>${tour.price} x {travelers} travelers</span>
                        <span>${tour.price * travelers}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Service fee</span>
                        <span>$0</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100 mt-2">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                    </div>
                </div>

                <button
                    onClick={handleBooking}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="animate-spin" /> : "Book Now"}
                </button>

                <p className="text-center text-gray-400 text-xs mt-4">
                    You won't be charged yet
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                </p>
            </div>
        </div>
    );
};

export default BookingForm;
