import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import Tour from "@/models/Tour";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
    // Optional session check. If no session, they are treated as a guest.
    const session = await getServerSession(authOptions);


    try {
        const body = await req.json();
        const { tourId, vehicleId, travelers, travelDate, totalPrice, slug, phone, specialRequests, destination, tripType, duration } = body;

        await dbConnect();

        // Find tour by ID or Slug if needed
        let finalTourId = tourId;
        let finalDestination = destination;
        let finalDuration = duration;

        if (slug) {
            const tour = await Tour.findOne({ slug });
            if (tour) {
                finalTourId = tour._id;
                if (!finalDestination) finalDestination = tour.destination;
                if (!finalDuration) finalDuration = tour.duration;
            }
        } else if (mongoose.Types.ObjectId.isValid(tourId)) {
            const tour = await Tour.findById(tourId);
            if (tour) {
                if (!finalDestination) finalDestination = tour.destination;
                if (!finalDuration) finalDuration = tour.duration;
            }
        }

        // Create booking 
        const newBooking = await Booking.create({
            user: session?.user?.id || undefined,
            guestName: session ? undefined : body.name || "Guest Traveler",
            tour: finalTourId || null,
            vehicle: vehicleId || null,
            destination: finalDestination,
            tripType: tripType,
            duration: finalDuration,
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
