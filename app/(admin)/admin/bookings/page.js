
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import User from "@/models/User";
import Tour from "@/models/Tour";

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
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Manage Bookings</h1>

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
                                        <div className="font-medium text-gray-900">
                                            {booking.tour?.title || <span className="text-red-500 italic">Tour Deleted</span>}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            ID: {booking._id.substr(-6)}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">
                                            {booking.user?.name || "Unknown"}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {booking.user?.email}
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
                                        ${booking.totalPrice.toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                    booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium mr-2">
                                            Edit
                                        </button>
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
        </div>
    );
}
