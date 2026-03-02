
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Minus, Plus, Calendar, Users, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const BookingForm = ({ tour }) => {
    const { data: session } = useSession();
    const router = useRouter();

    const [startDate, setStartDate] = useState(new Date());
    const [travelers, setTravelers] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(tour.price);

    useEffect(() => {
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
                    totalPrice
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
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-6">
                <div>
                    <p className="text-gray-500 text-sm mb-1">Price per person</p>
                    <span className="text-3xl font-bold text-gray-900">${tour.price}</span>
                </div>
                <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full text-green-700 text-xs font-bold">
                    Available
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Date
                    </label>
                    <div className="relative">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            minDate={new Date()}
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
                </p>
            </div>
        </div>
    );
};

export default BookingForm;
