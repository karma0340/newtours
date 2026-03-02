
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Assuming I exported authOptions from lib/authOptions.js but I imported it there. Wait, I should verify import path.
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import Tour from "@/models/Tour";

// I need to import authOptions correctly. 
// I created `lib/authOptions.js` and imported it in `app/api/auth/[...nextauth]/route.js`
// So I should import from `@/lib/authOptions`.
import { authOptions as options } from "@/lib/authOptions";

export async function POST(req) {
    const session = await getServerSession(options);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { tourId, travelers, travelDate, totalPrice } = body;

        await dbConnect();

        // Optional: Check tour availability
        const tour = await Tour.findById(tourId);
        if (!tour) return NextResponse.json({ message: "Tour not found" }, { status: 404 });

        const newBooking = await Booking.create({
            user: session.user.id, // Assuming session.user.id is populated in authOptions callback
            tour: tourId,
            travelers,
            travelDate,
            totalPrice,
            status: "pending",
            paymentStatus: "pending"
        });

        return NextResponse.json({
            message: "Booking created",
            bookingId: newBooking._id
        }, { status: 201 });

    } catch (error) {
        console.error("Booking error:", error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
    }
}
