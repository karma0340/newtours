import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(req, { params }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const { status } = body;

        if (!status || !["pending", "confirmed", "completed", "cancelled"].includes(status)) {
            return NextResponse.json({ message: "Invalid status provided." }, { status: 400 });
        }

        await dbConnect();

        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedBooking) {
            return NextResponse.json({ message: "Booking not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Booking status updated successfully", booking: updatedBooking });
    } catch (error) {
        console.error("Update booking error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await dbConnect();

        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return NextResponse.json({ message: "Booking not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("Delete booking error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
