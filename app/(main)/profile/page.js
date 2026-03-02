
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import Tour from "@/models/Tour"; // Ensure Tour model is registered
import { MapPin, Calendar, CreditCard, Clock } from "lucide-react";

async function getUserBookings(userId) {
    await dbConnect();
    const bookings = await Booking.find({ user: userId })
        .populate("tour")
        .sort({ createdAt: -1 })
        .lean();
    return JSON.parse(JSON.stringify(bookings));
}

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const bookings = await getUserBookings(session.user.id);

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
                    <div className="h-32 bg-blue-600"></div>
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="relative">
                                <img
                                    src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`}
                                    alt={session.user.name}
                                    className="w-24 h-24 rounded-full border-4 border-white bg-white"
                                />
                            </div>
                            <div className="mb-2">
                                <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{session.user.name}</h1>
                            <p className="text-gray-500">{session.user.email}</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>

                {bookings.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h3>
                        <p className="text-gray-500 mb-6">You haven't booked any tours yet. Start exploring now!</p>
                        <Link href="/tours" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                            Explore Tours
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                                <div className="relative h-48 md:h-auto md:w-64 shrink-0">
                                    <Image
                                        src={booking.tour?.images?.[0] || 'https://via.placeholder.com/400x300'}
                                        alt={booking.tour?.title || "Tour"}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-gray-900">{booking.tour?.title}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} className="text-blue-500" />
                                                Travel Date: {new Date(booking.travelDate).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-blue-500" />
                                                {booking.tour?.destination}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CreditCard size={16} className="text-blue-500" />
                                                Total Paid: ${booking.totalPrice}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-blue-500" />
                                                Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <Link href={`/tours/${booking.tour?.slug}`} className="text-blue-600 font-medium hover:underline text-sm">
                                            View Tour Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
