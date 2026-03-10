import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Vehicle from "@/models/Vehicle";
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

        await dbConnect();

        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!updatedVehicle) {
            return NextResponse.json({ message: "Vehicle not found." }, { status: 404 });
        }

        return NextResponse.json(updatedVehicle);
    } catch (error) {
        console.error("Update vehicle error:", error);
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

        const deletedVehicle = await Vehicle.findByIdAndDelete(id);

        if (!deletedVehicle) {
            return NextResponse.json({ message: "Vehicle not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Vehicle deleted successfully" });
    } catch (error) {
        console.error("Delete vehicle error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
