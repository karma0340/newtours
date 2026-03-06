
<<<<<<< HEAD
import mongoose from "mongoose";
=======
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
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

<<<<<<< HEAD

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
=======
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
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
            status: "pending",
            paymentStatus: "pending"
        });

        return NextResponse.json({
<<<<<<< HEAD
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
=======
            message: "Booking created",
            bookingId: newBooking._id
        }, { status: 201 });

    } catch (error) {
        console.error("Booking error:", error);
        return NextResponse.json({ message: "Internal Error" }, { status: 500 });
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
    }
}
