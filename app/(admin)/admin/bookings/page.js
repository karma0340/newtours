
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import User from "@/models/User";
import Tour from "@/models/Tour";
import AdminBookingClient from "@/components/admin/AdminBookingClient";
import RefreshButton from "@/components/admin/RefreshButton";

async function getBookings() {
    await dbConnect();

    // Ensure models are compiled
    // We import them above, so they should be.

    const bookings = await Booking.find({})
        .populate("user", "name email")
        .populate("tour", "title")
        .sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(bookings));
}

export default async function AdminBookingsPage() {
    const bookings = await getBookings();

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                        Manage <span className="text-blue-600">Bookings</span>
                    </h1>
                </div>
                <div className="flex gap-3">
                    <RefreshButton />
                </div>
            </div>
            <AdminBookingClient initialBookings={bookings} />
        </div>
    );
}


