
import mongoose from "mongoose";
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
        const { tourId, travelers, travelDate, totalPrice, slug, phone, specialRequests, destination, tripType, duration } = body;

        await dbConnect();

        // Find tour by ID or Slug
        let tour = null;
        if (mongoose.Types.ObjectId.isValid(tourId)) {
            tour = await Tour.findById(tourId);
        } else if (slug) {
            tour = await Tour.findOne({ slug });
        }

        // Create booking - Tour is now optional in the model
        const newBooking = await Booking.create({
            user: session.user.id,
            tour: tour?._id || null,
            destination: destination || tour?.destination,
            tripType: tripType,
            duration: duration || tour?.duration,
            travelers,
            travelDate,
            totalPrice: totalPrice || 0,
            phone,
            specialRequests,
            status: "pending",
            paymentStatus: "pending"
        });

        return NextResponse.json({
            message: "Booking request received successfully",
            bookingId: newBooking._id
        }, { status: 201 });


    } catch (error) {
        console.error("Booking error details:", error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return NextResponse.json({ message: messages[0] || "Validation failed" }, { status: 400 });
        }

        return NextResponse.json({ message: "Something went wrong on the server" }, { status: 500 });
    }
}
