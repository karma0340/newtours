
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req) {
    try {
        const { bookingId, paymentId } = await req.json();

        await dbConnect();

        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            {
                status: "confirmed",
                paymentStatus: "paid",
                paymentId: paymentId,
            },
            { new: true }
        );

        if (!booking) {
            return NextResponse.json({ message: "Booking not found" }, { status: 404 });
        }

        // Here you would trigger email notification
        // await sendConfirmationEmail(booking);

        return NextResponse.json({ message: "Booking confirmed", booking });
    } catch (error) {
        console.error("Confirmation error:", error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}
