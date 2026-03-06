import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import Tour from "@/models/Tour";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        // Get aggregate counts
        const [totalBookings, totalTours, activeUsers, totalRevenueData, recentBookings] = await Promise.all([
            Booking.countDocuments(),
            Tour.countDocuments(),
            User.countDocuments(),
            Booking.aggregate([
                { $match: { status: { $in: ["confirmed", "completed"] } } },
                { $group: { _id: null, total: { $sum: "$totalPrice" } } }
            ]),
            Booking.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .populate('tour', 'title')
                .populate('user', 'name email image')
                .lean()
        ]);

        const totalRevenue = totalRevenueData.length > 0 ? totalRevenueData[0].total : 0;

        return NextResponse.json({
            stats: {
                totalBookings,
                totalTours,
                activeUsers,
                totalRevenue
            },
            recentBookings
        });

    } catch (error) {
        console.error("Dashboard error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
