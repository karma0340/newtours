
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions as options } from "@/lib/authOptions";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import Tour from "@/models/Tour";

export async function GET(req) {
    const session = await getServerSession(options);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();

        // Fetch bookings for the current user and populate tour details
        const bookings = await Booking.find({ user: session.user.id })
            .populate("tour")
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(bookings);
    } catch (error) {
        console.error("Fetch bookings error:", error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}
